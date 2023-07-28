import React, { useState, useEffect } from 'react'
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
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import BMRTracker from './bmr.js'
import Calorie from './calorie.js'

const Nutrition = () => {
  const [activeKey, setActiveKey] = useState(1)
  return (
    <div>
      <h2>Nutrition</h2>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink href="#/nutrition" active={activeKey === 1} onClick={() => setActiveKey(1)}>
            BMR Tracker
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#/nutrition" active={activeKey === 2} onClick={() => setActiveKey(2)}>
            Calorie Tracker
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="bmr-tab" visible={activeKey === 1}>
          <BMRTracker></BMRTracker>
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="calorie-tab" visible={activeKey === 2}>
          <Calorie></Calorie>
        </CTabPane>
      </CTabContent>
    </div>
  )
}

export default Nutrition
