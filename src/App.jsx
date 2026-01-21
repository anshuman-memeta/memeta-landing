import { useState, useEffect, useRef } from 'react';

const MemetaLogo = ({ size = 40, glowColor = null }) => (
          <img
                      src="/memeta white_000000 (3).png"
                      alt="Memeta"
                      style={{
                                    height: size,
                                    width: 'auto',
                                    filter: glowColor ? `drop-shadow(0 0 20px ${glowColor})` : undefined
                      }}
                    />
        );

const FloatingParticles = () => {
          useEffect(() => {
                      const container = document.createElement('div');
                      container.style.cssText = 'position: fixed; inset: 0; pointer-events: none; z-index: 1; overflow: hidden;';
                      container.id = 'particles-container';
                      document.body.appendChild(container);

                        for (let i = 0; i < 25; i++) {
                                      const particle = document.createElement('div');
                                      particle.className = 'floating-particle';
                                      particle.style.left = Math.random() * 100 + 'vw';
                                      const size = 2 + Math.random() * 4;
                                      particle.style.width = size + 'px';
                                      particle.style.height = size + 'px';
                                      particle.style.animationDuration = (10 + Math.random() * 15) + 's';
                                      particle.style.animationDelay = (Math.random() * 15) + 's';
                                      container.appendChild(particle);
                        }

                        return () => {
                                      const el = document.getElementById('particles-container');
                                      if (el) el.remove();
                        };
          }, []);

          return null;
};

const MouseSpotlight = () => {
          useEffect(() => {
                      const spotlight = document.createElement('div');
                      spotlight.className = 'mouse-spotlight';
                      spotlight.id = 'mouse-spotlight';
                      document.body.appendChild(spotlight);

                        const handleMouseMove = (e) => {
                                      spotlight.style.left = e.clientX + 'px';
                                      spotlight.style.top = e.clientY + 'px';
                        };

                        document.addEventListener('mousemove', handleMouseMove);

                        return () => {
                                      document.removeEventListener('mousemove', handleMouseMove);
                                      const el = document.getElementById('mouse-spotlight');
                                      if (el) el.remove();
                        };
          }, []);

          return null;
};

const AnimatedCounter = ({ target, suffix = '', duration = 2000 }) => {
          const [count, setCount] = useState(0);
          const [hasAnimated, setHasAnimated] = useState(false);
          const ref = useRef(null);

          useEffect(() => {
                      const observer = new IntersectionObserver(
                                    (entries) => {
                                                    if (entries[0].isIntersecting && !hasAnimated) {
                                                                      setHasAnimated(true);
                                                                      const numTarget = parseInt(target);
                                                                      if (isNaN(numTarget)) {
                                                                                          setCount(target);
                                                                                          return;
                                                                      }

                                                      const startTime = performance.now();
                                                                      const animate = (currentTime) => {
                                                                                          const elapsed = currentTime - startTime;
                                                                                          const progress = Math.min(elapsed / duration, 1);
                                                                                          const easeOut = 1 - Math.pow(1 - progress, 3);
                                                                                          setCount(Math.floor(easeOut * numTarget));

                                                                                          if (progress < 1) {
                                                                                                                requestAnimationFrame(animate);
                                                                                                  } else {
                                                                                                                setCount(numTarget);
                                                                                                  }
                                                                      };
                                                                      requestAnimationFrame(animate);
                                                    }
                                    },
                              { threshold: 0.5 }
                                  );

                        if (ref.current) observer.observe(ref.current);
                      return () => observer.disconnect();
          }, [target, duration, hasAnimated]);

          const displayValue = typeof count === 'number' ? count + suffix : target;

          return <span ref={ref}>{displayValue}</span>;
};

