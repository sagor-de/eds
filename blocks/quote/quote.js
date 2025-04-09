export default function decorate(block) {
    const [
      titleEl,
      authorEl,
      ctaTextEl,
      ctaLinkEl,
      ctaTargetEl,
      exteriorLabelEl,
      interiorLabelEl
    ] = block.children;
    console.log(titleEl);
    const title = titleEl.querySelector('p').innerText;
    const author = authorEl.querySelector('p').innerText
    debugger;
    block.innerHTML = `<div class = "quote-wrapper">
        <div class="blockquote">
          <h1>${title}</h1>
          <h4>&mdash;${author}<br><em>Web Site Usability: A Designer's Guide</em></h4>
        </div>
      </div>`;
  }