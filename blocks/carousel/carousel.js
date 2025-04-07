import { handleKalturaPlayer } from "../../utils/video.js";

export default function decorate(block) {
  const slideValue = document.querySelector('p[data-aue-prop="cardsCount"]').textContent;
  let slideNum = 2;

  switch (slideValue) {
    case "three":
      slideNum = 3;
      break;
    case "four":
      slideNum = 4;
      break;
    case "five":
      slideNum = 5;
      break;
    case "six":
      slideNum = 6;
      break;
    default:
      slideNum = 2;
      break;
  }

  const images = [
    { img: document.querySelector('img[data-aue-prop="image1"]'), alt: document.querySelector('p[data-aue-prop="imageAlt1"]') },
    { img: document.querySelector('img[data-aue-prop="image2"]'), alt: document.querySelector('p[data-aue-prop="imageAlt2"]') },
    { img: document.querySelector('img[data-aue-prop="image3"]'), alt: document.querySelector('p[data-aue-prop="imageAlt3"]') },
    { img: document.querySelector('img[data-aue-prop="image4"]'), alt: document.querySelector('p[data-aue-prop="imageAlt4"]') },
    { img: document.querySelector('img[data-aue-prop="image5"]'), alt: document.querySelector('p[data-aue-prop="imageAlt5"]') },
    { img: document.querySelector('img[data-aue-prop="image6"]'), alt: document.querySelector('p[data-aue-prop="imageAlt6"]') },
  ];

  const videos = [
    { videoId: document.querySelector('[data-aue-prop="videoId1"]') },
    { videoId: document.querySelector('[data-aue-prop="videoId2"]') },
    { videoId: document.querySelector('[data-aue-prop="videoId3"]') },
    { videoId: document.querySelector('[data-aue-prop="videoId4"]') },
    { videoId: document.querySelector('[data-aue-prop="videoId5"]') },
    { videoId: document.querySelector('[data-aue-prop="videoId6"]') },
  ];

  const text = [
    { title: document.querySelector('div[data-aue-prop="slideTitle1"]'), subTitle: document.querySelector('div[data-aue-prop="slideSubTitle1"]') },
    { title: document.querySelector('div[data-aue-prop="slideTitle2"]'), subTitle: document.querySelector('div[data-aue-prop="slideSubTitle2"]') },
    { title: document.querySelector('div[data-aue-prop="slideTitle3"]'), subTitle: document.querySelector('div[data-aue-prop="slideSubTitle3"]') },
    { title: document.querySelector('div[data-aue-prop="slideTitle4"]'), subTitle: document.querySelector('div[data-aue-prop="slideSubTitle4"]') },
    { title: document.querySelector('div[data-aue-prop="slideTitle5"]'), subTitle: document.querySelector('div[data-aue-prop="slideSubTitle5"]') },
    { title: document.querySelector('div[data-aue-prop="slideTitle6"]'), subTitle: document.querySelector('div[data-aue-prop="slideSubTitle6"]') },
  ];

  const buttons = [
    [
      { buttonLink: document.querySelector('p[data-aue-prop="slide1Link1"]'), buttonText: document.querySelector('p[data-aue-prop="slide1LinkText1"]'), buttonTarget: document.querySelector('p[data-aue-prop="slide1TargetPath1"]'), buttonType: document.querySelector('p[data-aue-prop="slide1ButtonType1"]') },
      { buttonLink: document.querySelector('p[data-aue-prop="slide1Link2"]'), buttonText: document.querySelector('p[data-aue-prop="slide1LinkText2"]'), buttonTarget: document.querySelector('p[data-aue-prop="slide1TargetPath2"]'), buttonType: document.querySelector('p[data-aue-prop="slide1ButtonType2"]') },
    ],
    [
      { buttonLink: document.querySelector('p[data-aue-prop="slide2Link1"]'), buttonText: document.querySelector('p[data-aue-prop="slide2LinkText1"]'), buttonTarget: document.querySelector('p[data-aue-prop="slide2TargetPath1"]'), buttonType: document.querySelector('p[data-aue-prop="slide2ButtonType1"]') },
      { buttonLink: document.querySelector('p[data-aue-prop="slide2Link2"]'), buttonText: document.querySelector('p[data-aue-prop="slide2LinkText2"]'), buttonTarget: document.querySelector('p[data-aue-prop="slide2TargetPath2"]'), buttonType: document.querySelector('p[data-aue-prop="slide2ButtonType2"]') },
    ],
    [
      { buttonLink: document.querySelector('p[data-aue-prop="slide3Link1"]'), buttonText: document.querySelector('p[data-aue-prop="slide3LinkText1"]'), buttonTarget: document.querySelector('p[data-aue-prop="slide3TargetPath1"]'), buttonType: document.querySelector('p[data-aue-prop="slide3ButtonType1"]') },
      { buttonLink: document.querySelector('p[data-aue-prop="slide3Link2"]'), buttonText: document.querySelector('p[data-aue-prop="slide3LinkText2"]'), buttonTarget: document.querySelector('p[data-aue-prop="slide3TargetPath2"]'), buttonType: document.querySelector('p[data-aue-prop="slide3ButtonType2"]') },
    ],
    [
      { buttonLink: document.querySelector('p[data-aue-prop="slide4Link1"]'), buttonText: document.querySelector('p[data-aue-prop="slide4LinkText1"]'), buttonTarget: document.querySelector('p[data-aue-prop="slide4TargetPath1"]'), buttonType: document.querySelector('p[data-aue-prop="slide4ButtonType1"]') },
      { buttonLink: document.querySelector('p[data-aue-prop="slide4Link2"]'), buttonText: document.querySelector('p[data-aue-prop="slide4LinkText2"]'), buttonTarget: document.querySelector('p[data-aue-prop="slide4TargetPath2"]'), buttonType: document.querySelector('p[data-aue-prop="slide4ButtonType2"]') },
    ],
    [
      { buttonLink: document.querySelector('p[data-aue-prop="slide5Link1"]'), buttonText: document.querySelector('p[data-aue-prop="slide5LinkText1"]'), buttonTarget: document.querySelector('p[data-aue-prop="slide5TargetPath1"]'), buttonType: document.querySelector('p[data-aue-prop="slide5ButtonType1"]') },
      { buttonLink: document.querySelector('p[data-aue-prop="slide5Link2"]'), buttonText: document.querySelector('p[data-aue-prop="slide5LinkText2"]'), buttonTarget: document.querySelector('p[data-aue-prop="slide5TargetPath2"]'), buttonType: document.querySelector('p[data-aue-prop="slide5ButtonType2"]') },
    ],
    [
      { buttonLink: document.querySelector('p[data-aue-prop="slide6Link1"]'), buttonText: document.querySelector('p[data-aue-prop="slide6LinkText1"]'), buttonTarget: document.querySelector('p[data-aue-prop="slide6TargetPath1"]'), buttonType: document.querySelector('p[data-aue-prop="slide6ButtonType1"]') },
      { buttonLink: document.querySelector('p[data-aue-prop="slide6Link2"]'), buttonText: document.querySelector('p[data-aue-prop="slide6LinkText2"]'), buttonTarget: document.querySelector('p[data-aue-prop="slide6TargetPath2"]'), buttonType: document.querySelector('p[data-aue-prop="slide6ButtonType2"]') },
    ],
  ];

  const cardImages = [
    { img: document.querySelector('img[data-aue-prop="cardImage1"]'), alt: document.querySelector('p[data-aue-prop="CardImageAlt1"]') },
    { img: document.querySelector('img[data-aue-prop="cardImage2"]'), alt: document.querySelector('p[data-aue-prop="CardImageAlt2"]') },
    { img: document.querySelector('img[data-aue-prop="cardImage3"]'), alt: document.querySelector('p[data-aue-prop="CardImageAlt3"]') },
    { img: document.querySelector('img[data-aue-prop="cardImage4"]'), alt: document.querySelector('p[data-aue-prop="CardImageAlt4"]') },
    { img: document.querySelector('img[data-aue-prop="cardImage5"]'), alt: document.querySelector('p[data-aue-prop="CardImageAlt5"]') },
    { img: document.querySelector('img[data-aue-prop="cardImage6"]'), alt: document.querySelector('p[data-aue-prop="CardImageAlt6"]') },
  ];

  const cardText = [
    { eyebrowText: document.querySelector('div[data-aue-prop="eyebrow1"]'), description: document.querySelector('div[data-aue-prop="description1"]') },
    { eyebrowText: document.querySelector('div[data-aue-prop="eyebrow2"]'), description: document.querySelector('div[data-aue-prop="description2"]') },
    { eyebrowText: document.querySelector('div[data-aue-prop="eyebrow3"]'), description: document.querySelector('div[data-aue-prop="description3"]') },
    { eyebrowText: document.querySelector('div[data-aue-prop="eyebrow4"]'), description: document.querySelector('div[data-aue-prop="description4"]') },
    { eyebrowText: document.querySelector('div[data-aue-prop="eyebrow5"]'), description: document.querySelector('div[data-aue-prop="description5"]') },
    { eyebrowText: document.querySelector('div[data-aue-prop="eyebrow6"]'), description: document.querySelector('div[data-aue-prop="description6"]') },
  ];

  let slidesHTML = "";
  let slideCardsHTML = "";

  for (let index = 0; index < slideNum; index++) {
    const image = images[index];
    const imgSrc = image.img ? image.img.src : "";
    const imgAlt = image.img ? (image.alt ? image.alt.textContent : "") : "";
    const title = text[index].title ? text[index].title.innerHTML : "";
    let quoteClass = "quote-icon";
    if (title === "") {
      quoteClass = "hide";
    }
    const subTitle = text[index].subTitle ? text[index].subTitle.innerHTML : "";

    const cardImage = cardImages[index];
    const cardImageSrc = cardImage.img ? cardImage.img.src : "";
    const cardImageAlt = cardImage.img ? (cardImage.alt ? cardImage.alt.textContent : "") : "";
    const cardEyebrow = cardText[index].eyebrowText ? cardText[index].eyebrowText.innerHTML : "";
    const cardDesc = cardText[index].description ? cardText[index].description.innerHTML : "";

    const playerId = `kaltura-${Math.random() * 10000000}`;
    const video = videos[index];
    const videoId = video.videoId ? (video.videoId ? video.videoId.textContent : "") : "";

    const videoPlayerContainer = document.createElement("div");
    videoPlayerContainer.id = playerId;
    videoPlayerContainer.classList.add("video-container");

    if (slideValue) {
      slidesHTML += `
        <div class="mySlides fade">
          ${videoId && videoPlayerContainer.outerHTML}
          ${imgSrc && `<img src="${imgSrc}" alt="${imgAlt}" style="width:100%">`}
          <div class="content-area">
            <div class="text-area">
              <img src="/content/dam/aem-eds-poc/quotes.png" alt="Quote Icon" class=${quoteClass}>
              <div class="title-text">${title}</div>
              <div class="sub-title-text">${subTitle}</div>
            </div>
            <div class="button-area">
              <a class="${buttons[index][0].buttonType ? buttons[index][0].buttonType.textContent : ''}" 
                target="${buttons[index][0].buttonTarget ? buttons[index][0].buttonTarget.textContent : ''}" 
                 href="${buttons[index][0].buttonLink ? buttons[index][0].buttonLink.textContent : ''}">
                    ${buttons[index][0].buttonText ? buttons[index][0].buttonText.textContent : ''}
                    <img src="/content/dam/aem-eds-poc/ArrowRight.png" alt="Arrow Right" class=${buttons[index][0].buttonText ? "arrow-right" : "hide"}>
              </a>
              <a class="${buttons[index][1].buttonType ? buttons[index][1].buttonType.textContent : ''}"
               target="${buttons[index][1].buttonTarget ? buttons[index][1].buttonTarget.textContent : ''}"
                href="${buttons[index][1].buttonLink ? buttons[index][1].buttonLink.textContent : ''}">
                    ${buttons[index][1].buttonText ? buttons[index][1].buttonText.textContent : ''}
                    <img src="/content/dam/aem-eds-poc/ArrowRight.png" alt="Arrow Right" class=${buttons[index][1].buttonText ? "arrow-right" : "hide"}>
              </a>
            </div>
          </div>
        </div>
      `;

      slideCardsHTML += `<span class="slideCard slideCard${index + 1}">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src="${cardImageSrc}" alt="${cardImageAlt}">
          </div>
          <div class="flip-card-back">
            <div class="flip-card-text eyebrow-text">${cardEyebrow}</div>
            <div class="flip-card-text eyebrow-desc">${cardDesc}</div>
          </div>
        </div>
      </span>`;
    }
  }

  block.innerHTML = `
    <div class="slideshow-container">
      ${slidesHTML}
      <a class="prev">❮</a>
      <a class="next">❯</a>
    </div>
    <div style="text-align:center" class="slideCardContainer">
      ${slideCardsHTML}
    </div>
  `;

  let slideIndex = 0;

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let slideCards = document.getElementsByClassName("slideCard");
    if (n >= slides.length) {
      slideIndex = 0;
    }
    if (n < 0) {
      slideIndex = slides.length - 1;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < slideCards.length; i++) {
      slideCards[i].className = slideCards[i].className.replace(" active", "");
    }
    slides[slideIndex].style.display = "block";
    slideCards[slideIndex].className += " active";

    // Initialize video player for the current slide
    const currentSlide = slides[slideIndex];
    const videoContainer = currentSlide.querySelector(".video-container");
    if (videoContainer) {
      const videoId = videos[slideIndex].videoId ? videos[slideIndex].videoId.textContent : "";
      handleKalturaPlayer(videoId, videoContainer.id);
    }
  }

  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");

  prev.addEventListener("click", () => {
    plusSlides(-1);
  });

  next.addEventListener("click", () => {
    plusSlides(1);
  });

  const slideCards = document.querySelectorAll(".slideCard");
  for (let index = 0; index < slideCards.length; index++) {
    const slideCard = slideCards[index];
    slideCard.addEventListener("click", () => {
      currentSlide(index);
    });
  }
}
