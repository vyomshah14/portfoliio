import React, { useState, useEffect } from 'react';

export function TypewriterText({ 
  text, 
  delay = 0, 
  speed = 50, 
  cursor = true,
  onComplete,
  className,
  style
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    let timeoutId;
    let typeIntervalId;

    timeoutId = setTimeout(() => {
      setIsTyping(true);
      let i = 0;
      typeIntervalId = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typeIntervalId);
          setIsTyping(false);
          setIsComplete(true);
          if (onComplete) onComplete();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(typeIntervalId);
    };
  }, [text, delay, speed]);

  return (
    <span className={className} style={style}>
      {displayedText}
      {cursor && (!isComplete || isTyping) && (
        <span style={{ 
          animation: 'blink 1s step-end infinite', 
          opacity: 1, 
          display: 'inline-block', 
          width: '8px', 
          background: 'currentColor', 
          marginLeft: '4px' 
        }}>
          &nbsp;
        </span>
      )}
    </span>
  );
}
