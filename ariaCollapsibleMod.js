function toggleAriaValues() {
    var button = document.getElementById("aboutMeButton");
    var element = document.getElementById("aboutMeContent");
  
    if (button.getAttribute("aria-expanded") === "true") {
      button.setAttribute("aria-expanded", "false");
      element.setAttribute("aria-hidden", "true");
    } else {
      button.setAttribute("aria-expanded", "true");
      element.setAttribute("aria-hidden", "false");
    }
  }
  
  document.getElementById("aboutMeButton").addEventListener("click", toggleAriaValues);