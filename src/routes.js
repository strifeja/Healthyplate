import React from 'react'

//const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const starter = React.lazy(() => import('./views/starter/starter'))
const groceries = React.lazy(() => import('./views/groceries/groceries'))
const nutrition = React.lazy(() => import('./views/nutrition/nutrition'))
const reviews = React.lazy(() => import('./views/reviews/reviews'))
const bmr = React.lazy(() => import('./views/nutrition/bmr'))
const calorie = React.lazy(() => import('./views/nutrition/calorie'))
const settings = React.lazy(() => import('./views/settings/settings'))

const routes = [
  //{ path: '/', exact: true, name: 'Home' },
  //{ path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/starter', name: 'Meal Prep', element: starter },
  { path: '/groceries', name: 'Grocery List', element: groceries },
  { path: '/nutrition', name: 'Nutrition', element: nutrition },
  { path: '/reviews', name: 'Reviews', element: reviews },
  { path: '/bmr', name: 'BMR Tracker', element: bmr },
  { path: '/calorie', name: 'Calorie Tracker', element: calorie },
  { path: '/settings', name: 'Settings and Support', element: settings },
]
export default routes
