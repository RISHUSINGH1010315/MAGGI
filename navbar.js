(function() {
  let lastScrollY = window.scrollY;
  const navbar = document.querySelector('nav');
  const filtersBar = document.getElementById('filters-bar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      // Don't trigger if scroll position is very close to the top
      if (currentScrollY < 50) {
        navbar.style.transform = 'translate(-50%, 0)';
        navbar.style.opacity = '1';
        navbar.style.pointerEvents = 'auto';
        if (filtersBar) filtersBar.style.top = '96px';
        lastScrollY = currentScrollY;
        return;
      }
      
      // Calculate scroll difference
      const diff = currentScrollY - lastScrollY;
      
      // Hide if scrolling down; show if scrolling up
      if (diff > 5) {
        navbar.style.transform = 'translate(-50%, -150%)';
        navbar.style.opacity = '0';
        navbar.style.pointerEvents = 'none';
        if (filtersBar) filtersBar.style.top = '0px';
      } else if (diff < -5) {
        navbar.style.transform = 'translate(-50%, 0)';
        navbar.style.opacity = '1';
        navbar.style.pointerEvents = 'auto';
        if (filtersBar) filtersBar.style.top = '96px';
      }
      
      lastScrollY = currentScrollY;
    }, { passive: true });
  }
})();
