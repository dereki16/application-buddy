
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

$(document).ready(function() {
  // Define section IDs
  const sectionIDs = [
      'portfolio',
      'chatBot',
      'cover-letter',
      'contact',
      'ty-about-section',
      'privacy',
      'personalInfoContainer',
      'educationalContainer',
      'linksContainer',
      'jobInfoContainer',
      'certsContainer',
      'awardsContainer',
      'jobRefContainer',
      'moreContainer',
      'answersContainer'
  ];

  // Cache sections
  const sections = sectionIDs.map(id => $('#' + id)).filter(section => section.length);

  // Click event for smooth scroll - main navbar
  $("#navbar a").on('click', function(event) {
      event.preventDefault();
      $('html, body').animate({
          scrollTop: $($(this).attr('href')).offset().top - 70
      }, 500);
  });

  // Click event for smooth scroll - sidebar
  $("#side-navbar a").on('click', function(event) {
      event.preventDefault();
      $('html, body').animate({
          scrollTop: $($(this).attr('href')).offset().top - 70
      }, 100);
  });

  // Handling the scroll event
  $(window).scroll(function() {
    let fromTop = $(window).scrollTop() + 80;
    let currentSection = null;
    
    sections.forEach(section => {
        let offset = 0;
        if (section.attr('id') === 'answersContainer') {
            offset = 200;
        } else if (section.attr('id') === 'personalInfoContainer') {
            offset = 300;  // or whatever value you desire for this section
        }        
        if (section.offset().top - offset <= fromTop && section.offset().top + section.height() > fromTop) {
            currentSection = section;
        }
    });

    // Removing and adding active class in side navbar
    $('#side-navbar a').removeClass('side-active');
    if (currentSection) {
        $('#side-navbar a[href="#' + currentSection.attr('id') + '"]').addClass('side-active');
    }

    // Show side-navbar only when inside #portfolio
    let portfolioTop = $('#portfolio').offset().top;
    var portfolioBottom = portfolioTop + $('#portfolio').outerHeight() - 350;

    if (fromTop >= portfolioTop && fromTop <= portfolioBottom) {
        $('#side-navbar').addClass('active');
    } else {
        $('#side-navbar').removeClass('active');
    }
});

  // Navigate to section on direct access with hash in URL
  if (window.location.hash) {
      $('html, body').animate({
          scrollTop: $(window.location.hash).offset().top - 70
      }, 800);
  }
});
