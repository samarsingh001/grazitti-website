import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);

  const partnerItem = document.querySelectorAll('.partnerships-container .partnerships-wrapper .partnerships > div');
  // console.log(partnerItem);
  partnerItem.forEach((item) =>{
    item.classList.add('slider-item');
  });
  const sliderItem = document.querySelectorAll('.partners .slider-item');
  // console.log(sliderItem);
  sliderItem.forEach((child) => {
    const sliderItemChild = child.querySelector('div');
    if (sliderItemChild){
      sliderItemChild.classList.add('partner-item');
    }
  })
  const customerItem = document.querySelectorAll('.customers-container .customers-wrapper .customers > div');
  customerItem.forEach((item)=>{
    item.classList.add('slider-item');
  });
  const customerSliderItem = document.querySelectorAll('.customers .slider-item');
  customerSliderItem.forEach((child)=>{
    const sliderItemChild = child.querySelector('div');
    if(sliderItemChild){
      sliderItemChild.classList.add('customer-item')
    }
  })
}
