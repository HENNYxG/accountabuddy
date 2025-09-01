import { createClient } from '@supabase/supabase-js';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

export type HabitRecord = {
  id: string;
  user_id: string;
  name: string;
  icon?: string;
  frequency: any[];
  is_notification_on: boolean;
  notification_time?: string;
};

export async function fetchHabits() {
  const { data, error } = await supabase.from('habits').select('*').order('created_at', { ascending: true });
  if (error) throw error;
  return data as HabitRecord[];
}

export async function createHabit(input: {
  name: string;
  icon?: string;
  frequency: any[];
  is_notification_on?: boolean;
  notification_time?: string;
}) {
  const { data: sessionData } = await supabase.auth.getUser();
  const userId = sessionData.user?.id as string;
  const { data, error } = await supabase.from('habits').insert([{ ...input, user_id: userId }]).select('*').single();
  if (error) throw error;
  return data as HabitRecord;
}

export async function recordHabitEvent(input: {
  habit_id: string;
  value?: number;
  mood?: 'happy' | 'neutral' | 'sad';
  requires_approval?: boolean;
}) {
  const { data: sessionData } = await supabase.auth.getUser();
  const userId = sessionData.user?.id as string;
  const { data, error } = await supabase.from('habit_events').insert([{ ...input, user_id: userId }]).select('*').single();
  if (error) throw error;
  return data;
}

