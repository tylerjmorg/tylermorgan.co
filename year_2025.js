document.addEventListener('DOMContentLoaded', () => {
  const scriptOrigin = new URL(import.meta.url).origin;
  fetch(`${scriptOrigin}/current_year.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error('year JSON file could not be found. Copyright still applies regardless.');
      }
      return response.json();
    })
    .then(data => {
      const currentYearElement = document.getElementById('year_2025');
      const year = data.year;
      if (year <= 2025) {
        currentYearElement.textContent = '2025';
      } else {
        currentYearElement.textContent = `2025–${year}`;
      }
    })
    .catch(error => {
      console.error('There was a problem loading the year:', error);
    });
});