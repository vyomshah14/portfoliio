import { useEffect } from 'react';
import { photos } from '../data/photos.js';
import { renderGithubCalendar } from '../data/renderGithubCalendar.js';

function renderPhotos() {
  const grid = document.getElementById('photoGrid');
  if (!grid || grid.dataset.rendered === 'true') return;
  grid.dataset.rendered = 'true';
  grid.innerHTML = `
    <div class="photography-track">
      ${photos.map((photo) => `
        <div class="photography-item" data-category="${photo.category}">
          <img src="assets/photography/${photo.src}" alt="Photography - ${photo.category}" loading="lazy">
          <div class="photography-overlay"><span class="photography-category">${photo.category}</span></div>
        </div>
      `).join('')}
    </div>
  `;
}

export function useStaticInteractions(pageKey, navigate) {
  useEffect(() => {
    renderPhotos();
    renderGithubCalendar();

    const handleClick = (event) => {
      const link = event.target.closest('a[href]');
      if (link) {
        const href = link.getAttribute('href');
        if (href?.startsWith('#') && href.length > 1) {
          event.preventDefault();
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (href?.endsWith('.html') || href?.startsWith('/')) {
          event.preventDefault();
          navigate(href);
        }
      }

      const authTrigger = event.target.closest('[data-auth-trigger]');
      if (authTrigger) {
        event.preventDefault();
        window.openClerkSignIn?.();
      }

      const projectFilter = event.target.closest('.filter-section .filter-btn[data-filter]');
      if (projectFilter && document.querySelector('.projects-grid')) {
        const filter = projectFilter.dataset.filter;
        document.querySelectorAll('.filter-section .filter-btn').forEach((button) => button.classList.remove('active'));
        projectFilter.classList.add('active');
        document.querySelectorAll('.project-card').forEach((card) => {
          const visible = filter === 'all' || card.dataset.category === filter;
          card.style.display = visible ? 'block' : 'none';
          card.style.opacity = visible ? '1' : '0';
          card.style.transform = visible ? 'translateY(0)' : 'translateY(20px)';
        });
      }

      const togglePhotos = event.target.closest('#toggle-photography-btn');
      if (togglePhotos) {
        const wrapper = document.getElementById('photography-gallery-wrapper');
        if (!wrapper) return;
        const isHidden = wrapper.style.display === 'none';
        wrapper.style.display = isHidden ? 'block' : 'none';
        togglePhotos.textContent = isHidden ? 'Hide my photography skills' : 'See my photography skills here!!!';
        if (isHidden) setTimeout(() => wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }

      const photoFilter = event.target.closest('#photography-filters .filter-btn[data-filter]');
      if (photoFilter) {
        const filter = photoFilter.dataset.filter;
        document.querySelectorAll('#photography-filters .filter-btn').forEach((button) => button.classList.remove('active'));
        photoFilter.classList.add('active');
        document.querySelectorAll('.photography-item').forEach((item) => {
          item.style.display = filter === 'all' || item.dataset.category === filter ? 'inline-block' : 'none';
        });
      }
    };

    const handleSubmit = (event) => {
      if (event.target.id !== 'contactForm') return;
      const message = document.getElementById('formMessage');
      if (message) {
        message.textContent = 'Sending your message...';
        message.style.display = 'block';
        message.style.color = 'var(--accent-primary)';
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('submit', handleSubmit);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('submit', handleSubmit);
    };
  }, [pageKey, navigate]);
}
