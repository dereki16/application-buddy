
window.addEventListener('DOMContentLoaded', event => {

  // Navbar shrink function
  var navbarShrink = function() {
    const navbarCollapsible = document.body.querySelector('#mainNav');
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove('navbar-shrink')
    } else {
      navbarCollapsible.classList.add('navbar-shrink')
    }

  };

  // Shrink the navbar 
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener('scroll', navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      rootMargin: '0px 0px -40%',
    });
  };

  // Stylize active nav link
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll('#navbarResponsive .nav-link')
  );
  responsiveNavItems.map(function(responsiveNavItem) {
    responsiveNavItem.addEventListener('click', () => {
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const sections = [
    document.getElementById('portfolio'),
    document.getElementById('chatBot'),
    document.getElementById('cover-letter'),
    document.getElementById('contact'),
    document.getElementById('about'),
    document.getElementById('privacy')
].filter(section => section !== null);


  const navLinks = document.querySelectorAll('.nav-link');

  function deactivateAllLinks() {
      navLinks.forEach(link => link.classList.remove('active'));
  }

  window.addEventListener('scroll', function() {
      let currentSection = null;

      sections.forEach(section => {
        if (!section) return;
          let threshold = 100;  
          const sectionTop = section.offsetTop;
          if (window.scrollY >= sectionTop - threshold) {
              currentSection = section;
          }
      });

      deactivateAllLinks();
      if (currentSection) {
          const currentLink = document.querySelector(`.nav-link[href="#${currentSection.id}"]`);
          if (currentLink) {
              currentLink.classList.add('active');
          }
      }
  });
});

$(document).ready(function() {
  if (window.location.hash) {
      const hash = window.location.hash;
      $('html, body').animate({
          scrollTop: $(hash).offset().top - 100
      }, 800);  
  }
});
