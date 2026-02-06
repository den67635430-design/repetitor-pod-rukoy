import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ChatMessage } from '../types';

export interface ChatSession {
  id: string;
  subject: string;
  mode: string;
  title: string | null;
  created_at: string;
  updated_at: string;
}

export function useChatHistory(userId: string | undefined) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchSessions = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const { data } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .limit(50);
    setSessions((data as ChatSession[]) || []);
    setLoading(false);
  }, [userId]);

  const searchSessions = useCallback(async (query: string) => {
    if (!userId || !query.trim()) {
      await fetchSessions();
      return;
    }
    setLoading(true);
    // Search in messages text
    const { data: messageResults } = await supabase
      .from('chat_messages')
      .select('session_id')
      .textSearch('text', query, { type: 'websearch', config: 'russian' });

    if (messageResults && messageResults.length > 0) {
      const sessionIds = [...new Set(messageResults.map((m: any) => m.session_id))];
      const { data } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('user_id', userId)
        .in('id', sessionIds)
        .order('updated_at', { ascending: false });
      setSessions((data as ChatSession[]) || []);
    } else {
      setSessions([]);
    }
    setLoading(false);
  }, [userId, fetchSessions]);

  const createSession = useCallback(async (subject: string, mode: string): Promise<string | null> => {
    if (!userId) return null;
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({ user_id: userId, subject, mode, title: subject })
      .select('id')
      .maybeSingle();
    if (error || !data) return null;
    return data.id;
  }, [userId]);

  const saveMessage = useCallback(async (sessionId: string, message: ChatMessage, imageUrl?: string) => {
    await supabase
      .from('chat_messages')
      .insert({
        session_id: sessionId,
        role: message.role,
        text: message.text,
        has_image: !!imageUrl,
        image_url: imageUrl || null,
      });
  }, []);

  const loadSessionMessages = useCallback(async (sessionId: string): Promise<ChatMessage[]> => {
    const { data } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });
    
    if (!data) return [];
    return data.map((m: any) => ({
      role: m.role as 'user' | 'model',
      text: m.text,
      timestamp: m.created_at,
      imageUrl: m.image_url,
    }));
  }, []);

  return {
    sessions,
    loading,
    searchQuery,
    setSearchQuery,
    fetchSessions,
    searchSessions,
    createSession,
    saveMessage,
    loadSessionMessages,
  };
}
