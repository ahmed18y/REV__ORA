import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import * as THREE from 'three';

function ThreeBackground({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    camera.position.z = 5;

    // Create floating geometric parts (representing car components)
    const objects = [];

    // Gear-like torus shapes
    for (let i = 0; i < 6; i++) {
      const geo = new THREE.TorusGeometry(0.3 + Math.random() * 0.4, 0.08, 8, 20);
      const mat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xe61a1a : 0x888888,
        wireframe: true,
        transparent: true,
        opacity: 0.15 + Math.random() * 0.15,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 4 - 2);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      scene.add(mesh);
      objects.push({ mesh, speed: 0.003 + Math.random() * 0.005, axis: Math.random() > 0.5 ? 'x' : 'y' });
    }

    // Sphere particles (bolts/nuts)
    const particleGeo = new THREE.BufferGeometry();
    const count = 80;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xe61a1a, size: 0.04, transparent: true, opacity: 0.4 });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Icosahedron (engine block)
    const icoGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const icoMat = new THREE.MeshBasicMaterial({ color: 0xe61a1a, wireframe: true, transparent: true, opacity: 0.06 });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(3, -1, -3);
    scene.add(ico);

    // Lines (speed streaks)
    for (let i = 0; i < 12; i++) {
      const points = [
        new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, -3),
        new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, -3),
      ];
      points[1].x = points[0].x + (Math.random() - 0.5) * 3;
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({ color: 0xe61a1a, transparent: true, opacity: 0.08 });
      scene.add(new THREE.Line(lineGeo, lineMat));
    }

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      objects.forEach(({ mesh, speed, axis }) => {
        if (axis === 'x') mesh.rotation.x += speed;
        else mesh.rotation.y += speed;
      });
      particles.rotation.y += 0.001;
      ico.rotation.x += 0.002;
      ico.rotation.y += 0.003;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!canvas) return;
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [canvasRef]);

  return null;
}

export default function HeroSection() {
  const canvasRef = useRef(null);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
      <ThreeBackground canvasRef={canvasRef} />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900/95 via-dark-900/85 to-red-950/70" style={{ zIndex: 1 }} />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #e61a1a 0%, transparent 70%)', zIndex: 1 }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)', backgroundSize: '50px 50px', zIndex: 2 }} />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-28 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white/80 text-sm px-4 py-2 rounded-full mb-6"
          >
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            قطع غيار أوروبية أصلية وعالية الجودة
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            <span className="text-white">REV</span>
            <span className="text-red-500">_</span>
            <span className="text-white">ORA</span>
            <br />
            <span className="text-3xl md:text-4xl text-white/70 font-light tracking-widest" style={{ fontFamily: 'Cairo, sans-serif' }}>
              قطع غيار السيارات
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
          >
            متخصصون في قطع غيار{' '}
            <span className="text-red-400 font-semibold">Volkswagen · SEAT · Skoda · Audi</span>
            {' '}بجودة مضمونة وأسعار منافسة.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/shop"
              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-red-900/30 glow-red"
            >
              تسوق الآن
              <ArrowLeft size={18} />
            </Link>
            <Link to="/brands"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              استعرض الماركات
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-0.5 h-10 bg-gradient-to-b from-white/40 to-transparent rounded-full" />
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
