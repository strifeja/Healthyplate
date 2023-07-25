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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const groceries = () => {
  const columns = [
    {
      key: 'id',
      label: '#',
      _props: { scope: 'col' },
    },
    {
      key: 'item',
      label: 'Item',
      _props: { scope: 'col' },
    },
    {
      key: 'meal',
      label: 'Meal',
      _props: { scope: 'col' },
    },
    {
      key: 'section',
      label: 'Section',
      _props: { scope: 'col' },
    },
  ]
  const items = [
    {
      id: 2,
      item: 'Eggs',
      meal: 'Breakfast',
      section: 'dairy',
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 5,
      item: 'Bananas',
      meal: 'Snack',
      section: 'Produce',
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 4,
      item: 'Froot Loops',
      meal: 'Breakfast',
      section: 'Cereal',
      _cellProps: { id: { scope: 'row' }, class: { colSpan: 2 } },
    },
    {
      id: 2,
      item: 'Eggs',
      meal: 'Breakfast',
      section: 'dairy',
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 5,
      item: 'Bananas',
      meal: 'Snack',
      section: 'Produce',
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 4,
      item: 'Froot Loops',
      meal: 'Breakfast',
      section: 'Cereal',
      _cellProps: { id: { scope: 'row' }, class: { colSpan: 2 } },
    },
    {
      id: 2,
      item: 'Eggs',
      meal: 'Breakfast',
      section: 'dairy',
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 5,
      item: 'Bananas',
      meal: 'Snack',
      section: 'Produce',
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 4,
      item: 'Froot Loops',
      meal: 'Breakfast',
      section: 'Cereal',
      _cellProps: { id: { scope: 'row' }, class: { colSpan: 2 } },
    },
    {
      id: 2,
      item: 'Eggs',
      meal: 'Breakfast',
      section: 'dairy',
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 5,
      item: 'Bananas',
      meal: 'Snack',
      section: 'Produce',
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 4,
      item: 'Froot Loops',
      meal: 'Breakfast',
      section: 'Cereal',
      _cellProps: { id: { scope: 'row' }, class: { colSpan: 2 } },
    },
    {
      id: 2,
      item: 'Eggs',
      meal: 'Breakfast',
      section: 'dairy',
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 5,
      item: 'Bananas',
      meal: 'Snack',
      section: 'Produce',
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 4,
      item: 'Froot Loops',
      meal: 'Breakfast',
      section: 'Cereal',
      _cellProps: { id: { scope: 'row' }, class: { colSpan: 2 } },
    },
    {
      id: 2,
      item: 'Eggs',
      meal: 'Breakfast',
      section: 'dairy',
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 5,
      item: 'Bananas',
      meal: 'Snack',
      section: 'Produce',
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 4,
      item: 'Froot Loops',
      meal: 'Breakfast',
      section: 'Cereal',
      _cellProps: { id: { scope: 'row' }, class: { colSpan: 2 } },
    },
  ]
  return (
    <div>
      <h2>Grocery List</h2>
      <CTable columns={columns} items={items} />
    </div>
  )
}
export default groceries
