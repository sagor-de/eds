import utils from '../../utils/utils.js'

export default function decorate(block) {
    const valueChild = block.children;
    debugger;
    const title = valueChild[2].querySelector('p').innerText;
    const author = valueChild[3].querySelector('p').innerText;
    const bgcolor = valueChild[4].querySelector('p').innerText;

    block.innerHTML = utils.sanitizeHtml(`<div class = "${bgcolor}">
        <div class="blockquote">
        <h1>${title}</h1>
        <h4>&mdash;${author}<br><em>Web Site Usability: A Designer's Guide</em></h4>
        </div>
        </div>`);
}