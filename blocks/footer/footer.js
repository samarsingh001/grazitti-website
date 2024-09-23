import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);
//  alert('Footer has been successfully loaded!');
  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
 block.append(footer);
 // Select the div element with class 'grazitti-heading-footer'
const divElement = document.querySelector('.grazitti-heading-footer');
  const divElementSecond = document.querySelector('.grazitti-about');

// Ensure the divElement exists
if (divElement) {
  // Select all <p> elements inside the div
  const paragraphs = divElement.querySelectorAll('p');

  // Access the second <p> element (index 1)
  const secondParagraph = paragraphs[1];

  // Ensure the second paragraph exists
  if (secondParagraph) {
    // Add an onclick event listener to the second <p> element
    secondParagraph.addEventListener('click', () => {
      // alert('You clicked the second paragraph!');
      // divElementSecond.style.display="flex";
      divElementSecond.classList.add('active');
      divElement.style.display="none";
    });
  } 
} 
  if(divElementSecond){
    // alert("second div exists");
    const paragraphsSecond = divElementSecond.querySelectorAll('p');

  // Access the second <p> element (index 1)
  const secondParagraphHide = paragraphsSecond[1];
  if (secondParagraphHide) {
    // Add an onclick event listener to the second <p> element
    secondParagraphHide.addEventListener('click', () => {
      // alert('You clicked the second paragraph!');
      divElementSecond.classList.remove('active'); // Remove the 'active' class

       divElementSecond.classList.add('grazitti-about')

      divElement.style.display="flex";
    });
  } 
}


  }











