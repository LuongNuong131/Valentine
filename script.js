// Initialize configuration
const config = window.VALENTINE_CONFIG;

// Validate configuration
function validateConfig() {
  const warnings = [];

  if (!config.valentineName) {
    warnings.push("Valentine's name is not set! Using default.");
    config.valentineName = "My Love";
  }

  const isValidHex = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  Object.entries(config.colors).forEach(([key, value]) => {
    if (!isValidHex(value)) {
      warnings.push(`Invalid color for ${key}! Using default.`);
      config.colors[key] = getDefaultColor(key);
    }
  });

  if (parseFloat(config.animations.floatDuration) < 5) {
    warnings.push("Float duration too short! Setting to 5s minimum.");
    config.animations.floatDuration = "5s";
  }

  if (
    config.animations.heartExplosionSize < 1 ||
    config.animations.heartExplosionSize > 3
  ) {
    warnings.push(
      "Heart explosion size should be between 1 and 3! Using default.",
    );
    config.animations.heartExplosionSize = 1.5;
  }

  if (warnings.length > 0) {
    console.warn("⚠️ Configuration Warnings:");
    warnings.forEach((warning) => console.warn("- " + warning));
  }
}

function getDefaultColor(key) {
  const defaults = {
    backgroundStart: "#fff0f5",
    backgroundEnd: "#ffe4e9",
    buttonBackground: "#e91e63",
    buttonHover: "#f06292",
    textColor: "#d81b60",
  };
  return defaults[key];
}

// Loading Screen
window.addEventListener("load", () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.classList.add("hidden");
  }, 1500);
});

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  validateConfig();

  document.title = config.pageTitle;

  setPageContent();

  createFloatingElements();

  setupMusicPlayer();

  setupEventListeners();

  initializeLoveMeter();

  // Initialize photo gallery
  initializePhotoGallery();
});

// Set page content from config
function setPageContent() {
  const titleElement = document.getElementById("valentineTitle");
  titleElement.innerHTML = `
        <span class="title-line">${config.valentineName},</span>
        <span class="title-line">tình yêu của anh...</span>
    `;

  document.getElementById("question1Text").textContent =
    config.questions.first.text;
  document.getElementById("yesBtn1").querySelector(".btn-text").textContent =
    config.questions.first.yesBtn;
  document.getElementById("noBtn1").querySelector(".btn-text").textContent =
    config.questions.first.noBtn;
  document
    .getElementById("secretAnswerBtn")
    .querySelector(".btn-text").textContent =
    config.questions.first.secretAnswer;

  document.getElementById("question2Text").textContent =
    config.questions.second.text;
  document.getElementById("startText").textContent =
    config.questions.second.startText;
  document.getElementById("nextBtn").querySelector(".btn-text").textContent =
    config.questions.second.nextBtn;

  const q3Text = config.questions.third.text;
  const dateParts = q3Text.match(/\((.*?)\)/);
  const questionWithoutDate = q3Text.replace(/\s*\(.*?\)\s*/, "");

  document.getElementById("question3Text").innerHTML = `
        ${questionWithoutDate}
        ${dateParts ? `<span class="date-tag">${dateParts[0]}</span>` : ""}
    `;

  document.getElementById("yesBtn3").querySelector(".btn-text").textContent =
    config.questions.third.yesBtn;
  document.getElementById("noBtn3").querySelector(".btn-text").textContent =
    config.questions.third.noBtn;

  document.getElementById("celebrationTitle").innerHTML =
    config.celebration.title.replace(/\n/g, "<br>");
  document.getElementById("celebrationMessage").innerHTML =
    config.celebration.message.replace(/\n/g, "<br>");
  document.getElementById("celebrationEmojis").textContent =
    config.celebration.emojis;
}

// Create floating hearts and bears
function createFloatingElements() {
  const container = document.querySelector(".floating-elements");

  config.floatingEmojis.hearts.forEach((heart, index) => {
    setTimeout(() => {
      const div = document.createElement("div");
      div.className = "heart";
      div.innerHTML = heart;
      setRandomPosition(div);
      container.appendChild(div);
    }, index * 200);
  });

  config.floatingEmojis.bears.forEach((bear, index) => {
    setTimeout(
      () => {
        const div = document.createElement("div");
        div.className = "bear";
        div.innerHTML = bear;
        setRandomPosition(div);
        container.appendChild(div);
      },
      (config.floatingEmojis.hearts.length + index) * 200,
    );
  });
}

function setRandomPosition(element) {
  element.style.left = Math.random() * 100 + "vw";
  element.style.animationDelay = Math.random() * 5 + "s";
  element.style.animationDuration = 10 + Math.random() * 20 + "s";
}

// Setup event listeners
function setupEventListeners() {
  // Yes button 1 - should go to next question
  // document.getElementById("yesBtn1").addEventListener("click", function (e) {
  //   e.preventDefault();
  //   showNextQuestion(2);
  // });
  document.getElementById("yesBtn1").addEventListener("click", function (e) {
    e.preventDefault();
    moveButton(this);
  });

  // No button 1 - runs away
  document.getElementById("noBtn1").addEventListener("click", function (e) {
    e.preventDefault();
    moveButton(this);
  });

  document.getElementById("secretAnswerBtn").addEventListener("click", () => {
    showNextQuestion(2);
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    showNextQuestion(3);
  });

  document.getElementById("yesBtn3").addEventListener("click", () => {
    celebrate();
  });

  document.getElementById("noBtn3").addEventListener("click", function (e) {
    e.preventDefault();
    moveButton(this);
  });
}

