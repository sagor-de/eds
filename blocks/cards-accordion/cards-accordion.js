import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

// Define default accordion behavior
let defaultAccordionBehavior = "none"; // Default value

let accordionBlock = document.querySelector("accordion-block");
let accordionId=accordionBlock ? accordionBlock.id : null;
console.log("Accordion ID:", accordionId); // Log the accordion ID

defaultAccordionBehavior = accordionId;
console.log("Default Accordion Behavior:", defaultAccordionBehavior); // Log the default accordion behavior


export default function decorate(block) {
  const [title, style] = block.children;

  // Clear the block's content
  block.textContent = "";
  // Create the accordion-block element
  const accordionBlock = document.createElement("accordion-block");
  const accstyleValue = style.innerText.trim();
  accordionBlock.id = accstyleValue;

  // Create the title element
  const p = document.createElement("p");
  p.textContent = title.innerText.trim();

  // Append the title to the accordion-block
  accordionBlock.append(p);

  // Append the accordion-block to the block
  block.append(accordionBlock);
  /* change to ul, li */
  const ul = document.createElement("ul");
  [...block.children].forEach((row, rowIndex) => {
    const li = document.createElement("li");
    li.className = "itemContainer"; // Assign class name to li
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);

    const itemsDiv = document.createElement("div");
    itemsDiv.className = "items"; // Container div for the spans

    [...li.children].forEach((div, index) => {
      if (index === 0) {
        const span = document.createElement("span");
        span.className = "title"; // First div becomes a span with 'title' class
        span.innerHTML = div.innerHTML;
        div.replaceWith(span);
        // Append span to itemsDiv
          } else if (index === 1) {
            const span = document.createElement("span");
            span.className = "description"; // Second div becomes a span with 'description' class
            span.innerHTML = div.innerHTML;
            div.replaceWith(span);
            itemsDiv.appendChild(span); // Append span to itemsDiv
          } else if (index === 2) {
            const imageTitleDiv = document.createElement("div");
            imageTitleDiv.className = "imageTitle"; // Third div becomes a div with 'imageTitle' class
            imageTitleDiv.innerHTML = div.innerHTML;
            div.replaceWith(imageTitleDiv);
            itemsDiv.appendChild(imageTitleDiv); // Append imageTitleDiv to itemsDiv
      } else if (div.children.length === 1 && div.querySelector("picture")) {
        const imageDiv = document.createElement("div");
        imageDiv.className = "image"; // Picture div gets 'image' class
        const picture = div.querySelector("picture");
        if (picture) {
          imageDiv.appendChild(picture);
          div.replaceWith(imageDiv);

          // Create a separate wrapper div for the image
          const imageDivFin = document.createElement("div");
          imageDivFin.className = "imageDivFin content"; // Wrapper div with class 'imageDivFin' and 'content'
          imageDivFin.appendChild(imageDiv); // Append imageDiv to imageDivFin
          li.appendChild(imageDivFin); // Ensure imageDivFin is appended to li in parallel to itemsDiv
        }
      }
    });
    const iconSpan = document.createElement("span");
    iconSpan.className = "icon"; // Add a span with class 'icon'

    // Create a span element to hold the inline SVG icon
    const iconImg = document.createElement("span");
    iconImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
<path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="#191919" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 14L16 19L21 14" stroke="#191919" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

    iconSpan.appendChild(iconImg); // Append the img to iconSpan
    itemsDiv.appendChild(iconSpan); // Append iconSpan to itemsDiv
    // Add class name 'content' to description, image, and imageTitle
    const imageTitle = itemsDiv.querySelector(".imageTitle");
    if (imageTitle) {
      imageTitle.classList.add("content");
    }
    const description = itemsDiv.querySelector(".description");
    if (description) {
      description.classList.add("content");
    }

    const image = itemsDiv.querySelector(".image");
    if (image) {
      image.classList.add("content");
    }
    li.prepend(itemsDiv); // Prepend the itemsDiv to li
    ul.append(li);

    // Set initial state based on defaultAccordionBehavior
    const contentElements = li.querySelectorAll(".content");
    if (
      defaultAccordionBehavior == "all" ||
      (defaultAccordionBehavior == "first" && rowIndex === 0)
    ) {
      contentElements.forEach((content) => {
        content.style.display = ""; // Show content
      });
      li.classList.add("active");
    } else {
      contentElements.forEach((content) => {
        content.style.display = "none"; // Hide content
      });
    }
  });

  // Add accordion functionality
  ul.addEventListener("click", (event) => {
    const clickedItem = event.target.closest(".items");
    if (clickedItem) {
      const parentLi = clickedItem.closest(".itemContainer");
      if (parentLi) {
        const contentElements = parentLi.querySelectorAll(".content");
        const isExpanded = parentLi.classList.contains("active");

        // Toggle display and class
        contentElements.forEach((content) => {
          content.style.display = isExpanded ? "none" : "";
        });

        parentLi.classList.toggle("active", !isExpanded);
      }
    }
  });

  ul.querySelectorAll("picture > img").forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
      { width: "750" },
    ]);
    moveInstrumentation(img, optimizedPic.querySelector("img"));
    img.closest("picture").replaceWith(optimizedPic);
  });

  block.textContent = "";
  block.append(ul);
}
