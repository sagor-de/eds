export default function decorate(block) {
    const quoteWrapper = block.children;
    console.log(quoteWrapper[1])

 block.innerHTML = `
    <div class="quote-wrapper">
    <div class="blockquote">
      <h1>Intuitive design happens when <span>current knowledge</span> is the same as the <span>target knowledge.</span></h1>
      <h4>&mdash;Prosenjit Sikdar<br><em>Web Site Usability: A Designer's Guide</em></h4>
    </div>
  </div>`


  }