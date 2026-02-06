import React from 'react';
import { ChatSession } from '../../hooks/useChatHistory';

interface Props {
  sessions: ChatSession[];
  loading: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearch: (q: string) => void;
  onSelectSession: (session: ChatSession) => void;
  onNewChat: () => void;
  onBack: () => void;
}

const ChatHistory: React.FC<Props> = ({
  sessions, loading, searchQuery, onSearchChange, onSearch,
  onSelectSession, onNewChat, onBack,
}) => (
  <div className="flex flex-col h-full bg-slate-50">
    <div className="bg-white border-b p-4 flex items-center gap-3 shadow-sm">
      <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-lg">
        <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h3 className="font-bold text-slate-900">История чатов</h3>
    </div>

    <div className="p-4 space-y-3">
      {/* Search bar */}
      <div className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch(searchQuery)}
          placeholder="Поиск по истории..."
          className="flex-1 bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => onSearch(searchQuery)}
          className="px-4 py-3 bg-blue-600 text-white rounded-2xl font-medium text-sm"
        >
          🔍
        </button>
      </div>

      {/* New chat button */}
      <button
        onClick={onNewChat}
        className="w-full bg-blue-600 text-white py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
        Новый чат
      </button>
    </div>

    {/* Sessions list */}
    <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
      {loading && <p className="text-center text-slate-400 text-sm py-4">Загрузка...</p>}
      
      {!loading && sessions.length === 0 && (
        <p className="text-center text-slate-400 text-sm py-8">
          {searchQuery ? 'Ничего не найдено' : 'Нет сохранённых чатов'}
        </p>
      )}

      {sessions.map(session => (
        <button
          key={session.id}
          onClick={() => onSelectSession(session)}
          className="w-full bg-white p-4 rounded-2xl border border-slate-100 text-left hover:border-blue-200 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-800 text-sm truncate">{session.title || session.subject}</p>
              <p className="text-xs text-slate-400 mt-1">
                {new Date(session.updated_at).toLocaleDateString('ru-RU', {
                  day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                })}
              </p>
            </div>
            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded font-medium">{session.subject}</span>
          </div>
        </button>
      ))}
    </div>
  </div>
);

export default ChatHistory;
