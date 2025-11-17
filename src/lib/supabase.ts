import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserPlan = 'free' | 'basic' | 'pro' | 'premium';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  plan: UserPlan;
  essays_count: number;
  essays_limit: number;
  created_at: string;
}

// Limites por plano
export const PLAN_LIMITS = {
  free: {
    essays_per_month: 1,
    ai_generation: false,
    camera_transcription: false,
    video_lessons: false,
    repertoire_access: false,
    detailed_feedback: false
  },
  basic: {
    essays_per_month: 10,
    ai_generation: true,
    camera_transcription: true,
    video_lessons: true,
    repertoire_access: false,
    detailed_feedback: true
  },
  pro: {
    essays_per_month: 50,
    ai_generation: true,
    camera_transcription: true,
    video_lessons: true,
    repertoire_access: true,
    detailed_feedback: true
  },
  premium: {
    essays_per_month: -1, // ilimitado
    ai_generation: true,
    camera_transcription: true,
    video_lessons: true,
    repertoire_access: true,
    detailed_feedback: true
  }
};

export const getPlanLimits = (plan: UserPlan) => {
  return PLAN_LIMITS[plan];
};
