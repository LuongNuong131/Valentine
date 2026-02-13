// Confetti Effect
(function () {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let confettiParticles = [];
  let animationId;

  const colors = [
    "#ff6b6b",
    "#ff8787",
    "#ffa6a6",
    "#ffb8b8",
    "#f093fb",
    "#f5576c",
    "#ff4757",
  ];

  class ConfettiParticle {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height;
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = -10;
      this.size = Math.random() * 8 + 4;
      this.speedY = Math.random() * 3 + 2;
      this.speedX = Math.random() * 2 - 1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 10 - 5;
      this.shape = Math.random() > 0.5 ? "circle" : "square";
      this.opacity = 1;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotationSpeed;

      if (this.y > canvas.height - 100) {
        this.opacity = Math.max(0, 1 - (this.y - (canvas.height - 100)) / 100);
      }

      if (this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);

      if (this.shape === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      } else {
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      }

      ctx.restore();
    }
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createConfetti() {
    confettiParticles = [];
    for (let i = 0; i < 150; i++) {
      confettiParticles.push(new ConfettiParticle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiParticles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    animationId = requestAnimationFrame(animate);
  }

  function startConfetti() {
    canvas.classList.add("active");
    resizeCanvas();
    createConfetti();
    animate();

    setTimeout(() => {
      stopConfetti();
    }, 10000);
  }

  function stopConfetti() {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    canvas.classList.remove("active");
    confettiParticles = [];
  }

  window.startConfetti = startConfetti;
  window.stopConfetti = stopConfetti;

  window.addEventListener("resize", () => {
    if (canvas.classList.contains("active")) {
      resizeCanvas();
    }
  });
})();
