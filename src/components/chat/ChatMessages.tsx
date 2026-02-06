import React from 'react';
import { ChatMessage } from '../../types';

// Clean LaTeX, markdown artifacts and other formatting noise from AI responses
function cleanDisplayText(text: string): string {
  return text
    // Remove LaTeX display math: $$...$$
    .replace(/\$\$([\s\S]*?)\$\$/g, '$1')
    // Remove LaTeX inline math: $...$
    .replace(/\$([^$]+?)\$/g, '$1')
    // Remove \frac{a}{b} → a/b
    .replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, '$1/$2')
    // Remove \cdot → ·
    .replace(/\\cdot/g, '·')
    // Remove \times → ×
    .replace(/\\times/g, '×')
    // Remove \sqrt{x} → √x
    .replace(/\\sqrt\{([^}]*)\}/g, '√$1')
    // Remove \left and \right
    .replace(/\\left/g, '')
    .replace(/\\right/g, '')
    // Remove remaining backslash commands like \text{}, \mathrm{}, etc.
    .replace(/\\(?:text|mathrm|mathbf|mathit|textbf)\{([^}]*)\}/g, '$1')
    // Remove \pm → ±
    .replace(/\\pm/g, '±')
    // Remove \geq → ≥, \leq → ≤, \neq → ≠
    .replace(/\\geq/g, '≥')
    .replace(/\\leq/g, '≤')
    .replace(/\\neq/g, '≠')
    // Remove \infty → ∞
    .replace(/\\infty/g, '∞')
    // Remove \pi → π
    .replace(/\\pi/g, 'π')
    // Remove remaining single backslash before letters (e.g. \alpha → alpha)
    .replace(/\\([a-zA-Z]+)/g, '$1')
    // Remove ** bold markers
    .replace(/\*\*(.*?)\*\*/g, '$1')
    // Remove * italic markers  
    .replace(/\*(.*?)\*/g, '$1')
    // Remove stray $ signs
    .replace(/\$/g, '')
    // Clean up extra whitespace
    .replace(/  +/g, ' ')
    .trim();
}

interface Props {
  messages: ChatMessage[];
  isTyping: boolean;
  error: string | null;
  isPreschool: boolean;
  onSpeakMessage: (text: string) => void;
}

const ChatMessages: React.FC<Props> = ({ messages, isTyping, error, isPreschool, onSpeakMessage }) => (
  <>
    {messages.map((m, i) => (
      <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in`}>
        <div className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm ${
          m.role === 'user'
            ? 'bg-blue-600 text-white rounded-tr-none'
            : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{m.role === 'model' ? cleanDisplayText(m.text) : m.text}</p>
          <div className="flex items-center justify-between mt-1 gap-2">
            <span className="text-[10px] opacity-50">
              {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            {/* Speaker button for AI messages */}
            {m.role === 'model' && m.text && (
              <button
                onClick={() => onSpeakMessage(m.text)}
                className={`p-1 rounded-full transition-colors ${
                  m.role === 'model' ? 'text-slate-400 hover:text-blue-600' : 'text-white/50 hover:text-white'
                }`}
                title="Озвучить"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.788v6.424a.5.5 0 00.757.429l4.964-3.212a.5.5 0 000-.858L7.257 8.36a.5.5 0 00-.757.429z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    ))}

    {isTyping && messages[messages.length - 1]?.text === '' && (
      <div className="flex justify-start animate-pulse">
        <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          </div>
        </div>
      </div>
    )}

    {error && (
      <div className="flex justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-xl text-sm">
          {error}
        </div>
      </div>
    )}
  </>
);

export default ChatMessages;
