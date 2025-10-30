const API_KEY = 'YOUR_API_KEY'; // Get one free at api-ninjas.com
const endpoint = 'https://api.api-ninjas.com/v1/nutrition?query=';

const foods = ['banana', 'grilled chicken breast', 'avocado toast', 'salmon', 'broccoli'];

async function loadNutritionFacts() {
  const container = document.getElementById('nutrition-news');
  container.innerHTML = '';

  for (const food of foods) {
    try {
      const res = await fetch(endpoint + encodeURIComponent(food), {
        headers: { 'X-Api-Key': API_KEY }
      });
      const data = await res.json();
      const item = data[0];

      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${item.name}</strong><br>
        Calories: ${item.calories} kcal<br>
        Protein: ${item.protein_g} g | Fat: ${item.fat_total_g} g | Carbs: ${item.carbohydrates_total_g} g<br>
        <small>Source: <a href="https://api-ninjas.com/api/nutrition" target="_blank">API Ninjas</a></small>
      `;
      container.appendChild(li);
    } catch (err) {
      console.error(`Failed to fetch data for ${food}`, err);
    }
  }
}

loadNutritionFacts();
