import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia("(min-width: 900px)");

function closeOnEscape(e) {
  if (e.code === "Escape") {
    const nav = document.getElementById("nav");
    const navSections = nav.querySelector(".nav-sections");
    const navSectionExpanded = navSections.querySelector(
      '[aria-expanded="true"]'
    );
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector("button").focus();
    }
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector(".nav-sections");
    const navSectionExpanded = navSections.querySelector(
      '[aria-expanded="true"]'
    );
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === "nav-drop";
  if (isNavDrop && (e.code === "Enter" || e.code === "Space")) {
    const dropExpanded = focused.getAttribute("aria-expanded") === "true";
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest(".nav-sections"));
    focused.setAttribute("aria-expanded", dropExpanded ? "false" : "true");
  }
}

function focusNavSection() {
  document.activeElement.addEventListener("keydown", openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections
    .querySelectorAll(".nav-sections .default-content-wrapper > ul > li")
    .forEach((section) => {
      section.setAttribute("aria-expanded", expanded);
    });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded =
    forceExpanded !== null
      ? !forceExpanded
      : nav.getAttribute("aria-expanded") === "true";
  const button = nav.querySelector(".nav-hamburger button");
  document.body.style.overflowY = expanded || isDesktop.matches ? "" : "hidden";
  nav.setAttribute("aria-expanded", expanded ? "false" : "true");
  toggleAllNavSections(
    navSections,
    expanded || isDesktop.matches ? "false" : "true"
  );
  
  // if (!expanded) {
  //   handleDropdowns(navSections);
  // }

  button.setAttribute(
    "aria-label",
    expanded ? "Open navigation" : "Close navigation"
  );
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll(".nav-drop");
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute("tabindex")) {
        drop.setAttribute("tabindex", 0);
        drop.addEventListener("focus", focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute("tabindex");
      drop.removeEventListener("focus", focusNavSection);
    });
  }

  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener("keydown", closeOnEscape);
    // collapse menu on focus lost
    nav.addEventListener("focusout", closeOnFocusLost);
  } else {
    window.removeEventListener("keydown", closeOnEscape);
    nav.removeEventListener("focusout", closeOnFocusLost);
  }
}


