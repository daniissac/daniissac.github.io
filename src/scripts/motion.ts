import gsap from "gsap";
import Lenis from "lenis";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion) {
  const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
  const raf = (time: number) => {
    lenis.raf(time);
    window.requestAnimationFrame(raf);
  };

  window.requestAnimationFrame(raf);

  const heroCopy = document.querySelector("[data-reveal='hero-copy']");
  const heroPanel = document.querySelector("[data-reveal='hero-panel']");
  const heroIndex = document.querySelector("[data-reveal='hero-index']");

  if (heroCopy && heroPanel && heroIndex) {
    const entrance = gsap.timeline({ defaults: { ease: "power2.out" } });
    entrance
      .from(heroCopy.children, { opacity: 0, y: 18, duration: 0.65, stagger: 0.07 })
      .from(heroPanel, { opacity: 0, x: 24, duration: 0.8 }, "-=0.42")
      .from(heroIndex, { opacity: 0, y: 12, duration: 0.45 }, "-=0.35");
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const section = entry.target as HTMLElement;
        const targets = section.querySelectorAll(".section-heading, .article-card, .project-card, .proof-grid > div, .writing-empty");
        section.dataset.motionReady = "true";
        if (!targets.length) {
          observer.unobserve(section);
          return;
        }
        gsap.from(targets, {
          opacity: 0,
          y: 22,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
        });
        observer.unobserve(section);
      });
    },
    { threshold: 0.12 },
  );

  document.querySelectorAll(".content-section, .closing-section").forEach((section) => observer.observe(section));

  document.querySelectorAll<HTMLElement>(".project-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") return;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      gsap.to(card, { rotateY: x * 2.4, rotateX: y * -2.4, duration: 0.3, overwrite: true });
    });
    card.addEventListener("pointerleave", () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.45, overwrite: true });
    });
  });
}
