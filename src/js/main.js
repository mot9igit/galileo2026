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
const subnav = document.querySelector(".header__subnavigation");
let hideTimeout = null;

if (navLinks.length > 0 && subnav) {
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      if (window.innerWidth <= 991) return;

      clearTimeout(hideTimeout);

      const targetId = this.getAttribute("data-target");
      subnav.classList.add("header__subnavigation-active");
      subnav.id = targetId;
    });

    link.addEventListener("mouseleave", function () {
      if (window.innerWidth <= 991) return;

      hideTimeout = setTimeout(() => {
        subnav.classList.remove("header__subnavigation-active");
        // subnav.removeAttribute("id");
      }, 100);
    });
  });

  subnav.addEventListener("mouseenter", function () {
    clearTimeout(hideTimeout);
  });

  subnav.addEventListener("mouseleave", function () {
    hideTimeout = setTimeout(() => {
      subnav.classList.remove("header__subnavigation-active");
      // subnav.removeAttribute("id");
    }, 100);
  });
}
