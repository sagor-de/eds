 
export default function decorate(block) {
    const childElements = block.children;
    const [
        placementEl,
        imageEl,
        imageAltrEl,
        iconImgEl,
        iconImgAltEl,
        titleEl,
        descriptionEl,
        ctaLabelEl,
        ctaButtonE1,
        targetPathEl,
        exitInterstitialEl
    ] = block.children;
    debugger;
    const placement = childElements[0].querySelector('p') ? childElements[0].querySelector('p').textContent : '';
    const image = childElements[1].querySelector('img') ? childElements[1].querySelector('img') : '';
    const imageAlt = childElements[2];
    const iconImg = childElements[3] && childElements[3].querySelector('img') ? childElements[3].querySelector('img') : '';
    const iconImgAlt = childElements[4] && childElements[4].querySelector('p') ? childElements[4].querySelector('p').textContent : '';
    const title = childElements[5] ? childElements[5] : '';
    const description = childElements[6] ? childElements[6] : '';
    const ctaLabel = childElements[7] && childElements[7].querySelector('p') ? childElements[7].querySelector('p').textContent : '';
    const ctaButton = childElements[8] && childElements[8].querySelector('a') ? childElements[8].querySelector('a') : '';
    const targetPath = childElements[9] && childElements[9].querySelector('p') ? childElements[9].querySelector('p').textContent : '';
    const exitInterstitial = childElements[10] && childElements[10].querySelector('p') ? childElements[10].querySelector('p').textContent : '';
 
    console.log('placement', placement);
    console.log('imageSrc', image);
    console.log('imageAlt', imageAlt);
    console.log('iconImg', iconImg);
    console.log('iconImgAlt', iconImgAlt);
    console.log('title', title);
    console.log('description', description);
    console.log('ctaLabel', ctaLabel);
    console.log('ctaButton', ctaButton);
    console.log('targetPath', targetPath);
    console.log('exitInterstitial', exitInterstitial);
 
    // // Clear the block's content
    block.textContent = "";
 
    const teaserContainer = document.createElement('div');
    teaserContainer.className = 'teaser-area';
    if(placement !== 'right') {
        teaserContainer.setAttribute('style', 'flex-direction: row-reverse !important;');
    }
   
    const contentArea = document.createElement('div');
    contentArea.className = 'teaser-content-area';
 
    if (iconImg) {
        iconImg.classList.add('icon-img');
        if (iconImgAlt && iconImgAlt.trim() !== "") {
            iconImg.setAttribute('alt', iconImgAlt);
        }
        contentArea.append(iconImg);
    }
 
    title.className = 'teaser-title';
    contentArea.appendChild(title);
 
    description.className = 'teaser-description';
    contentArea.appendChild(description);
 
    if(ctaButton !== '' || ctaLabel !== '') {
        ctaButton.setAttribute('tabindex', '0');
        ctaButton.className = 'cta-link';
        ctaButton.textContent = ctaLabel;
        // if (cta.href.includes('.pdf')) {
        //     cta.target = '_blank';
        //     cta.rel = 'noreferrer';
        //     const baseUrl = 'https://publish-p153303-e1585520.adobeaemcloud.com/';
        //     cta.href = baseUrl + cta.getAttribute('href');
        // }
        if(targetPath=='newTab') {
            ctaButton.target = '_blank';
        }
        const arrowIcon = document.createElement('div');
        arrowIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                <path d="M3.125 10.6914H16.875" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11.25 5.06641L16.875 10.6914L11.25 16.3164" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>`;
        arrowIcon.className = 'cta-arrow-icon';
        ctaButton.appendChild(arrowIcon);
        contentArea.appendChild(ctaButton);
    }
   
    const imageArea = document.createElement('div');
    imageArea.className = 'teaser-image-area';
 
    image.className = 'teaser-image';
    image.alt = imageAlt;
    imageArea.appendChild(image);
 
    teaserContainer.appendChild(contentArea);
    teaserContainer.appendChild(imageArea);
    block.appendChild(teaserContainer);
}