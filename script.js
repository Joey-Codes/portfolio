//Backgrounds
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('#sidebar ul li a');
    const overlay = document.querySelector('.overlay');
    const starsContainer = document.getElementById('stars-container'); 
    const sidebar = document.getElementById('sidebar'); 

    const observerThresh = { threshold: .5 };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const activeLink = document.querySelector(`#sidebar ul li a[data-section="${sectionId}"]`);
                const bgcolor = activeLink.getAttribute('data-bgcolor');
                const color = activeLink.getAttribute('data-color');
                const sidebarBorderColor = (sectionId === 'about') ? 'white' : 'black';
                const sidebarLinkColor = (sectionId === 'about') ? 'white' : 'black';

                overlay.style.backgroundColor = bgcolor;
                sidebar.style.borderColor = sidebarBorderColor;
                setActiveTab(sectionId, color);
                updateSidebarLinkColors(sidebarLinkColor);
                
                if (sectionId === 'about') {
                    starsContainer.style.display = 'block';
                } else {
                    starsContainer.style.display = 'none';
                }

                if (sectionId === 'experience') {
                    const expSec = document.querySelectorAll('.experience-section');
                    expSec.forEach(expSection => {
                        if (entry.intersectionRatio > 0) {
                            expSection.style.backgroundColor = 'white';
                        } else {
                            expSection.style.backgroundColor = 'transparent';
                        }
                    });
                } else {
                    const otherExpSec = document.querySelectorAll('.experience-section');
                    otherExpSec.forEach(expSection => {
                        expSection.style.backgroundColor = 'transparent';
                    });
                }
            }
        });
    }, observerThresh);

    sections.forEach(section => {
        observer.observe(section);
    });

    window.onscroll = () => {
        var current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').substring(1) === current) {
                a.classList.add('active');
            }
        });
    };

    function setActiveTab(sectionId, color) {
        navLi.forEach(link => {
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
                link.style.color = color; 
            } else {
                link.classList.remove('active');
                link.style.color = ''; 
            }
        });
    }

    function updateSidebarLinkColors(color) {
        navLi.forEach(link => {
            if (!link.classList.contains('active')) {
                link.style.color = color;
            }
        });
    }
});


// Stars
let starId = 0;

function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.id = `star-${starId++}`;

    const size = Math.random() * 20 + 10; 
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16); 

    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.backgroundColor = color;

    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() > 0.5 ? 0 : window.innerHeight;

    star.style.left = startX + 'px';
    star.style.top = startY + 'px';

    const duration = Math.random() * 5 + 3; 

    const endY = startY === 0 ? window.innerHeight : 0;

    star.animate([
        { transform: `translateY(0px)` },
        { transform: `translateY(${endY - startY}px)` }
    ], {
        duration: duration * 1000, 
        iterations: Infinity,
        easing: 'linear' 
    });

    return star;
}

function addStars(numStars) {
    const container = document.getElementById('stars-container');
    for (let i = 0; i < numStars; i++) {
        container.appendChild(createStar());
    }
}

function updateVisibility() {
    const stars = document.querySelectorAll('.star');
    const sidebar = document.getElementById('sidebar').getBoundingClientRect();
    const aboutSection = document.querySelector('.stars-block').getBoundingClientRect();

    stars.forEach(star => {
        const starRect = star.getBoundingClientRect();

        const isInSidebar = (
            starRect.right > sidebar.left &&
            starRect.left < sidebar.right &&
            starRect.bottom > sidebar.top &&
            starRect.top < sidebar.bottom
        );

        const isInAboutSection = (
            starRect.right > aboutSection.left &&
            starRect.left < aboutSection.right &&
            starRect.bottom > aboutSection.top &&
            starRect.top < aboutSection.bottom
        );

        if (isInSidebar || isInAboutSection) {
            star.style.visibility = 'hidden';
        } else {
            star.style.visibility = 'visible';
        }
    });
}

addStars(50);
setInterval(updateVisibility, 100);


