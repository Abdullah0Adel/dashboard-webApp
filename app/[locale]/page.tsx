import React from 'react'
import SalesChart from '../components/hero/graph/BarChart'
import Stockalert from '../components/hero/stockalert/Stockalert'
import Recentorders from '../components/hero/orders/Recentorders'

function page() {
  return (
    <div className="px-8 py-4  flex flex-col items-center justify-center w-full">
      <SalesChart />
      <Stockalert />
      <Recentorders />
    </div>
  )
}

export default page
