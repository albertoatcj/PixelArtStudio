// Interações da página única PixelArt Studio
document.addEventListener('DOMContentLoaded', () => {
  // Scroll suave nas âncoras do menu
  const menuLinks = document.querySelectorAll('.menu-link');
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      if (hash.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Scroll spy: destaca seção ativa
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          document.querySelectorAll('.menu-link').forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-50% 0px -50% 0px', threshold: 0.01 }
  );
  sections.forEach(sec => observer.observe(sec));

  // Botão voltar ao topo
  const toTopBtn = document.getElementById('toTop');
  const toggleToTop = () => {
    if (window.scrollY > 240) toTopBtn.classList.add('show');
    else toTopBtn.classList.remove('show');
  };
  toggleToTop();
  window.addEventListener('scroll', toggleToTop);
  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Validação simples do formulário de contato
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    feedback.textContent = '';
    feedback.className = 'feedback';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const errors = [];

    if (name.length < 3) {
      errors.push('• O nome deve ter pelo menos 3 caracteres.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      errors.push('• Informe um email válido.');
    }

    if (message.length < 10) {
      errors.push('• A mensagem deve ter pelo menos 10 caracteres.');
    }

    if (errors.length) {
      feedback.classList.add('error');
      feedback.innerHTML = errors.join('<br>');
      return;
    }

    // Simula envio visual
    feedback.classList.add('success');
    feedback.textContent = '✅ Mensagem enviada! Em breve entraremos em contato.';
    form.reset();
  });
});
