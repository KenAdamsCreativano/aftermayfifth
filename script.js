const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

const uiObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible-ui");
      }
    });
  },
  { threshold: 0.36 }
);

document
  .querySelectorAll("[data-scroll-ui]")
  .forEach((el) => uiObserver.observe(el));

document.querySelectorAll("[data-tilt]").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = (x / rect.width - 0.5) * 7;
    const rotateX = (y / rect.height - 0.5) * -7;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  });
});

const glow = document.querySelector(".cursor-glow");
if (glow) {
  window.addEventListener("mousemove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
}
// countdown
(function () {
  const target = new Date("2026-08-03T00:00:00");
  const el = document.getElementById("countdown-text");

  function tick() {
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) {
      el.textContent = "0 days";
      return;
    }

    const y1 = now.getFullYear(),
      m1 = now.getMonth(),
      d1 = now.getDate();
    const y2 = target.getFullYear(),
      m2 = target.getMonth(),
      d2 = target.getDate();

    let months = (y2 - y1) * 12 + (m2 - m1);
    let days = d2 - d1;
    if (days < 0) {
      months--;
      days += new Date(y2, m2, 0).getDate();
    }

    if (months === 0) el.textContent = days + " days to go";
    else if (days === 0)
      el.textContent = months + " month" + (months !== 1 ? "s" : "") + " to go";
    else
      el.textContent =
        months +
        " month" +
        (months !== 1 ? "s" : "") +
        " " +
        days +
        " day" +
        (days !== 1 ? "s" : "") +
        " to go";
  }

  tick();
  setInterval(tick, 1000);
})();
