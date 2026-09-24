import React, { useEffect, useRef } from 'react';

export default function HyperspaceStarfield({
  starCount = 400,
  speed = 8,
  colors = ['#00E5FF', '#00FFA3', '#BD00FF', '#FFFFFF']
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, boost: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX - width / 2) * 0.15;
      mouseRef.current.targetY = (e.clientY - height / 2) * 0.15;
    };

    const handleMouseDown = () => {
      mouseRef.current.boost = 2.2;
    };

    const handleMouseUp = () => {
      mouseRef.current.boost = 1;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Initialize 3D Stars in Hyperspace
    const maxDepth = 1500;
    const stars = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * width * 2.5,
      y: (Math.random() - 0.5) * height * 2.5,
      z: Math.random() * maxDepth + 1,
      size: Math.random() * 1.8 + 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const render = () => {
      // Smooth mouse tilt lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Dark space background with radial gradient glow
      const bgGradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) * 0.85
      );
      bgGradient.addColorStop(0, '#091e3d');
      bgGradient.addColorStop(0.5, '#040d1f');
      bgGradient.addColorStop(1, '#01040a');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      const fov = 350;
      const cx = width / 2 + mouseRef.current.x;
      const cy = height / 2 + mouseRef.current.y;
      const currentSpeed = speed * mouseRef.current.boost;

      stars.forEach(star => {
        // Move star closer in Z space
        const prevZ = star.z;
        star.z -= currentSpeed;

        // Reset star if it passes camera
        if (star.z <= 0) {
          star.z = maxDepth;
          star.x = (Math.random() - 0.5) * width * 2.5;
          star.y = (Math.random() - 0.5) * height * 2.5;
        }

        // Project current 3D position to 2D screen
        const k = fov / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        // Project previous 3D position for motion streak trail
        const prevK = fov / prevZ;
        const prevPx = star.x * prevK + cx;
        const prevPy = star.y * prevK + cy;

        // Render light streak if within screen bounds
        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const alpha = Math.min(1, (1 - star.z / maxDepth) * 1.4);

          // Draw hyperspace streak line
          ctx.beginPath();
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = star.color;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = Math.max(0.5, star.size * k * 0.06);
          ctx.shadowBlur = 8;
          ctx.shadowColor = star.color;
          ctx.stroke();

          // Draw head dot
          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.8, star.size * (1 - star.z / maxDepth)), 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animId);
    };
  }, [starCount, speed, colors]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      {/* Subtle Scanlines overlay for tech feel */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 3px)',
          pointerEvents: 'none',
          opacity: 0.6,
        }}
      />
    </div>
  );
}
