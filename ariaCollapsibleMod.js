function toggleAriaValues() {
  var button = document.getElementById("aboutMeButton");
  var element = document.getElementById("aboutMeContent");
  var contentLinks = element.querySelectorAll(".content-link, .dark-btn");

  if (button.getAttribute("aria-expanded") === "true") {
    button.setAttribute("aria-expanded", "false");
    element.setAttribute("aria-hidden", "true");
    contentLinks.forEach(function(link) {
      link.setAttribute("tabindex", "-1");
    });
  } else {
    button.setAttribute("aria-expanded", "true");
    element.setAttribute("aria-hidden", "false");
    contentLinks.forEach(function(link) {
      link.setAttribute("tabindex", "0");
    });
  }
}

document.getElementById("aboutMeButton").addEventListener("click", toggleAriaValues);