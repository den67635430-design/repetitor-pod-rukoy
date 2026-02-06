
-- Fix 1: Explicit DENY policies on user_roles for INSERT, UPDATE, DELETE
-- This makes the implicit deny explicit and documents the security intent.
-- Only service_role (admin backend) can manage roles.

CREATE POLICY "Role modifications denied for users"
  ON public.user_roles FOR INSERT
  WITH CHECK (false);

CREATE POLICY "Role updates denied for users"
  ON public.user_roles FOR UPDATE
  USING (false);

CREATE POLICY "Role deletions denied for users"
  ON public.user_roles FOR DELETE
  USING (false);

-- Fix 2: Restrict app_settings reads to known safe keys
-- Drop the overly broad SELECT policy and replace with key-based filtering

DROP POLICY "Authenticated users can read settings" ON public.app_settings;

CREATE POLICY "Users can read safe settings"
  ON public.app_settings FOR SELECT
  USING (key IN ('test_mode'));

CREATE POLICY "Admins can read all settings"
  ON public.app_settings FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));
