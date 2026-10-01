const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-main');

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  menuToggle.classList.toggle('open', !open);
  nav?.classList.toggle('open', !open);
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.classList.remove('open');
    nav.classList.remove('open');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const stage = document.getElementById('symbol-stage');
const layerButtons = document.querySelectorAll('.layer-btn');

layerButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    layerButtons.forEach(item => item.classList.remove('active'));
    btn.classList.add('active');
    if (stage) stage.dataset.state = btn.dataset.layer || 'pre';
  });
});

const motionAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const portrait = document.querySelector('.portrait-shell');

if (motionAllowed && portrait && window.matchMedia('(pointer: fine)').matches) {
  portrait.addEventListener('pointermove', (event) => {
    const rect = portrait.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    portrait.style.transform = `perspective(900px) rotateY(${x * 2.8}deg) rotateX(${y * -2.2}deg)`;
  });

  portrait.addEventListener('pointerleave', () => {
    portrait.style.transform = '';
  });
}
