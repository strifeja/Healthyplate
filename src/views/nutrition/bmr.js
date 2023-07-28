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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

class BMRTracker extends Component {
  render() {
    return (
      <div>
        <br></br>
        <h4>Personal Information</h4>
        <hr></hr>
        <h4>Sex</h4>
        <h4>Height</h4>
        <h4>Weight</h4>
        <h4>Age</h4>
        <br></br>
        <h4>BMR Estimate</h4>
        <hr></hr>
      </div>
    )
  }
}

export default BMRTracker
