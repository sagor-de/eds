import utils from "../../utils/utils.js";

export default function decorate(block) {
    const quoteWrapper = block.children;
    console.log(quoteWrapper[1])
    debugger;
    const blockquote = document.createElement('blockquote');
    blockquote.textContent = quoteWrapper.textContent.trim();
    quoteWrapper.replaceChildren(blockquote);

 block.innerHTML = utils.sanitizeHtml(`
    <div class="quote-wrapper">
    <div class="blockquote">
      <h1>Intuitive design happens when <span>current knowledge</span> is the same as the <span>target knowledge.</span></h1>
      <h4>&mdash;Prosenjit Sikdar<br><em>Web Site Usability: A Designer's Guide</em></h4>
    </div>
  </div>`);


  }