// Mobile navigation toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("toggle");
    });
  }
  
  // Close mobile menu when clicking on links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("active");
        hamburger.classList.remove("toggle");
      }
    });
  });
  
  // Set active page in navigation
  const currentPage = location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  // Close menu when resizing to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("toggle");
    }
  });
  
  // Dark mode toggle
  const themeToggle = document.createElement('button');
  themeToggle.classList.add('theme-toggle');
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  themeToggle.setAttribute('aria-label', 'Toggle dark mode');
  
  // Add to navbar
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.insertAdjacentElement('afterend', themeToggle);
  }
  
  // Check saved preference
  const savedTheme = localStorage.getItem('theme') || 'dark-theme';
  document.body.className = savedTheme;
  updateThemeIcon(savedTheme);
  
  themeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark-theme') 
      ? 'light-theme' 
      : 'dark-theme';
    
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
  
  function updateThemeIcon(theme) {
    themeToggle.innerHTML = theme === 'dark-theme' 
      ? '<i class="fas fa-moon"></i>' 
      : '<i class="fas fa-sun"></i>';
  }
});

// Back to top button
document.addEventListener('DOMContentLoaded', function() {
  const backToTop = document.createElement('button');
  backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTop.classList.add('back-to-top');
  document.body.appendChild(backToTop);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
    
    // Tag filtering
    if (tagInput) {
      tagInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        
        projectCards.forEach(card => {
          const tags = card.dataset.tags.toLowerCase();
          if (searchTerm === '' || tags.includes(searchTerm)) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
            }, 50);
          } else {
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    }
    
    // Card animations
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
      observer.observe(card);
    });
    
    // Image loading handler
    document.querySelectorAll('.card img, .card video').forEach(media => {
      media.onload = media.onloadeddata = function() {
        const card = this.closest('.card');
        card.classList.add('loaded');
        if (card.querySelector('.skeleton')) {
          card.querySelector('.skeleton').style.display = 'none';
        }
        card.querySelectorAll('.skeleton-text').forEach(el => el.remove());
      };
      
      // Trigger loading for cached images
      if (media.complete) media.onload();
    });
  }
});

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered:', registration);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  });
}