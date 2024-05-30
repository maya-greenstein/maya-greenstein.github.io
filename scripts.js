

function setBackground() {
    const body = document.body;
    const isMobile = window.innerWidth <= 768; // Define mobile width threshold

    if (body.id === 'home-page') {
        if (isMobile) {
            body.style.backgroundImage = 'url("images/pages_br3.jpg")'; // Mobile background image
        } else {
            body.style.backgroundImage = 'url("images/home_br2.jpg")'; // Desktop background image
        }
    } else if(body.id === 'ind_project') {
        body.style.backgroundImage = 'url("images/project_br.jpg")';
    }
    else {
      body.style.backgroundImage = 'url("images/pages_br3.jpg")';
    }
}

// Execute on page load
window.onload = function() {
    setBackground();
    // projectPopulate(); // Uncomment if needed
};

// Attach event listener to window resize to update background image dynamically
window.onresize = function() {
    setBackground();
};

// // Function to handle toggling of project expansion
// function toggleProjectExpansion(projectId) {
//     const project = document.getElementById(projectId);
//     project.classList.toggle('expanded');
// }

// // Attach click event listeners to project elements
// document.querySelectorAll('.project').forEach(project => {
//     project.addEventListener('click', function() {
//         const projectId = this.id;
//         toggleProjectExpansion(projectId);
//     });
// });

let slideIndex = 0;
const images = ["images/maya1.jpg", "images/maya2.jpg", "images/maya3.jpg", "images/maya4.jpg"]; // Array of image paths

// Start the slideshow
let slideshowInterval = setInterval(function() {
  changeSlide(1);
}, 2000); // Change slides every 2 seconds

function changeSlide(n) {
  slideIndex += n;
  if (slideIndex >= images.length) {
    slideIndex = 0;
  }
  if (slideIndex < 0) {
    slideIndex = images.length - 1;
  }
  document.getElementById("slideshow-image").src = images[slideIndex];
}
