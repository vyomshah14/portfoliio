import React, { useState, useEffect } from 'react';
import { playCyberClick, playCyberSpin } from '../../utils/cyberSound.js';

export default function CyberHackChallenge({ isOpen, onClose }) {
  const [stage, setStage] = useState(1);
  const [cipherInput, setCipherInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  // Stage 1 Cipher Challenge: Base64 "c2VjdXJpdHk=" -> "security"
  const handleStage1 = (e) => {
    e.preventDefault();
    if (cipherInput.trim().toLowerCase() === 'security') {
      playCyberClick();
      setFeedback('✓ STAGE 1 PASSED: Base64 Decrypted Successfully!');
      setTimeout(() => {
        setStage(2);
        setFeedback('');
        setCipherInput('');
      }, 1000);
    } else {
      setFeedback('❌ ACCESS DENIED: Invalid Decrypted Payload. Try decoding Base64 "c2VjdXJpdHk="');
    }
  };

  // Stage 2 Flag Challenge: "FLAG{VYOM_CYBER_OPERATOR_2026}"
  const handleStage2 = (e) => {
    e.preventDefault();
    if (cipherInput.trim().toUpperCase().includes('VYOM')) {
      playCyberSpin();
      setIsCompleted(true);
      setFeedback('🎉 OVERRIDE SUCCESSFUL! LEVEL 5 CLEARANCE GRANTED!');
    } else {
      setFeedback('❌ FLAG INVALID: Include Operator identity "VYOM"');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(2, 6, 16, 0.92)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-24)',
      }}
    >
      <div
        style={{
          background: 'rgba(10, 15, 30, 0.95)',
          border: '1px solid #00FFA3',
          borderRadius: '12px',
          maxWidth: '560px',
          width: '100%',
          padding: 'var(--space-32)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(0, 255, 163, 0.4)',
          position: 'relative',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'var(--text-muted)',
            borderRadius: '4px',
            padding: '4px 10px',
            cursor: 'pointer',
            fontSize: '0.8rem',
          }}
        >
          [ ✕ CLOSE ]
        </button>

        {/* Title Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-16)' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#00FFA3', boxShadow: '0 0 12px #00FFA3' }}></div>
          <h3 style={{ fontSize: '1.4rem', color: '#FFF', margin: 0, letterSpacing: '0.05em' }}>
            CYBER_CTF_CHALLENGE // STAGE 0{stage}
          </h3>
        </div>

        {isCompleted ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-24) 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: 'var(--space-12)' }}>🏆</div>
            <h4 style={{ fontSize: '1.5rem', color: '#00FFA3', marginBottom: 'var(--space-12)' }}>
              SYSTEM OVERRIDE COMPLETE
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: 'var(--space-24)', lineHeight: 1.6 }}>
              You have successfully bypassed CTF firewall challenges and demonstrated technical proficiency! Clearance level upgraded to <strong>LEVEL 5 OPERATOR</strong>.
            </p>
            <div style={{ background: 'rgba(0, 255, 163, 0.1)', border: '1px solid #00FFA3', padding: '14px', borderRadius: '6px', color: '#00FFA3', fontSize: '0.85rem', marginBottom: 'var(--space-24)' }}>
              FLAG: FLAG&#123;VYOM_CYBER_OPERATOR_2026_MASTER&#125;
            </div>
            <button
              onClick={onClose}
              style={{
                background: '#00FFA3',
                color: '#000',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
              }}
            >
              [ ACCESS GRANTED - CLOSE ]
            </button>
          </div>
        ) : (
          <div>
            {stage === 1 && (
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--space-16)', lineHeight: 1.6 }}>
                  <strong>TASK 1:</strong> Decode the Base64 ciphertext below to reveal the secret word.
                </p>

                <div style={{ background: 'rgba(0,0,0,0.6)', border: '1px dashed var(--accent-primary)', padding: '16px', borderRadius: '6px', color: 'var(--accent-primary)', fontSize: '1.1rem', textAlign: 'center', marginBottom: 'var(--space-20)' }}>
                  c2VjdXJpdHk=
                </div>

                <form onSubmit={handleStage1} style={{ display: 'flex', gap: '12px' }}>
                  <input
                    type="text"
                    value={cipherInput}
                    onChange={(e) => setCipherInput(e.target.value)}
                    placeholder="Enter decoded plaintext..."
                    style={{
                      flexGrow: 1,
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid rgba(0, 229, 255, 0.3)',
                      padding: '12px',
                      color: '#FFF',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-mono)',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: 'rgba(0, 229, 255, 0.2)',
                      border: '1px solid var(--accent-primary)',
                      color: 'var(--accent-primary)',
                      padding: '12px 20px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    [ DECRYPT ]
                  </button>
                </form>
              </div>
            )}

            {stage === 2 && (
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--space-16)', lineHeight: 1.6 }}>
                  <strong>TASK 2:</strong> Enter the Operator Flag format string containing Vyom's handle (e.g. <code>FLAG&#123;VYOM_2026&#125;</code>).
                </p>

                <form onSubmit={handleStage2} style={{ display: 'flex', gap: '12px' }}>
                  <input
                    type="text"
                    value={cipherInput}
                    onChange={(e) => setCipherInput(e.target.value)}
                    placeholder="FLAG{VYOM_...}"
                    style={{
                      flexGrow: 1,
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid rgba(0, 255, 163, 0.3)',
                      padding: '12px',
                      color: '#FFF',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-mono)',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: 'rgba(0, 255, 163, 0.2)',
                      border: '1px solid #00FFA3',
                      color: '#00FFA3',
                      padding: '12px 20px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    [ SUBMIT FLAG ]
                  </button>
                </form>
              </div>
            )}

            {feedback && (
              <div style={{ marginTop: 'var(--space-16)', fontSize: '0.85rem', color: feedback.startsWith('✓') || feedback.startsWith('🎉') ? '#00FFA3' : 'var(--danger)' }}>
                {feedback}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
