import axios from 'axios'

export const sendPostInfo = async (modelType, messages, maxTokens, temperature, api, callback) => {
  try {
    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: modelType,
        messages,
        max_tokens: maxTokens,
        temperature,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ` + api,
        },
      },
    )
    return res.data.choices[0].message.content
  } catch (error) {
    console.log(error)
    return `Error: ${error.message}`
  } finally {
    if (callback) {
      callback()
    }
  }
}

export class Ingredient {
  constructor(name, amount, measurement) {
    this.name = name
    this.amount = amount
    this.measurement = measurement
  }
}

export class Recipe {
  constructor(name, ingredients) {
    this.name = name
    this.ingredients = ingredients // This should be an array of Ingredient objects
  }
}

export class Meal {
  constructor(name, recipe) {
    this.name = name
    this.recipe = recipe // This should be a Recipe object
  }
}

export class MealPlan {
  constructor(meals) {
    this.meals = meals // This should be an array of Meal objects
    this.log = [] // This should hold the log entries
  }

  updateLog(entry) {
    this.log.push(entry)
  }

  async generatePlan(
    allergies,
    preferences,
    modelType,
    maxTokens,
    temperature,
    api,
    numberOfDays,
    mealsPerDay,
  ) {
    this.numberOfDays = numberOfDays
    this.mealsPerDay = mealsPerDay
    const systemMessage = {
      role: 'system',
      content: `You are an AI named HealthyPlate, specializing in generating personalized meal plans for users.  
      You have access to detailed information about the user's dietary preferences and allergies. 
      Your task is to generate a meal plan for "${numberOfDays}" days. Each day should include "${mealsPerDay}" meals per day. 
      Make sure none of the meals contain ingredients that the user is allergic to, and each meal should align with the user's dietary preferences. 
      You will generate a meal plan without asking any additional questions from the user. You will not add any additional text to the output. 
      The meal plan should be presented in the following example format, make sure to generate the correct number of days and meals per day:\n\n" +
      Day 1: 
      Meal 1: [Meal name] 
      Ingredients: ingredient: amount... 
      Recipe: recipe description...\n`,
    }
    const userPrompt = {
      role: 'user',
      content: `The user has the following allergies: "${allergies}". Their meal preferences are: "${preferences}".`,
    }
    const mealMessage = [systemMessage, userPrompt]

    // Call sendPostInfo and get the meal plan
    const mealPlan = await sendPostInfo('gpt-4', mealMessage, maxTokens, temperature, api)

    return mealPlan
  }

  async editPlan(
    mealPlan,
    editRequest,
    modelType,
    maxTokens,
    temperature,
    api,
    numberOfDays,
    mealsPerDay,
  ) {
    const systemMessage = {
      role: 'system',
      content: `You are an AI designed to edit a meal plan that is provided to you with the changes that the user requests.  
      You will not add any additional text before or after the meal plan.
      You will be provided with the three thing. First the meal plan. Second the edits the user requests. 
      Third the number of days and number of meals per day.
      If the users edit is empty of deos not have to do with food ignore it.
      If the number of days or number of meals per day is different than the meal plan provided then you may add or remove any days or meals neccessary.
      When adding meals try to base them on existing meals as well as the users edit provided.
      Example format for one day and one meal, make sure the meal plan has the correct number of days and meals per day:
      Day 1: 
      Meal 1: [Meal name] 
      Ingredients: ingredient: amount...
      Recipe: recipe description...\n`,
    }
    const userPrompt = {
      role: 'user',
      content: `Here is the meal plan you must edit: "${mealPlan}", These are the edits the user has requested: "${editRequest}, ".
      Additionally the user requests the meal plan to be for ${numberOfDays} days and ${mealsPerDay} meals per day.`,
    }
    const editMealMessage = [systemMessage, userPrompt]

    // Call sendPostInfo and get the meal plan
    const editedMealPlan = await sendPostInfo(
      modelType,
      editMealMessage,
      maxTokens,
      temperature,
      api,
    )

    return editedMealPlan
  }
}

export class GroceryList {
  constructor(ingredients) {
    this.ingredients = ingredients // This should be an array of Ingredient objects
  }
}
