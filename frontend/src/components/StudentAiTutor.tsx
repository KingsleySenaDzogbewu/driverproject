// src/components/StudentAiTutor.tsx
import { useState, useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { answerTutorQuestion } from '../data/aiTutorData';

export default function StudentAiTutor() {
  const [chatMsgs, setChatMsgs] = useState([
    { role: 'ai', text: "Hi! I'm your AI driving theory tutor. Ask me anything about road signs, traffic laws, driving safety, or vehicle controls." }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  const suggestions = [
    'What does a red triangle sign mean?',
    'Explain right of way at a roundabout',
    'What is the stopping distance at 60km/h?',
    'When should I use hazard lights?',
  ];

  // Automatically scroll down whenever message count changes or loading starts
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMsgs, chatLoading]);

  const handleSendChat = async (textToSend?: string) => {
    const input = textToSend || chatInput;
    if (!input.trim() || chatLoading) return;

    const userMsg = { role: 'user', text: input };
    const updatedHistory = [...chatMsgs, userMsg];
    
    // Instantly show user message and trigger loader
    setChatMsgs(updatedHistory);
    setChatInput('');
    setChatLoading(true);

    try {
        // In this prototype, the AI tutor is simulated locally using built-in driving theory knowledge.
      const reply = await new Promise<string>((resolve) => {
        window.setTimeout(() => resolve(answerTutorQuestion(input)), 300);
      });
      setChatMsgs(prev => [...prev, { role: 'ai', text: reply }]);
    } catch {
      setChatMsgs(prev => [...prev, { 
        role: 'ai', 
        text: 'Something went wrong while generating a response. Please try again.' 
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendChat();
    }
  };

  return (
    <div className="anim-fadeup" style={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column', padding: '24px' }}>
      <div className="ph" style={{ flexShrink: 0 }}>
        <div className="ph-title">AI Tutor ✧</div>
        <div className="ph-sub">A simulated tutor using built-in driving theory guidance. Ask about road signs, traffic laws, safety, or vehicle controls.</div>
      </div>

      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0, minHeight: 0 }}>
        <div 
          ref={chatBodyRef}
          style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          {chatMsgs.map((m, idx) => (
            <div key={idx} className={`chat-msg ${m.role}`} style={{ display: 'flex', gap: '10px', alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
              <div className="chat-avatar" style={{ background: m.role === 'ai' ? 'var(--navy)' : 'var(--blue)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px' }}>
                {m.role === 'ai' ? '✧' : '👤'}
              </div>
              <div className={`chat-bubble ${m.role}`} style={{ whiteSpace: 'pre-line', padding: '10px 14px', borderRadius: '8px', maxWidth: '70%', background: m.role === 'ai' ? 'var(--gray1)' : 'var(--bluebg)', fontSize: '13px', lineHeight: '1.5' }}>
                {m.text}
              </div>
            </div>
          ))}

          {chatLoading && (
            <div className="chat-msg ai" style={{ display: 'flex', gap: '10px' }}>
              <div className="chat-avatar" style={{ background: 'var(--navy)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px' }}>✧</div>
              <div className="chat-bubble ai" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '12px 18px', borderRadius: '8px', background: 'var(--gray1)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#888', animation: 'bounce 1.4s infinite alternate' }}></div>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#888', animation: 'bounce 1.4s infinite alternate', animationDelay: '0.15s' }}></div>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#888', animation: 'bounce 1.4s infinite alternate', animationDelay: '0.3s' }}></div>
              </div>
            </div>
          )}
        </div>

        {chatMsgs.length === 1 && (
          <div style={{ padding: '0 16px 12px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text3)', fontWeight: '600', letterSpacing: '.6px', textTransform: 'uppercase', marginBottom: '8px' }}>Suggested questions</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {suggestions.map((s, idx) => (
                <button key={idx} className="btn btn-secondary btn-sm" onClick={() => handleSendChat(s)} style={{ fontSize: '12px' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ padding: '14px 16px', borderTop: '1px solid var(--gray3)', display: 'flex', gap: '10px', flexShrink: 0 }}>
          <input 
            className="input" 
            style={{ flex: 1 }} 
            placeholder="Ask a driving theory question…"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button 
            className="btn btn-primary" 
            onClick={() => handleSendChat()} 
            disabled={chatLoading || !chatInput.trim()}
          >
            {chatLoading ? <div className="spinner"></div> : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}
