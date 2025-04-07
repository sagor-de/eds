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
}
