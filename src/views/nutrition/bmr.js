import React, { useState, useEffect, Component } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CTable,
  CSwitch,
  CContainer,
  CFormCheck,
  CFormSelect,
  CFormRange,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

class BMRTracker extends Component {
  // calculateBMR() {

  // }

  render() {
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
                value="male"
                label="Male"
              />
              <CFormCheck
                inline
                type="radio"
                name="inlineSexOptions"
                id="inlineFemaleCheckbox"
                value="female"
                label="Female"
              />
            </CCol>
          </CRow>
          <br></br>
          <CRow>
            <CCol xs={4} className="align-self-end">
              <h5>Height</h5>
            </CCol>
            <CCol className="align-self-center">
              <CFormInput aria-label="Feet Input" />
            </CCol>
            <CCol xs={1} className="align-self-end">
              <h6>ft</h6>
            </CCol>
            <CCol className="align-self-center">
              <CFormInput aria-label="Inches Input" />
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
              <CFormInput aria-label="Feet Input" />
            </CCol>
            <CCol className="align-self-end">
              <h6>lbs</h6>
            </CCol>
          </CRow>
          <br></br>
          <CRow>
            <CCol xs={4} className="align-self-end">
              <h5>Age</h5>
            </CCol>
            <CCol className="align-self-center">
              <CFormRange min={18} max={100} defaultValue="25" id="ageRange" />
            </CCol>
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
                <h3>0,000</h3>
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
}

export default BMRTracker
