import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const starter = React.lazy(() => import('./views/starter/starter'))
const groceries = React.lazy(() => import('./views/groceries/groceries'))
const nutrition = React.lazy(() => import('./views/nutrition/nutrition'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/starter', name: 'Create New Meal Plan', element: starter },
  { path: '/groceries', name: 'Grocery List', element: groceries },
  { path: '/nutrition', name: 'Nutrition Tracking', element: nutrition },
]
export default routes
