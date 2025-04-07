import { handleKalturaPlayer } from "../../utils/video.js";

function getAllParagraphs(block) {
  const paragraphs = [];

  // Traverse all nested <p> tags in order
  const allPTags = block.querySelectorAll("p");
  allPTags.forEach((p) => {
    if (p.tagName === "P") {
      paragraphs.push(p);
    }
  });

  return paragraphs;
}
function getFilteredParagraphs(block) {
  const allParagraphs = getAllParagraphs(block);

  // Check the third index to determine the structure
  const thirdDiv = block.children[2]?.firstElementChild; // Third <div>
  const hasThirdP = thirdDiv?.firstElementChild?.tagName === "P"; // Check if third <div> contains a <p>

  if (hasThirdP) {
    // Case 2: Third <div> contains a <p> (e.g., "false")
    for (let i = 0; i < 3; i++) {
      if (allParagraphs[i]) {
        allParagraphs[i].style.display = "none"; // Hide first three <p> tags
      }
    }
  } else {
    // Case 1: Third <div> is empty
    for (let i = 0; i < 2; i++) {
      if (allParagraphs[i]) {
        allParagraphs[i].style.display = "none"; // Hide only the first two <p> tags
      }
    }
  }

  // Return all remaining (visible) paragraphs starting from index 2 or 3
  const startIndex = hasThirdP ? 3 : 2; // Start index depends on the case
  return allParagraphs
    .slice(startIndex)
    .filter((p) => p.style.display !== "none");
}

function getVideoId(block) {
  const allParagraphs = getAllParagraphs(block);
  const videoIdNode = allParagraphs[1]; // Second <p> is always the video ID

  if (videoIdNode && videoIdNode.textContent.trim()) {
    return videoIdNode; // Return the video ID string
  }

  console.error("Video ID not found.");
  return null;
}

function getTitle(block) {
  const filteredParagraphs = getFilteredParagraphs(block);
  const titleEl = filteredParagraphs[0]; // First visible <p> after filtering

  if (titleEl && titleEl.textContent.trim()) {
    titleEl.classList.add("hero-title");
    titleEl.style.display = ""; // Ensure it's visible
  } else {
    console.error("Title element not found or is empty.");
  }

  return titleEl;
}

function getDescription(block) {
  const filteredParagraphs = getFilteredParagraphs(block);
  const descriptionEl = filteredParagraphs[1]; // Second visible <p> after filtering

  if (descriptionEl && descriptionEl.textContent.trim()) {
    descriptionEl.classList.add("hero-description");
    descriptionEl.style.display = ""; // Ensure it's visible
  } else {
    console.error("Description element not found or is empty.");
  }

  return descriptionEl;
}

