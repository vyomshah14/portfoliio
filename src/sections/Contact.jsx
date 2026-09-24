import React, { useState, useRef, useEffect } from 'react';
import { animate } from 'animejs';
import SectionHeader from '../components/cyber/SectionHeader.jsx';
import CyberButton from '../components/cyber/CyberButton.jsx';
import SystemLabel from '../components/cyber/SystemLabel.jsx';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  // Copy Email to Clipboard
  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('vyomshah2021@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Form Submit Handler (Web3Forms API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.target);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        formRef.current.reset();
      } else {
        alert('Transmission notice: ' + (data.message || 'Please send email directly to vyomshah2021@gmail.com'));
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      alert('Network error. Direct email link: vyomshah2021@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact" style={{ padding: 'var(--space-96) 0', position: 'relative', zIndex: 1 }}>
      <div className="container">
        <SectionHeader number="08" title="SECURE_CHANNEL" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-48)', alignItems: 'start' }}>
          
          {/* Left Column: System Connection Info */}
          <div className="contact-info">
            <div style={{
              background: 'rgba(10, 15, 30, 0.78)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(0, 229, 255, 0.2)',
              borderRadius: '12px',
              padding: 'var(--space-32)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
              marginBottom: 'var(--space-32)'
            }}>
              <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: 'var(--space-16)', fontWeight: 600 }}>
                System Connection
              </h3>

              {/* Status Pill */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-24)', padding: '8px 16px', background: 'rgba(0, 255, 163, 0.1)', border: '1px solid #00FFA3', borderRadius: '20px', width: 'fit-content' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00FFA3', boxShadow: '0 0 12px #00FFA3' }}></div>
                <span style={{ color: '#00FFA3', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', letterSpacing: '0.05em' }}>
                  STATUS: ENCRYPTED // LINK ACTIVE
                </span>
              </div>

              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-32)', lineHeight: 1.65, fontSize: '0.96rem' }}>
                Open for high-impact cybersecurity, backend systems programming, and full-stack engineering collaborations. Transmit direct signals below.
              </p>

              {/* Email Protocol */}
              <div style={{ marginBottom: 'var(--space-32)', padding: 'var(--space-20)', background: 'rgba(0, 229, 255, 0.05)', border: '1px border var(--accent-primary)', borderRadius: '8px' }}>
                <SystemLabel text="PRIMARY_EMAIL_PROTOCOL" style={{ marginBottom: 'var(--space-8)' }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  <a href="mailto:vyomshah2021@gmail.com" style={{ color: 'var(--accent-primary)', fontSize: '1.15rem', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>
                    vyomshah2021@gmail.com
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    style={{
                      background: copied ? 'rgba(0, 255, 163, 0.2)' : 'rgba(0, 229, 255, 0.15)',
                      border: `1px solid ${copied ? '#00FFA3' : 'var(--accent-primary)'}`,
                      color: copied ? '#00FFA3' : 'var(--accent-primary)',
                      padding: '6px 14px',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {copied ? '✓ COPIED TO CLIPBOARD' : '[ COPY EMAIL ]'}
                  </button>
                </div>
              </div>

              {/* Network Links */}
              <div>
                <SystemLabel text="SECURE_NETWORK_LINKS" style={{ marginBottom: 'var(--space-16)' }} />
                <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
                  <CyberButton href="https://github.com/vyomshah14" target="_blank" rel="noopener noreferrer" variant="primary">
                    [ GITHUB ]
                  </CyberButton>
                  <CyberButton href="https://www.linkedin.com/in/vyom-shah-007632290/" target="_blank" rel="noopener noreferrer" variant="primary">
                    [ LINKEDIN ]
                  </CyberButton>
                  <CyberButton href="https://www.instagram.com/_vyom_shah" target="_blank" rel="noopener noreferrer" variant="secondary">
                    [ INSTAGRAM ]
                  </CyberButton>
                </div>
              </div>
            </div>

            {/* Quick Metadata Box */}
            <div style={{
              padding: 'var(--space-20)',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px dashed rgba(0, 229, 255, 0.2)',
              borderRadius: '8px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem'
            }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>LOCATION:</span>
                <p style={{ color: 'var(--text-primary)', marginTop: '4px' }}>Mumbai, India / Remote</p>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>TIMEZONE:</span>
                <p style={{ color: 'var(--text-primary)', marginTop: '4px' }}>IST (UTC+05:30)</p>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form">
            <div style={{
              background: 'rgba(10, 15, 30, 0.85)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(0, 229, 255, 0.3)',
              borderRadius: '12px',
              padding: 'var(--space-32)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-24)', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 'var(--space-16)' }}>
                <SystemLabel text="TRANSMISSION_TERMINAL" style={{ color: 'var(--accent-primary)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  PORT: 443 // TLS 1.3
                </span>
              </div>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: 'var(--space-48) var(--space-16)' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(0, 255, 163, 0.15)', border: '2px solid #00FFA3', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-24)', color: '#00FFA3', fontSize: '1.8rem', boxShadow: '0 0 25px #00FFA3' }}>
                    ✓
                  </div>
                  <h4 style={{ fontSize: '1.5rem', color: '#FFF', marginBottom: 'var(--space-12)' }}>
                    PAYLOAD TRANSMITTED SECURELY
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: 'var(--space-24)', lineHeight: 1.6 }}>
                    Thank you for reaching out. Your encrypted message has been received and logged. Vyom will get back to you shortly.
                  </p>
                  <CyberButton onClick={() => setSubmitted(false)} variant="primary">
                    [ TRANSMIT ANOTHER MESSAGE ]
                  </CyberButton>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-20)' }}>
                  <input type="hidden" name="access_key" value="0cd339e1-55c5-463d-83a0-21cc68a19813" />
                  <input type="hidden" name="from_name" value="Vyom Shah Cyber Portfolio" />
                  <input type="hidden" name="subject" value="New Secure Message from Portfolio Visitor" />
                  <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

                  <div>
                    <SystemLabel text="OPERATOR_NAME" style={{ marginBottom: 'var(--space-8)' }} />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Alex Mercer"
                      style={{
                        width: '100%',
                        background: 'rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(0, 229, 255, 0.25)',
                        padding: '14px 16px',
                        color: 'var(--text-primary)',
                        borderRadius: '6px',
                        outline: 'none',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.9rem',
                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--accent-primary)';
                        e.target.style.boxShadow = '0 0 12px rgba(0, 229, 255, 0.3)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(0, 229, 255, 0.25)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div>
                    <SystemLabel text="RETURN_ADDRESS (EMAIL)" style={{ marginBottom: 'var(--space-8)' }} />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. alex@cybersec.io"
                      style={{
                        width: '100%',
                        background: 'rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(0, 229, 255, 0.25)',
                        padding: '14px 16px',
                        color: 'var(--text-primary)',
                        borderRadius: '6px',
                        outline: 'none',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.9rem',
                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--accent-primary)';
                        e.target.style.boxShadow = '0 0 12px rgba(0, 229, 255, 0.3)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(0, 229, 255, 0.25)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div>
                    <SystemLabel text="ENCRYPTED_PAYLOAD (MESSAGE)" style={{ marginBottom: 'var(--space-8)' }} />
                    <textarea
                      name="message"
                      rows="5"
                      required
                      placeholder="Enter details of your project, opportunity, or inquiry..."
                      style={{
                        width: '100%',
                        background: 'rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(0, 229, 255, 0.25)',
                        padding: '14px 16px',
                        color: 'var(--text-primary)',
                        borderRadius: '6px',
                        outline: 'none',
                        resize: 'vertical',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.9rem',
                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--accent-primary)';
                        e.target.style.boxShadow = '0 0 12px rgba(0, 229, 255, 0.3)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(0, 229, 255, 0.25)';
                        e.target.style.boxShadow = 'none';
                      }}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cyber-btn cyber-btn-primary"
                    style={{
                      width: '100%',
                      padding: '16px',
                      fontSize: '0.95rem',
                      letterSpacing: '0.1em',
                      marginTop: 'var(--space-8)',
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isSubmitting ? '[ TRANSMITTING DATA... ]' : '[ TRANSMIT_SECURE_MESSAGE ]'}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
