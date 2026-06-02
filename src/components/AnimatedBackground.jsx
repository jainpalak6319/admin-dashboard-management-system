import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isMobile = false;

    // Base ribbon configuration (with baseline desktop amplitude)
    const baseWaves = [
      { y: 0.3, length: 0.002, amplitude: 90, speed: 0.005, color: 'rgba(243, 236, 218, 0.45)' }, // Champagne
      { y: 0.4, length: 0.002, amplitude: 90, speed: 0.005, color: 'rgba(221, 214, 203, 0.55)' }, // Taupe
      { y: 0.5, length: 0.002, amplitude: 90, speed: 0.005, color: 'rgba(208, 184, 150, 0.35)' }, // Caramel
      { y: 0.6, length: 0.002, amplitude: 90, speed: 0.005, color: 'rgba(250, 245, 232, 0.50)' }  // Ivory
    ];

    // Responsive adaptation & Sharp Retina display handling
    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      // Check if it's a mobile viewport size
      isMobile = width < 768;

      // Set display size (css pixels)
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Set actual drawing buffer size (physical pixels for sharpness)
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      // Scale the context so everything draws at the right scale naturally
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let increment = 0;

    // Animation Loop
    const animate = () => {
      // Get logical dimensions for drawing logic
      const logicalWidth = canvas.width / (window.devicePixelRatio || 1);
      const logicalHeight = canvas.height / (window.devicePixelRatio || 1);

      // Clear with elegant gradient background
      const baseGrad = ctx.createLinearGradient(0, 0, logicalWidth, logicalHeight);
      baseGrad.addColorStop(0, '#f9f8f6');
      baseGrad.addColorStop(0.5, '#f3f1ec');
      baseGrad.addColorStop(1, '#eae6df');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, logicalWidth, logicalHeight);

      // Scale dynamic elements based on screen width
      // Mobile gets a tighter amplitude so the ribbons don't fly off-screen
      const ampScale = isMobile ? 0.45 : 1; 
      const step = isMobile ? 3 : 1; // Performance trick: skips pixels on mobile loops without loss in quality

      // Draw each animated ribbon wave
      baseWaves.forEach(wave => {
        const currentAmplitude = wave.amplitude * ampScale;

        ctx.beginPath();
        ctx.moveTo(0, logicalHeight * wave.y);

        // Draw horizontal wave pattern with dynamic pixel step
        for (let i = 0; i < logicalWidth; i += step) {
          const tilt = (i * 0.05); // Elegant diagonal tilt flow
          ctx.lineTo(
            i, 
            (logicalHeight * wave.y) + 
            Math.sin(i * wave.length + increment * (wave.speed * 10)) * currentAmplitude + 
            tilt
          );
        }

        // Setup soft, glowing ribbon stroke lines
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = isMobile ? 7 : 12; // Slimmer ribbons on smaller screens
        ctx.shadowBlur = isMobile ? 20 : 40; // Scale glow intensity for mobile
        ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
        ctx.stroke();
      });

      increment += 0.1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default AnimatedBackground;