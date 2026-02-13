const noPhrases = [
  "No.",
  "Are you sure?",
  "Are you positive?",
  "Have you considered this?",
  "Let's rethink that...",
  "Maybe give me a chance?",
  "Pretty please?",
  "I already made plans 😅"
];

const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
const proposal = document.getElementById("proposal");
const itinerary = document.getElementById("itinerary");

let noIndex = 0;

noBtn.addEventListener("click", () => {
  noIndex = (noIndex + 1) % noPhrases.length;
  noBtn.textContent = noPhrases[noIndex];
  yesBtn.style.transform = `scale(${1 + noIndex * 0.06})`;
});

yesBtn.addEventListener("click", () => {
  launchConfetti();
  proposal.classList.remove("active");
  proposal.setAttribute("aria-hidden", "true");

  setTimeout(() => {
    itinerary.classList.add("active");
    itinerary.setAttribute("aria-hidden", "false");
  }, 450);
});

function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;

  const resize = () => {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  resize();
  window.addEventListener("resize", resize, { once: true });

  const colors = ["#ff5c8a", "#ffd166", "#7bdff2", "#cdb4db", "#ffffff"];
  const particles = Array.from({ length: 160 }, () => ({
    x: window.innerWidth / 2,
    y: window.innerHeight / 3,
    vx: (Math.random() - 0.5) * 9,
    vy: Math.random() * -9 - 4,
    size: Math.random() * 6 + 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    gravity: 0.2 + Math.random() * 0.18,
    tilt: Math.random() * Math.PI
  }));

  let frames = 0;
  const maxFrames = 180;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particles) {
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.tilt += 0.15;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(Math.sin(p.tilt));
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      ctx.restore();
    }

    frames += 1;
    if (frames < maxFrames) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  draw();
}
