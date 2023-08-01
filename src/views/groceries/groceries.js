import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CButton,
  CForm,
  CFormLabel,
  CFormControl,
  CFormInput,
} from '@coreui/react'
import { GroceryList } from '../../System.js' // Import the GroceryList class

const Groceries = () => {
  const [groceryList, setGroceryList] = useState([])
  const [newItem, setNewItem] = useState('')
  const [newAmount, setNewAmount] = useState('')
  const [newSection, setNewSection] = useState('')

  const clearList = () => {
    // Clear the grocery list from state
    setGroceryList([])
    localStorage.removeItem('groceryList')
  }

  const handleNewItemSubmit = (e) => {
    e.preventDefault()

    const newItemObject = {
      ID: groceryList.length + 1,
      Item: newItem,
      AmountMeasurement: newAmount,
      Section: newSection,
    }

    setGroceryList([...groceryList, newItemObject])
    setNewItem('')
    setNewAmount('')
    setNewSection('')
  }

  useEffect(() => {
    // Get the grocery list string from localStorage
    const storedGroceryList = localStorage.getItem('groceryList')
    if (storedGroceryList) {
      // Convert the grocery list string to an array of objects
      const groceryListArray = storedGroceryList.split('\n').map((line, index) => {
        const [id, item, amountMeasurement, section] = line.split('|').map((part) => part.trim())
        return {
          ID: id,
          Item: item,
          AmountMeasurement: amountMeasurement,
          Section: section,
        }
      })

      setGroceryList(groceryListArray)
    }
  }, [])

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
      <CTable striped hover>
        <thead>
          <tr>
            <th>ID#</th>
            <th>Item</th>
            <th>Amount/Measurement</th>
            <th>Section</th>
          </tr>
        </thead>
        <tbody>
          {groceryList.map((item, index) => (
            <tr key={index}>
              <td>{item['ID']}</td>
              <td>{item['Item']}</td>
              <td>{item['AmountMeasurement']}</td>
              <td>{item['Section']}</td>
            </tr>
          ))}
        </tbody>
      </CTable>
      <hr />
      <CForm>
        <CRow>
          <CCol md="3">
            <div className="mb-3">
              <CFormLabel htmlFor="Item">Enter Item</CFormLabel>
              <CFormInput
                type="text"
                id="Item"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
              />
            </div>
          </CCol>
          <CCol md="3">
            <div className="mb-3">
              <CFormLabel htmlFor="Amount">Enter Amount</CFormLabel>
              <CFormInput
                type="text"
                id="Amount"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
              />
            </div>
          </CCol>
          <CCol md="3">
            <div className="mb-3">
              <CFormLabel htmlFor="Section">Enter Section</CFormLabel>
              <CFormInput
                type="text"
                id="Section"
                value={newSection}
                onChange={(e) => setNewSection(e.target.value)}
              />
            </div>
          </CCol>
          <CCol md="3">
            <div className="d-grid gap-2 col-6 mx-auto" style={{ marginTop: '30px' }}>
              <CButton color="dark" onClick={handleNewItemSubmit}>
                Add Item
              </CButton>
            </div>
          </CCol>
        </CRow>
        <div className="d-grid gap-2 col-6 mx-auto">
          <CButton color="dark" onClick={clearList}>
            Clear List
          </CButton>
        </div>
      </CForm>
    </div>
  )
}

export default Groceries
