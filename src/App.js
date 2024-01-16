import React from 'react';
import Meal from './components/Meal';
import './components/style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Recipeinfo from './components/Recipeinfo';

function App() {
  return (

    <Router>

      <Routes>
        <Route path="/" element={<Meal />} />
        <Route path="/:MealId" element={<Recipeinfo />} />
      </Routes>
      </Router>
      

  );
}

export default App;
