import { sendPostInfo, Ingredient, Meal, MealPlan } from './System';
import axios from 'axios';
jest.mock('axios');  // This line is used to mock the axios library

describe('Meal', () => {
  it('should create a Meal object with the correct properties', () => {
    const ingredient = new Ingredient('chicken', '1', 'kg');
    const meal = new Meal(1, 1, 'Chicken Salad', [ingredient], ['Cook the chicken']);

    expect(meal).toEqual({
      day: 1,
      mealNumber: 1,
      name: 'Chicken Salad',
      ingredients: [ingredient],
      instructions: ['Cook the chicken'],
    });
  });
});

describe('MealPlan', () => {
  it('should create a MealPlan object with the correct properties', () => {
    const ingredient = new Ingredient('chicken', '1', 'kg');
    const meal = new Meal(1, 1, 'Chicken Salad', [ingredient], ['Cook the chicken']);
    const mealPlan = new MealPlan([meal]);

    expect(mealPlan).toEqual({
      meals: [meal],
      log: [],
    });
  });
  
    it('should update the log', () => {
      const meal = new Meal('Chicken Salad', [], []);
      const mealPlan = new MealPlan([meal]);
      const logEntry = { allergies: 'none', preferences: 'low-calorie' };
  
      mealPlan.updateLog(logEntry);
  
      expect(mealPlan.log).toEqual([logEntry]);
    });
  })