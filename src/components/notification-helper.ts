import { supabase } from '@/integrations/supabase/client';

interface NotificationParams {
  userId: string;
  title: string;
  message: string;
  type: 'help_request' | 'message' | 'coin_reward' | 'system';
  link?: string;
}

export const createNotification = async (params: NotificationParams) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: params.userId,
        title: params.title,
        message: params.message,
        type: params.type,
        link: params.link
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};