export default function MemetaLanding() {
          const [activeService, setActiveService] = useState(null);
          const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
          const [isMobile, setIsMobile] = useState(false);
          const scrollYRef = useRef(0);
          const [scrollY, setScrollY] = useState(0);
          const [visibleCards, setVisibleCards] = useState({});

  useEffect(() => {
              const checkMobile = () => setIsMobile(window.innerWidth < 768);
              checkMobile();
              window.addEventListener('resize', checkMobile);

                let ticking = false;
              const handleScroll = () => {
                            scrollYRef.current = window.scrollY;
                            if (!ticking) {
                                            window.requestAnimationFrame(() => {
                                                              setScrollY(scrollYRef.current);
                                                              ticking = false;
                                            });
                                            ticking = true;
                            }
              };

                window.addEventListener('scroll', handleScroll, { passive: true });

                return () => {
                              window.removeEventListener('scroll', handleScroll);
                              window.removeEventListener('resize', checkMobile);
                };
  }, []);

  useEffect(() => {
              const observer = new IntersectionObserver(
                            (entries) => {
                                            entries.forEach((entry) => {
                                                              if (entry.isIntersecting) {
                                                                                  setVisibleCards((prev) => ({ ...prev, [entry.target.dataset.id]: true }));
                                                              }
                                            });
                            },
                      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
                          );

                document.querySelectorAll('.service-card').forEach((card) => {
                              observer.observe(card);
                });

                return () => observer.disconnect();
  }, []);

  const services = [
          {
                        id: 'seeding',
                        number: '01',
                        title: 'Content Seeding',
                        tagline: 'Plant ideas. Watch them spread.',
                        description: 'Strategic distribution across communities that matter. Your content, everywhere it needs to be.',
                        benefits: [
                                { label: 'Brand Visibility', detail: 'Omnipresent across platforms' },
                                { label: 'AI Visibility', detail: 'Get mentioned by ChatGPT & AI assistants' },
                                { label: 'UGC Amplification', detail: 'Multiply organic search presence' }
                                      ],
                        accent: '#A855F7'
          },
          {
                        id: 'orm',
                        number: '02',
                        title: 'ORM Intelligence',
                        tagline: 'Control the narrative.',
                        description: 'Reputation management meets opportunity creation. Turn threats into wins.',
                        benefits: [
                                { label: 'Threat Neutralization', detail: "Tackle harmful posts swiftly" },
                                { label: 'Brand Insertion', detail: 'Create conversation opportunities' },
                                { label: 'AI Positioning', detail: 'Shape how AI talks about you' }
                                      ],
                        accent: '#7C3AED'
          },
          {
                        id: 'engagement',
                        number: '03',
                        title: 'Community Engine',
                        tagline: 'Build tribes. Own attention.',
                        description: 'Viral community architecture. Sustained engagement. Owned media that compounds.',
                        benefits: [
                                { label: 'Viral Communities', detail: 'Engineer shareable moments' },
                                { label: 'Retention Systems', detail: 'Keep audiences coming back' },
                                { label: 'Brand Recall', detail: 'Own the mental real estate' }
                                      ],
                        accent: '#C084FC'
          }
            ];

  return (
              <div style={{ minHeight: '100vh', background: '#0A0A0B', color: '#FAFAFA', fontFamily: '"Outfit", sans-serif', overflow: 'hidden', position: 'relative' }}>
                            <FloatingParticles />
                            <MouseSpotlight />

                            <style>{`
                                    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
                                            * { margin: 0; padding: 0; box-sizing: border-box; }
                                                    @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
                                                            @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
                                                                    @keyframes pulseGlow { 0%, 100% { opacity: 0.15; transform: scale(1); } 50% { opacity: 0.25; transform: scale(1.05); } }
                                                                            @keyframes particleFloat { 0% { transform: translateY(100vh) rotate(0deg); opacity: 0; } 5% { opacity: 0.6; } 40% { opacity: 0.6; transform: translateY(20vh) rotate(360deg); } 55% { opacity: 0; transform: translateY(-10vh) rotate(540deg); } 100% { transform: translateY(-10vh) rotate(540deg); opacity: 0; } }
                                                                                    @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
                                                                                            @keyframes borderGlow { 0%, 100% { border-color: rgba(168, 85, 247, 0.2); } 50% { border-color: rgba(168, 85, 247, 0.5); } }
                                                                                                    .floating-particle { position: absolute; background: radial-gradient(circle, rgba(168, 85, 247, 0.8), transparent); border-radius: 50%; animation: particleFloat linear infinite; pointer-events: none; }
                                                                                                            .mouse-spotlight { position: fixed; width: 400px; height: 400px; background: radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%); border-radius: 50%; pointer-events: none; transform: translate(-50%, -50%); z-index: 1; transition: opacity 0.3s ease; }
                                                                                                                    .gradient-text-shimmer { background: linear-gradient(90deg, #E879F9 0%, #A855F7 25%, #7C3AED 50%, #A855F7 75%, #E879F9 100%); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmer 3s linear infinite; }
                                                                                                                            .service-card { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); opacity: 0; transform: translateY(50px); }
                                                                                                                                    .service-card.visible { opacity: 1; transform: translateY(0); animation: borderGlow 3s ease-in-out infinite; }
                                                                                                                                            .service-card:hover { transform: translateY(-8px); }
                                                                                                                                                    .hero-badge { animation: fadeInUp 0.8s ease-out forwards, float 4s ease-in-out infinite 1s; }
                                                                                                                                                            .hero-title { animation: fadeInUp 0.8s ease-out 0.2s forwards; opacity: 0; }
                                                                                                                                                                    .hero-subtitle { animation: fadeInUp 0.8s ease-out 0.4s forwards; opacity: 0; }
                                                                                                                                                                            .hero-buttons { animation: fadeInUp 0.8s ease-out 0.6s forwards; opacity: 0; }
                                                                                                                                                                                    .cta-button { position: relative; overflow: hidden; transition: all 0.3s ease; }
                                                                                                                                                                                            .cta-button::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); transition: left 0.5s ease; }
                                                                                                                                                                                                    .cta-button:hover::before { left: 100%; }
                                                                                                                                                                                                            .cta-button:hover { transform: scale(1.05); box-shadow: 0 10px 40px rgba(168, 85, 247, 0.4); }
                                                                                                                                                                                                                    .nav-link { position: relative; }
                                                                                                                                                                                                                            .nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: linear-gradient(90deg, #A855F7, #7C3AED); transition: width 0.3s ease; }
                                                                                                                                                                                                                                    .nav-link:hover::after { width: 100%; }
                                                                                                                                                                                                                                          `}</style>
              
                    <section style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '80px 20px' : '0' }}>
                            <div className="orb-pulse" style={{ position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)', borderRadius: '50%', transform: `translateY(${scrollY * 0.1}px)` }} />
                            <div className="orb-pulse" style={{ position: 'absolute', top: '40%', left: '-15%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(232,121,249,0.1) 0%, transparent 70%)', borderRadius: '50%', transform: `translateY(${scrollY * 0.15}px)`, animationDelay: '1s' }} />
                            <div className="orb-pulse" style={{ position: 'absolute', bottom: '-10%', right: '20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', borderRadius: '50%', transform: `translateY(${scrollY * -0.1}px)`, animationDelay: '2s' }} />
                            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(168,85,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
                    
                            <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: isMobile ? '16px 20px' : '20px 48px', background: scrollY > 50 ? 'rgba(10,10,11,0.9)' : 'transparent', backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none', borderBottom: scrollY > 50 ? '1px solid rgba(168,85,247,0.1)' : 'none', transition: 'all 0.3s ease', animation: 'fadeInUp 0.6s ease-out forwards' }}>
                                      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                                <MemetaLogo size={32} glowColor="rgba(168,85,247,0.3)" />
                                                                <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.5px' }}>Memeta</span>
                                                  </div>
                                              {!isMobile && (
                                    <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                                            {['Services'].map(item => (
                                                              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link" style={{ color: 'rgba(250,250,250,0.7)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>{item}</a>
                                                            ))}
                                                    <a href="mailto:anshuman@memeta.in" className="cta-button" style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 50%, #6D28D9 100%)', color: '#FAFAFA', textDecoration: 'none', fontSize: '14px', fontWeight: 600, borderRadius: '100px', border: '1px solid rgba(168,85,247,0.4)' }}>Get in Touch</a>
                                    </div>
                                                  )}
                                      </div>
                            </nav>
                    
                            <div style={{ textAlign: 'center', maxWidth: '900px', padding: '0 20px', position: 'relative', zIndex: 2 }}>
                                      <div className="hero-badge" style={{ display: 'inline-block', padding: '8px 20px', background: 'rgba(168,85,247,0.1)', borderRadius: '100px', border: '1px solid rgba(168,85,247,0.3)', marginBottom: '32px' }}>
                                                  <span style={{ fontSize: '13px', fontWeight: 500, color: '#A855F7', letterSpacing: '2px' }}>MEMETA</span>
                                      </div>
                                      <h1 className="hero-title" style={{ fontSize: isMobile ? '48px' : 'clamp(56px, 8vw, 96px)', fontWeight: 800, letterSpacing: '-3px', lineHeight: 1, marginBottom: '24px' }}>
                                                  Occupy<br /><span className="gradient-text-shimmer">Mindshare.</span>
                                      </h1>
                                      <p className="hero-subtitle" style={{ fontSize: isMobile ? '18px' : '22px', color: 'rgba(250,250,250,0.7)', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.6 }}>We plant your brand in conversations that matter.</p>
                                      <div className="hero-buttons" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                                  <a href="#services" className="cta-button" style={{ padding: '16px 36px', background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)', color: '#FAFAFA', textDecoration: 'none', fontSize: '16px', fontWeight: 600, borderRadius: '100px', border: '1px solid rgba(168,85,247,0.5)' }}>Explore Services</a>
                                                  <a href="mailto:anshuman@memeta.in" className="cta-button" style={{ padding: '16px 36px', background: 'rgba(250,250,250,0.05)', color: '#FAFAFA', textDecoration: 'none', fontSize: '16px', fontWeight: 600, borderRadius: '100px', border: '1px solid rgba(250,250,250,0.2)' }}>Let's Talk</a>
                                      </div>
                            </div>
                    </section>

              
                    <section id="services" style={{ padding: isMobile ? '80px 20px' : '140px 48px', position: 'relative' }}>
                            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                                      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                                                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#A855F7', letterSpacing: '2px', marginBottom: '16px', display: 'inline-block' }}>WHAT WE DO</span>
                                                  <h2 style={{ fontSize: isMobile ? '36px' : 'clamp(40px, 6vw, 64px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.1 }}>
                                                                Three ways to<br /><span className="gradient-text" style={{ fontStyle: 'italic', paddingRight: '8px', display: 'inline-block' }}>dominate.</span>
                                                  </h2>
                                      </div>
                                      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
                                              {services.map((service, index) => (
                                    <div key={service.id} data-id={service.id} className={`service-card ${visibleCards[service.id] ? 'visible' : ''}`} onMouseEnter={() => setActiveService(service.id)} onMouseLeave={() => setActiveService(null)} style={{ background: activeService === service.id ? `linear-gradient(135deg, ${service.accent}15 0%, transparent 100%)` : 'rgba(168,85,247,0.03)', border: `1px solid ${activeService === service.id ? service.accent + '40' : 'rgba(168,85,247,0.1)'}`, borderRadius: '24px', padding: isMobile ? '32px 24px' : '40px 32px', position: 'relative', overflow: 'hidden', transitionDelay: `${index * 0.15}s` }}>
                                                    <span style={{ fontSize: '12px', fontWeight: 700, color: service.accent, letterSpacing: '2px', marginBottom: '16px', display: 'block' }}>{service.number}</span>
                                                    <h3 style={{ fontSize: isMobile ? '24px' : '28px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.5px' }}>{service.title}</h3>
                                                    <p style={{ fontSize: '15px', color: service.accent, fontWeight: 500, marginBottom: '16px', fontStyle: 'italic' }}>{service.tagline}</p>
                                                    <p style={{ fontSize: '15px', color: 'rgba(250,250,250,0.5)', lineHeight: 1.6, marginBottom: '24px' }}>{service.description}</p>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                            {service.benefits.map((benefit, i) => (
                                                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                                                                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: service.accent, marginTop: '8px', flexShrink: 0 }} />
                                                                                      <div>
                                                                                                              <span style={{ fontSize: '14px', fontWeight: 600, color: '#FAFAFA' }}>{benefit.label}</span>
                                                                                                              <span style={{ fontSize: '13px', color: 'rgba(250,250,250,0.5)', marginLeft: '8px' }}>{benefit.detail}</span>
                                                                                              </div>
                                                                </div>
                                                              ))}
                                                    </div>
                                    </div>
                                  ))}
                                      </div>
                            </div>
                    </section>

                        {/* Stats */}
                              <section id="results" style={{ padding: isMobile ? '60px 20px' : '100px 48px', position: 'relative', zIndex: 1 }}>
                                                <div style={{ maxWidth: '1100px', margin: '0 auto', background: 'rgba(168,85,247,0.03)', borderRadius: '48px', border: '1px solid rgba(168,85,247,0.1)', padding: isMobile ? '40px 24px' : '60px 40px' }}>
                                                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: isMobile ? '32px 16px' : '48px 32px', maxWidth: '700px', margin: '0 auto' }}>
                                                                              {[{ number: 127, suffix: 'M+', label: 'Monthly Community Viewers' }, { number: 50, suffix: '+', label: 'Communities We Run' }, { number: 35, suffix: '+', label: 'Brands Trust Memeta' }, { number: 24, suffix: '/7', label: 'Reputation Monitoring' }].map((stat, i) => (
                                      <div key={i} style={{ textAlign: 'center' }}>
                                                                <div className="stat-value gradient-text-shimmer" style={{ fontSize: isMobile ? '36px' : 'clamp(48px, 8vw, 72px)', fontWeight: 800, marginBottom: '6px', letterSpacing: '-1px', fontStyle: 'italic' }}><AnimatedCounter target={stat.number} suffix={stat.suffix} /></div>
                                                                <div style={{ fontSize: isMobile ? '11px' : '13px', color: 'rgba(250,250,250,0.4)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 500 }}>{stat.label}</div>
                                      </div>
                                    ))}
                                                                    </div>
                                                </div>
                              </section>
              
                    <section id="contact" style={{ padding: isMobile ? '80px 20px' : '140px 48px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
                            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                                      <div style={{ marginBottom: '32px' }}><MemetaLogo size={isMobile ? 60 : 80} glowColor="rgba(168,85,247,0.3)" /></div>
                                      <h2 style={{ fontSize: isMobile ? '32px' : 'clamp(40px, 7vw, 68px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '20px', lineHeight: 1.1 }}>
                                                  Ready to own the<br /><span className="gradient-text-shimmer" style={{ fontStyle: 'italic', paddingRight: '15px', display: 'inline-block' }}>conversation?</span>
                                      </h2>
                                      <p style={{ fontSize: isMobile ? '17px' : '20px', color: 'rgba(250,250,250,0.55)', marginBottom: '40px', lineHeight: 1.7 }}>Let's talk strategy.</p>
                                      <a href="mailto:anshuman@memeta.in" className="cta-button" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '22px 52px', background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 50%, #6D28D9 100%)', color: '#FAFAFA', textDecoration: 'none', fontSize: '17px', fontWeight: 600, borderRadius: '100px', border: '1px solid rgba(168,85,247,0.4)' }}>
                                                  <span>anshuman@memeta.in</span>
                                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                      </a>
                            </div>
                    </section>
              
                    <footer style={{ padding: '48px', borderTop: '1px solid rgba(168,85,247,0.1)', position: 'relative', zIndex: 1 }}>
                            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                  <MemetaLogo size={24} />
                                                  <span style={{ fontSize: '16px', fontWeight: 600, opacity: 0.8 }}>Memeta</span>
                                      </div>
                                      <span style={{ fontSize: '13px', color: 'rgba(250,250,250,0.3)' }}>© 2025 Memeta. Occupy Mindshare.</span>
                            </div>
                    </footer>
              </div>
            );
}
