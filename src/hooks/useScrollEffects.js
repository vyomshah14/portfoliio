import { useEffect } from 'react';

function animateCounter(element) {
  const target = Number.parseInt(element.getAttribute('data-target'), 10);
  if (!target || element.dataset.counted === 'true') return;
  element.dataset.counted = 'true';
  const duration = 1600;
  const startedAt = performance.now();

  const step = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    element.textContent = `${Math.floor(target * progress)}${progress === 1 ? '+' : ''}`;
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

export function useScrollEffects(pageKey) {
  useEffect(() => {
    const revealTargets = document.querySelectorAll(
      '.animate-on-scroll, .skill-category, .project-card, .timeline-item, .education-card, .certification-card',
    );

    revealTargets.forEach((element) => {
      if (!element.classList.contains('animate-on-scroll')) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        if (entry.target.classList.contains('stat-number')) animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -45px 0px' });

    revealTargets.forEach((element) => observer.observe(element));
    document.querySelectorAll('.stat-number').forEach((element) => observer.observe(element));

    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const bar = entry.target;
        const width = bar.style.width;
        bar.style.width = '0%';
        requestAnimationFrame(() => {
          bar.style.width = width;
        });
        skillObserver.unobserve(bar);
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-progress').forEach((bar) => skillObserver.observe(bar));

    return () => {
      observer.disconnect();
      skillObserver.disconnect();
    };
  }, [pageKey]);
}
