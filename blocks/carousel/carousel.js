import { getMetadata } from "../../scripts/aem.js";
// const placeholders = await fetchPlaceholders(getMetadata("locale"));
import { loadFragment } from "../fragment/fragment.js";

export default function decorate(block) {
  // Select the carousel wrapper and the slides inside it
//   const fragmentWrapper = document.querySelector(".fragment-wrapper");
//   console.log(fragmentWrapper);
//   const carouselContainer = document.querySelector('.carousel-container');
//     console.log(carouselContainer);
//   if (fragmentWrapper) {
//     const carouselWrapper = fragmentWrapper.getElementsByClassName("carousel-wrapper");
//     console.log(carouselWrapper);
//     if (carouselWrapper) {
//       const slides = document.getElementsByClassName("carousel");
//       console.log(slides);
//     }
//     const dotsContainer = document.createElement("div");
//     console.log(dotsContainer);
//     dotsContainer.classList.add("dots");

//     let currentIndex = 0;
//     const totalSlides = slides.length;

//     // Create navigation dots
//     for (let i = 0; i < totalSlides; i++) {
//       const dot = document.createElement("button");
//       dot.classList.add("dot");
//       dot.addEventListener("click", () => {
//         currentIndex = i;
//         showSlide(currentIndex);
//       });
//       dotsContainer.appendChild(dot);
//     }

//     // Append dots to the block
//     carouselContainer.appendChild(dotsContainer);

//     // Set initial styles
//     carouselWrapper.style.display = "flex";
//     carouselWrapper.style.overflow = "hidden";
//     carouselWrapper.style.transition = "transform 0.5s ease-in-out";

//     slides.forEach((slide) => {
//       slide.style.minWidth = "100%"; // Adjust width for full carousel effect
//     });

//     // Function to move the carousel
//     function showSlide(index) {
//       carouselWrapper.style.transform = `translateX(-${index * 100}%)`;
//       document
//         .querySelectorAll(".dot")
//         .forEach((dot) => dot.classList.remove("active"));
//       document.querySelectorAll(".dot")[index].classList.add("active");
//     }

//     // Set an interval to automatically move to the next slide
//     function startCarousel() {
//       setInterval(() => {
//         currentIndex = (currentIndex + 1) % totalSlides; // Cycle through slides
//         showSlide(currentIndex);
//       }, 3000); // Change slide every 3 seconds
//     }

//     // Initialize carousel
//     startCarousel();
//     showSlide(0); // Show the first slide initially
//   }
    const fragmentContainer = document.querySelector('.fragment-container');
    console.log(fragmentContainer);
    const fragmentWrapper = document.querySelector('.fragment-wrapper');
    console.log(fragmentWrapper);
    if(fragmentWrapper){
        setTimeout(function() {
            const carouselContainer = fragmentWrapper.querySelector('.carousel-container');
            console.log(carouselContainer);
            if(carouselContainer){
                const carousel = carouselContainer.querySelector('.carousel');
                console.log(carousel);
                if(carousel){
                }
            }
          }, 100);
    }
    
    
}
