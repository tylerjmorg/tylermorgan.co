const currentYear = 2025;


const currentYear2 = String(currentYear).slice(-2);

document.addEventListener("DOMContentLoaded", function() {

  const copyrightElements = document.querySelectorAll('[data-copyright-year], [data-copyright-endyear], [data-copyright-currentyear]');

  copyrightElements.forEach(element => {
    const year = element.getAttribute('data-copyright-year');
    const endYear = element.getAttribute('data-copyright-endyear');

    if (element.hasAttribute('data-copyright-currentyear')) {
      element.textContent = currentYear;
    } else if (year && endYear === 'currentyear') {
      element.textContent = `${year}–${currentYear}`;
    } else if (year && endYear === 'currentyear2') { 
      element.textContent = `${year}–${currentYear2}`;
    } else if (year && !endYear) {
      element.textContent = year;
    } else if (year && endYear) {
      element.textContent = `${year}–${endYear}`;
    }
  });
});
