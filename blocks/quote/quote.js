import utils from '../../utils/utils.js'

export default function decorate(block) {
    debugger;
    const [
        titleEl,
        authorEl,
        bgcolorEl,
    ] = block.children;
    console.log(titleEl);
    const title = titleEl.querySelector('p').innerText;
    const author = authorEl.querySelector('p').innerText;
    const bgcolor = bgcolorEl.querySelector('p').innerText;

    block.innerHTML = utils.sanitizeHtml(`<div class = "${bgcolor}">
        <div class="blockquote">
        <h1>${title}</h1>
        <h4>&mdash;${author}<br><em>Web Site Usability: A Designer's Guide</em></h4>
        </div>
        </div>`);
}