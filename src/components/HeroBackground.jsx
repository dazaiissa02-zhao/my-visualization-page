import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

// 3D 粒子组件：负责星球表面的“灵动感”
function StarParticles(props) {
  const ref = useRef();
  // 生成 5000 个分布在球体表面的点
  // Fix NaN error: Ensure random generation is safe or use fallback
  const [sphere] = useState(() => {
    // Generate manually to ensure no NaNs
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = 1.5 * Math.cbrt(Math.random()); // Random radius for volume, or fixed for surface
        
        // Use surface distribution (radius 1.5 fixed) or volume? 
        // inSphere usually means volume. Let's stick to volume but safe.
        // Actually random.inSphere is good, but sometimes context issues. 
        // Let's use a safe manual generation for a sphere surface or volume.
        
        const x = 1.5 * Math.sin(phi) * Math.cos(theta);
        const y = 1.5 * Math.sin(phi) * Math.sin(theta);
        const z = 1.5 * Math.cos(phi);
        
        positions[i*3] = x;
        positions[i*3+1] = y;
        positions[i*3+2] = z;
    }
    return positions;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#ffd1dc" // 对应插画中的淡粉色
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

const HeroBackground = ({ 
  videoSrc,
  imageSrc, 
  children, 
  onLoad,
  showParticles = true,
  showVeil = true,
  filter = 'brightness(0.92) contrast(0.95) saturate(0.95)'
}) => {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const animationRef = useRef();

  // Constants
  const PRELOAD_TIME = 2.0; 
  const FADE_DURATION = 0.8; 
  const FADE_START_TIME = 1.0; 

  useEffect(() => {
    if (isLoaded && onLoad) onLoad();
  }, [isLoaded, onLoad]);

  // Image handling: if imageSrc is present, treat as loaded immediately
  useEffect(() => {
    if (imageSrc) {
      setIsLoaded(true);
    }
  }, [imageSrc]);

  // Switch to a purely JS-driven opacity approach
  useEffect(() => {
    if (imageSrc) return; // Skip video loop if using image
    let activeIndex = 1;
    let fadingIn = null; // 1 or 2
    
    const loop = () => {
      const currentVideo = activeIndex === 1 ? videoRef1.current : videoRef2.current;
      const nextVideo = activeIndex === 1 ? videoRef2.current : videoRef1.current;
      
      if (!currentVideo || !nextVideo) {
        animationRef.current = requestAnimationFrame(loop);
        return;
      }

      const timeLeft = currentVideo.duration - currentVideo.currentTime;

      // 1. PRELOAD
      if (timeLeft <= PRELOAD_TIME && nextVideo.paused) {
        nextVideo.currentTime = 0;
        nextVideo.play().catch(() => {});
      }

      // 2. FADE LOGIC
      if (timeLeft <= FADE_START_TIME && !nextVideo.paused && fadingIn === null) {
        fadingIn = activeIndex === 1 ? 2 : 1;
      }

      // Calculate opacity
      if (fadingIn !== null) {
        let progress = (FADE_START_TIME - timeLeft) / FADE_DURATION;
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;

        nextVideo.style.opacity = progress;
        nextVideo.style.zIndex = 20; 
        currentVideo.style.zIndex = 10; 
        currentVideo.style.opacity = 1; 

        // 3. SWAP
        if (progress >= 1 || currentVideo.ended) {
           activeIndex = fadingIn;
           fadingIn = null;
           
           currentVideo.pause();
           currentVideo.currentTime = 0;
           currentVideo.style.opacity = 0;
           currentVideo.style.zIndex = 10;
           
           nextVideo.style.opacity = 1;
           nextVideo.style.zIndex = 10; 
        }
      } else {
        currentVideo.style.opacity = 1;
        currentVideo.style.zIndex = 10;
        
        if (nextVideo.paused) {
             nextVideo.style.opacity = 0;
        }
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    const handleCanPlay = () => {
      if (!isLoaded) setIsLoaded(true);
    };
    
    if (videoRef1.current) videoRef1.current.addEventListener('canplaythrough', handleCanPlay);

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      if (videoRef1.current) videoRef1.current.removeEventListener('canplaythrough', handleCanPlay);
    };
  }, [isLoaded]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {imageSrc ? (
        <img 
          src={imageSrc}
          alt="background"
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
          style={{ filter }}
        />
      ) : (
        <>
          {/* Fallback Background Layer - Visible while video loads */}
          <div 
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0 transition-opacity duration-1000"
            style={{ 
              backgroundImage: `url(/背景.png)`,
              filter 
            }}
          />

          <video
            ref={videoRef1}
            autoPlay
            muted
            playsInline
            poster="/背景.png"
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ 
                filter,
                opacity: 1, // Controlled by JS
                zIndex: 10
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>

          <video
            ref={videoRef2}
            muted
            playsInline
            poster="/背景.png"
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ 
                filter,
                opacity: 0, // Controlled by JS
                zIndex: 10
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </>
      )}

      {showVeil && !imageSrc && (
        <div 
          className="absolute inset-0 z-20 pointer-events-none" 
          style={{ 
            backdropFilter: 'blur(1px) saturate(0.95)', 
            WebkitBackdropFilter: 'blur(1px) saturate(0.95)', 
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.28) 100%)' 
          }} 
        />
      )}

      {showParticles && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-30">
          <Canvas camera={{ position: [0, 0, 5] }} gl={{ alpha: true }}>
            <Suspense fallback={null}>
              <group position={[3.5, 2.2, 0]}>
                <StarParticles />
              </group>
            </Suspense>
          </Canvas>
        </div>
      )}

      <div className="relative z-40 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default HeroBackground;
