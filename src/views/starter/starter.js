import React, { useState } from 'react'
import { CButton, CForm, CFormControl, CFormInput, CFormLabel, CFormTextarea } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'

const Starter = () => {
  const [allergies, setAllergies] = useState('')
  const [preferences, setPreferences] = useState('')
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

  const handleGenerateMealPlan = async () => {
    const systemMessage = {
      role: 'system',
      content: `You are an AI that is tasked with generating a meal plan for a user taking into account their allergies and preferences. You will make a meal plan that consists of 7 days and has 3 meals for each day.`,
    }
    const userPrompt = {
      role: 'user',
      content: `The user has the following allergies: "${allergies}". Their meal preferences are: "${preferences}".`,
    }
    const messages = [systemMessage, userPrompt]
    try {
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages,
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
          <div>{mealPlan}</div>
          <div className="d-grid gap-2 col-6 mx-auto">
            <CButton color="dark" onClick={handleStartAgain}>
              Start Again
            </CButton>
          </div>
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
