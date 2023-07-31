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

export class Meal {
  constructor(day, mealNumber, name, ingredients, instructions) {
    this.day = day
    this.mealNumber = mealNumber
    this.name = name
    this.ingredients = ingredients // This should be an array of Ingredient objects
    this.instructions = instructions // This should be an array of strings
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

  async generatePlan(allergies, preferences, modelType, mode, api, numberOfDays, mealsPerDay) {
    this.numberOfDays = numberOfDays
    this.mealsPerDay = mealsPerDay
    let { rules, temperature, maxTokens } = this.getRuleSet(mode)
    console.log(mode)
    const systemMessage = {
      role: 'system',
      content: `You are HealthyPlate, an AI assistant that specializes in creating personalized meal plans based on user's dietary preferences and allergies. 
      Your task is to generate a meal plan for "${numberOfDays}" days, with each day including "${mealsPerDay}" meals. 
      Ensure that no meals contain ingredients to which the user is allergic, and that each meal aligns with the user's dietary preferences. 
      You should not ask the user any additional questions and must not add any additional text to the meal plan output.
      Make sure to generate the correct number of days and meals per day as requested by the user.
      
      The meal plan you generate should strictly adhere to the following format:
      
      ${rules}`,
    }
    const userPrompt = {
      role: 'user',
      content: `The user has the following allergies: "${allergies}". Their meal preferences are: "${preferences}".`,
    }
    const mealMessage = [systemMessage, userPrompt]

    // Call sendPostInfo and get the meal plan
    const mealPlan = await sendPostInfo(modelType, mealMessage, 1000, 0.5, api)

    return mealPlan
  }

  async editPlan(mealPlan, editRequest, modelType, mode, api, numberOfDays, mealsPerDay) {
    this.numberOfDays = numberOfDays
    this.mealsPerDay = mealsPerDay
    let { rules, temperature, maxTokens } = this.getRuleSet(mode)
    const systemMessage = {
      role: 'system',
      content: `You are HealthyPlate, an AI assistant with a specialty in creating and editing personalized meal plans.
      Your task is to adjust the provided meal plan based on the user's requested edits, the specified number of days, and the number of meals per day. 
      If the user's edit request is empty or unrelated to the meal plan, you should ignore it. If the specified number of days or meals per day differs from the provided meal plan, you should modify the plan accordingly by adding or removing meals or days as necessary. When adding meals, try to base them on existing meals in the plan and take into account the user's edit request.
      You should not ask the user any additional questions and must not add any additional text to the meal plan output.
     
      The meal plan format you should follow is as follows:
     
      ${rules}`,
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

  getRuleSet(mode) {
    switch (mode) {
      case 'Default':
        return {
          rules: `- Start a new day with "Day:" followed by a space and the day number. Add a newline after this.
          - Start a new meal with "Meal" followed by a space, the meal number, a colon and another space. After this put the name of the meal. Example: "Meal 1: Chicken Teriyaki. Add a newline after this.
          - List the ingredients with "Ingredients:" followed by a newline. Each ingredient should be on a new line, prefixed with a dash (-) and a space, and should be formatted as follows: "Ingredient name: Quantity Measurement". For example: "- Chicken: 2 lbs". Quantities should be represented as a string and can be either decimal or fraction. For decimals, use a period (".") for example: "~ "Chicken":"0.5":"lbs". For fractions, use a forward slash ("/") for example: "~ "Chicken":"1/2":"lbs".`,
          temperature: 0.5, // Replace with the temperature for Mode 1
          maxTokens: 1000, // Replace with the max tokens for Mode 1
        }
      case 'Recipe':
        return {
          rules: `- Start a new day with "Day:" followed by a space and the day number. Add a newline after this.
          - Start a new meal with "Meal" followed by a space, the meal number, a colon and another space. After this put the name of the meal. Example: "Meal 1: Chicken Teriyaki. Add a newline after this.
          - List the ingredients with "Ingredients:" followed by a newline. Each ingredient should be on a new line, prefixed with a dash (-) and a space, and should be formatted as follows: "Ingredient name: Quantity Measurement". For example: "- Chicken: 2 lbs". Quantities should be represented as a string and can be either decimal or fraction. For decimals, use a period (".") for example: "~ "Chicken":"0.5":"lbs". For fractions, use a forward slash ("/") for example: "~ "Chicken":"1/2":"lbs".
          - Describe the recipe with "Recipe:" followed by a newline. Each step of the recipe should be on a new line, prefixed with a dash (-) and a space, and should start with a verb. If there are multiple steps, they should be separated by a period followed by a space.`,
          temperature: 0.6, // Replace with the temperature for Mode 2
          maxTokens: 1500, // Replace with the max tokens for Mode 2
        }
      // Add more cases as needed
      case 'Test': // This will be the "Default" mode
        return {
          rules: `- Start a new day with "#Day:" followed by a space and the day number. Add a newline after this.
          - Start a new meal with "#Meal:" followed by a space and the meal number. Add a newline after this.
          - Provide the meal title with "#Title:" followed by a space and the title of the meal. This should be on the same line.
          - List the ingredients with "#Ingredients:" followed by a newline. Each ingredient should be on a new line, prefixed with a tilde (~) and a space, and should be formatted as follows: "Ingredient name:Quantity:Measurement". For example: "~ Chicken:2:lbs".
          - Describe the recipe with "#Recipe:" followed by a newline. Each step of the recipe should be on a new line, prefixed with a tilde (~) and a space.`,
          temperature: 0.5, // Replace with the default temperature
          maxTokens: 1500, // Replace with the default max tokens
        }
    }
  }

  convertPlan(mealPlanStr) {
    // Need to add
    //Convert string Meal Plan to Meal Objects
  }

  getPlanString() {
    // Need to add
  }
}

export class GroceryList {
  constructor(ingredients) {
    this.ingredients = ingredients // This should be an array of Ingredient objects
  }
}
