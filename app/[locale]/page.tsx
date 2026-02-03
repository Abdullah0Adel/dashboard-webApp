import React from 'react'
import SalesChart from '../components/hero/graph/BarChart'
import Stockalert from '../components/hero/stockalert/Stockalert'
import Recentorders from '../components/hero/orders/Recentorders'

function page() {
  return (
    <div className="px-6 py-4 w-full max-w-7xl">
      <SalesChart />
      <Stockalert />
      <Recentorders />
    </div>
  )
}

export default page
