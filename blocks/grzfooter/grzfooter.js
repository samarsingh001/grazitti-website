import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
// alert("js included");
var parentDiv = document.querySelector('.footer-wrapper');
if (parentDiv) {
    // alert("PD");
     var childDiv = document.querySelector('.footer');
      if(childDiv){
        // alert("CD");
      //   var subChildDiv = document.querySelector('.fo0ter-last');
      // if(subChildDiv){
      //   alert("SCD");
      // }
      }
}
    var innerDiv = childDiv.querySelector('div'); // Selects the first <div> inside .footer
   if (innerDiv) {
        // alert("ID");
        innerDiv.classList.add('inner-div-footer');
        console.log("Class 'new-class' added to the inner div:", innerDiv);
      }
  //}
