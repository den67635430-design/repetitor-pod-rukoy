import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

const MAX_DEVICES = 2;

function getDeviceFingerprint(): string {
  const nav = navigator;
  const components = [
    nav.userAgent,
    nav.language,
    screen.width + 'x' + screen.height,
    screen.colorDepth,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  ];
  // Simple hash
  let hash = 0;
  const str = components.join('|');
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

function getDeviceName(): string {
  const ua = navigator.userAgent;
  if (/iPhone/i.test(ua)) return 'iPhone';
  if (/iPad/i.test(ua)) return 'iPad';
  if (/Android/i.test(ua)) return 'Android';
  if (/Windows/i.test(ua)) return 'Windows PC';
  if (/Mac/i.test(ua)) return 'Mac';
  if (/Linux/i.test(ua)) return 'Linux';
  return 'Unknown Device';
}

export function useDeviceLimit() {
  const checkAndRegisterDevice = useCallback(async (userId: string): Promise<{ allowed: boolean; message?: string }> => {
    const fingerprint = getDeviceFingerprint();
    const deviceName = getDeviceName();

    // Check if this device is already registered
    const { data: existing } = await supabase
      .from('device_sessions')
      .select('id')
      .eq('user_id', userId)
      .eq('device_fingerprint', fingerprint)
      .maybeSingle();

    if (existing) {
      // Update last active
      await supabase
        .from('device_sessions')
        .update({ last_active_at: new Date().toISOString() })
        .eq('id', existing.id);
      return { allowed: true };
    }

    // Check how many devices are registered
    const { data: devices } = await supabase
      .from('device_sessions')
      .select('id, device_name, last_active_at')
      .eq('user_id', userId)
      .order('last_active_at', { ascending: false });

    if (devices && devices.length >= MAX_DEVICES) {
      return {
        allowed: false,
        message: `Достигнут лимит устройств (${MAX_DEVICES}). Уже используются: ${devices.map((d: any) => d.device_name).join(', ')}. Удалите одно из устройств в профиле.`,
      };
    }

    // Register new device
    const { error } = await supabase
      .from('device_sessions')
      .insert({
        user_id: userId,
        device_fingerprint: fingerprint,
        device_name: deviceName,
      });

    if (error) {
      // Upsert conflict means device already registered
      if (error.code === '23505') return { allowed: true };
      return { allowed: false, message: 'Ошибка регистрации устройства.' };
    }

    return { allowed: true };
  }, []);

  const removeDevice = useCallback(async (deviceId: string) => {
    await supabase
      .from('device_sessions')
      .delete()
      .eq('id', deviceId);
  }, []);

  const getDevices = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from('device_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('last_active_at', { ascending: false });
    return data || [];
  }, []);

  return { checkAndRegisterDevice, removeDevice, getDevices };
}
