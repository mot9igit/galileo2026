// search-form
const searchForm = document.querySelector(".search-form");
if (searchForm) {
  const searchToggle = searchForm.querySelector(".search-form__toggle");
  if (searchToggle) {
    searchToggle.addEventListener("click", function (e) {
      e.preventDefault();
      searchForm.classList.toggle("search-form-active");
    });
  }
}

// dropdown
const elements = document.querySelectorAll(".dart-dropdown-container");
if (elements.length > 0) {
  elements.forEach((element) => {
    element.addEventListener("click", function (event) {
      if (event.target.closest("a")) return;
      const elem = event.currentTarget;
      if (elem.hasAttribute("data-dropdown")) {
        elem.removeAttribute("data-dropdown");
      } else {
        elem.setAttribute("data-dropdown", "dropdown");
      }
    });
  });
}

// subnavigation
const navLinks = document.querySelectorAll(".header__navigation a[data-target]");
const subnavs = document.querySelectorAll(".header__subnavigation");
let hideTimeout = null;

function hideAllSubnavs() {
  subnavs.forEach((sub) => {
    sub.classList.remove("header__subnavigation-active");
  });
}

if (navLinks.length > 0 && subnavs.length > 0) {
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      if (window.innerWidth <= 991) return;

      clearTimeout(hideTimeout);

      const targetId = this.getAttribute("data-target");
      hideAllSubnavs();
      const target = document.querySelector(targetId);
      if (target) {
        target.classList.add("header__subnavigation-active");
      }
    });

    link.addEventListener("mouseleave", function () {
      if (window.innerWidth <= 991) return;

      hideTimeout = setTimeout(() => {
        hideAllSubnavs();
      }, 100);
    });
  });

  subnavs.forEach((subnav) => {
    subnav.addEventListener("mouseenter", function () {
      clearTimeout(hideTimeout);
    });

    subnav.addEventListener("mouseleave", function () {
      hideTimeout = setTimeout(() => {
        hideAllSubnavs();
      }, 100);
    });
  });
}
