gsap.registerPlugin(SplitText, ScrollTrigger);


const overlay = document.querySelector(".transition-overlay");
const links = document.querySelectorAll("a");

// Click on internal links
links.forEach(link => {
  link.addEventListener("click", e => {
    if (link.origin !== window.location.origin) return; // only internal
    if (link.target === "_blank") return;              // skip new tabs

    e.preventDefault();
    const target = link.href;

    // Fade overlay in
    gsap.to(overlay, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        // Navigate after fade-in
        sessionStorage.setItem("transition", "true");
        window.location.href = target;
      }
    });
  });
});

// On new page load: fade overlay out
window.addEventListener("DOMContentLoaded", () => {
  const shouldTransition = sessionStorage.getItem("transition");
  if (shouldTransition) {
    gsap.set(overlay, { opacity: 1 });
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut"
    });
    sessionStorage.removeItem("transition");
  } else {
    gsap.set(overlay, { opacity: 0 });
  }
});








// animate text container text to fade in
document.querySelectorAll(".text-container").forEach(container => {
  let split = SplitText.create(container, {
    type: "words"
});

  gsap.from(split.words, {
    y: -5,
    autoAlpha: 0,
    stagger: 0.01,
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: container,
      start: "top 90%",
      once: true
    }
  });
});



// effect on project thumbnail hover
document.querySelectorAll(".project-thumbnail").forEach(function(element) {
  let animation = gsap.timeline({paused: true})
  .to(element, {
    scale: 1.02,
    duration: 0.5,
    ease: "power1.inOut"
  });
  
  element.addEventListener("mouseenter", function () {
    animation.play();
  });
  element.addEventListener("mouseleave", function () {
    animation.reverse();
  });
});



// view case study spinning svg on project thumbnail hover
gsap.set(".hover-svg", {xPercent: -50, yPercent: -50});
let spin = gsap.to(".hover-svg", {
  rotation: 360,
  repeat: -1,
  ease: "linear",
  duration: 20,
  paused: true,
  transformOrigin: "50% 50%"
});

let hoverX = gsap.quickTo(".hover-svg", "x", {duration: 0.2, ease: "power1"});
let hoverY = gsap.quickTo(".hover-svg", "y", {duration: 0.2, ease: "power1"});

window.addEventListener("mousemove", e => {
  if (document.body.classList.contains("show-hover-svg")) {
    hoverX(e.clientX);
    hoverY(e.clientY);
  }
});

document.querySelectorAll(".project-thumbnail").forEach(element => {
  element.addEventListener("mouseenter", () => {
    document.body.classList.add("show-hover-svg");
    gsap.to(".hover-svg",{
      opacity: 1,
      duration: 0.2
    });
    spin.play();
  });
  
  element.addEventListener("mouseleave", () => {
    document.body.classList.remove("show-hover-svg");
    gsap.to(".hover-svg", {
      opacity: 0,
      duration: 0.2
    });
    spin.pause(0);
  });
});



// underline on link hover
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const links = document.querySelectorAll(".nav-link");
  const underline = document.querySelector(".nav-underline");

  // find active link by URL
  const path = window.location.pathname.split("/").pop() || "/";
  let activeLink = null;
  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === window.location.pathname) {
      link.classList.add("active");
      activeLink = link;
    }
  });
  

  // move underline under a link
  function moveUnderline(link) {
    if (!link) return;
    const rect = link.getBoundingClientRect();
    const navRect = navbar.getBoundingClientRect();
    gsap.set(underline, {
      x: rect.left - navRect.left,
      width: rect.width
    });
  }

  function animateUnderline(link) {
    if (!link) return;
    const rect = link.getBoundingClientRect();
    const navRect = navbar.getBoundingClientRect();
    gsap.to(underline, {
      x: rect.left - navRect.left,
      width: rect.width,
      duration: 0.25,
      ease: "power1.out"
    });
  }

  if (activeLink) moveUnderline(activeLink);

  // hover effect
  links.forEach(link => {
    link.addEventListener("mouseenter", () => animateUnderline(link));
    link.addEventListener("mouseleave", () => animateUnderline(activeLink));
  });

  // recalc on resize
  window.addEventListener("resize", () => moveUnderline(activeLink));
});



// fade in images
const boxes = gsap.utils.toArray('.project-image');

boxes.forEach((box, i) => {
  const anim = gsap.fromTo(box, {autoAlpha: 0, y: -10}, {duration: 0.6, autoAlpha: 1, y: 0});
  ScrollTrigger.create({
    trigger: box,
    animation: anim,
    toggleActions: 'play none none none',
    once: true,
  });
});



// custom cursor
gsap.set(".cursor", {xPercent: -50, yPercent: -50});

let xSetter = gsap.quickSetter(".cursor", "x", "px"),
    ySetter = gsap.quickSetter(".cursor", "y", "px");

window.addEventListener("mousemove", e => {  
  xSetter(e.x);
  ySetter(e.y);
  xTo(e.clientX);
  yTo(e.clientY);
});



window.addEventListener("mousedown", () => {
  gsap.to(".cursor", { scale: 0.8, duration: 0.15, ease: "power2.out" });
  gsap.to(".cursor", { backgroundColor: "var(--purple)", duration: 0.2 });
});

window.addEventListener("mouseup", () => {
  gsap.to(".cursor", { scale: 1, duration: 0.15, ease: "power2.out" });
  gsap.to(".cursor", { backgroundColor: "var(--black)", duration: 0.2 });
});




document.addEventListener("DOMContentLoaded", () => {
  const navLogo = document.querySelector(".nav-logo");
  let bounceTween = null;

  navLogo.addEventListener("mouseenter", () => {
    if (bounceTween) return;

    bounceTween = gsap.to(navLogo, {
      y: -5,
      duration: 0.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  });

  navLogo.addEventListener("mouseleave", () => {
    if (bounceTween) {
      bounceTween.kill(); // stop the animation
      bounceTween = null;
      gsap.to(navLogo, { y: 0, duration: 0.3, ease: "power1.out" }); // reset
    }
  });
});





// accordion
let groups = gsap.utils.toArray(".accordion-group");
let menus = gsap.utils.toArray(".accordion-menu");
let menuToggles = groups.map(createAnimation);

menus.forEach((menu) => {
  menu.addEventListener("click", () => toggleMenu(menu));
});

function toggleMenu(clickedMenu) {
  menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
}

function createAnimation(element) {
  let menu = element.querySelector(".accordion-menu");
  let box = element.querySelector(".accordion-content");
  let minusElement = element.querySelector(".accordion-minus");
  let plusElement = element.querySelector(".accordion-plus");

  gsap.set(box, { height: "auto" });

  let animation = gsap
    .timeline()
    .from(box, {
      height: 0,
      duration: 0.5,
      ease: "power3.inOut"
    })
    .from(minusElement, { duration: 0.2, autoAlpha: 0, ease:"none" }, 0)
    .to(plusElement, { duration: 0.2, autoAlpha: 0, ease:"none" }, 0)
    .reverse();

  return function (clickedMenu) {
    if (clickedMenu === menu) {
      animation.reversed(!animation.reversed());
    } else {
      animation.reverse();
    }
  };
}