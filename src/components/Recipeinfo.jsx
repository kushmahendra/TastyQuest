import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Recipeinfo = () => {
  const [item, setItem] = useState(null);
  const { MealId } = useParams();

  useEffect(() => {
    const fetchMealInfo = async () => {
      if (MealId !== "") {
        try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MealId}`);
          const data = await response.json();

          setItem(data.meals[0]);
        } catch (error) {
          console.error("Error fetching meal information:", error);
        }
      }
    };

    fetchMealInfo();
  }, [MealId]);

  let vId = "";
  if (item) {
    const url = item.strYoutube;
    const str = url.split("=");
    vId = str[str.length - 1];
  }

  return (
    <>
      {item && (
        <>
          <div className="content">
            <div className="button-container">
              <Link to="/"><button className="top-button">Home</button></Link>
            </div>
            <img src={item.strMealThumb} alt="" />
            <div className="inner-content">
              <h1>{item.strMeal}</h1>
              <h2>{item.strArea} Food</h2>
              <h3>Category: {item.strCategory}</h3>
            </div>
          </div>
          <div className="recipe-details">
          <div className="ingredients">
              <h2>Ingredients</h2>
              {Array.from({ length: 20 }, (_, i) => i + 1).map((index) => {
                const ingredientKey = `strIngredient${index}`;
                const measureKey = `strMeasure${index}`;

                return (
                  item[ingredientKey] && (
                    <ul><li key={index}>
                      <h4>{item[ingredientKey]}: {item[measureKey]}</h4>
                      </li>
                    </ul>
                  )
                );
              })}
            </div>
            <div className="instructions">
              <h2>Instructions</h2>
              <h4>{item.strInstructions}</h4>
            </div>
            
          </div>
        </>
      )}
    </>
  );
};

export default Recipeinfo;
