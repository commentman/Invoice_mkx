import React from 'react'
import Header from './Header'
import InvoiceList from './InvoiceList'

function AppContent() {
  return (
    <div className='bg-slate-900 text-white min-h-screen'>
      <div className='max-w-5xl mx-auto py-12 px-4'>
        <Header />
        <InvoiceList />
      </div>
    </div>
  )
}

export default AppContent
