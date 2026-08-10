// ═══════════════════════════════════════════════════════════════════════════
// GLOBAL REACT SETUP & UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

const h = React.createElement;
const { useState, useEffect, useRef } = React;

// Global modal state handler
let __openModal = () => {};

// ═══════════════════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════════════════

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start || typeof target !== 'number') return;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [start, target, duration]);
  return count;
}

function useNavShadow() {
  useEffect(() => {
    const nav = document.querySelector('.nav-bar');
    if (!nav) return;
    const handler = () => nav.classList.toggle('scrolled', window.scrollY > 12);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
}

// ═══════════════════════════════════════════════════════════════════════════
// SVG ICONS
// ═══════════════════════════════════════════════════════════════════════════

const PhoneIcon = () =>
  h('svg', { width: '17', height: '17', viewBox: '0 0 24 24', fill: 'none', stroke: '#FEED01', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('path', { d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z' })
  );

const FbIcon = () =>
  h('svg', { width: '18', height: '18', viewBox: '0 0 24 24', fill: '#fff' },
    h('path', { d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' })
  );

const IgIcon = () =>
  h('svg', { width: '18', height: '18', viewBox: '0 0 24 24', fill: 'none', stroke: '#fff', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('rect', { x: '2', y: '2', width: '20', height: '20', rx: '5', fill: 'none' }),
    h('path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z', fill: 'none' }),
    h('line', { x1: '17.5', y1: '6.5', x2: '17.51', y2: '6.5', stroke: '#fff' })
  );

// ═══════════════════════════════════════════════════════════════════════════
// ENQUIRY MODAL
// ═══════════════════════════════════════════════════════════════════════════

const EnquiryModal = ({ tourTitle, onClose }) => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', date: '', message: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const inp = { width: '100%', border: '1.5px solid #e0d8f0', borderRadius: 6, padding: '10px 12px', fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: 'none', boxSizing: 'border-box', color: '#1A1A1A' };
  const lbl = { display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 5, fontFamily: "'DM Sans',sans-serif" };
  const submit = (e) => {
    e.preventDefault();
    const msg = `Hello Purvaa Tours & Travels,\n\nI would like to enquire about: ${tourTitle}\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nPreferred Travel Date: ${form.date || 'Not specified'}\nMessage: ${form.message || 'No message'}`;
    window.open(`https://wa.me/919869272960?text=${encodeURIComponent(msg)}`, '_blank');
    onClose();
  };
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);
  return h('div', { style: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.58)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }, onClick: onClose },
    h('div', { style: { background: '#fff', borderRadius: 14, padding: '36px 32px 30px', maxWidth: 460, width: '100%', position: 'relative', boxShadow: '0 24px 64px rgba(0,0,0,0.22)' }, onClick: (e) => e.stopPropagation() },
      h('button', { onClick: onClose, style: { position: 'absolute', top: 14, right: 18, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#999', lineHeight: 1 } }, '×'),
      h('h3', { style: { margin: '0 0 20px', fontFamily: "'Playfair Display',serif", fontSize: 22, color: '#432267' } }, 'Plan My Trip'),
      h('form', { onSubmit: submit },
        h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 } },
          h('div', null, h('label', { style: lbl }, 'Name *'), h('input', { required: true, value: form.name, onChange: set('name'), placeholder: 'Your name', style: inp })),
          h('div', null, h('label', { style: lbl }, 'Phone *'), h('input', { required: true, type: 'tel', value: form.phone, onChange: set('phone'), placeholder: 'Your number', style: inp }))
        ),
        h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 } },
          h('div', null, h('label', { style: lbl }, 'Email'), h('input', { type: 'email', value: form.email, onChange: set('email'), placeholder: 'your@email.com', style: inp })),
          h('div', null, h('label', { style: lbl }, 'Preferred Travel Date'), h('input', { type: 'date', value: form.date, onChange: set('date'), style: inp }))
        ),
        h('div', { style: { marginBottom: 22 } }, h('label', { style: lbl }, 'Message'), h('textarea', { value: form.message, onChange: set('message'), placeholder: 'Any specific requirements or questions?', rows: 3, style: { ...inp, resize: 'vertical' } })),
        h('button', { type: 'submit', style: { width: '100%', background: '#FEED01', color: '#432267', border: 'none', padding: '13px', borderRadius: 6, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", letterSpacing: '.01em' } }, 'Send Enquiry via WhatsApp')
      )
    )
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════════════════════════════════

const NAV_LINKS = ['About Us', 'Our Tours', 'Gallery', 'Contact Us'];
const NAV_HREFS = { 'Contact Us': 'contact.html', 'Our Tours': 'our-tours.html', 'Gallery': 'gallery.html', 'About Us': 'about.html' };

const Navbar = ({ activeLink = null }) => {
  useNavShadow();
  const [menuOpen, setMenuOpen] = useState(false);
  return h('nav', { className: 'nav-bar' },
    h('div', { className: 'nav-inner' },
      h('a', { href: './index.html', className: 'nav-logo' }, h('img', { src: './assets/images/logo/white-logo-transparent.png', alt: 'Purvaa Tours & Travels', style: { height: 86, width: 'auto', display: 'block' } })),
      h('button', { className: 'ham-btn', onClick: () => setMenuOpen((m) => !m), 'aria-label': 'Menu' }, menuOpen ? '✕' : '☰'),
      h('div', { className: `nav-menu${menuOpen ? ' open' : ''}` },
        h('div', { className: 'nav-links-wrap' },
          NAV_LINKS.map((l) => h('a', { key: l, href: NAV_HREFS[l] || '#', style: { color: activeLink === l ? '#FEED01' : 'rgba(255,255,255,0.88)', textDecoration: 'none', transition: 'color .2s', fontFamily: "'DM Sans',sans-serif", fontSize: 18, fontWeight: 500 }, onMouseOver: (e) => (e.target.style.color = '#FEED01'), onMouseOut: (e) => (e.target.style.color = activeLink === l ? '#FEED01' : 'rgba(255,255,255,0.88)') }, l))
        ),
        h('div', { className: 'nav-actions' },
          h('a', { href: 'tel:+919869272960', style: { color: '#FEED01', fontSize: 16, fontWeight: 600, textDecoration: 'none', fontFamily: "'DM Sans',sans-serif", letterSpacing: '.01em', display: 'flex', alignItems: 'center', gap: 7, borderBottom: '2px solid transparent', transition: 'border-color .2s' }, onMouseOver: (e) => (e.target.style.borderBottom = '2px solid #FEED01'), onMouseOut: (e) => (e.target.style.borderBottom = '2px solid transparent') }, h(PhoneIcon), '+91 98692 72960'),
          h('button', { onClick: () => __openModal('Plan My Trip'), style: { background: '#fff', color: '#432267', border: 'none', padding: '11px 26px', borderRadius: 5, fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", letterSpacing: '.01em', transition: 'background .2s' }, onMouseOver: (e) => (e.currentTarget.style.background = '#FEED01'), onMouseOut: (e) => (e.currentTarget.style.background = '#fff') }, 'Plan My Trip')
        )
      )
    )
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// FOOTER & REVEAL
// ═══════════════════════════════════════════════════════════════════════════

const Reveal = ({ children, delay = 0, style = {}, className = '' }) => {
  const [ref, visible] = useInView();
  return h('div', { ref, className: `reveal${visible ? ' in' : ''} ${className}`, style: { transitionDelay: `${delay}s`, ...style } }, children);
};

const Footer = () => h('footer', { style: { background: '#2d1845' } },
  h('div', { className: 'footer-grid' },
    h('div', { style: { marginTop: '-20px' } },
      h('img', { src: './assets/images/logo/white-logo-transparent.png', alt: 'Purvaa Tours & Travels', style: { width: 220, display: 'block', marginBottom: 20, opacity: 0.92 } }),
      h('p', { style: { fontSize: 15, color: 'rgba(255,255,255,0.68)', lineHeight: 1.85, marginBottom: 28, fontFamily: "'DM Sans',sans-serif", maxWidth: 340 } }, 'Purvaa is the travel management company Mumbai families have trusted since 1996 because we handle everything personally and have maintained our quality standards across 30 years.'),
      h('button', { onClick: () => __openModal('Quick Enquiry'), style: { background: '#FEED01', color: '#1A1A1A', border: 'none', padding: '14px 30px', borderRadius: 6, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", letterSpacing: '.01em' }, onMouseOver: (e) => (e.currentTarget.style.background = '#fff'), onMouseOut: (e) => (e.currentTarget.style.background = '#FEED01') }, 'Quick Enquiry')
    ),
    h('div', null,
      h('div', { style: { fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: '.13em', marginBottom: 22, fontFamily: "'DM Sans',sans-serif" } }, 'Quick Links'),
      ['About Us', 'Our Tours', 'Gallery', 'Contact Us', 'Privacy Policy', 'Terms & Conditions'].map((l) => h('a', { key: l, href: l === 'Contact Us' ? 'contact.html' : l === 'Gallery' ? 'gallery.html' : l === 'About Us' ? 'about.html' : l === 'Our Tours' ? 'our-tours.html' : l === 'Privacy Policy' ? 'privacy-policy.html' : l === 'Terms & Conditions' ? 'terms-conditions.html' : '#', style: { display: 'block', color: 'rgba(255,255,255,0.75)', fontSize: 14, textDecoration: 'none', marginBottom: 14, fontFamily: "'DM Sans',sans-serif", transition: 'color .2s' }, onMouseOver: (e) => (e.target.style.color = '#FEED01'), onMouseOut: (e) => (e.target.style.color = 'rgba(255,255,255,0.75)') }, l))
    ),
    h('div', { style: { display: 'flex', flexDirection: 'column', gap: 24 } },
      h('div', null, h('div', { style: { fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: '.13em', marginBottom: 10, fontFamily: "'DM Sans',sans-serif" } }, 'For Enquiries'), h('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 } }, h('svg', { width: '16', height: '16', viewBox: '0 0 24 24', fill: 'none', stroke: '#fff', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }, h('path', { d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z' })), h('a', { href: 'tel:+919869272960', style: { color: 'rgba(255,255,255,0.82)', fontSize: 14, textDecoration: 'none', fontFamily: "'DM Sans',sans-serif", transition: 'color 0.2s' }, onMouseOver: (e) => (e.target.style.color = '#FEED01'), onMouseOut: (e) => (e.target.style.color = 'rgba(255,255,255,0.82)') }, '+91 98692 72960')),
      h('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } }, h('svg', { width: '16', height: '16', viewBox: '0 0 24 24', fill: 'none', stroke: '#fff', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }, h('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }), h('polyline', { points: '22,6 12,13 2,6' })), h('a', { href: 'mailto:info.purvaatravels@gmail.com', style: { color: 'rgba(255,255,255,0.82)', fontSize: 14, textDecoration: 'none', fontFamily: "'DM Sans',sans-serif", transition: 'color 0.2s' }, onMouseOver: (e) => (e.target.style.color = '#FEED01'), onMouseOut: (e) => (e.target.style.color = 'rgba(255,255,255,0.82)') }, 'info.purvaatravels@gmail.com')),
      h('div', null, h('div', { style: { fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: '.13em', marginBottom: 10, fontFamily: "'DM Sans',sans-serif" } }, 'Address'), h('p', { style: { fontSize: 14, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, fontFamily: "'DM Sans',sans-serif", margin: 0 } }, 'Sitaram Niwas, 4, Shivadarshan Path,', h('br'), 'Nardas Nagar, W, Bhandup West,', h('br'), 'Mumbai, Maharashtra 400078')),
      h('div', null, h('div', { style: { fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: '.13em', marginBottom: 12, fontFamily: "'DM Sans',sans-serif" } }, 'Connect With Us'), h('div', { style: { display: 'flex', gap: 10 } }, [{ icon: h(FbIcon), label: 'Facebook' }, { icon: h(IgIcon), label: 'Instagram' }].map((s) => h('a', { key: s.label, href: s.label === 'Facebook' ? 'https://www.facebook.com/purvaatravelsofficiall/' : 'https://www.instagram.com/purvaatoursandtravels/', target: '_blank', 'aria-label': s.label, style: { width: 40, height: 40, borderRadius: 8, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'background .2s' }, onMouseOver: (e) => { e.currentTarget.style.background = '#FCE205'; }, onMouseOut: (e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; } }, s.icon))))
    )
  ),
  h('div', { style: { borderTop: '1px solid rgba(255,255,255,0.08)', padding: '18px 80px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 10 } }, h('p', { style: { fontSize: 12, color: 'rgba(255,255,255,0.38)', fontFamily: "'DM Sans',sans-serif", margin: 0 } }, 'All Rights Reserved © 2026 ', h('a', { href: 'https://purvaatravels.com/', target: '_blank', style: { color: 'rgba(255,255,255,0.38)', textDecoration: 'none' } }, ['purvaatravels.com'])))
);
