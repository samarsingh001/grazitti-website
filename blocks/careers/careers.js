// eslint-disable
// Select the careers div inside the careers-wrapper
const careersDiv = document.querySelector('.careers-wrapper .careers');
// give the class to main sections
const allMainDivs = careersDiv.children;  // Fetch all direct child divs
if (allMainDivs.length) {
    allMainDivs[0].classList.add('first-careers-section');
    allMainDivs[1].classList.add('second-careers-section');
    allMainDivs[2].classList.add('carousel-first-section');
    allMainDivs[3].classList.add('carousel-second-section');
    allMainDivs[4].classList.add('carousel-third-section');
    allMainDivs[5].classList.add('fourth-careers-section');
    allMainDivs[6].classList.add('fifth-careers-section');
    allMainDivs[7].classList.add('sixth-careers-section');
    allMainDivs[8].classList.add('fifth-careers-section');
    allMainDivs[9].classList.add('sixth-careers-section');
    allMainDivs[10].classList.add('fifth-careers-section');
    allMainDivs[11].classList.add('seventh-careers-section');
    allMainDivs[12].classList.add('eight-careers-section');
} 
const paragraph = document.querySelector('.first-careers-section > div:nth-of-type(2) p');
    
// Get the inner HTML of the selected paragraph give color to 1200+ content in first section
const content = paragraph.innerHTML;

const highlightedContent = content.replace('1200+', '<span style="color: orange;">1200+</span>');

// Update the paragraph's HTML with the new content
paragraph.innerHTML = highlightedContent;
// Step 1: Create a new wrapper div
// Step 1: Create a new wrapper div
const wrapperDiv = document.createElement('div');

// Add a class to the new wrapper div
wrapperDiv.classList.add('new-wrapper-class');

// Step 2: Select the parent div containing the target divs
const parentDiv = document.querySelector('.careers.block');

// Step 3: Find all child divs of the parent
const childDivs = Array.from(parentDiv.children);
//wrapping the carousel divs in one main div
if (childDivs.length >= 5) {
    const divToWrap1 = childDivs[2]; // 3rd child
    const divToWrap2 = childDivs[3]; // 4th child
    const divToWrap3 = childDivs[4]; // 5th child

    parentDiv.insertBefore(wrapperDiv, divToWrap1);

    // Append the target divs to the new wrapper div
    wrapperDiv.appendChild(divToWrap1);
    wrapperDiv.appendChild(divToWrap2);
    wrapperDiv.appendChild(divToWrap3);
} else {
    console.error('Not enough child divs in the parent element.');
}



    const wrapper = document.querySelector('.new-wrapper-class');
    const sections = wrapper.querySelectorAll('.carousel-first-section, .carousel-second-section, .carousel-third-section');
    const totalSlides = sections.length;
    let currentIndex = 0;
  
    // Create indicators for carousel
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'carousel-indicators';
  
    sections.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.className = 'carousel-indicator';
      indicator.addEventListener('click', () => goToSlide(index));
      indicatorsContainer.appendChild(indicator);
    });
  
    wrapper.appendChild(indicatorsContainer);
  
    function updateCarousel() {
      sections.forEach(section => {
        section.style.display = 'none'; // Hide all sections initially
      });
      sections[currentIndex].style.display = 'flex'; // Show only the current section
  
      // Update indicators
      document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
      });
    }
  
    function goToSlide(index) {
      if (index >= totalSlides) index = 0;
      if (index < 0) index = totalSlides - 1;
      currentIndex = index;
      updateCarousel();
    }
  
    // Initialize
    updateCarousel();
  
    // // Optional: Auto-slide functionality
    setInterval(() => goToSlide(currentIndex + 1), 5000); // Change slide every 5 seconds
  // Select the fifth section
const fifthSection = document.querySelector('.fifth-careers-section');

// Select the second div within the fifth section
const secondDivInFifthSection = fifthSection.querySelectorAll('div')[1]; // Index 1 for the second div

// Apply the new class
secondDivInFifthSection.classList.add('text-border');
console.log("class added", secondDivInFifthSection);



// Create the video container adding video using js
  var videoContainer = document.createElement('div');
  videoContainer.className = 'video-container'; // Add a class for styling

  // Create the video element
  var videoElement = document.createElement('video');
  videoElement.setAttribute('controls', 'controls');
  videoElement.setAttribute('width', '100%'); 

  // Create the source element for the video
  var sourceElement = document.createElement('source');
  sourceElement.setAttribute('src', 'https://www.grazitti.com/wp-content/uploads/2024/05/Life-At-Grazitti-Video.mp4');
  sourceElement.setAttribute('type', 'video/mp4');

  // Append the source to the video element
  videoElement.appendChild(sourceElement);

  // Append the video element to the container
  videoContainer.appendChild(videoElement);

  // Find the target element
  var targetElement = document.querySelector('.eight-careers-section');
  if (targetElement) {
      // Append the video container inside the target element
      targetElement.appendChild(videoContainer);
       // Apply muted and autoplay programmatically
    videoElement.muted = true; // Required for autoplay
    videoElement.autoplay = true;
    videoElement.playsInline = true; // Ensures video plays inline on mobile devices

    // Play the video programmatically after settings are applied
    videoElement.play().catch(function(error) {
        // to handle errors if video do not autoplay
    });
  }


