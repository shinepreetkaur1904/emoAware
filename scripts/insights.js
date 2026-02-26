async function loadInsights() {
  try {
    const response = await fetch("http://localhost:3000/api/history");
    const data = await response.json();

    if (!data || data.length === 0) {
      console.log("No chat data available");
      return;
    }

    // 1️⃣ Build HashMap for emotion frequency
    const freq = {};

    data.forEach(chat => {
      if (chat.emotion) {
        const emotion = chat.emotion.toLowerCase();
        freq[emotion] = (freq[emotion] || 0) + 1;
      }
    });

    const total = data.length;

    // 2️⃣ Sort emotions by frequency (Descending)
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);

    const mostFrequentEmotion = sorted.length > 0 ? sorted[0][0] : "none";
    const distinctCount = Object.keys(freq).length;

    // =========================
    // 📊 FIRST CARD – Breakdown
    // =========================
    const firstCard = document.querySelector(".analysis-card:nth-child(1)");
    firstCard.innerHTML = "<h3>📊 Emotion Breakdown</h3>";

    const colorMap = {
      happy: "#4CAF50",
      sad: "#2196F3",
      angry: "#f44336",
      anxious: "#ff9800",
      neutral: "#9e9e9e"
    };

    sorted.forEach(([emotion, count]) => {
  const percentage = Math.round((count / total) * 100);

  const wrapper = document.createElement("div");
  wrapper.classList.add("bar");

  // Label Row
  const labelRow = document.createElement("div");
  labelRow.classList.add("bar-label");
  labelRow.innerHTML = `
    <span>${emotion}</span>
    <span>${percentage}%</span>
  `;

  // Track
  const track = document.createElement("div");
  track.classList.add("bar-track");

  // Fill
  const fill = document.createElement("div");
  fill.classList.add("bar-fill");

  const colorMap = {
    happy: "#4CAF50",
    sad: "#2196F3",
    angry: "#f44336",
    anxious: "#ff9800",
    neutral: "#757575"
  };

  const baseColor = colorMap[emotion] || "#6c63ff";
  fill.style.background = `linear-gradient(90deg, ${baseColor}, ${baseColor}cc)`;

  // animation
  fill.style.width = "0%";
  setTimeout(() => {
    fill.style.width = percentage + "%";
  }, 100);

  track.appendChild(fill);
  wrapper.appendChild(labelRow);
  wrapper.appendChild(track);

  firstCard.appendChild(wrapper);
});

    // =========================
    // 📈 SECOND CARD – Tone Suggestion
    // =========================
    const secondCard = document.querySelector(".analysis-card:nth-child(2)");

    let toneSuggestion = "";

    if (mostFrequentEmotion === "sad") {
      toneSuggestion = "Users may need more uplifting and supportive responses.";
    } else if (mostFrequentEmotion === "angry") {
      toneSuggestion = "Calming and de-escalation tone recommended.";
    } else if (mostFrequentEmotion === "anxious") {
      toneSuggestion = "Provide reassurance and grounding responses.";
    } else if (mostFrequentEmotion === "happy") {
      toneSuggestion = "Maintain positive reinforcement tone.";
    } else {
      toneSuggestion = "Balanced emotional distribution detected.";
    }

    secondCard.innerHTML = `
      <h3>🎯 Tone Insight</h3>
      <p><strong>Dominant Emotion:</strong> ${mostFrequentEmotion}</p>
      <p>${toneSuggestion}</p>
    `;

    // =========================
    // 📊 THIRD CARD – Trends
    // =========================
    const thirdCard = document.querySelector(".analysis-card:nth-child(3)");

    const percentageTop = sorted.length > 0
      ? ((sorted[0][1] / total) * 100).toFixed(1)
      : 0;

    thirdCard.innerHTML = `
      <h3>📈 Emotional Trend</h3>
      <p>${mostFrequentEmotion} appears in ${percentageTop}% of conversations.</p>
      <p>Total Conversations: ${total}</p>
      <p>Distinct Emotions: ${distinctCount}</p>
    `;

  } catch (err) {
    console.log("Error loading insights:", err);
  }
}

// Run when page loads
loadInsights();