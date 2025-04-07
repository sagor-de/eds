import { readBlockConfig, loadScript, createOptimizedPicture } from '../scripts/aem.js';

const KALTURA_PARTNER_ID = '1759891';
const KALTURA_UICONF_ID = '54959122';
let currentKalturaPlayer = null;

export async function handleKalturaPlayer(entryId, playerId) {
  try {
    if (!document.getElementById(playerId)) {
      setTimeout(() => {
        handleKalturaPlayer(entryId);
      }, 500);
      return;
    }
    if (document.getElementById(playerId)?.innerHTML) {
      return;
    }
    const scriltUrl = `https://cdnapisec.kaltura.com/p/${KALTURA_PARTNER_ID}/embedPlaykitJs/uiconf_id/${KALTURA_UICONF_ID}`;
    await loadScript(scriltUrl);

    const kalturaPlayer = window.KalturaPlayer.setup({
      targetId: playerId,
      provider: {
        partnerId: KALTURA_PARTNER_ID,
        uiConfId: KALTURA_UICONF_ID,
      },
      playback: {
        autoplay: true,
        muted: true,
        loop: true
      },
    });
    kalturaPlayer.loadMedia({ entryId });

    // Add an event listener to unmute the video once it starts playing
    kalturaPlayer.addEventListener(window.KalturaPlayer.Event.PLAYING, () => {
      kalturaPlayer.setVolume(1); // Unmute the video
    });

    window.currentKalturaPlayer = kalturaPlayer;
    currentKalturaPlayer = kalturaPlayer;
    
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
}

// export function muteVideo() {
//   if (currentKalturaPlayer) {
//     currentKalturaPlayer.setVolume(0); // Mute the video
//   }
// }

// // Function to unmute the video
// export function unmuteVideo() {
//   if (currentKalturaPlayer) {
//     currentKalturaPlayer.setVolume(1); // Unmute the video
//   }
// }

// // Function to pause the video
// export function pauseVideo() {
//   if (currentKalturaPlayer) {
//     currentKalturaPlayer.pause();
//   }
// }

// // Function to play the video
// export function playVideo() {
//   if (currentKalturaPlayer) {
//     currentKalturaPlayer.play();
//   }
// }
