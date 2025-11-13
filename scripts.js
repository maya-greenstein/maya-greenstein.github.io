

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
const images = ["images/headshot_2025.jpeg", "images/maya6.jpeg", "images/maya8.jpeg", "images/maya7.jpeg", "images/maya4.jpg"]; // Array of image paths

// Start the slideshow
let slideshowInterval = setInterval(function() {
  changeSlide(1);
}, 3000); // Change slides every 2 seconds

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

/////// FOR RSS FEED //////////
const feedUrl = 'https://afterschool.substack.com/feed';

async function fetchRSS() {
    try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`);
        const data = await response.json();
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, 'text/xml');
        const items = xml.querySelectorAll('item');
        const feedList = document.getElementById('feed-list');

        // Limit to 3 items
        const limitedItems = Array.from(items).slice(0, 3);

        limitedItems.forEach(item => {
            const title = item.querySelector('title').textContent;
            const link = item.querySelector('link').textContent;
            const pubDate = new Date(item.querySelector('pubDate').textContent).toLocaleDateString();

            const row = document.createElement('tr');

            const titleCell = document.createElement('td');
            const anchor = document.createElement('a');
            anchor.href = link;
            anchor.textContent = title;
            anchor.target = '_blank';
            titleCell.appendChild(anchor);
            row.appendChild(titleCell);

            const dateCell = document.createElement('td');
            dateCell.textContent = pubDate;
            row.appendChild(dateCell);

            feedList.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching the RSS feed:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchRSS);

document.addEventListener("DOMContentLoaded", () => {
    fetch("header.html")
      .then(response => response.text())
      .then(html => {
        document.getElementById("header-placeholder").innerHTML = html;
      });

    // Determine which project this page represents
    const projectId = document.body.getAttribute("data-project-id");
    if (projectId) loadProjectData(projectId);
  });

//   fetch("project_desciptions.json")
//   .then(r => r.json())
//   .then(projects => {
//     const container = document.getElementById("projects-container");
//     container.innerHTML = projects.map(p => `
//       <p class="description-small">
//       <b style="font-size: 27px;">Description:</b> 
//         ${p.description}
//       </p>
//     `).join("");
//   });

// function showProject(containerId) {
//     const projectId = getQueryParam("id");
//     if (!projectId) return;
  
//     fetch("projects.json").then(r => r.json()).then(projects => {
//       const project = projects.find(p => p.id === projectId);
//       const container = document.getElementById(containerId);
  
//       if (project) {
//         container.innerHTML = 
//           <p class="description-small"><b style="font-size: 27px;">Description:</b> 
//             ${project.description}
//           </p> 
//         ;
//       } else {
//         container.innerHTML = `<p>Project not found.</p>`;
//       }
//     });
//   }

  function loadProjectData(projectId) {
    fetch("project_descriptions.json")
        .then(r => r.json())
        .then(data => {
        const project = data[projectId];
        if (!project) {
            console.error(`No project found for ID: ${projectId}`);
            return;
        }
        // print(project);

        // Fill in elements by ID (if they exist)
        // const titleEl = document.getElementById("project-title");
        const descEl = document.getElementById("project-description");
        
        // if (descEl) {
        //     descEl.innerHTML = 
        //         <p class="description-small"><b style="font-size: 27px;">Description:</b> 
        //             ${project.description}
        //         </p>;

        // }
        

            // if (titleEl) titleEl.textContent = project.title;
            // if (descEl) descEl.textContent = project.description;

            if (descEl){
                descEl.textContent = project.description;
                // descEl.textContent = <b style="font-size: 27px;">Description:</b> 
                // ${project.description};
                
            } 


        })
        .catch(err => console.error("Error loading project data:", err));
}