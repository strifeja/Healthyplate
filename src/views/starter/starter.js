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
import { MealPlan, sendPostInfo } from '../../System.js'

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

  const handleGenerateMealPlan = async () => {
    setShowSpinner(true)
    // Create a new meal plan
    const mealPlanObj = new MealPlan([])
    const mealPlanStr = await mealPlanObj.generatePlan(
      allergies,
      preferences,
      modelType,
      maxTokens,
      temperature,
      api,
    )
    setMealPlan(mealPlanStr)
    setShowMealPlan(true)
    setShowSpinner(false)
  }

  const handleEditMealPlan = async () => {
    setShowEditSpinner(true)
    // Create a new meal plan
    const mealPlanObj = new MealPlan([])
    const editedMealPlanStr = await mealPlanObj.editPlan(
      mealPlan,
      edit,
      modelType,
      maxTokens,
      temperature,
      api,
    )
    setMealPlan(editedMealPlanStr)
    setShowEditSpinner(false)
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
