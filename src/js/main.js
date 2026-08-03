import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import { Fancybox } from "@fancyapps/ui/dist/fancybox/";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import 'swiper/css';

Fancybox.bind("[data-fancybox]", {
  dragToClose: false,
});

// search-form
const searchToggles = document.querySelectorAll(".search-form__toggle");

function closeSearch() {
  searchToggles.forEach((toggle) => toggle.classList.remove("active"));
  document.querySelectorAll(".search-form__panel").forEach((panel) => panel.classList.remove("active"));
}

if (searchToggles.length > 0) {
  searchToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.dataset.target);
      this.classList.toggle("active");
      if (target) {
        target.classList.toggle("active");
        const input = target.querySelector("input");
        if (target.classList.contains("active") && input) {
          setTimeout(() => input.focus(), 250);
        }
      }
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSearch();
  });

  document.querySelectorAll(".search-form__close").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      closeSearch();
    });
  });
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

// mobile menu
const mobileMenuToggler = document.querySelector(".header__menu_mobile .navbar-toggler");
const subnavigations = document.querySelector(".header__subnavigations");
let menuScrollTop = 0;

function openMobileMenu() {
  menuScrollTop = window.scrollY || document.documentElement.scrollTop;
  mobileMenuToggler.classList.remove("navbar-toggler-noactive");
  subnavigations.classList.add("header__subnavigations-active");
  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  mobileMenuToggler.classList.add("navbar-toggler-noactive");
  subnavigations.classList.remove("header__subnavigations-active");
  document.body.style.overflow = "";
  window.scrollTo(0, menuScrollTop);
}

if (mobileMenuToggler && subnavigations) {
  mobileMenuToggler.addEventListener("click", function (e) {
    e.preventDefault();
    if (subnavigations.classList.contains("header__subnavigations-active")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
}

const subnavCloseBtn = document.querySelector(".header__subnavigations-close");
if (subnavCloseBtn) {
  subnavCloseBtn.addEventListener("click", function (e) {
    e.preventDefault();
    closeMobileMenu();
  });
}

if (subnavigations) {
  subnavigations.addEventListener("click", function (e) {
    if (e.target.closest("a") && !e.target.closest('.mobile-header a[data-target="content"]')) {
      closeMobileMenu();
    }
  });
}

// mobile subnavigation accordion
const mobileHeaders = document.querySelectorAll('.header__subnavigation .mobile-header a[data-target="content"]');
if (mobileHeaders.length > 0) {
  mobileHeaders.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (window.innerWidth > 991) return;
      e.preventDefault();

      const subnav = this.closest(".header__subnavigation");
      const content = subnav ? subnav.querySelector(".mobile-content") : null;

      mobileHeaders.forEach((l) => {
        if (l !== this) l.classList.remove("opened");
      });
      document.querySelectorAll(".header__subnavigation .mobile-content").forEach((c) => {
        if (c !== content) c.classList.remove("opened");
      });

      this.classList.toggle("opened");
      if (content) content.classList.toggle("opened");
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
      closeSearch();

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
          300: { slidesPerView: 1.5, spaceBetween: 6, },
          640: { slidesPerView: 2.5, spaceBetween: 16, },
          1024: { slidesPerView: 2 },
          1170: { slidesPerView: 3 },
        },
    });
  })
}

// sliders 
const casesSliders = document.querySelectorAll(".cases-slider");
if (casesSliders.length > 0) {
  casesSliders.forEach((newsSlider) => {
    const sliderCases = newsSlider.querySelector(".cases-swiper");
    const swiperCases = new Swiper(sliderCases, {
        modules: [Autoplay],
        loop: true,
        slidesPerView: 1,
        spaceBetween: 24,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
          300: { slidesPerView: 1.25, spaceBetween: 6, },
          640: { slidesPerView: 2.5, spaceBetween: 16, },
          1024: { slidesPerView: 3 },
          1170: { slidesPerView: 4 },
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
    // autoplay: {
    //   delay: 5000,
    //   disableOnInteraction: false,
    // },
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
  document.addEventListener("click", function (e) {
    if (e.target.closest(".select-mobile")) return;
    mapDots.forEach((d) => d.classList.remove("map-list-dot-active"));
  });

  mapDots.forEach((dot) => {
    if (dot.classList.contains("map-list-dot-active")) {
      repositionPopup(dot);
    }
  });
}

// select
const selectElement = document.getElementById('partnerSelect');

if(selectElement){
  const map = document.querySelector('.map-list');
  const mobile = document.querySelector('.map-list-dot__popup-mobile');
  if(map){
    selectElement.addEventListener('change', function(event) {
      const element = document.querySelector('[data-value="'+ event.target.value +'"]');
      mapDots.forEach((d) => d.classList.remove("map-list-dot-active"));
      if(element){
        element.classList.add("map-list-dot-active");
        const content = element.querySelector('.map-list-dot__popup');
        if(content){
          const clonedElement = content.innerHTML;
          mobile.innerHTML = ''
          mobile.innerHTML = clonedElement;
          mobile.classList.add("opened");
        }else{
          mobile.classList.remove("opened");
        }
      }else{
        mobile.classList.remove("opened");
      }
    });
  }
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
