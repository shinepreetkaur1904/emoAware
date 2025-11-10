function openGame(type) {
  switch(type) {
    case 'bubble':
      window.location.href = "../games/bubble-pop.html";
      break;

    case 'breath':
      window.location.href = "../games/breathing.html";
      break;

    case 'memory':
      window.location.href = "../games/memory-tiles.html";
      break;

    case 'paint':
      window.location.href = "../games/mood-paint.html";
      break;

    case 'music':
      window.location.href = "../games/calm-music.html";
      break;

    default:
      alert("Game coming soon!");
  }
}
