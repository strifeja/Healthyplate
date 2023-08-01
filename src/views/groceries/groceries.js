import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable } from '@coreui/react'
import { GroceryList } from '../../System.js' // Import the GroceryList class

function formatGroceryList(groceryListStr) {
  // Split the string into lines
  const lines = groceryListStr.split('\n')

  // Map over each line
  const formattedLines = lines.map((line) => {
    // Split each line into its components
    const components = line.split('|')

    // Format the components
    const formattedComponents = components.map((component) => component.trim())

    // Join the components back together with the desired amount of space
    const formattedLine = `${formattedComponents[0].padEnd(10)} | ${formattedComponents[1].padEnd(
      40,
    )} | ${formattedComponents[2].padEnd(30)} | ${formattedComponents[3].padEnd(20)}`

    return formattedLine
  })

  // Join the lines back together
  const formattedGroceryList = formattedLines.join('\n')

  return formattedGroceryList
}

const Groceries = () => {
  const [groceryList, setGroceryList] = useState([])

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
    <CCard>
      <CCardHeader> Grocery List </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol xs="12">
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
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default Groceries
