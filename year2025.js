document.addEventListener('DOMContentLoaded', () => {
  const scriptOrigin = new URL(import.meta.url).origin;
  fetch(`${scriptOrigin}/currentyear.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const currentYearElement = document.getElementById('year2025');
      const year = data.year;
      if (year <= 2025) {
        currentYearElement.textContent = '2025';
      } else {
        currentYearElement.textContent = `2025–${year}`;
      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
});