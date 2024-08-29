"use strict";

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEL = document.querySelector(".header");
const sectionEl = document.querySelector(".section-hero");

btnNavEl.addEventListener("click", function () {
  headerEL.classList.toggle("nav-open");
});

const allLinks = document.querySelectorAll("a:link");
allLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");
    // console.log(href);
    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({
        behavior: "smooth",
      });
    }
    if (link.classList.contains("main-nav-link")) {
      headerEL.classList.toggle("nav-open");
    }
  });
});

const observer = new IntersectionObserver(function(enteries){
  const ent = enteries[0];
  if(ent.isIntersecting === false){
    document.body.classList.add("sticky")
  }
  if(ent.isIntersecting === true){
    document.body.classList.remove("sticky")
  }
}, {
  root: null,
  threshold: 0,
  rootMargin: "-80px"
});
observer.observe(sectionEl)
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  // console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
