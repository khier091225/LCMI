/**
 * Laguna Carparts Mfg., Inc. (LCMI) Website Clone
 * Interactive Navigation, Responsive Menu, and Image Lightbox
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Activate transition states and image loaded states
  document.querySelectorAll('.transition').forEach((el) => {
    el.setAttribute('data-animation-state', 'active');
  });

  document.querySelectorAll('[data-animation-role="image"], [data-animation-role="block-element"]').forEach((el) => {
    el.setAttribute('data-animation-state', 'active');
    el.classList.add('loaded');
  });

  // 2. Mobile Hamburger Navigation Menu
  const burgerBtn = document.querySelector('.block-header__hamburger-menu');
  const mobileDropdown = document.querySelector('.block-header-layout-mobile__dropdown');

  if (burgerBtn && mobileDropdown) {
    burgerBtn.setAttribute('aria-expanded', 'false');

    const toggleMobileMenu = (forceState) => {
      const isOpen = typeof forceState === 'boolean'
        ? forceState
        : !burgerBtn.classList.contains('burger--open');

      burgerBtn.classList.toggle('burger--open', isOpen);
      mobileDropdown.classList.toggle('block-header-layout-mobile__dropdown--open', isOpen);
      burgerBtn.setAttribute('aria-expanded', String(isOpen));
    };

    burgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    document.addEventListener('click', (e) => {
      if (
        burgerBtn.classList.contains('burger--open') &&
        !mobileDropdown.contains(e.target) &&
        !burgerBtn.contains(e.target)
      ) {
        toggleMobileMenu(false);
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 920 && burgerBtn.classList.contains('burger--open')) {
        toggleMobileMenu(false);
      }
    });
  }

  // 3. Fullscreen Image Lightbox for Page Content Images
  const imageWrappers = Array.from(document.querySelectorAll('.page__blocks .image-wrapper'));
  if (imageWrappers.length > 0) {
    const galleryItems = [];

    imageWrappers.forEach((wrapper) => {
      const img = wrapper.querySelector('img.image__image');
      if (!img) return;
      const src = img.getAttribute('src');
      const alt = img.getAttribute('alt') || 'Laguna Carparts Mfg., Inc.';
      const index = galleryItems.length;
      galleryItems.push({ src, alt });

      wrapper.addEventListener('click', () => {
        openLightbox(index);
      });
    });

    // Create Lightbox DOM
    const lightbox = document.createElement('div');
    lightbox.className = 'lcmi-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image preview');
    lightbox.innerHTML = `
      <button type="button" class="lcmi-lightbox__close" aria-label="Close preview" title="Close (Esc)">&times;</button>
      <button type="button" class="lcmi-lightbox__prev" aria-label="Previous image" title="Previous">&#10094;</button>
      <div class="lcmi-lightbox__content">
        <img class="lcmi-lightbox__image" src="" alt="">
      </div>
      <button type="button" class="lcmi-lightbox__next" aria-label="Next image" title="Next">&#10095;</button>
      <div class="lcmi-lightbox__counter"></div>
    `;
    document.body.appendChild(lightbox);

    const lbImg = lightbox.querySelector('.lcmi-lightbox__image');
    const lbClose = lightbox.querySelector('.lcmi-lightbox__close');
    const lbPrev = lightbox.querySelector('.lcmi-lightbox__prev');
    const lbNext = lightbox.querySelector('.lcmi-lightbox__next');
    const lbCounter = lightbox.querySelector('.lcmi-lightbox__counter');

    let currentIndex = 0;

    function updateLightboxSlide() {
      const item = galleryItems[currentIndex];
      if (!item) return;
      lbImg.src = item.src;
      lbImg.alt = item.alt;
      lbCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
      const showNav = galleryItems.length > 1;
      lbPrev.style.display = showNav ? 'flex' : 'none';
      lbNext.style.display = showNav ? 'flex' : 'none';
      lbCounter.style.display = showNav ? 'block' : 'none';
    }

    function openLightbox(index) {
      currentIndex = index;
      updateLightboxSlide();
      lightbox.classList.add('lcmi-lightbox--open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('lcmi-lightbox--open');
      document.body.style.overflow = '';
    }

    function showPrev(e) {
      if (e) e.stopPropagation();
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      updateLightboxSlide();
    }

    function showNext(e) {
      if (e) e.stopPropagation();
      currentIndex = (currentIndex + 1) % galleryItems.length;
      updateLightboxSlide();
    }

    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', showPrev);
    lbNext.addEventListener('click', showNext);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lcmi-lightbox__content')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('lcmi-lightbox--open')) {
        if (e.key === 'Escape' && burgerBtn && burgerBtn.classList.contains('burger--open')) {
          burgerBtn.click();
        }
        return;
      }
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });
  }
});

