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
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'

const Starter = () => {
  // State variables for allergies and preferences
  const [allergies, setAllergies] = useState('')
  const [preferences, setPreferences] = useState('')
  const [edit, setEdit] = useState('')
  // State variables for max tokens and temperature
  const [maxTokens, setMaxTokens] = useState(1000)
  const [temperature, setTemperature] = useState(0.5)
  const [modelType, setModelType] = useState('gpt-3.5-turbo')
  // State variables for meal plan
  const [showMealPlan, setShowMealPlan] = useState(false)
  const [mealPlan, setMealPlan] = useState('')
  const [api, setApi] = useState('')
  //Loading spinners for buttons
  const [showSpinner, setShowSpinner] = useState(false)
  const [showEditSpinner, setShowEditSpinner] = useState(false)

  const sendPostInfo = async (modelType, messages, maxTokens, temperature, callback) => {
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
    } finally {
      if (callback) {
        callback()
      }
    }
  }

  const handleGenerateMealPlan = async () => {
    setShowSpinner(true)
    const systemMessage = {
      role: 'system',
      content: `You are an AI named HealthyPlate, specializing in generating personalized meal plans for users.  
      You have access to detailed information about the user's dietary preferences and allergies. 
      Your task is to generate a meal plan for the next three days. Each day should include three meals. 
      Make sure none of the meals contain ingredients that the user is allergic to, and each meal should align with the user's dietary preferences. 
      You will generate a meal plan without asking any additional questions from the user. You will not add any additional text to the output. 
      The meal plan should be presented in the following format:\n\n" +
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
    const mealMessage = [systemMessage, userPrompt]
    sendPostInfo(modelType, mealMessage, maxTokens, temperature, () => setShowSpinner(false))
  }

  const handleEditMealPlan = async () => {
    setShowEditSpinner(true)
    const systemMessage = {
      role: 'system',
      content: `You are an AI designed to edit a meal plan that is provided to you with the changes that the user requests.  
      Make sure to keep the same format that the meal plan was provided to you in`,
    }
    const userPrompt = {
      role: 'user',
      content: `Here is the meal plan you must edit: "${mealPlan}", These are the edits the user has requested: "${edit}"`,
    }
    const editMealMessage = [systemMessage, userPrompt]
    sendPostInfo(modelType, editMealMessage, maxTokens, temperature, () =>
      setShowEditSpinner(false),
    )
    setEdit('')
  }

  const handleStartAgain = () => {
    setAllergies('')
    setPreferences('')
    setMealPlan('')
    setShowMealPlan(false)
    setShowSpinner(false)
  }

  return (
    <div>
      {showMealPlan ? (
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
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
                value={edit}
                onChange={(e) => setEdit(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <CButtonGroup role="group" aria-label="Basic checkbox toggle button group">
                <CFormCheck
                  button={{ color: 'dark' }}
                  onClick={handleEditMealPlan}
                  id="btncheck1"
                  autoComplete="off"
                  label={
                    showEditSpinner ? (
                      <>
                        <span style={{ marginRight: '5px' }}>Editing...</span>
                        <CSpinner size="sm" color="light" />
                      </>
                    ) : (
                      'Generate'
                    )
                  }
                  disabled={showEditSpinner}
                />
                <CFormCheck
                  button={{ color: 'dark', variant: 'outline' }}
                  onClick={handleStartAgain}
                  id="btncheck2"
                  autoComplete="off"
                  label="Start Over"
                  disabled={showEditSpinner}
                />
                <CFormCheck
                  button={{ color: 'dark' }}
                  onClick={handleEditMealPlan}
                  id="btncheck3"
                  autoComplete="off"
                  label="Save Plan"
                  disabled={showEditSpinner}
                />
              </CButtonGroup>
            </div>
          </CForm>
        </div>
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
                rows={3}
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
              <CButton color="dark" onClick={handleGenerateMealPlan} disabled={showSpinner}>
                {showSpinner ? (
                  <>
                    <span style={{ marginRight: '5px' }}>Generating...</span>
                    <CSpinner size="sm" color="light" />
                  </>
                ) : (
                  'Generate Meal Plan'
                )}
              </CButton>
            </div>
          </CForm>
        </>
      )}
    </div>
  )
}

export default Starter
