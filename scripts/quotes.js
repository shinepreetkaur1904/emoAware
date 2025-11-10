// ===============================
// EMOAWARE – quotes.js (Tap to Change ✨)
// ===============================

const quotesContainer = document.querySelector(".quotes-container");

fetch("data/quotes.json")
  .then(response => response.json())
  .then(quotes => {
    quotesContainer.innerHTML = ""; // clear placeholder

    // Create the quote card element
    const quoteEl = document.createElement("div");
    quoteEl.classList.add("quote-card");
    quotesContainer.appendChild(quoteEl);

    let index = 0;

    // Function to show next quote
    const showNextQuote = () => {
      quoteEl.style.opacity = "0";
      setTimeout(() => {
        quoteEl.textContent = `“${quotes[index].text}”`;
        quoteEl.style.opacity = "1";
        quoteEl.style.transform = "translateY(0)";
        index = (index + 1) % quotes.length; // loop back
      }, 400);
    };

    // Show the first quote
    showNextQuote();

    // Add click event (tap to change)
    quoteEl.addEventListener("click", showNextQuote);

    // Optional subtle pulse effect when clicked
    quoteEl.addEventListener("mousedown", () => {
      quoteEl.style.transform = "scale(0.97)";
    });
    quoteEl.addEventListener("mouseup", () => {
      quoteEl.style.transform = "scale(1)";
    });
  })
  .catch(err => {
    console.error("Error loading quotes:", err);
    quotesContainer.innerHTML = `<p style="color:#999;">Couldn’t load quotes 😔</p>`;
  });
