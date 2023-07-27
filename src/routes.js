import React from 'react'

//const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const starter = React.lazy(() => import('./views/starter/starter'))
const groceries = React.lazy(() => import('./views/groceries/groceries'))
const nutrition = React.lazy(() => import('./views/nutrition/nutrition'))
const reviews = React.lazy(() => import('./views/reviews/reviews'))

const routes = [
  //{ path: '/', exact: true, name: 'Home' },
  //{ path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/starter', name: 'Meal Prep', element: starter },
  { path: '/groceries', name: 'Grocery List', element: groceries },
  { path: '/nutrition', name: 'Nutrition', element: nutrition },
  { path: '/reviews', name: 'Reviews', element: reviews },
]
export default routes
