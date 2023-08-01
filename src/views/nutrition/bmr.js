import React, { useState, Component } from 'react'
import { CButton, CCol, CFormInput, CRow, CContainer, CFormCheck, CFormRange } from '@coreui/react'

function BmrValue(props) {
  return (
    <div className="BmrValue">
      {/* <h3>{props.value}</h3> */}
      <h2>0,000</h2>
    </div>
  )
}

const BMRTracker = () => {
  const [inlineMaleCheckbox, setMale] = useState(0)
  const [inlineFemaleCheckbox, setFemale] = useState(0)
  const [inputFeet, setFeet] = useState(0)
  const [inputInches, setInches] = useState(0)
  const [inputWeight, setWeight] = useState(0)
  const [inputAge, setAge] = useState(0)
  const [bmrValue, setBmrValue] = useState(0)

  const handleCalculateBMR = () => {
    const calculatedBMR = calculateBMR()
    setBmrValue(calculatedBMR)
    console.log('male: %d', inlineMaleCheckbox)
    console.log('feet: %d', inputFeet)
    console.log('inches: %d', inputInches)
    console.log('weight: %d', inputWeight)
    console.log('age: %d', inputAge)
    console.log(bmrValue)
  }

  const calculateBMR = () => {
    let weight_kg = inputWeight / 2.205
    let height_cm = (inputFeet * 12 + inputInches) * 2.54
    if (inlineMaleCheckbox == 1) {
      return 13.397 * weight_kg + 4.799 * height_cm - 5.677 * inputAge + 88.362
    } else if (inlineFemaleCheckbox == 1) {
      return 9.247 * weight_kg + 3.098 * height_cm - 4.33 * inputAge + 447.593
    }
    return 0
  }

  return (
    <div>
      <br></br>
      <h4>Personal Information</h4>
      <hr></hr>
      <CContainer>
        <CRow className="align-items-center">
          <CCol xs={4}>
            <h5>Sex</h5>
          </CCol>
          <CCol>
            <CFormCheck
              inline
              type="radio"
              name="inlineSexOptions"
              id="inlineMaleCheckbox"
              value="1"
              label="Male"
              onChange={(e) => setMale(e.target.value)}
            />
            <CFormCheck
              inline
              type="radio"
              name="inlineSexOptions"
              id="inlineFemaleCheckbox"
              value="1"
              label="Female"
              onChange={(e) => setFemale(e.target.value)}
            />
          </CCol>
        </CRow>
        <br></br>
        <CRow>
          <CCol xs={4} className="align-self-end">
            <h5>Height</h5>
          </CCol>
          <CCol className="align-self-center">
            <CFormInput
              id="inputFeet"
              aria-label="Feet Input"
              onChange={(e) => setFeet(e.target.value)}
            />
          </CCol>
          <CCol xs={1} className="align-self-end">
            <h6>ft</h6>
          </CCol>
          <CCol className="align-self-center">
            <CFormInput
              id="inputInches"
              aria-label="Inches Input"
              onChange={(e) => setInches(e.target.value)}
            />
          </CCol>
          <CCol xs={4} className="align-self-end">
            <h6>in</h6>
          </CCol>
        </CRow>
        <br></br>
        <CRow>
          <CCol xs={4} className="align-self-end">
            <h5>Weight</h5>
          </CCol>
          <CCol className="align-self-center">
            <CFormInput
              id="inputWeight"
              aria-label="Weight Input"
              onChange={(e) => setWeight(e.target.value)}
            />
          </CCol>
          <CCol className="align-self-end">
            <h6>lbs</h6>
          </CCol>
        </CRow>
        <br></br>
        <CRow>
          {/* <CCol xs={4} className="align-self-end">
            <h5>Age</h5>
          </CCol>
          <CCol className="align-self-center">
            <CFormRange
              min={15}
              max={80}
              defaultValue="25"
              id="ageRange"
              data-coreui-toggle="tooltip"
              data-coreui-placement="bottom"
              title="Tooltip on bottom"
            />
          </CCol> */}
          <CCol xs={4} className="align-self-end">
            <h5>Age</h5>
          </CCol>
          <CCol className="align-self-center">
            <CFormInput
              id="inputAge"
              aria-label="Age Input"
              onChange={(e) => setAge(e.target.value)}
            />
          </CCol>
          <CCol className="align-self-end">
            <h6>years</h6>
          </CCol>
        </CRow>
        <br></br>
        <CRow>
          <div className="d-grid gap-2">
            <CButton onClick={handleCalculateBMR} color="primary">
              Calculate BMR
            </CButton>
          </div>
        </CRow>
        <br></br>
      </CContainer>
      <h4>BMR Estimate</h4>
      <hr></hr>
      <CContainer>
        <div className="p-5 border bg-light">
          <CRow>
            <CCol xs={3}>
              <h4>BMR</h4>
            </CCol>
            <CCol>
              <BmrValue value={bmrValue} />
            </CCol>
            <CCol>
              <h4>calories</h4>
            </CCol>
          </CRow>
        </div>
      </CContainer>
    </div>
  )
}

export default BMRTracker
