import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';

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


// sliders 
const newsSliders = document.querySelectorAll(".news-slider");
if (newsSliders.length > 0) {
  newsSliders.forEach((newsSlider) => {
    const slider = newsSlider.querySelector(".news-swiper");
    const prevBtn = newsSlider.querySelector('.news-slider__button-prev');
    const nextBtn = newsSlider.querySelector('.news-slider__button-next');
    const swiper1 = new Swiper(slider, {
        modules: [Navigation, Autoplay],
        loop: true,
        slidesPerView: 1,
        spaceBetween: 32,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            prevEl: prevBtn,
            nextEl: nextBtn,
        },
        breakpoints: {
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
          1170: { slidesPerView: 3 },
        },
    });
  })
}

// hero slider
const hero = document.querySelector(".hero");
if (hero) {
  new Swiper(hero, {
    modules: [Pagination, Autoplay],
    loop: true,
    speed: 800,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".hero__pagination",
      clickable: true,
    },
  });
}

// map-list dots
const mapDots = document.querySelectorAll(".map-list-dot");

function repositionPopup(dot) {
  const popup = dot.querySelector(".map-list-dot__popup");
  if (!popup) return;

  popup.classList.remove(
    "map-list-dot__popup-position_top",
    "map-list-dot__popup-position_right"
  );

  if (window.innerWidth <= 991) return;

  popup.style.visibility = "hidden";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const map = dot.closest(".map-list");
      if (!map) {
        popup.style.visibility = "";
        return;
      }

      const mapRect = map.getBoundingClientRect();
      const popupRect = popup.getBoundingClientRect();

      if (popupRect.bottom > mapRect.bottom) {
        popup.classList.add("map-list-dot__popup-position_top");
      }

      if (popupRect.right > mapRect.right) {
        popup.classList.add("map-list-dot__popup-position_right");
      }

      popup.style.visibility = "";
    });
  });
}

if (mapDots.length > 0) {
  mapDots.forEach((dot) => {
    dot.addEventListener("click", function (e) {
      e.stopPropagation();
      mapDots.forEach((d) => d.classList.remove("map-list-dot-active"));
      this.classList.add("map-list-dot-active");
      repositionPopup(this);
    });
  });
  document.addEventListener("click", function () {
    mapDots.forEach((d) => d.classList.remove("map-list-dot-active"));
  });

  mapDots.forEach((dot) => {
    if (dot.classList.contains("map-list-dot-active")) {
      repositionPopup(dot);
    }
  });
}

// plan parallax
const plans = document.querySelectorAll(".plan");
if (plans.length > 0) {
  plans.forEach((plan) => {
    const image = plan.querySelector(".plan__image");
    if (!image) return;

    let rafId = null;

    plan.addEventListener("mousemove", (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = plan.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2 * 10;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2 * 10;
        image.style.transform = `translate(${x}px, ${y}px)`;
        rafId = null;
      });
    });

    plan.addEventListener("mouseleave", () => {
      if (rafId) cancelAnimationFrame(rafId);
      image.style.transform = "translate(0, 0)";
    });
  });
}
