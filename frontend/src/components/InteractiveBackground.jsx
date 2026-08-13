import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates (default to center)
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      // Update CSS variables for GPU-accelerated spotlight gradient
      if (container) {
        container.style.setProperty("--mouse-x", `${e.clientX}px`);
        container.style.setProperty("--mouse-y", `${e.clientY}px`);
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Lightweight particles count
    const particleCount = Math.min(30, Math.floor(width / 45));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 1.8 + 1,
    }));

    const maxDistSq = 120 * 120;
    const mouseRadiusSq = 160 * 160;

    const render = () => {
      // Smooth lerp for mouse spotlight
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw all particles in a SINGLE batched path
      ctx.beginPath();
      ctx.fillStyle = "rgba(14, 165, 233, 0.35)";

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Repel slightly from cursor using squared distance (0 Math.sqrt)
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dSq = dx * dx + dy * dy;

        if (dSq < mouseRadiusSq && dSq > 0) {
          const force = (mouseRadiusSq - dSq) / mouseRadiusSq;
          p.x -= (dx / Math.sqrt(dSq)) * force * 2;
          p.y -= (dy / Math.sqrt(dSq)) * force * 2;
        }

        ctx.moveTo(p.x + p.radius, p.y);
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      }
      ctx.fill();

      // 2. Draw all connecting lines in a SINGLE batched path
      ctx.beginPath();
      ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
      ctx.lineWidth = 0.75;

      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dSq = dx * dx + dy * dy;

          if (dSq < maxDistSq) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        "--mouse-x": "50vw",
        "--mouse-y": "50vh",
      }}
    >
      {/* GPU-Accelerated Cursor Spotlight */}
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(450px circle at var(--mouse-x) var(--mouse-y), rgba(56, 189, 248, 0.12), rgba(59, 130, 246, 0.04) 50%, transparent 80%)`,
        }}
      />

      {/* Lightweight Canvas Mesh */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Ambient Backdrop Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] bg-sky-200/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-200/20 rounded-full blur-[150px] pointer-events-none" />
    </div>
  );
}
