export default function decorate(block) {

    block.querySelectorAll('a').forEach(anchor => {
        anchor.setAttribute('tabindex', '0');
        const externalSuffix = ':EXTERNAL';
        if (anchor.href.toUpperCase().includes(externalSuffix)) {
            const url = anchor.href.slice(0, -externalSuffix.length);
            anchor.href = url;
            anchor.target = '_blank';
        } else {
            anchor.target = '_self';
        }
        if (anchor.href.includes('.pdf')) {
            anchor.target = '_blank';
            anchor.rel = 'noreferrer';
            const baseUrl = 'https://publish-p153303-e1585520.adobeaemcloud.com/';
            anchor.href = baseUrl + anchor.getAttribute('href');
        }
    });

}