export default function decorate(block) {
  const playerId = `kaltura-${Math.random() * 10000000}`;
  // const videoId = getVideoId(block);
  const videoIdNode = getVideoId(block);

  if (!videoIdNode) {
    console.warn("No video ID element found in hero block.");
    return;
  }

  const videoId = videoIdNode.textContent.trim();
  videoIdNode.style.display = "none";

  //title and description
  getTitle(block);
  getDescription(block);

  const videoPlayerContainer = document.createElement("div");
  videoPlayerContainer.id = playerId;
  videoPlayerContainer.classList.add("primary-hero-video");
  block.appendChild(videoPlayerContainer);
  handleKalturaPlayer(videoId, playerId);

  // Prevent playkit-hover class from being added to the child element
  (function setupKalturaPlayerControl(playerId) {
    const BLOCKED_CLASSES = ["playkit-hover", "playkit-state-paused"];
    const FORCE_CLASS = "force-cursor-visible";
    const POLL_INTERVAL = 300;

    const interval = setInterval(() => {
      const container = document.getElementById(playerId);
      if (!container) return;

      const player = container.querySelector(".playkit-player");
      if (!player) return;

      const videoElement = document.querySelector(".playkit-engine");
      videoElement.setAttribute("aria-label", "background video");

      //console.log("✅ .playkit-player found");

      // Remove unwanted classes initially
      cleanClasses(player);

      // Add force-cursor-visible
      if (!player.classList.contains(FORCE_CLASS)) {
        player.classList.add(FORCE_CLASS);
        //console.log(`✅ Added ${FORCE_CLASS}`);
      }

      // Patch all ways to modify the class list
      patchClassList(player);
      patchClassNameProperty(player);

      clearInterval(interval); // Done
    }, POLL_INTERVAL);

    function cleanClasses(el) {
      BLOCKED_CLASSES.forEach((cls) => {
        if (el.classList.contains(cls)) {
          el.classList.remove(cls);
          //console.log(`❌ Removed class: ${cls}`);
        }
      });

      // Always ensure force-cursor-visible is present
      if (!el.classList.contains(FORCE_CLASS)) {
        el.classList.add(FORCE_CLASS);
        //console.log(`✅ Re-added ${FORCE_CLASS}`);
      }
    }

    function patchClassList(el) {
      if (el.__patchedClassList) return;

      const originalAdd = el.classList.add;
      const originalToggle = el.classList.toggle;
      const originalRemove = el.classList.remove;

      el.classList.add = function (...classes) {
        const filtered = classes.filter((cls) => {
          if (BLOCKED_CLASSES.includes(cls)) {
            //console.warn(`🚫 Prevented class "${cls}" from being added`);
            return false;
          }
          return true;
        });
        if (filtered.length > 0) {
          originalAdd.apply(this, filtered);
        }
      };

      el.classList.toggle = function (cls, force) {
        if (BLOCKED_CLASSES.includes(cls)) {
          //console.warn(`🚫 Prevented class "${cls}" from being toggled`);
          return this.contains(cls);
        }
        return originalToggle.call(this, cls, force);
      };

      el.classList.remove = function (...classes) {
        const filtered = classes.filter((cls) => {
          if (cls === FORCE_CLASS) {
            //console.warn(`🚫 Prevented removal of "${FORCE_CLASS}"`);
            return false;
          }
          return true;
        });
        if (filtered.length > 0) {
          originalRemove.apply(this, filtered);
        }
      };

      el.__patchedClassList = true;
    }

    function patchClassNameProperty(el) {
      if (el.__patchedClassName) return;

      const descriptor =
        Object.getOwnPropertyDescriptor(Element.prototype, "className") ||
        Object.getOwnPropertyDescriptor(HTMLElement.prototype, "className");

      Object.defineProperty(el, "className", {
        get() {
          return descriptor.get.call(this);
        },
        set(newValue) {
          let classes = newValue.split(/\s+/).filter(Boolean);

          // Remove blocked classes
          classes = classes.filter((cls) => !BLOCKED_CLASSES.includes(cls));

          // Ensure force-cursor-visible is present
          if (!classes.includes(FORCE_CLASS)) {
            classes.push(FORCE_CLASS);
            //console.log(`✅ Re-added ${FORCE_CLASS} via className`);
          }

          const finalValue = classes.join(" ");
          descriptor.set.call(this, finalValue);
        },
        configurable: true,
        enumerable: true,
      });

      el.__patchedClassName = true;
      //console.log("🔒 Patched className setter to block unwanted class overwrites");
    }
  })(playerId);

  const heroBlock = document.querySelector(".hero-overlay .hero");
  if (!heroBlock) return;

  let videoElementforoverlay = document.querySelector(
    ".primary-hero-video video"
  );
  let isPaused = false;
  let overlay = document.createElement("div");
  let videoStateBeforeScroll = true;

  const overlayTextElements = document.querySelectorAll(
    ".hero-overlay .default-content-wrapper, .hero-overlay > .cards-wrapper"
  );

  overlayTextElements.forEach((element) => {
    element.classList.add("overlay-text");
    overlay.appendChild(element);
  });

  console.log("overlay", overlay);
  console.log("overlayTextElements", overlayTextElements);
  // Create overlay for paused frame
  overlay.className = "video-overlay";
  heroBlock.appendChild(overlay);

  function capturePausedFrame() {
    if (!videoElementforoverlay) return;

    // Create a canvas to capture the current frame
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = videoElementforoverlay.videoWidth;
    canvas.height = videoElementforoverlay.videoHeight;

    ctx.filter = "blur(10px)"; // Apply blur filter
    ctx.drawImage(videoElementforoverlay, 0, 0, canvas.width, canvas.height);
    ctx.filter = "none"; // Reset filter for the overlay
    overlay.style.backgroundImage = `url(${canvas.toDataURL("image/png")})`;
    overlay.classList.add("show");
  }

  function handleScroll() {
    if (!videoElementforoverlay) return;

    const rect = heroBlock.getBoundingClientRect();
    const isOutOfView = rect.top < 0; // Any scroll down
    const isBackToTop = rect.top >= 0;

    if (isOutOfView && !overlay.classList.contains("show")) {
      videoStateBeforeScroll = !videoElementforoverlay.paused;

      if (videoStateBeforeScroll) {
        videoElementforoverlay.pause();
      }

      capturePausedFrame();
      isPaused = true;
      overlay.classList.add("show");
      overlay.style.width = "100%"
    }

    if (isBackToTop && overlay.classList.contains("show")) {
      overlay.classList.remove("show");
      overlay.style.width = "0%"
      if (videoStateBeforeScroll) {
        videoElementforoverlay.play();
      } else {
        videoElementforoverlay.pause();
      }

      isPaused = false;
    }
  }

  function detectVideoElement() {
    videoElementforoverlay = document.querySelector(
      ".primary-hero-video video"
    );
    if (videoElementforoverlay) {
      console.log("Video element detected:", videoElementforoverlay);
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check in case video is already in view
    } else {
      console.log("Video element not found, retrying...");
      setTimeout(detectVideoElement, 100); // Retry after a short delay
    }
  }

  setTimeout(() => {
    detectVideoElement(); // Start detecting the video element
  }, 100);

  const leftButton = document.createElement("button");
  leftButton.type = "button";
  const carouselimg = document.createElement("img");
  leftButton.classList.add("scroll-btn", "left");
  leftButton.appendChild(carouselimg);
  leftButton.textContent = "<";

  const rightButton = document.createElement("button");
  rightButton.type = "button";
  rightButton.classList.add("scroll-btn", "right");
  rightButton.textContent = ">";

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("hero-carousel-buttons");
  buttonContainer.appendChild(leftButton);
  buttonContainer.appendChild(rightButton);
  overlay.appendChild(buttonContainer);

  leftButton.addEventListener("click", () => {
    const cardsWrapper = document.querySelector(".cards-wrapper ul");
    const card = cardsWrapper?.querySelector("li");

    if (cardsWrapper && card) {
      const cardWidth =
        card.offsetWidth + parseInt(getComputedStyle(card).marginRight || 0);
      cardsWrapper.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      });
    }
  });

  rightButton.addEventListener("click", () => {
    const cardsWrapper = document.querySelector(".cards-wrapper ul");
    const card = cardsWrapper?.querySelector("li");

    if (cardsWrapper && card) {
      const cardWidth =
        card.offsetWidth + parseInt(getComputedStyle(card).marginRight || 0);
      cardsWrapper.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
    }
  });
}
