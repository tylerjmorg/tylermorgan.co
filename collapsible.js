// The actual function.
let coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let targetId = this.getAttribute("data-target-id");
    let content = document.getElementById(targetId);
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}

// Accessible for screen readers and tab indexing.
function toggleAriaValues() {
  let button = document.getElementById("aboutMeButton");
  let element = document.getElementById("aboutMeContent");
  let contentLinks = element.querySelectorAll(".content-link, .dark-btn");

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