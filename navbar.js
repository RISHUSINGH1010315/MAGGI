(function() {
  let lastScrollY = window.scrollY;
  const navbar = document.querySelector('nav');
  const filtersBar = document.getElementById('filters-bar');
  let isMenuOpen = false;

  if (navbar) {
    // --- Dynamic Mobile Drawer Injection ---
    const drawer = document.createElement('div');
    drawer.id = 'mobile-menu-drawer';
    drawer.className = 'fixed inset-0 z-40 bg-surface/98 dark:bg-inverse-surface/98 backdrop-blur-2xl flex flex-col justify-between pt-28 pb-12 px-8 transition-all duration-300 transform -translate-y-full opacity-0 pointer-events-none';
    drawer.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease';

    const linksContainer = document.createElement('div');
    linksContainer.className = 'flex-grow flex flex-col justify-center items-center gap-6 overflow-y-auto w-full';
    drawer.appendChild(linksContainer);

    // Clone desktop links
    const desktopLinks = navbar.querySelectorAll('.hidden.md\\:flex a');
    desktopLinks.forEach(link => {
      const clone = link.cloneNode(true);
      // Apply beautiful mobile drawer typography and spacing styles
      clone.className = 'font-bold text-2xl tracking-wide py-3 block w-full text-center transition-all duration-300 hover:text-secondary dark:hover:text-secondary-fixed hover:scale-105';
      
      // Preserve active state highlights
      if (link.classList.contains('text-secondary') || link.classList.contains('border-secondary')) {
        clone.className += ' text-secondary dark:text-secondary-fixed';
      } else {
        clone.className += ' text-on-surface-variant';
      }

      // Close menu when clicking a link
      clone.addEventListener('click', () => {
        closeMobileMenu();
      });
      linksContainer.appendChild(clone);
    });

    // Clone Join Club button
    const joinClubBtn = navbar.querySelector('a[href*="JoinClub"]');
    if (joinClubBtn) {
      const cloneBtn = joinClubBtn.cloneNode(true);
      cloneBtn.className = 'btn-gradient text-white text-lg font-bold px-8 py-3.5 rounded-full shadow-lg text-center mt-6 w-full max-w-xs block';
      cloneBtn.classList.remove('hidden', 'md:inline-flex');
      cloneBtn.addEventListener('click', () => {
        closeMobileMenu();
      });
      linksContainer.appendChild(cloneBtn);
    }

    document.body.appendChild(drawer);

    // --- Hamburger Button Event Handlers ---
    const menuBtn = navbar.querySelector('.md\\:hidden');
    let menuIcon = null;

    if (menuBtn) {
      menuIcon = menuBtn.querySelector('.material-symbols-outlined');
      menuBtn.addEventListener('click', () => {
        if (isMenuOpen) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });
    }

    function openMobileMenu() {
      isMenuOpen = true;
      if (menuIcon) {
        menuIcon.textContent = 'close';
        menuIcon.style.color = '#bb0013'; // highlight in theme color
      }
      
      drawer.style.transform = 'translateY(0)';
      drawer.style.opacity = '1';
      drawer.style.pointerEvents = 'auto';
      
      // Lock scroll
      document.body.style.overflow = 'hidden';
      
      // Ensure navbar is fully visible and not shifted
      navbar.style.transform = 'translate(-50%, 0)';
      navbar.style.opacity = '1';
    }

    function closeMobileMenu() {
      isMenuOpen = false;
      if (menuIcon) {
        menuIcon.textContent = 'menu';
        menuIcon.style.color = '';
      }
      
      drawer.style.transform = 'translateY(-100%)';
      drawer.style.opacity = '0';
      drawer.style.pointerEvents = 'none';
      
      // Restore scroll
      document.body.style.overflow = '';
    }

    // --- Scroll-to-Hide Behavior ---
    window.addEventListener('scroll', () => {
      if (isMenuOpen) return; // Do not hide navbar if menu is open
      
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