/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata("nav");
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : "/nav";
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = "";
  const nav = document.createElement("nav");
  nav.id = "nav";
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ["brand", "sections", "tools", "logo"];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const subMenu = [
    "services",
    "solutions",
    "resources",
    "products",
    "company",
    "carrers",
    "contactUs",
  ];
  setTimeout(() => {
    const navItems = document.querySelectorAll(
      ".default-content-wrapper > ul > li.nav-drop"
    );
    console.log(navItems);

    navItems.forEach((navItem, index) => {
      const subMenuUl = navItem.querySelector("ul");
      if (subMenuUl && subMenu[index]) {
        subMenuUl.classList.add(`${subMenu[index]}-dropdown`);
        subMenuUl.classList.add("subSection-menu");
      }
    });
  }, 1000);

  const navBrand = nav.querySelector(".nav-brand");
  const brandLink = navBrand.querySelector(".button");
  if (brandLink) {
    brandLink.className = "";
    brandLink.closest(".button-container").className = "";
  }

  //  This is the navigation section

  const navSections = nav.querySelector(".nav-sections");
  // console.log(navSections);
  const inputElem = document.createElement("input");
  inputElem.type = "text";

  inputElem.placeholder = "Search Here";
  inputElem.style.boxSizing = "border-box";
  inputElem.style.visibility = "hidden";
  inputElem.style.left = "100%";

  // console.log(navSections);
  if (navSections) {
    navSections
      .querySelectorAll(":scope .default-content-wrapper > ul > li")
      .forEach((navSection, index) => {
        if (navSection.querySelector("ul")) {
          navSection.classList.add("nav-drop");
        } else if (index == 6) {
          navSection.classList.add("contactUs-btn");
        }
        navSection.addEventListener(["click"], () => {
          if (isDesktop.matches) {
            const expanded =
              navSection.getAttribute("aria-expanded") === "true";
            toggleAllNavSections(navSections);
            navSection.setAttribute(
              "aria-expanded",
              expanded ? "false" : "true"
            );
          }
        });
      });
    const defaultWrapper = navSections.querySelector(
      ".default-content-wrapper"
    );
    if (defaultWrapper) {
      const pElement = defaultWrapper.querySelector("p");
      const spanElement = pElement.querySelector("span");

      if (pElement && spanElement) {
        pElement.classList.add("search-box");
        pElement.insertBefore(inputElem, spanElement);
        // console.log('Input field appended successfully!');
      }
      spanElement.addEventListener("click", () => {
        // console.log("working");
        const ulElem = document.querySelectorAll(
          ":scope .default-content-wrapper > ul"
        );
        console.log(ulElem[0]);
        const inputElem = document.querySelector(".search-box > input");
        // console.log(inputElem);

        //   console.log("jgafgoa",ulElem[0]);
        if (inputElem.style.visibility === "hidden") {
          ulElem[0].style.visibility = "hidden";
          inputElem.style.visibility = "visible";
          inputElem.style.width = "92%";
          inputElem.style.left = "25px";
        } else {
          ulElem[0].style.visibility = "visible";
          inputElem.style.visibility = "hidden";
          inputElem.style.left = "100%";
          inputElem.style.width = "0";
        }
      });
      const servicesNavDrop = defaultWrapper.querySelector("ul > li.nav-drop:nth-of-type(1)");
      // console.log(servicesNavDrop);
      if (servicesNavDrop){
        const serviceDropdown = servicesNavDrop.querySelector('ul');
        // console.log(serviceDropdown);
        if (serviceDropdown) {
          const serviceFirstLi = serviceDropdown.children[0];
          // console.log(serviceFirstLi);
          const serviceSecondLi = serviceDropdown.children[1];
          // console.log(serviceSecondLi);
          const serviceThirdLi = serviceDropdown.children[2];
          // console.log(serviceThirdLi);
          if (serviceSecondLi && serviceThirdLi) {
            serviceSecondLi.classList.add("service-platforms");
            serviceThirdLi.classList.add("service-solutions")
          }
          // const serviceList = 
          const servicePlatformsList= serviceDropdown.querySelectorAll('.service-platforms > ul > li');
          // console.log(servicePlatformsList);
          servicePlatformsList.forEach((listItem, index) => {
            listItem.classList.add('service-platform-list')
          });
          const serviceSolutionsList= serviceDropdown.querySelectorAll('.service-solutions > ul > li');
          serviceSolutionsList.forEach((listItem, index) => {
            listItem.classList.add('service-solutions-list')
          });
          const dropdownItems = serviceFirstLi.querySelectorAll(' ul > li');
          // console.log(dropdownItems);
          dropdownItems.forEach((item, index) => {
            item.classList.add('dropdown-item');
            item.setAttribute('data-target', index);
        });
          dropdownItems.forEach(item => {
            servicePlatformsList[0].classList.add('serviceActive');
            serviceSolutionsList[0].classList.add('serviceActive');
            item.addEventListener('mouseover', ()=>{
              const targetIndex = item.getAttribute('data-target');
              servicePlatformsList.forEach(list => {
                list.classList.remove('serviceActive');
            });
            serviceSolutionsList.forEach(list => {
              list.classList.remove('serviceActive');
            });
            if (servicePlatformsList[targetIndex] && serviceSolutionsList[targetIndex]) {
              servicePlatformsList[targetIndex].classList.add('serviceActive');
              serviceSolutionsList[targetIndex].classList.add('serviceActive');
            }
            });
          });
        }
      }


      // This is the product dropdown

      const productsNavDrop = defaultWrapper.querySelector("ul > li.nav-drop:nth-of-type(4)");
      // console.log(productsNavDrop);
      
      // Ensure the fourth nav-drop is found
      if (productsNavDrop) {
        // Select the products-dropdown inside the fourth nav-drop
        const productsDropdown = productsNavDrop.querySelector("ul");
        // console.log(productsDropdown);
        
        // Check if the productsDropdown is found
        if (productsDropdown) {
          // Log the productsDropdown to see the NodeList content
          const firstLi = productsDropdown.children[0];
          // console.log(firstLi);
          
          // Targeting the second child <li> within the products-dropdown
          const secondLi = productsDropdown.children[1];
          // console.log(secondLi);
          
          if (secondLi) {
            secondLi.classList.add("products-tools"); // Add your desired class
            console.log("Second <li> found and class added:", secondLi);
          } else {
            console.error("Second <li> not found within productsDropdown");
          }
          const productsList= productsDropdown.querySelectorAll('.products-tools > ul > li');
            // Add class 'product-list' and 'active' to product list items
            productsList.forEach((listItem, index) => {
              listItem.classList.add('product-list');
              // if (index === 0) {  // Keep "Marketo" list active by default
              //     listItem.classList.add('productsActive');
              // }
          });

          
          
          const dropdownItems = firstLi.querySelectorAll(' ul > li');
          // console.log(dropdownItems);
          dropdownItems.forEach((item, index) => {
            item.classList.add('dropdown-item');
            item.setAttribute('data-target', index);
        });
        dropdownItems.forEach(item => {
          productsList[0].classList.add('productsActive');
          item.addEventListener('mouseover', () => {
              const targetIndex = item.getAttribute('data-target');
              // Hide all product lists
              productsList.forEach(list => {
                  list.classList.remove('productsActive');
              });

              // Show the list corresponding to the hovered item
              if (productsList[targetIndex]) {
                productsList[targetIndex].classList.add('productsActive');
              }
          });
        });
        } else {
          console.error(
            "productsDropdown not found within the fourth nav-drop"
          );
          
        }
        
        
      } else {
        console.error("Fourth .nav-drop not found");
      }
    }
  }



  const navTools = nav.querySelector(".nav-tools");
  inputElem.type = "text";
  inputElem.placeholder = "Search Here";
  if (navTools) {
    const defaultWrapper = navTools.querySelector(".default-content-wrapper");
    console.log(defaultWrapper);
    if (defaultWrapper) {
      const pElement = defaultWrapper.querySelector("p");
      console.log(pElement);

      if (pElement) {
        const spanElement = pElement.querySelector("span");
        console.log(spanElement);

        const imageElement = spanElement.querySelector("img");
        if (spanElement && imageElement) {
          spanElement.insertBefore(inputElem, imageElement);
          console.log("Input field appended successfully!");
          // console.log(inputElem);
          // inputElem.setAttribute('id', "search-input");
          // inputElem.appendChild(inputElem);
          // console.log(inputElem[0]);
        }
      }
    }
  }

  // hamburger for mobile

  const hamburger = document.createElement("div");
  hamburger.classList.add("nav-hamburger");
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  // hamburger.addEventListener("click", () => toggleMenu(nav, navSections));
  nav.prepend(hamburger);
  nav.setAttribute("aria-expanded", "false");
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener("change", () =>
    toggleMenu(nav, navSections, isDesktop.matches)
  );
  const mobileSection = document.createElement("div");
  mobileSection.classList.add("section");
  mobileSection.classList.add("mobile-navbar");
  console.log(mobileSection);
  mobileSection.innerHTML = `<div class="default-content-wrapper"><ul>
          <li>SERVICES <span class="icon icon-angledown"><img data-icon-name="angledown" src="/icons/angledown.svg" alt="" loading="eager"></span>
            <ul>
              <li>Artificial Intelligence<span class="icon icon-angle-right-solid"><img data-icon-name="angle-right-solid" src="/icons/angle-right-solid.svg" alt="" loading="eager"></span>
                <ul>
                  <li>Platforms
                    <ul>
                      <li>ChatGPT Services</li>
                      <li>Salesforce AI</li>
                      <li>Open AI</li>
                      <li>Hugging Face AI</li>
                    </ul>
                  </li>
                  <li>Solutions
                    <ul>
                      <li>Predictive Analytics</li>
                      <li>LLM Integrations</li>
                      <li>Conversational AI &amp; Chatbots</li>
                      <li>AI for Sales</li>
                      <li>AI for Marketing</li>
                      <li>AI for Customer Services</li>
                      <li>AI for Analytics</li>
                      <li>AI for Marketing Automation</li>
                      <li>AI for Web Development</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>Online Communities<span class="icon icon-angle-right-solid"><img data-icon-name="angle-right-solid" src="/icons/angle-right-solid.svg" alt="" loading="lazy"></span>
                <ul>
                  <li>Platforms
                    <ul>
                      <li>Salesforce Experience Cloud</li>
                      <li>Khoros</li>
                      <li>SharePoint</li>
                      <li>Higher Logic</li>
                      <li>Vanilla</li>
                      <li>Slack</li>
                      <li>BetterMode</li>
                    </ul>
                  </li>
                  <li>Solutions
                    <ul>
                      <li>Community Management as a Service</li>
                      <li>Customer Community</li>
                      <li>Employee Community</li>
                      <li>Partner Community</li>
                      <li>Knowledge Base Design</li>
                      <li>Cognitive Search</li>
                      <li>Integrations</li>
                      <li>Community Migrations</li>
                      <li>Online Community</li>
                      <li>Loyalty Service</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>CRM<span class="icon icon-angle-right-solid"><img data-icon-name="angle-right-solid" src="/icons/angle-right-solid.svg" alt="" loading="lazy"></span>
                <ul>
                  <li>Platforms
                    <ul>
                      <li>Salesforce</li>
                      <li>Microsoft Dynamics 365</li>
                      <li>Zendesk</li>
                    </ul>
                  </li>
                  <li>Solutions
                    <ul>
                      <li>Our Expertise</li>
                      <li>Consulting</li>
                      <li>Quickstart Packages</li>
                      <li>Integrations</li>
                      <li>Migration</li>
                      <li>Customization</li>
                      <li>Implementation</li>
                      <li>Optimization</li>
                      <li>QA</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>Marketing<span class="icon icon-angle-right-solid"><img data-icon-name="angle-right-solid" src="/icons/angle-right-solid.svg" alt="" loading="lazy"></span>
                <ul>
                  <li>Platforms</li>
                  <li>Solutions</li>
                </ul>
              </li>
              <li>Mobile App &amp; Web Dev<span class="icon icon-angle-right-solid"><img data-icon-name="angle-right-solid" src="/icons/angle-right-solid.svg" alt="" loading="lazy"></span>
                <ul>
                  <li>Platforms</li>
                  <li>Solutions</li>
                </ul>
              </li>
              <li>Digital Marketing<span class="icon icon-angle-right-solid"><img data-icon-name="angle-right-solid" src="/icons/angle-right-solid.svg" alt="" loading="lazy"></span>
                <ul>
                  <li>Platforms</li>
                  <li>Solutions</li>
                </ul>
              </li>
              <li>Design<span class="icon icon-angle-right-solid"><img data-icon-name="angle-right-solid" src="/icons/angle-right-solid.svg" alt="" loading="lazy"></span>
                <ul>
                  <li>Platforms</li>
                  <li>Solutions</li>
                </ul>
              </li>
              <li>Analytics<span class="icon icon-angle-right-solid"><img data-icon-name="angle-right-solid" src="/icons/angle-right-solid.svg" alt="" loading="lazy"></span>
                <ul>
                  <li>Platforms</li>
                  <li>Solutions</li>
                </ul>
              </li>
              <li>Enterprise Services<span class="icon icon-angle-right-solid"><img data-icon-name="angle-right-solid" src="/icons/angle-right-solid.svg" alt="" loading="lazy"></span>
                <ul>
                  <li>Platforms</li>
                  <li>Solutions</li>
                </ul>
              </li>
              <li>Data Integration<span class="icon icon-angle-right-solid"><img data-icon-name="angle-right-solid" src="/icons/angle-right-solid.svg" alt="" loading="lazy"></span>
                <ul>
                  <li>Platforms</li>
                  <li>Solutions</li>
                </ul>
              </li>
              <li>IT Service Management<span class="icon icon-angle-right-solid"><img data-icon-name="angle-right-solid" src="/icons/angle-right-solid.svg" alt="" loading="lazy"></span>
                <ul>
                  <li>Platforms</li>
                  <li>Solutions</li>
                </ul>
              </li>
              <li>Information Security<span class="icon icon-angle-right-solid"><img data-icon-name="angle-right-solid" src="/icons/angle-right-solid.svg" alt="" loading="lazy"></span>
                <ul>
                  <li>Platforms</li>
                  <li>Solutions</li>
                </ul>
              </li>
              <li>Quality Assurance<span class="icon icon-angle-right-solid"><img data-icon-name="angle-right-solid" src="/icons/angle-right-solid.svg" alt="" loading="lazy"></span>
                <ul>
                  <li>Platforms</li>
                  <li>Solutions</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>SOLUTIONS<span class="icon icon-angledown"><img data-icon-name="angledown" src="/icons/angledown.svg" alt="" loading="eager"></span>
            <ul>
              <li>By Business Function</li>
              <li>By Business Domain</li>
            </ul>
          </li>
          <li>RESOURCES<span class="icon icon-angledown"><img data-icon-name="angledown" src="/icons/angledown.svg" alt="" loading="eager"></span>
            <ul>
              <li>Resource Center</li>
            </ul>
          </li>
          <li>PRODUCTS<span class="icon icon-angledown"><img data-icon-name="angledown" src="/icons/angledown.svg" alt="" loading="eager"></span>
            <ul>
              <li>Marketo<span class="icon icon-angle-right-solid"><img data-icon-name="angle-right-solid" src="/icons/angle-right-solid.svg" alt="" loading="lazy"></span></li>
              <li>Salesforce<span class="icon icon-angle-right-solid"><img data-icon-name="angle-right-solid" src="/icons/angle-right-solid.svg" alt="" loading="lazy"></span></li>
              <li>SearchUnify<span class="icon icon-angle-right-solid"><img data-icon-name="angle-right-solid" src="/icons/angle-right-solid.svg" alt="" loading="lazy"></span></li>
              <li>Selenium Framework<span class="icon icon-angle-right-solid"><img data-icon-name="angle-right-solid" src="/icons/angle-right-solid.svg" alt="" loading="lazy"></span></li>
              <li>Analytics<span class="icon icon-angle-right-solid"><img data-icon-name="angle-right-solid" src="/icons/angle-right-solid.svg" alt="" loading="lazy"></span></li>
              <li>Online Community<span class="icon icon-angle-right-solid"><img data-icon-name="angle-right-solid" src="/icons/angle-right-solid.svg" alt="" loading="lazy"></span></li>
              <li>Artificial Intelligence<span class="icon icon-angle-right-solid"><img data-icon-name="angle-right-solid" src="/icons/angle-right-solid.svg" alt="" loading="lazy"></span></li>
            </ul>
          </li>
          <li>COMPANY<span class="icon icon-angledown"><img data-icon-name="angledown" src="/icons/angledown.svg" alt="" loading="eager"></span>
            <ul>
              <li>About Us</li>
            </ul>
          </li>
        </ul></div>`;
    nav.append(mobileSection);
    const mobileSubMenu = [
      "services",
      "solutions",
      "resources",
      "products",
      "company"
    ];
    
    setTimeout(() => {
      const mobileNavItems = document.querySelectorAll(
        ".mobile-navbar .default-content-wrapper > ul > li"
      );
      console.log(mobileNavItems);
      mobileNavItems.forEach((mobileNavItem, index) => {
        // const subMenuUl = mobileNavItem.querySelector("ul");
        // if (subMenuUl && subMenu[index]) {
          mobileNavItem.classList.add(`${subMenu[index]}-acc`);
          mobileNavItem.classList.add("mobileSubSection-menu");
        // }
      });
      const sideMenu = document.querySelector('.mobile-navbar');
      console.log(sideMenu);
      // hamburger.addEventListener('click', ()=>{
      //   sideMenu.style.display = 'block';
      // });
      
      const menuItems = document.querySelectorAll('li.mobileSubSection-menu');
      console.log(menuItems);

      menuItems.forEach((item) => {
        const toggleButton = item.querySelector('.icon-angledown');
        console.log(toggleButton);         // Target the icon or button for toggling
        const dropdownMenu = item.querySelector('ul'); // Target the dropdown ul inside the li
        console.log(dropdownMenu); 

        if (dropdownMenu) {
          dropdownMenu.style.display = 'none';
          toggleButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent bubbling up of events, affecting other elements
            const isExpanded = dropdownMenu.style.display === 'block';
            if (isExpanded) {
              dropdownMenu.style.display = 'none';
            } else {
              // Optionally hide other dropdowns if you want only one open at a time
              // closeAllDropdowns(menuItems);
              dropdownMenu.style.display = 'block';
            }
          });
        }

      });
      function hideSideMenu() {
        sideMenu.style.display = "none"; // Hide the side menu (or use your method for closing the menu)
        document.body.style.overflowY = ""; // Re-enable scrolling when the side menu is closed
      }
      
      document.addEventListener("click", (event) => {
        const isClickInsideMenu = sideMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
    
        // If click is outside the menu and not on the hamburger button, hide the side menu
        if (!isClickInsideMenu && !isClickOnHamburger) {
          hideSideMenu();
        }
      });
      hamburger.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent click from bubbling up to the document
        sideMenu.style.display = "block"; // Show the side menu
        document.body.style.overflowY = "hidden"; // Prevent scrolling when the side menu is open
      });
    },100);
  const navWrapper = document.createElement("div");
  navWrapper.className = "nav-wrapper";
  navWrapper.append(nav);
  block.append(navWrapper);

  // This is the main section //

  const classNames = ["left", "center", "right"];

  // Select the parent div with class 'columns block columns-3-cols'
  const parentDiv = document.querySelector(".columns.block.columns-3-cols");
  console.log(parentDiv);
  // Check if the parent div exists
  if (parentDiv) {
    // Select all child divs of the parent div
    const childDivs = parentDiv.querySelectorAll(".block > div");
    console.log(childDivs);

    // Iterate through each child div and add corresponding classes from the array
    childDivs.forEach((div, index) => {
      // Add the class from the array, using the index to match
      if (classNames[index]) {
        div.classList.add(classNames[index]);
      }
    });
  }
}
