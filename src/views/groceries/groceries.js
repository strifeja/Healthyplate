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
      key: 'item',
      label: 'Item',
      _props: { scope: 'col' },
    },
    {
      key: 'amount',
      label: '#',
      _props: { scope: 'col' },
    },
    {
      key: 'estimatedCost',
      label: 'Price',
      _props: { scope: 'col' },
    },
    {
      key: 'section',
      label: 'Section',
      _props: { scope: 'col' },
    },
  ]
  const items = [
    // Day 1
    {
      item: 'Eggs',
      amount: '3',
      estimatedCost: '$2.50',
      section: 'Dairy/Poultry',
    },
    {
      item: 'Avocado',
      amount: '1',
      estimatedCost: '$1.50',
      section: 'Produce',
    },
    {
      item: 'Olive oil',
      amount: '1 tbsp',
      estimatedCost: '$0.50',
      section: 'Condiments',
    },
    {
      item: 'Salt',
      amount: '1/2 tsp',
      estimatedCost: '$0.25',
      section: 'Spices',
    },
    {
      item: 'Chicken breast',
      amount: '2 lbs',
      estimatedCost: '$8.00',
      section: 'Meat/Poultry',
    },
    {
      item: 'Lettuce',
      amount: '1 head',
      estimatedCost: '$1.00',
      section: 'Produce',
    },
    {
      item: 'Tomatoes',
      amount: '2',
      estimatedCost: '$1.00',
      section: 'Produce',
    },
    {
      item: 'Cucumber',
      amount: '1',
      estimatedCost: '$0.75',
      section: 'Produce',
    },
    {
      item: 'Bell peppers',
      amount: '2',
      estimatedCost: '$1.50',
      section: 'Produce',
    },
    {
      item: 'Onion',
      amount: '1',
      estimatedCost: '$0.50',
      section: 'Produce',
    },
    {
      item: 'Garlic',
      amount: '2 cloves',
      estimatedCost: '$0.30',
      section: 'Produce',
    },
    {
      item: 'Soy sauce',
      amount: '1/4 cup',
      estimatedCost: '$1.00',
      section: 'Condiments',
    },
    // Add more items for Day 1 Meal 2 and Meal 3...

    // Day 2
    {
      item: 'Protein powder',
      amount: '2 scoops',
      estimatedCost: '$3.00',
      section: 'Supplements',
    },
    {
      item: 'Banana',
      amount: '1',
      estimatedCost: '$0.50',
      section: 'Produce',
    },
    {
      item: 'Almond milk',
      amount: '1/2 cup',
      estimatedCost: '$1.50',
      section: 'Dairy/Non-Dairy',
    },
    {
      item: 'Tuna',
      amount: '2 cans',
      estimatedCost: '$4.00',
      section: 'Canned Goods',
    },
    // Add more items for Day 2 Meal 2 and Meal 3...

    // Day 3
    {
      item: 'Greek yogurt',
      amount: '2 cups',
      estimatedCost: '$2.00',
      section: 'Dairy',
    },
    {
      item: 'Mixed nuts',
      amount: '1/2 cup',
      estimatedCost: '$2.50',
      section: 'Snacks',
    },
    {
      item: 'Honey',
      amount: '2 tbsp',
      estimatedCost: '$1.00',
      section: 'Sweeteners',
    },
    // Add more items for Day 3 Meal 2 and Meal 3...

    // Day 4
    {
      item: 'Oats',
      amount: '1 cup',
      estimatedCost: '$2.00',
      section: 'Grains',
    },
    {
      item: 'Mixed berries',
      amount: '1/2 cup',
      estimatedCost: '$3.00',
      section: 'Produce',
    },
    {
      item: 'Turkey breast',
      amount: '1 lb',
      estimatedCost: '$7.00',
      section: 'Meat/Poultry',
    },
    {
      item: 'Whole grain bread',
      amount: '2 slices',
      estimatedCost: '$3.00',
      section: 'Bakery',
    },
    {
      item: 'Mayonnaise',
      amount: '1 tbsp',
      estimatedCost: '$1.00',
      section: 'Condiments',
    },
    {
      item: 'Mustard',
      amount: '1 tsp',
      estimatedCost: '$0.50',
      section: 'Condiments',
    },
    // Add more items for Day 4 Meal 2 and Meal 3...

    // Day 5
    {
      item: 'Turkey bacon',
      amount: '4 slices',
      estimatedCost: '$3.00',
      section: 'Meat/Poultry',
    },
    {
      item: 'Tomatoes',
      amount: '2',
      estimatedCost: '$1.00',
      section: 'Produce',
    },
    {
      item: 'Bell peppers',
      amount: '2',
      estimatedCost: '$1.50',
      section: 'Produce',
    },
    {
      item: 'Soy sauce',
      amount: '1/4 cup',
      estimatedCost: '$1.00',
      section: 'Condiments',
    },
  ]
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2>Grocery List</h2>
      <CTable columns={columns} items={items} />
    </div>
  )
}
export default groceries
