const searchMeal = () => {
    const searchInputs = document.getElementById('searchInput').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputs}`;
    //load data
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
        .catch(error => displayMealError('There is no such meal please try another one.'))
}
//error
const displayMealError = error => {
    const errorMessage = document.getElementById('invalidSearch');
    errorMessage.innerText = error;

}
//display meal
const displayMeals = meals => {
    const mealContainers = document.getElementById('mealContainer');
    mealContainers.innerHTML = '';
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'meal-card';
        mealDiv.innerHTML = `
    <img onclick="mealDetails(${meal.idMeal})" class="card-img-top" src="${meal.strMealThumb}">
    <div class="card-body">
        <h5 class="card-title text-center">${meal.strMeal}</h5>
    </div>
    `;
        mealContainers.appendChild(mealDiv);
    });

}
//ingredient details
const mealDetails = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => ingredientDetails(data.meals))
}

function ingredientDetails(data) {
    const ingredientDetailsDiv = document.getElementById('mealItem');
    ingredientDetailsDiv.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        const mealIngredients = data[i];
        ingredientDetailsDiv.innerHTML = `
          <img src="${mealIngredients.strMealThumb}">
          <h3>Ingredients</h3>
          <ul>
          <li>${mealIngredients.strIngredient1}</li>
          <li>${mealIngredients.strIngredient2}</li>
          <li>${mealIngredients.strIngredient3}</li>
          <li>${mealIngredients.strIngredient4}</li>
          <li>${mealIngredients.strIngredient5}</li>
          <li>${mealIngredients.strIngredient6}</li>
          <li>${mealIngredients.strIngredient7}</li>
          <li>${mealIngredients.strIngredient8}</li>
          <li>${mealIngredients.strIngredient9}</li>
          <li>${mealIngredients.strIngredient10}</li>
          </ul>
      `;
    }
}