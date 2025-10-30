async function loadMealOfTheDay() {
  try {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await res.json();
    const meal = data.meals[0];

    const container = document.getElementById('meal-highlight');
    if (!container) return;

    const shortInstructions = meal.strInstructions
      ? meal.strInstructions.split('. ').slice(0, 2).join('. ') + '.'
      : 'No description available.';

    const sourceLink = meal.strSource || 'https://www.themealdb.com';
    const sourceName = meal.strSource ? new URL(sourceLink).hostname : 'TheMealDB';

    container.innerHTML = `
      <h3>${meal.strMeal}</h3>
      <p>${shortInstructions}</p>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-photo">
      <small>Source: <a href="${sourceLink}" target="_blank">${sourceName}</a></small>
    `;
  } catch (err) {
    console.error('Failed to load meal of the day:', err);
  }
}

// Initial load
loadMealOfTheDay();

// Refresh every 8 hours (3× daily)
setInterval(loadMealOfTheDay, 8 * 60 * 60 * 1000);
