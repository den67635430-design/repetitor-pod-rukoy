-- Add voice_preference column to profiles
ALTER TABLE public.profiles ADD COLUMN voice_preference text NOT NULL DEFAULT 'female';
