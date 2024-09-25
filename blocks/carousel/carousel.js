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
  const fragmentContainer = document.querySelector(".fragment-container");
  console.log(fragmentContainer);
  const fragmentWrapper = document.querySelector(".fragment-wrapper");
  console.log(fragmentWrapper);
  if (fragmentWrapper) {
    setTimeout(function () {
      const carouselContainer = fragmentWrapper.querySelector(
        ".carousel-container"
      );
      console.log(carouselContainer);
      if (carouselContainer) {
        const carousel = carouselContainer.querySelector(".carousel");
        console.log(carousel);
        if (carousel) {
          const carouselItems = carousel.querySelectorAll(".carousel > div");
          console.log(carouselItems);
          carouselItems[0].classList.add("slideActive");
          carouselItems.forEach((item) => {
            item.classList.add("client-testimonials");
          });
        }
        // giving classes to the client name and field 
        const testimonialsDiv = document.querySelectorAll('.client-testimonials > div:nth-of-type(2)');
        console.log(testimonialsDiv);
        testimonialsDiv.forEach((index) =>{
          index.classList.add('client-information');
        });
        const clientInfo = document.querySelectorAll('.client-information > p:nth-of-type(2), p:nth-of-type(3), p:nth-of-type(4)');
        console.log(clientInfo);
        clientInfo.forEach((p, index) => {
          if (index % 3 === 0) {
            p.classList.add('client-name');      // 2nd <p> (client name)
          } else if (index % 3 === 1) {
            p.classList.add('client-title');     // 3rd <p> (client title)
          } else if (index % 3 === 2) {
            p.classList.add('client-company');   // 4th <p> (client company)
          }
        });
        const slides = document.querySelectorAll(
          ".carousel-wrapper > .carousel > .client-testimonials"
        );
        console.log(slides.length);

        var currentSlide = 0;

        const dotsContainer = document.createElement("div");
        dotsContainer.classList.add("carousel-dots");
        console.log(dotsContainer);
        carouselContainer.appendChild(dotsContainer);

        function createDots() {
          slides.forEach((_, index) => {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            if (index === 0) {
              dot.classList.add("slideActive");
            }
            dot.setAttribute("attr", index);
            // dot.addEventListener("click", () => slideShow(index, this));
            dot.setAttribute('onclick', 'switchTest(this)');
            dotsContainer.appendChild(dot);
          });
        }
        createDots();
        let testSlide = document.querySelectorAll(".client-testimonials");
        console.log(testSlide);
        let dots = document.querySelectorAll(".dot");
        console.log(dots);

        function switchTest(index) {
          // index.classList.add('slideActive');
          // if (index instanceof HTMLElement) {
          //   var testId = index.getAttribute("attr");
          //   console.log(testId);
          // }

          if (testId > currentSlide) {
            testSlide[currentSlide].style.animation = "next1 0.5s ease-in forwards";
            currentSlide = testId;
            testSlide[currentSlide].style.animation = "next2 0.5s ease-in forwards";
          } else if (testId == currentSlide) {return;} 
          else {
            testSlide[currentSlide].style.animation = "prev1 0.5s ease-in forwards";
            currentSlide = testId;
            testSlide[currentSlide].style.animation = "prev2 0.5s ease-in forwards";
          }
          indicators();
        }

        function indicators(){
          for(let i = 0; i < dots.length; i++){
            dots[i].className = dots[i].className.replace(' slideActive', '');
          }
          dots[currentSlide].className += ' slideActive';
        }
        function slideNext(){
          testSlide[currentSlide].style.animation = 'next1 0.5s ease-in forwards';
          if(currentSlide >= testSlide.length - 1){
            currentSlide = 0;
          }
          else{
            currentSlide++;
          }
          testSlide[currentSlide].style.animation = 'next2 0.5s ease-in forwards';
          indicators();
        }
        function autoSliding(){
          deleteInterval = setInterval(timer, 5000);
          function timer(){
            slideNext();
            indicators();
          }
        }
        autoSliding();
      
        // Stop auto sliding when mouse is over the indicators
        const container = document.querySelector('.carousel-dots');
        container.addEventListener('mouseover', pause);
        function pause(){
          clearInterval(deleteInterval);
        }
      
        // Resume sliding when mouse is out of the indicators
        container.addEventListener('mouseout', autoSliding); 
        
        switchTest();

        // const carouselWrapper = document.querySelector('.carousel-wrapper');
        // console.log(carouselWrapper);
        // const dots = document.querySelectorAll('.carousel-wrapper > .carousel-dots  > span.dot');
        // console.log(dots);
        // function slideShow(index){
        //   currentSlide = (index + slides.length) % slides.length;
        //   carouselWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

        //   dots.forEach(dot => dot.classList.remove('slideActive'));
        //   dots[currentSlide].classList.add('slideActive');
        // }
        // slideShow(currentSlide);

        // setInterval(() => {
        //   slideShow(currentSlide + 1);
        // }, 5000);
      }
    }, 100);
  }
}
