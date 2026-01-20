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

export default function MemetaLanding() {
      const [activeService, setActiveService] = useState(null);
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      const [isMobile, setIsMobile] = useState(false);
      const scrollYRef = useRef(0);
      const [scrollY, setScrollY] = useState(0);

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
                    { label: 'Threat Neutralization', detail: 'Tackle harmful posts swiftly' },
                    { label: 'Brand Insertion', detail: 'Create conversation opportunities' },
                    { label: 'AI Positioning', detail: 'Shape how AI talks about you' }
                          ],
                accent: '#E879F9'
      },
      {
                id: 'community',
                number: '03',
                title: 'Community Growth',
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
          <div style={{
                    minHeight: '100vh',
                    background: '#0A0A0B',
                    color: '#FAFAFA',
                    fontFamily: '"Outfit", sans-serif',
                    overflow: 'hidden',
                    position: 'relative'
          }}>
                    <style>{`
                            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
                                    
                                            * { margin: 0; padding: 0; box-sizing: border-box; }
                                                    
                                                            .gradient-text {
                                                                      background: linear-gradient(135deg, #E879F9 0%, #A855F7 50%, #7C3AED 100%);
                                                                                -webkit-background-clip: text;
                                                                                          -webkit-text-fill-color: transparent;
                                                                                                    background-clip: text;
                                                                                                            }
                                                                                                                    
                                                                                                                            .service-card { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
                                                                                                                                    .service-card:hover { transform: translateY(-8px); }
                                                                                                                                            
                                                                                                                                                    .cta-button { transition: all 0.3s ease; }
                                                                                                                                                            .cta-button:hover { transform: translateY(-2px); box-shadow: 0 20px 40px rgba(168,85,247,0.3); }
                                                                                                                                                                    
                                                                                                                                                                            .stat-value {
                                                                                                                                                                                      background: linear-gradient(135deg, #E879F9 0%, #A855F7 50%, #7C3AED 100%);
                                                                                                                                                                                                -webkit-background-clip: text;
                                                                                                                                                                                                          -webkit-text-fill-color: transparent;
                                                                                                                                                                                                                    background-clip: text;
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                            .nav-link { transition: color 0.2s ease; }
                                                                                                                                                                                                                                                    .nav-link:hover { color: #A855F7; }
                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                    html { scroll-behavior: smooth; }
                                                                                                                                                                                                                                                                          `}</style>style>
          
              {/* Background Orbs */}
                <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
                        <div style={{
                        position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px',
                        background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
                        borderRadius: '50%', transform: `translateY(${scrollY * 0.1}px)`
          }} />
                        <div style={{
                        position: 'absolute', top: '40%', left: '-15%', width: '500px', height: '500px',
                        background: 'radial-gradient(circle, rgba(232,121,249,0.1) 0%, transparent 70%)',
                        borderRadius: '50%', transform: `translateY(${scrollY * 0.15}px)`
          }} />
                        <div style={{
                        position: 'absolute', bottom: '-10%', right: '20%', width: '400px', height: '400px',
                        background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
                        borderRadius: '50%', transform: `translateY(${scrollY * -0.1}px)`
          }} />
                        <div style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: 'linear-gradient(rgba(168,85,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.03) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
          }} />
                </div>div>
          
              {/* Navigation */}
                <nav style={{
                      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                      padding: isMobile ? '16px 20px' : '20px 48px',
                      background: scrollY > 50 ? 'rgba(10,10,11,0.9)' : 'transparent',
                      backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none',
                      borderBottom: scrollY > 50 ? '1px solid rgba(168,85,247,0.1)' : 'none',
                      transition: 'all 0.3s ease'
          }}>
                        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                              <MemetaLogo size={32} glowColor="rgba(168,85,247,0.3)" />
                                              <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.5px' }}>Memeta</span>span>
                                  </div>div>
                        
                            {!isMobile && (
                          <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                              {['Services'].map(item => (
                                              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link"
                                                                    style={{ color: 'rgba(250,250,250,0.7)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>{item}</a>a>
                                            ))}
                                        <a href="mailto:anshuman@memeta.in" className="cta-button"
                                                            style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)', color: '#fff', textDecoration: 'none', borderRadius: '100px', fontSize: '14px', fontWeight: 600 }}>Get in Touch</a>a>
                          </div>div>
                                  )}
                        
                            {isMobile && (
                          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                            style={{ background: 'none', border: 'none', color: '#FAFAFA', cursor: 'pointer', padding: '8px' }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d={mobileMenuOpen ? "M18 6L6 18M6 6l12 12" : "M3 12h18M3 6h18M3 18h18"} />
                                        </svg>svg>
                          </button>button>
                                  )}
                        </div>div>
                
                    {isMobile && mobileMenuOpen && (
                        <div style={{
                                        position: 'absolute', top: '100%', left: 0, right: 0,
                                        background: 'rgba(10,10,11,0.98)', backdropFilter: 'blur(20px)',
                                        padding: '24px 20px', borderBottom: '1px solid rgba(168,85,247,0.1)',
                                        display: 'flex', flexDirection: 'column', gap: '20px'
                        }}>
                            {['Services'].map(item => (
                                          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)}
                                                              style={{ color: 'rgba(250,250,250,0.8)', textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}>{item}</a>a>
                                        ))}
                                    <a href="mailto:anshuman@memeta.in"
                                                      style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)', color: '#fff', textDecoration: 'none', borderRadius: '100px', fontSize: '14px', fontWeight: 600, textAlign: 'center' }}>Get in Touch</a>a>
                        </div>div>
                        )}
                </nav>nav>
          
              {/* Hero */}
                <section style={{
                      minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                      padding: isMobile ? '120px 20px 60px' : '0 48px', position: 'relative', zIndex: 1
          }}>
                        <div style={{ maxWidth: '1000px' }}>
                                  <div style={{ marginBottom: '24px' }}>
                                              <span style={{
                            display: 'inline-block', padding: '8px 16px',
                            background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)',
                            borderRadius: '100px', fontSize: '13px', fontWeight: 500, color: '#A855F7', letterSpacing: '0.5px'
          }}>MEMETA</span>span>
                                  </div>div>
                        
                                  <h1 style={{
                          fontSize: isMobile ? '48px' : 'clamp(64px, 10vw, 120px)',
                          fontWeight: 800, lineHeight: 1, letterSpacing: '-3px', marginBottom: '24px'
          }}>
                                              Occupy<br />
                                              <span className="gradient-text" style={{ fontStyle: 'italic', paddingRight: '8px', display: 'inline-block' }}>Mindshare.</span>span>
                                  </h1>h1>
                        
                                  <p style={{
                          fontSize: isMobile ? '18px' : '22px', color: 'rgba(250,250,250,0.6)',
                          maxWidth: '600px', lineHeight: 1.6, marginBottom: '48px'
          }}>We plant your brand in conversations that matter.</p>p>
                        
                                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                              <a href="#services" className="cta-button" style={{
                            padding: '18px 40px', background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
                            color: '#fff', textDecoration: 'none', borderRadius: '100px', fontSize: '16px', fontWeight: 600
          }}>Explore Services</a>a>
                                              <a href="#contact" style={{
                            padding: '18px 40px', background: 'transparent', color: '#FAFAFA',
                            textDecoration: 'none', borderRadius: '100px', fontSize: '16px', fontWeight: 600,
                            border: '1px solid rgba(250,250,250,0.2)', transition: 'all 0.3s ease'
          }}>Let's Talk</a>a>
                                  </div>div>
                        </div>div>
                </section>section>
          
              {/* Services */}
                <section id="services" style={{ padding: isMobile ? '60px 20px' : '120px 48px', position: 'relative', zIndex: 1 }}>
                        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                                  <div style={{ marginBottom: '64px' }}>
                                              <span style={{ display: 'block', fontSize: '13px', color: '#A855F7', fontWeight: 600, letterSpacing: '2px', marginBottom: '16px' }}>WHAT WE DO</span>span>
                                              <h2 style={{ fontSize: isMobile ? '36px' : 'clamp(40px, 6vw, 64px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.1 }}>
                                                            Three ways to<br />
                                                            <span className="gradient-text" style={{ fontStyle: 'italic', paddingRight: '8px', display: 'inline-block' }}>dominate.</span>span>
                                              </h2>h2>
                                  </div>div>
                        
                                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
                                      {services.map((service) => (
                            <div
                                                key={service.id}
                                                className="service-card"
                                                onMouseEnter={() => setActiveService(service.id)}
                                                onMouseLeave={() => setActiveService(null)}
                                                style={{
                                                                      background: activeService === service.id
                                                                                              ? `linear-gradient(135deg, ${service.accent}15 0%, transparent 100%)`
                                                                                              : 'rgba(168,85,247,0.03)',
                                                                      border: `1px solid ${activeService === service.id ? service.accent + '40' : 'rgba(168,85,247,0.1)'}`,
                                                                      borderRadius: '24px',
                                                                      padding: isMobile ? '32px 24px' : '40px 32px',
                                                                      position: 'relative',
                                                                      overflow: 'hidden'
                                                }}
                                              >
                                            <span style={{ fontSize: '12px', fontWeight: 700, color: service.accent, letterSpacing: '2px', marginBottom: '16px', display: 'block' }}>{service.number}</span>span>
                                            <h3 style={{ fontSize: isMobile ? '24px' : '28px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.5px' }}>{service.title}</h3>h3>
                                            <p style={{ fontSize: '15px', color: service.accent, fontWeight: 500, marginBottom: '16px', fontStyle: 'italic' }}>{service.tagline}</p>p>
                                            <p style={{ fontSize: '15px', color: 'rgba(250,250,250,0.5)', lineHeight: 1.6, marginBottom: '24px' }}>{service.description}</p>p>
                            
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                {service.benefits.map((benefit, i) => (
                                                                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                                                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: service.accent, marginTop: '8px', flexShrink: 0 }} />
                                                                                            <div>
                                                                                                                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#FAFAFA' }}>{benefit.label}</span>span>
                                                                                                                    <span style={{ fontSize: '13px', color: 'rgba(250,250,250,0.4)', marginLeft: '8px' }}>{benefit.detail}</span>span>
                                                                                                </div>div>
                                                                      </div>div>
                                                                    ))}
                                            </div>div>
                            </div>div>
                          ))}
                                  </div>div>
                        </div>div>
                </section>section>
          
              {/* Stats */}
                <section id="results" style={{ padding: isMobile ? '60px 20px' : '100px 48px', position: 'relative', zIndex: 1 }}>
                        <div style={{
                        maxWidth: '1100px', margin: '0 auto',
                        background: 'rgba(168,85,247,0.03)', borderRadius: '32px',
                        border: '1px solid rgba(168,85,247,0.1)', padding: isMobile ? '40px 24px' : '60px 40px'
          }}>
                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: isMobile ? '32px 16px' : '48px 32px', maxWidth: '700px', margin: '0 auto' }}>
                                      {[
              { value: '127M+', label: 'Monthly Community Viewers' },
              { value: '50+', label: 'Communities We Run' },
              { value: '35+', label: 'Brands Trust Memeta' },
              { value: '24/7', label: 'Reputation Monitoring' }
                          ].map((stat, i) => (
                                            <div key={i} style={{ textAlign: 'center' }}>
                                                            <div className="stat-value" style={{
                                                                  fontSize: isMobile ? '36px' : 'clamp(48px, 8vw, 72px)',
                                                                  fontWeight: 800, marginBottom: '6px', letterSpacing: '-1px', fontStyle: 'italic'
                                            }}>{stat.value}</div>div>
                                                            <div style={{ fontSize: isMobile ? '11px' : '13px', color: 'rgba(250,250,250,0.4)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 500 }}>{stat.label}</div>div>
                                            </div>div>
                                          ))}
                                  </div>div>
                        </div>div>
                </section>section>
          
              {/* CTA */}
                <section id="contact" style={{ padding: isMobile ? '80px 20px' : '140px 48px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
                        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                                  <div style={{ marginBottom: '32px' }}><MemetaLogo size={isMobile ? 60 : 80} glowColor="rgba(168,85,247,0.3)" /></div>div>
                                  <h2 style={{
                          fontSize: isMobile ? '32px' : 'clamp(40px, 7vw, 68px)',
                          fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '20px', lineHeight: 1.1
          }}>
                                              Ready to own the<br />
                                              <span className="gradient-text" style={{ fontStyle: 'italic', paddingRight: '8px', display: 'inline-block' }}>conversation?</span>span>
                                  </h2>h2>
                                  <p style={{ fontSize: isMobile ? '17px' : '20px', color: 'rgba(250,250,250,0.55)', marginBottom: '40px', lineHeight: 1.7 }}>Let's talk strategy.</p>p>
                                  <a href="mailto:anshuman@memeta.in" className="cta-button" style={{
                          display: 'inline-flex', alignItems: 'center', gap: '12px',
                          padding: '22px 52px', background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 50%, #6D28D9 100%)',
                          color: '#FAFAFA', textDecoration: 'none', fontSize: '17px', fontWeight: 600,
                          borderRadius: '100px', border: '1px solid rgba(168,85,247,0.4)'
          }}>
                                              <span>anshuman@memeta.in</span>span>
                                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>svg>
                                  </a>a>
                        </div>div>
                </section>section>
          
              {/* Footer */}
                <footer style={{ padding: '48px', borderTop: '1px solid rgba(168,85,247,0.1)', position: 'relative', zIndex: 1 }}>
                        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                              <MemetaLogo size={24} />
                                              <span style={{ fontSize: '16px', fontWeight: 600, opacity: 0.8 }}>Memeta</span>span>
                                  </div>div>
                                  <span style={{ fontSize: '13px', color: 'rgba(250,250,250,0.3)' }}>© 2025 Memeta. Occupy Mindshare.</span>span>
                        </div>div>
                </footer>footer>
          </div>div>
        );
}</style>