//Gallery
document.addEventListener('DOMContentLoaded', function () {
    const galleryThresh = { threshold: 1 };

    const galleryObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const galleryInput = entry.target.querySelector('input[type="checkbox"]');
                if (galleryInput) {
                    setTimeout(() => {
                        galleryInput.checked = true;
                    }, 500)
                }
            }
        })  
    }, galleryThresh);

    const gallerySection = document.querySelector('.gallery');
    if (gallerySection) {
        galleryObserver.observe(gallerySection);
    }
})



//Modal
var modal = document.getElementById("modal");
var closeBtn = modal.querySelector(".close");
var galleryImages = document.querySelectorAll(".gallery img");

function openModal(imageSrc, customText) {
    var modalImage = modal.querySelector("#modal-image");
    var modalText = modal.querySelector("#modal-text");

    modalImage.src = imageSrc;
    modalText.innerHTML = customText; 
    modal.classList.add('show');
    modal.style.display = "block";
}

function closeModal() {
    modal.classList.remove('show');
    modal.style.display = "none";
}

galleryImages.forEach(function(image) {
    image.addEventListener("click", function() {
        var customText = "";
        if (image.src.includes("silva_boxing.png")) {
            customText = `<a href="https://silvaboxing-mma.com"><h2>Silva Boxing MMA</h2></a><p>Silva Boxing & MMA is a boxing & MMA gym located in West Hills, CA. They offer training for everyone at any fitness level, from the average person who wants to get in shape to the amateur/pro MMA fighter who's ready to take their skills to the next level.</p>`;
        } else if (image.src.includes("open_space_stl.png")) {
            customText = `<a href="https://openspacestl.org/"><h2>Open Space STL</h2></a><p>Open Space STL is a nonprofit that works independently and collaboratively to conserve and sustain land, water, and other natural resources for the health and well-being of people throughout the St. Louis region.</p>`;
        } else if (image.src.includes("st_michael.png")) {
            customText = `<a href="https://stmichaelvannuys.org"><h2>St Michael Antiochian Orthodox Church</h2></a><p>St. Michael in Van Nuys began serving Orthodox Christians in the San Fernando Valley on January 12, 1969.</p>`;
        } else if (image.src.includes("crossroads_youth.png")) {
            customText = `<a href="https://crossroadsyouth-communitygroup.org"><h2>Crossroads Youth and Community Group</h2></a><p>Crossroads is a nonprofit based in Tuscon, Arizona that provides resources & services that support the transition of youth & those aging out of foster care from homelessness to self-sufficiency and stable independent living.</p>`;
        }

        openModal(image.src, customText);
    });
});

closeBtn.addEventListener("click", closeModal);

window.addEventListener("click", function(event) {
    if (event.target == modal) {
        closeModal();
    }
});

// Vids
document.addEventListener('DOMContentLoaded', () => {
    const projectButtons = document.querySelectorAll('.project-button');
    const videoElement = document.getElementById('project-video');
    const titleElement = document.getElementById('project-title');
    const descriptionElement = document.getElementById('project-description');
    const linkElement = document.getElementById('project-link')
    const toolsElement = document.getElementById('project-tools');
    const screenElement = document.querySelector('.screen');

    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            projectButtons.forEach(btn =>btn.classList.remove('active'));
            button.classList.add('active');
            
            const videoSrc = button.getAttribute('data-video');
            const title = button.getAttribute('data-title');
            const description = button.getAttribute('data-description');
            const link = button.getAttribute('data-link');
            const tools = button.getAttribute('data-tools');

            videoElement.src = videoSrc;
            videoElement.loop = true;
            videoElement.play();

            titleElement.textContent = title;
            descriptionElement.textContent = description;
            linkElement.setAttribute('href', link);
            toolsElement.textContent = tools;

            screenElement.style.display = 'block';
        });
    });
});

/* document.addEventListener('DOMContentLoaded', () => {
    const cube = document.querySelector('.cube');
  
    cube.addEventListener('click', () => {
      cube.classList.add('clicked');
      
      // Optionally, remove the class after the animation ends if needed
      cube.addEventListener('animationend', () => {
        cube.classList.remove('clicked');
      });
    });
  });
   */

