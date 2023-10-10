let stylesApplied = false;
let isTransitioning = false;

let previousScrollPosition = $(window).scrollTop();
let stylesRemovedThreshold = 10; 

let scrollInterval;

let start;
let keepScrolling = false;
 let bottomElement = document.querySelector('#page-bottom');

function deactivateAllNavLinks() {
    document.querySelectorAll('.nav-item a').forEach(link => {
        link.classList.remove('active');
    });
}

function activateNavLink(id) {
    const link = document.querySelector(`a[href="${id}"]`);
    if (link) {
        link.classList.add('active');
    }
}

$(document).ready(function() {
    $('#socials-btn').on('click', function() {
        setTimeout(() => {
            let position = bottomElement.getBoundingClientRect().bottom + window.scrollY;
            window.scrollTo(0, position);
            keepScrolling = true;
        }, 750);
    });
});


window.addEventListener('scroll', function() {
    const currentScrollPosition = $(window).scrollTop();
   
    // Check if user is at the bottom of the page
    if (currentScrollPosition + $(window).height() == $(document).height() && window.innerWidth > 400) {
        if (!stylesApplied && !isTransitioning) {
            isTransitioning = true;
            applyStyles();
            previousScrollPosition = currentScrollPosition;

            setTimeout(() => {
                stylesApplied = true;
                isTransitioning = false;
                clearInterval(scrollInterval);
            }, 1100);
        }
    } else if (stylesApplied && !isTransitioning && (previousScrollPosition - currentScrollPosition >= stylesRemovedThreshold)) {
        isTransitioning = true;
        removeStyles();
        setTimeout(() => {
            keepScrolling = false;
            stylesApplied = false;
            isTransitioning = false;
        }, 1100);
    }

    if(currentScrollPosition + $(window).height() == $(document).height()) {
        previousScrollPosition = currentScrollPosition;
    }
});

function applyStyles() {

    // .copyright
    let copyRight = document.querySelector('.copyright');
    copyRight.style.height = "200px";
    copyRight.style.transition = "all 1s ease-in-out";

    // .committed-section
    let committedSections = document.querySelectorAll('.committed-section');
    committedSections.forEach(element => {
        element.style.padding = "5px 0px";
    });

    // #contact-suggestion
    let contactSuggestion = document.getElementById('contact-suggestion');
    if (contactSuggestion) {
        contactSuggestion.style.fontSize = "1.8vh";
    }

    // #socials
    let socials = document.getElementById('socials');
    if (socials) {
        socials.style.margin = "10px 0px 100px 0px";
        socials.style.transition = "all 1s ease-in-out";
    }

    // #socials .col-lg-6
    let socialsCol = document.querySelectorAll('#socials .col-lg-6');
    socialsCol.forEach(element => {
        //element.style.backgroundColor = "#3ebc9d";
        element.style.borderRadius = "20px";
        element.style.height = "200px";
        element.style.transition = "all 1s ease-in-out";

    });

    // #socials h4
    let socialsH4 = document.querySelectorAll('#socials h4');
    socialsH4.forEach(element => {
        element.style.fontSize = "3.5vh";
        element.style.transition = "all 1s ease-in-out";
    });

    // #socials p
    let socialsP = document.querySelectorAll('#socials p');
    socialsP.forEach(element => {
        element.style.fontSize = "2.5vh";
        element.style.transition = "all 1s ease-in-out";
    });

    // #socials .row
    let socialsRow = document.querySelectorAll('#socials .row');
    socialsRow.forEach(element => {
        element.style.padding = "5px";
        element.style.transition = "all 1s ease-in-out";
    });

    // .btn-social
    let btnSocial = document.querySelectorAll('.btn-social');
    btnSocial.forEach(element => {
        element.style.width = "4.25rem";
        element.style.height = "4.25rem";
        element.style.fontSize = "3vh";
        element.style.transition = "all 1s ease-in-out";

        element.addEventListener('mouseover', function() {
            element.style.fontSize = "4vh";
            element.style.transition = "all 0.3s ease-in-out";
        });

        element.addEventListener('mouseout', function() {
            element.style.fontSize = "3vh";
            element.style.transition = "all 0.3s ease-in-out";
        });
    });
}

function removeStyles() {

    // copyright
    let copyRight = document.querySelector('.copyright');
    copyRight.style.height = "75px";
    copyRight.style.transition = "all 1s ease-in-out";

    // .committed-section
    let committedSections = document.querySelectorAll('.committed-section');
    committedSections.forEach(element => {
        element.style.padding = "";
    });

    // #contact-suggestion
    let contactSuggestion = document.getElementById('contact-suggestion');
    if (contactSuggestion) {
        contactSuggestion.style.fontSize = "";
    }

    // #socials
    let socials = document.getElementById('socials');
    if (socials) {
        socials.style.margin = "100px 0px 10px 0px";
    }

    // #socials .col-lg-6
    let socialsCol = document.querySelectorAll('#socials .col-lg-6');
    socialsCol.forEach(element => {
    // Set the transition first.
    element.style.transition = "all 1s ease-in-out";
    
    // Apply the other styles.
    //element.style.backgroundColor = "#2d3f50";
    //element.style.border = "1px solid #2d3f50!important";
    //element.style.borderRadius = "15px";
    element.style.height = "200px";
    
    setTimeout(() => {
        let new_element = element.cloneNode(true);
        element.parentNode.replaceChild(new_element, element);
    }, 1000); 
});

    // #socials h4
    let socialsH4 = document.querySelectorAll('#socials h4');
    socialsH4.forEach(element => {
        element.style.fontSize = "2.5vh";
        setTimeout(() => {
            let new_element = element.cloneNode(true);
            element.parentNode.replaceChild(new_element, element);
        }, 1000); 
    });

    // #socials p
    let socialsP = document.querySelectorAll('#socials p');
    socialsP.forEach(element => {
        element.style.fontSize = "";
    });

    // #socials .row
    let socialsRow = document.querySelectorAll('#socials .row');
    socialsRow.forEach(element => {
        element.style.padding = "";
    });

    let btnSocial = document.querySelectorAll('.btn-social');
btnSocial.forEach(element => {
    element.style.width = "3.25rem";
    element.style.height = "3.25rem";
    element.style.fontSize = "2vh";
    element.style.transition = "all 1s ease-in-out";

    element.addEventListener('mouseover', function() {
        element.style.transition = "fontSize 0.3s ease-in-out, width 0.3s ease-in-out, height 0.3s ease-in-out";  // specify properties
    });

    element.addEventListener('mouseout', function() {
        element.style.transition = "fontSize 0.3s ease-in-out, width 0.3s ease-in-out, height 0.3s ease-in-out";  // specify properties
    });

    setTimeout(() => {
        let new_element = element.cloneNode(true);
        element.parentNode.replaceChild(new_element, element);
    }, 1000); 
});

}

