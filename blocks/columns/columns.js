/* eslint-disable no-case-declarations */
import { createTag, getLocalePlaceholders } from '../../scripts/scripts.js';
console.log("======================================");
const { arrowRight, arrowDown } = await getLocalePlaceholders();
export default function decorate(block) {
  debugger
  const cols = [...block.firstElementChild.children];
  debugger;
  block.classList.add(`columns-${cols.length}-cols`);

  if (block.classList.contains('placeholder')) {
    if ([...block.children].length === 1) {
      block.classList.add('single-row');
    } else {
      block.classList.add('multi-row');
    }
  }

  // setup image columns
  [...block.children].forEach((row) => {
    if (block.classList.contains('savings')) {
      row.classList.add('row');
    }
    [...row.children].forEach((col, index) => {
      const pic = col.querySelector('picture');
      // Handle 2-4-6 layout if the block has an icon and pre-code
      if (cols.length === 3 && row.querySelector('.suggestion-card')) {
        row.classList.add('row');
        switch (index) {
          case 0:
            col.classList.add('col-md-2');
            break;
          case 1:
            col.classList.add('col-md-4');
            break;
          case 2:
            col.classList.add('col-md-6');
            break;
          default:
            break;
        }
      }

      if (block.classList.contains('discover-lilly')) {
        row.classList.add('row');
        switch (index) {
          case 0:
            col.classList.add('col-md-2');
            break;
          case 1:
            col.classList.add('col-md-7');
            break;
          case 2:
            col.classList.add('col-md-3');
            break;
          default:
            break;
        }
      }

      if (block.classList.contains('prescribing-ehr')) {
        row.classList.add('row');
        switch (index) {
          case 0:
            col.classList.add('col-md-8');
            break;
          case 1:
            col.classList.add('col-md-4');
            break;
          default:
            break;
        }
      }

      if (block.classList.contains('caution')) {
        row.classList.add('row');
        col.querySelector('img')?.classList.add('p-4');
        col.querySelector('h4')?.classList.add('p-2');
        switch (index) {
          case 0:
            col.classList.add('col-md-4');
            break;
          case 1:
            col.classList.add('col-md-8');
            break;
          default:
            break;
        }

        if (col.querySelector('img')) {
          const imageWrapper = createTag('div', { class: 'image-wrapper' }, col.querySelector('img'));
          col.innerHTML = imageWrapper.outerHTML;
        }
      }

      if (col.querySelector('a')?.href.includes('/fragments/image-slider/')) {
        col.classList.add('image-slider-col');
      }

      if (block.classList.contains('cards')) {
        col.classList.add('card-col');
        col.querySelector('.button-container a')?.classList.add('secondary');
        if (block.classList.contains('hcp')) {
          const svg = createTag(
            'svg',
            {
              class: 'lds-icon arrow-right inline',
              role: 'img',
              focusable: 'false',
            },
            `<title>${arrowRight}</title>`,
          );
          col.classList.add('hcp-card-col');
          col.querySelector('picture')?.closest('p')?.classList.add('hcp-image-wrapper', 'p-4');
          col.querySelector('a')?.closest('.button-container')?.classList.add('hcp-button-wrapper');
          col.querySelector('a')?.append(' ');
          col.querySelector('a')?.append(svg);

          const colWrapper = createTag('div', { class: 'hcp-card-wrapper' });
          colWrapper.append(col.cloneNode(true));
          col.replaceWith(colWrapper);
        } else {
          col.querySelector('h3')?.classList.add('lifestyle-purple');
          col.querySelectorAll('p, h3').forEach((ele) => {
            if (ele.tagName !== 'PICTURE' && !ele.querySelector('picture')) {
              ele.classList.add('px-3');
            }
          });
        }
      }

      if (block.classList.contains('custom-card')) {
        col.classList.add('custom-card-col');
      }

      if (block.classList.contains('tips')) {
        col.classList.add('tip-col');
        const oneTipContent = createTag('div', { class: 'col-md-6' });
        const contentRow = createTag('div', { class: 'row' });
        const accodionRow = createTag('div');
        [...col.children].forEach((ele) => {
          if (cols.length === 1) {
            if (ele.querySelector('img')) {
              contentRow.append(createTag('div', { class: 'col-md-6' }, ele));
            } else {
              oneTipContent.append(ele);
            }
          } else if (ele.classList.contains('fragment-wrapper')) {
            accodionRow.append(ele);
          } else {
            contentRow.append(ele);
          }
        });
        if (oneTipContent.innerHTML) {
          contentRow.append(oneTipContent);
        }

        col.innerHTML = '';
        col.append(contentRow);
        if (accodionRow.innerHTML) {
          col.append(accodionRow);
        }
      }

      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        } else if (block.classList.contains('sign-up')) {
          picWrapper.classList.add('sign-up-content-col');
          col.querySelector('h2')?.classList.add('lifestyle-purple');
        } else if (block.classList.contains('promo')) {
          const link = col.querySelector('a');
          if (link) {
            col.classList.add('promo-col');
            link.classList.remove('button');
            link.innerHTML = createTag('span', { class: 'promo-text' }, link.textContent).outerHTML;
            link.insertAdjacentElement('afterbegin', pic);
            const wrapper = createTag('div', { class: 'promo-wrapper' }, link);
            col.innerHTML = '';
            col.append(wrapper);
          }
        } else if (block.classList.contains('flex-image')) {
          // flex the content and leave the button as is
          const contentDiv = createTag('div', { class: 'flex-content' });
          [...col.children].forEach((child) => {
            if (!child.classList.contains('button-container')) {
              contentDiv.append(child);
            }
          });
          col.prepend(contentDiv);
        }

        if (col.querySelector('.suggestion-card')) {
          col.classList.add('suggestion-card-col');
        }
      } else if (block.classList.contains('border')) {
        col.classList.add('content-border-col');
        const wrapper = createTag('div', { class: 'content-wrapper' });
        [...col.children].forEach((ele) => {
          if (ele.tagName !== 'H6') {
            wrapper.append(ele);
          }
        });
        col.append(wrapper);
      } else if (!block.classList.contains('placeholder')) {
        col.classList.add('content-col');
        if (block.classList.contains('savings')) {
          const savingsWrapper = createTag('div', { class: 'savings-wrapper' }, col.cloneNode(true));
          col.replaceWith(savingsWrapper);
        }
      }
    });
  });
}
