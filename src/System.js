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

  async generatePlan(allergies, preferences, mode, api, numberOfDays, mealsPerDay) {
    this.numberOfDays = numberOfDays
    this.mealsPerDay = mealsPerDay
    let { rules, temperature, maxTokens, modelType } = this.getRuleSet(mode)
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
    const mealPlan = await sendPostInfo(modelType, mealMessage, maxTokens, temperature, api)

    return mealPlan
  }

  async editPlan(mealPlan, editRequest, mode, api, numberOfDays, mealsPerDay) {
    this.numberOfDays = numberOfDays
    this.mealsPerDay = mealsPerDay
    let { rules, temperature, maxTokens, modelType } = this.getRuleSet(mode)
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
      case 'Fast':
        return {
          rules: `- Start a new day with "Day:" followed by a space and the day number. Add a newline after this.
          - Start a new meal with "Meal" followed by a space, the meal number, a colon and another space. After this put the name of the meal. Example: "Meal 1: Chicken Teriyaki. Add a newline after this.
          - List the ingredients by starting with "Ingredients: "  Each ingredient should seperated by a comma (,) and a space, and should be formatted as follows: "Ingredient name: Quantity Measurement". For example: "- Chicken: 2 lbs". 
          - Quantities should be represented as a string and can be either decimal or fraction. For decimals, use a period (".") for example: "~ "Chicken":"0.5":"lbs". For fractions, use a forward slash ("/") for example: "~ "Chicken":"1/2":"lbs".
          - List all ingredients on the same line and make sure they are seperated by a coma. Make sure they are all on the same line. Do NOT use dashes`,
          temperature: 0.5,
          maxTokens: 700,
          modelType: 'gpt-3.5-turbo',
        }
      case 'Detailed':
        return {
          rules: `- Start a new day with "Day:" followed by a space and the day number. Add a newline after this.
          - Start a new meal with "Meal" followed by a space, the meal number, a colon and another space. After this put the name of the meal. Example: "Meal 1: Chicken Teriyaki. Add a newline after this.
          - List the ingredients with "Ingredients:" followed by a newline. Each ingredient should seperated by a comma (,) and a space, and should be formatted as follows: "Ingredient name: Quantity Measurement". For example: "- Chicken: 2 lbs". 
          - List only 4 ingredients per line and make a newline after 4 ingredients have been listed on that line. Repeat until all ingredients are listed. For example "Chicken: 2 lbs, Mozzarella cheese: 1/2 cup, Tomatoes: 2, Onion: 1/4 cup"
          - Quantities should be represented as a string and can be either decimal or fraction. For decimals, use a period (".") for example: "~ "Chicken":"0.5":"lbs". For fractions, use a forward slash ("/") for example: "~ "Chicken":"1/2":"lbs".
          - Describe the recipe with "Recipe:" followed by a newline. Each step of the recipe should be on a new line, prefixed with a dash (-) and a space, and should start with a verb. If there are multiple steps, they should be separated by a period followed by a space.`,
          temperature: 0.5,
          maxTokens: 1500,
          modelType: 'gpt-4',
        }
      // Add more cases as needed
      case 'Test':
        return {
          rules: `- Start a new day with "#Day:" followed by a space and the day number. Add a newline after this.
          - Start a new meal with "#Meal:" followed by a space and the meal number. Add a newline after this.
          - Provide the meal title with "#Title:" followed by a space and the title of the meal. This should be on the same line.
          - List the ingredients with "#Ingredients:" followed by a newline. Each ingredient should be on a new line, prefixed with a tilde (~) and a space, and should be formatted as follows: "Ingredient name:Quantity:Measurement". For example: "~ Chicken:2:lbs".
          - Describe the recipe with "#Recipe:" followed by a newline. Each step of the recipe should be on a new line, prefixed with a tilde (~) and a space.`,
          temperature: 0.5,
          maxTokens: 1500,
          modelType: 'gpt-3.5-turbo',
        }
    }
  }
}

export class GroceryList {
  constructor(ingredients) {
    this.ingredients = ingredients // This should be an array of Ingredient objects
  }

  async generateList(mealPlan, api) {
    const systemMessage = {
      role: 'system',
      content: `As an AI assistant specializing in meal planning, your task is to generate a grocery list from a given meal plan. 
      The meal plan will provide a list of meals, each with its own set of ingredients and their respective quantities. 
      In some instances, an ingredient might appear in multiple meals. In such cases, you need to consolidate these ingredients and compute the total quantity required.
      The final output should be a grocery list with no addtional text before or after it. Each line should represent an item.
      Each item on this list should have an associated ID number, the name of the item, the total quantity required along with its measurement unit, and the section of the grocery store where it can be found.
      Please follow this specific format for each line of the grocery list: 'ID#|Item|Amount Measurement|Section'.
      It is important that you generate the grocery list without any additional text before or after it. 
      For example, a line in your output could look like this: '1|Beef|2 lbs|Meat'`,
    }
    const userPrompt = {
      role: 'user',
      content: `Here is the meal plan: "${mealPlan}".`,
    }
    const groceryMessage = [systemMessage, userPrompt]

    // Call sendPostInfo and get the grocery list
    const groceryListStr = await sendPostInfo('gpt-3.5-turbo', groceryMessage, 1500, 0.5, api)

    return groceryListStr
  }
}
