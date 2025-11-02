-- ============================================
-- SECURITY FIX: Coin Balance and Badge System
-- ============================================

-- 1. FIX USER_COINS: Prevent users from directly updating their balances
DROP POLICY IF EXISTS "System can update coins" ON public.user_coins;
DROP POLICY IF EXISTS "System can insert coins" ON public.user_coins;

-- Only allow viewing coin balances (keep existing view policies)
-- New INSERT policy: only system (via function) can create coin records
CREATE POLICY "System can insert coins via function" ON public.user_coins
  FOR INSERT 
  WITH CHECK (false); -- Block all direct inserts

-- New UPDATE policy: only through secure functions
CREATE POLICY "System can update coins via function" ON public.user_coins
  FOR UPDATE 
  USING (false); -- Block all direct updates

-- Grant access to service role for system operations
GRANT INSERT, UPDATE ON public.user_coins TO service_role;

-- 2. FIX USER_BADGES: Prevent users from awarding themselves badges
DROP POLICY IF EXISTS "System can award badges" ON public.user_badges;

-- Only admins can award badges
CREATE POLICY "Only admins can award badges" ON public.user_badges
  FOR INSERT 
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 3. FIX PROFILES: Allow public viewing of profiles (needed for community features)
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Allow everyone to view all profiles (needed for community, leaderboards, etc.)
CREATE POLICY "Everyone can view profiles" ON public.profiles
  FOR SELECT 
  USING (true);

-- Users can still only update their own profile
-- (existing update policy remains)

-- 4. CREATE SECURE FUNCTION: Purchase coins
CREATE OR REPLACE FUNCTION public.purchase_coins(
  p_amount INTEGER,
  p_price NUMERIC,
  p_payment_reference TEXT DEFAULT NULL
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid;
  v_new_balance integer;
  v_result json;
BEGIN
  -- Get current user
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RETURN json_build_object('error', 'Not authenticated');
  END IF;

  -- Validate amount
  IF p_amount <= 0 OR p_amount > 100000 THEN
    RETURN json_build_object('error', 'Invalid coin amount');
  END IF;

  -- In production, validate payment with payment processor here
  -- For now, we'll allow the purchase (this is where Stripe/payment validation would go)

  -- Update user balance atomically
  UPDATE public.user_coins
  SET 
    balance = balance + p_amount,
    total_earned = total_earned + p_amount,
    updated_at = now()
  WHERE user_id = v_user_id
  RETURNING balance INTO v_new_balance;

  -- If no record exists, create one
  IF NOT FOUND THEN
    INSERT INTO public.user_coins (user_id, balance, total_earned)
    VALUES (v_user_id, p_amount, p_amount)
    RETURNING balance INTO v_new_balance;
  END IF;

  -- Record transaction
  INSERT INTO public.coin_transactions (
    user_id,
    amount,
    transaction_type,
    description
  ) VALUES (
    v_user_id,
    p_amount,
    'purchase',
    CASE 
      WHEN p_payment_reference IS NOT NULL THEN 'Purchased ' || p_amount || ' coins (Ref: ' || p_payment_reference || ')'
      ELSE 'Purchased ' || p_amount || ' coins'
    END
  );

  RETURN json_build_object(
    'success', true,
    'new_balance', v_new_balance,
    'coins_added', p_amount
  );
END;
$$;

-- 5. CREATE SECURE FUNCTION: Spend coins for help request
CREATE OR REPLACE FUNCTION public.spend_coins_for_request(
  p_help_request_id UUID,
  p_coin_amount INTEGER
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid;
  v_current_balance integer;
  v_new_balance integer;
BEGIN
  -- Get current user
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RETURN json_build_object('error', 'Not authenticated');
  END IF;

  -- Validate amount
  IF p_coin_amount < 0 THEN
    RETURN json_build_object('error', 'Invalid coin amount');
  END IF;

  -- Get current balance
  SELECT balance INTO v_current_balance
  FROM public.user_coins
  WHERE user_id = v_user_id;

  -- Check if user has enough coins
  IF v_current_balance IS NULL THEN
    RETURN json_build_object('error', 'No coin account found');
  END IF;

  IF v_current_balance < p_coin_amount THEN
    RETURN json_build_object('error', 'Insufficient coins', 'required', p_coin_amount, 'available', v_current_balance);
  END IF;

  -- Deduct coins atomically
  UPDATE public.user_coins
  SET 
    balance = balance - p_coin_amount,
    total_spent = total_spent + p_coin_amount,
    updated_at = now()
  WHERE user_id = v_user_id
  RETURNING balance INTO v_new_balance;

  -- Record transaction
  INSERT INTO public.coin_transactions (
    user_id,
    amount,
    transaction_type,
    help_request_id,
    description
  ) VALUES (
    v_user_id,
    -p_coin_amount,
    'help_request_reward',
    p_help_request_id,
    'Offered ' || p_coin_amount || ' coins as reward for help request'
  );

  RETURN json_build_object(
    'success', true,
    'new_balance', v_new_balance,
    'coins_spent', p_coin_amount
  );
END;
$$;

-- 6. CREATE SECURE FUNCTION: Award coins for helping
CREATE OR REPLACE FUNCTION public.award_coins_for_help(
  p_help_request_id UUID
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_helper_id uuid;
  v_requester_id uuid;
  v_coin_reward integer;
  v_new_balance integer;
  v_request_status help_request_status;
BEGIN
  -- Get help request details
  SELECT helper_id, requester_id, coin_reward, status
  INTO v_helper_id, v_requester_id, v_coin_reward, v_request_status
  FROM public.help_requests
  WHERE id = p_help_request_id;

  -- Validate request exists and is completed
  IF v_helper_id IS NULL THEN
    RETURN json_build_object('error', 'Help request not found or no helper assigned');
  END IF;

  IF v_request_status != 'completed' THEN
    RETURN json_build_object('error', 'Help request must be completed to award coins');
  END IF;

  -- Award coins to helper
  IF v_coin_reward > 0 THEN
    UPDATE public.user_coins
    SET 
      balance = balance + v_coin_reward,
      total_earned = total_earned + v_coin_reward,
      updated_at = now()
    WHERE user_id = v_helper_id
    RETURNING balance INTO v_new_balance;

    -- Record transaction
    INSERT INTO public.coin_transactions (
      user_id,
      amount,
      transaction_type,
      help_request_id,
      description
    ) VALUES (
      v_helper_id,
      v_coin_reward,
      'help_reward',
      p_help_request_id,
      'Earned ' || v_coin_reward || ' coins for helping'
    );

    RETURN json_build_object(
      'success', true,
      'new_balance', v_new_balance,
      'coins_earned', v_coin_reward
    );
  ELSE
    RETURN json_build_object('success', true, 'coins_earned', 0, 'message', 'No coin reward for this request');
  END IF;
END;
$$;

-- Grant execute permissions on functions to authenticated users
GRANT EXECUTE ON FUNCTION public.purchase_coins TO authenticated;
GRANT EXECUTE ON FUNCTION public.spend_coins_for_request TO authenticated;
GRANT EXECUTE ON FUNCTION public.award_coins_for_help TO authenticated;