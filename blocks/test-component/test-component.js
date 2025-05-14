
export default function decorate(block) {
    const childElements = block.children;

    const placement = childElements[0].querySelector('p') ? childElements[0].querySelector('p').textContent : '';
    const imageSrc = childElements[1].querySelector('img') ? childElements[1].querySelector('img').src : '';
    const imageAlt = childElements[2].querySelector('p') ? childElements[2].querySelector('p').textContent : '';
    const titleText = childElements[3].querySelector('p') ? childElements[3].querySelector('p').textContent : '';
    const descText = childElements[4].querySelector('p') ? childElements[4].querySelector('p').textContent : '';
    const ctaLabel = childElements[5].querySelector('p') ? childElements[5].querySelector('p').textContent : '';
    const ctaHref = childElements[6].querySelector('a') ? childElements[6].querySelector('a').href : '';
    const path = childElements[7].querySelector('p') ? childElements[7].querySelector('p').textContent : '';

    // Clear the block's content
    block.textContent = "";

    // Create the teaser container
    const teaserContainer = document.createElement('div');
    teaserContainer.className = 'teaser-area';
    if(placement !== 'right') {
        teaserContainer.classList.add('teaser-left');
    }
    
    // Create the content area
    const contentArea = document.createElement('div');
    contentArea.className = 'teaser-content-area';

    // Add title
    const title = document.createElement('div');
    title.className = 'teaser-title';
    title.textContent = titleText;
    contentArea.appendChild(title);

    // Add description
    const desc = document.createElement('p');
    desc.className = 'teaser-description';
    desc.textContent = descText;
    contentArea.appendChild(desc);

    // Add CTA 
    if(ctaHref !== '' || ctaLabel !== '') {
        const cta = document.createElement('a');
        cta.href = ctaHref;
        cta.setAttribute('tabindex', '0');
        if (cta.href.includes('.pdf')) {
            cta.target = '_blank';
            cta.rel = 'noreferrer';
            const baseUrl = 'https://publish-p153303-e1585520.adobeaemcloud.com/';
            cta.href = baseUrl + cta.getAttribute('href');
        }
        cta.textContent = ctaLabel;
        cta.className = 'cta-link';
        if(path=='newTab') {
            cta.target = '_blank';
        }
        const arrowIcon = document.createElement('div');
        arrowIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                <path d="M3.125 10.6914H16.875" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11.25 5.06641L16.875 10.6914L11.25 16.3164" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>`; 
        arrowIcon.className = 'cta-arrow-icon'; 
        cta.appendChild(arrowIcon);
        contentArea.appendChild(cta);
    }
    
    // Create the image area
    const imageArea = document.createElement('div');
    imageArea.className = 'teaser-image-area';

    //Add image
    const img = document.createElement('img');
    img.className = 'teaser-image';
    img.src = imageSrc;
    img.alt = imageAlt;
    imageArea.appendChild(img);

    teaserContainer.appendChild(contentArea);
    teaserContainer.appendChild(imageArea);
    block.appendChild(teaserContainer);
}