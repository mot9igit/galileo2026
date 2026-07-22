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
