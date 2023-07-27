import React, { useState } from 'react'
import {
  CButton,
  CButtonGroup,
  CFormCheck,
  CForm,
  CFormControl,
  CFormInput,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'

const Starter = () => {
  // State variables for allergies and preferences
  const [allergies, setAllergies] = useState('')
  const [preferences, setPreferences] = useState('')
  // State variables for max tokens and temperature
  const [maxTokens, setMaxTokens] = useState(1000)
  const [temperature, setTemperature] = useState(0.5)
  const [modelType, setModelType] = useState('gpt-3.5-turbo')
  // State variables for meal plan
  const [showMealPlan, setShowMealPlan] = useState(false)
  const [mealPlan, setMealPlan] = useState('')
  const [api, setApi] = useState('')

  // const handleGenerateMealPlan = () => {
  //   // Perform any necessary processing to generate the meal plan based on allergies and preferences
  //   // For example, you can use the "allergies" and "preferences" state values to create the meal plan
  //   // For now, we will just show a simple message
  //   const generatedMealPlan = `Your meal plan based on allergies "${allergies}" and preferences "${preferences}" will be displayed here.`
  //   setMealPlan(generatedMealPlan)
  //   setShowMealPlan(true)
  // }

  const sendPostInfo = async (modelType, messages, maxTokens, temperature) => {
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
      setMealPlan(res.data.choices[0].message.content)
      setShowMealPlan(true)
    } catch (error) {
      console.log(error)
      setMealPlan(`Error: ${error.message}`)
      setShowMealPlan(true)
    }
  }

  const handleGenerateMealPlan = async () => {
    const systemMessage = {
      role: 'system',
      content: `You are an AI named HealthyPlate, specializing in generating personalized meal plans for users. " +
      "You have access to detailed information about the user's dietary preferences and allergies. " +
      "Your task is to generate a meal plan for the next three days. Each day should include three meals. " +
      "Make sure none of the meals contain ingredients that the user is allergic to, and each meal should align with the user's dietary preferences. " +
      "You will generate a meal plan without asking any additional questions from the user. You will not add any additional text to the output. " +
      "The meal plan should be presented in the following format:\n\n" +
      "Day 1:\n" +
      "Breakfast: [Meal name]\n" +
      "Ingredients: ingredient: amount...\n" +
      "Lunch: [Meal name]\n" + 
      "Ingredients: ingredient: amount...\n" +
      "Dinner: [Meal name]\n" + 
      "Ingredients: ingredient: amount...\n\n" +`,
    }
    const userPrompt = {
      role: 'user',
      content: `The user has the following allergies: "${allergies}". Their meal preferences are: "${preferences}".`,
    }
    const messages = [systemMessage, userPrompt]
    sendPostInfo(modelType, messages, maxTokens, temperature)
  }

  const handleStartAgain = () => {
    setAllergies('')
    setPreferences('')
    setMealPlan('')
    setShowMealPlan(false)
  }

  return (
    <div>
      {showMealPlan ? (
        <>
          <h2>Generated Meal Plan</h2>
          <pre style={{ fontFamily: 'Segoe UI', fontSize: '17px' }}>{mealPlan}</pre>
          <hr />
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="edit">
                Enter any changes you would like to make to this plan
              </CFormLabel>
              <CFormTextarea
                id="edit"
                rows={5}
                placeholder="No grapes on monday , I want pasta for at least one day , ... , etc."
              />
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <CButtonGroup role="group" aria-label="Basic checkbox toggle button group">
                <CFormCheck
                  button={{ color: 'dark' }}
                  id="btncheck1"
                  autoComplete="off"
                  label="Generate"
                />
                <CFormCheck
                  button={{ color: 'dark', variant: 'outline' }}
                  onClick={handleStartAgain}
                  id="btncheck2"
                  autoComplete="off"
                  label="Start Over"
                />
                <CFormCheck
                  button={{ color: 'dark' }}
                  id="btncheck3"
                  autoComplete="off"
                  label="Set/Save"
                />
              </CButtonGroup>
            </div>
          </CForm>
        </>
      ) : (
        <>
          <h2>Create a New Meal Plan</h2>
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="API">Enter API Code</CFormLabel>
              <CFormInput
                type="password"
                id="API"
                value={api}
                onChange={(e) => setApi(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="Allergies">Enter Allergies Here</CFormLabel>
              <CFormTextarea
                id="Allergies"
                rows={8}
                placeholder="Peanuts , Gluten , Bananas , ... , etc."
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="Preferences">Enter Food Preferences Here</CFormLabel>
              <CFormTextarea
                id="Preferences"
                rows={8}
                placeholder="Low-Calorie , High-Protein , Low Sugar , include pasta , must include veggies , ... , etc."
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <CButton color="dark" onClick={handleGenerateMealPlan}>
                Generate Meal Plan
              </CButton>
            </div>
          </CForm>
        </>
      )}
    </div>
  )
}

export default Starter
