const cardsPath = "./Individual Cards"; // Path to the cards folder
const totalCards = 276; // Total number of individual cards (69 x 4 grids)

// DOM Elements
const setStageBtn = document.getElementById("set-stage-btn");
const drawCardsBtn = document.getElementById("draw-cards-btn");
const setStageCardsContainer = document.getElementById("set-stage-cards");
const drawCardsContainer = document.getElementById("draw-cards");
const fullscreenCard = document.getElementById("fullscreen-card");

// Fullscreen PDF Elements
const gameRulesLink = document.getElementById("game-rules-link");
const fullscreenPdf = document.getElementById("fullscreen-pdf");
const pdfEmbed = document.getElementById("pdf-embed");
const backToGameBtn = document.getElementById("back-to-game-btn");

// Utility: Get a random card
function getRandomCard() {
  const randomIndex = Math.floor(Math.random() * totalCards) + 1;
  return `${cardsPath}/grid${Math.ceil(randomIndex / 69)}_card_${randomIndex % 69 || 69}.png`;
}

// Set The Stage: Display two cards
setStageBtn.addEventListener("click", () => {
  setStageCardsContainer.innerHTML = ""; // Clear previous cards
  for (let i = 0; i < 2; i++) {
    const card = document.createElement("img");
    card.src = getRandomCard();
    setStageCardsContainer.appendChild(card);
  }
});

// Draw Cards: Display seven cards
drawCardsBtn.addEventListener("click", () => {
  drawCardsContainer.innerHTML = ""; // Clear previous cards
  for (let i = 0; i < 7; i++) {
    const card = document.createElement("img");
    card.src = getRandomCard();
    card.addEventListener("click", () => showFullscreenCard(card.src));
    drawCardsContainer.appendChild(card);
  }
});

// Show fullscreen card
function showFullscreenCard(src) {
  fullscreenCard.innerHTML = `<img src="${src}" alt="Card">`;
  fullscreenCard.classList.remove("fullscreen-hidden");  // Show the fullscreen card
}

// Hide fullscreen card when clicked
fullscreenCard.addEventListener("click", () => {
  fullscreenCard.classList.add("fullscreen-hidden");  // Hide the fullscreen card
});

// Open the PDF in fullscreen when the "Game Rules" link is clicked
gameRulesLink.addEventListener("click", (e) => {
  e.preventDefault();  // Prevent default link behaviour
  pdfEmbed.src = "./Game Rules.pdf";  // Set the PDF source
  fullscreenPdf.classList.remove("fullscreen-hidden");  // Show the PDF in fullscreen
});

// Close the PDF when anywhere on the screen is clicked (excluding the PDF content area)
fullscreenPdf.addEventListener("click", (e) => {
  if (e.target === fullscreenPdf) { // Only close when clicking the overlay itself, not the content
    fullscreenPdf.classList.add("fullscreen-hidden");  // Hide the PDF
    pdfEmbed.src = "";  // Reset the PDF source to stop displaying it
  }
});

// Back to Game button: Close the PDF and return to the main menu
backToGameBtn.addEventListener("click", () => {
  fullscreenPdf.classList.add("fullscreen-hidden");  // Hide the PDF
  pdfEmbed.src = "";  // Reset the PDF source
});