function showNextQuestion(questionNumber) {
  const allQuestions = document.querySelectorAll(".question-section");

  allQuestions.forEach((q) => {
    q.classList.remove("active");
  });

  setTimeout(() => {
    const nextQuestion = document.getElementById(`question${questionNumber}`);
    nextQuestion.classList.add("active");
  }, 300);
}

function moveButton(button) {
  const container = document.querySelector(".container");
  const containerRect = container.getBoundingClientRect();

  const maxX = window.innerWidth - button.offsetWidth - 40;
  const maxY = window.innerHeight - button.offsetHeight - 40;

  let newX, newY;
  let attempts = 0;
  const maxAttempts = 10;

  do {
    newX = Math.random() * maxX;
    newY = Math.random() * maxY;
    attempts++;
  } while (
    attempts < maxAttempts &&
    newX > containerRect.left - 50 &&
    newX < containerRect.right + 50 &&
    newY > containerRect.top - 50 &&
    newY < containerRect.bottom + 50
  );

  button.style.position = "fixed";
  button.style.left = newX + "px";
  button.style.top = newY + "px";
  button.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

  button.style.animation = "shake 0.5s";
  setTimeout(() => {
    button.style.animation = "";
  }, 500);
}

// Love meter functionality
function initializeLoveMeter() {
  const loveMeter = document.getElementById("loveMeter");
  const loveValue = document.getElementById("loveValue");
  const extraLove = document.getElementById("extraLove");
  const sliderProgress = document.getElementById("sliderProgress");

  loveMeter.value = 100;
  loveValue.textContent = 100;
  updateSliderProgress(100);

  loveMeter.addEventListener("input", () => {
    const value = parseInt(loveMeter.value);
    loveValue.textContent = value;
    updateSliderProgress(value);

    if (value > 100) {
      extraLove.classList.add("active");

      if (value >= 5000) {
        extraLove.classList.add("super-love");
        extraLove.textContent = config.loveMessages.extreme;
      } else if (value > 1000) {
        extraLove.classList.remove("super-love");
        extraLove.textContent = config.loveMessages.high;
      } else {
        extraLove.classList.remove("super-love");
        extraLove.textContent = config.loveMessages.normal;
      }
    } else {
      extraLove.classList.remove("active");
      extraLove.classList.remove("super-love");
    }
  });
}

function updateSliderProgress(value) {
  const sliderProgress = document.getElementById("sliderProgress");
  const percentage = (value / 10000) * 100;
  sliderProgress.style.width = percentage + "%";
}

// Celebration function
function celebrate() {
  document.querySelectorAll(".question-section").forEach((q) => {
    q.classList.remove("active");
  });

  setTimeout(() => {
    const celebration = document.getElementById("celebration");
    celebration.classList.add("active");

    if (typeof startConfetti === "function") {
      startConfetti();
    }

    createHeartExplosion();
  }, 300);
}

// Create heart explosion animation
function createHeartExplosion() {
  const container = document.querySelector(".floating-elements");

  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      const randomHeart =
        config.floatingEmojis.hearts[
          Math.floor(Math.random() * config.floatingEmojis.hearts.length)
        ];
      heart.innerHTML = randomHeart;
      heart.className = "heart";
      heart.style.fontSize = 1 + Math.random() * 2 + "rem";
      setRandomPosition(heart);
      container.appendChild(heart);
    }, i * 100);
  }
}

// Music Player Setup
function setupMusicPlayer() {
  const musicControls = document.getElementById("musicControls");
  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");
  const musicSource = document.getElementById("musicSource");
  const musicText = musicToggle.querySelector(".music-text");

  if (!config.music.enabled) {
    musicControls.style.display = "none";
    return;
  }

  musicSource.src = config.music.musicUrl;
  bgMusic.volume = config.music.volume || 0.5;
  bgMusic.load();

  if (config.music.autoplay) {
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          musicText.textContent = config.music.stopText.replace("🔇 ", "");
        })
        .catch(() => {
          console.log("Autoplay prevented by browser");
          musicText.textContent = config.music.startText.replace("🎵 ", "");
        });
    }
  }

  musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic
        .play()
        .then(() => {
          musicText.textContent = config.music.stopText.replace("🔇 ", "");
        })
        .catch((error) => {
          console.log("Music play failed:", error);
          alert("Vui lòng nhấn nút để bật nhạc nhé! 🎵");
        });
    } else {
      bgMusic.pause();
      musicText.textContent = config.music.startText.replace("🎵 ", "");
    }
  });
}

// Photo Gallery Setup
function initializePhotoGallery() {
  if (!config.photos || !config.photos.enabled) {
    return;
  }

  const photoGallery = document.getElementById("photoGallery");
  const couplePhoto = document.getElementById("couplePhoto");

  if (!photoGallery || !couplePhoto) {
    return;
  }

  // Check if photo file exists
  if (config.photos.couple && config.photos.couple.trim() !== "") {
    couplePhoto.src = config.photos.couple;

    // Show photo when image loads successfully
    couplePhoto.onload = function () {
      photoGallery.style.display = "block";
    };

    // Hide if image fails to load
    couplePhoto.onerror = function () {
      console.log(
        "Photo not found. Make sure to place your photo in the same folder as index.html",
      );
      photoGallery.style.display = "none";
    };
  } else {
    photoGallery.style.display = "none";
  }
}

// Add shake animation to CSS dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
