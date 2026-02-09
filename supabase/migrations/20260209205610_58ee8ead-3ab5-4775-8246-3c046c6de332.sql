
-- Fix 1: Create a secure view for non-admin users to read safe settings (excludes updated_by)
CREATE OR REPLACE VIEW public.safe_app_settings AS
SELECT id, key, value, updated_at
FROM public.app_settings
WHERE key = 'test_mode';

-- Grant access to the view
GRANT SELECT ON public.safe_app_settings TO anon, authenticated;

-- Drop the old permissive policy that exposes updated_by
DROP POLICY IF EXISTS "Users can read safe settings" ON public.app_settings;

-- Fix 2: Explicitly deny anonymous users from all operations on payments
CREATE POLICY "Deny anon insert on payments"
ON public.payments
FOR INSERT
TO anon
WITH CHECK (false);

CREATE POLICY "Deny anon select on payments"
ON public.payments
FOR SELECT
TO anon
USING (false);

CREATE POLICY "Deny anon update on payments"
ON public.payments
FOR UPDATE
TO anon
USING (false);

CREATE POLICY "Deny anon delete on payments"
ON public.payments
FOR DELETE
TO anon
USING (false);

-- Also deny anon on subscriptions for consistency
CREATE POLICY "Deny anon insert on subscriptions"
ON public.subscriptions
FOR INSERT
TO anon
WITH CHECK (false);

CREATE POLICY "Deny anon select on subscriptions"
ON public.subscriptions
FOR SELECT
TO anon
USING (false);

CREATE POLICY "Deny anon update on subscriptions"
ON public.subscriptions
FOR UPDATE
TO anon
USING (false);

CREATE POLICY "Deny anon delete on subscriptions"
ON public.subscriptions
FOR DELETE
TO anon
USING (false);
