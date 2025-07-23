import React from 'react'
import Header from './Header'
import InvoiceList from './InvoiceList'
import InvoiceForm from './InvoiceForm'
import { useDispatch, useSelector } from 'react-redux'
import { toggleForm } from '../store/InvoiceSlice.js'

function AppContent() {
  const dispatch = useDispatch();
  const { isFormOpen } = useSelector((state) => state.invoices);

  const handleNewInvoice = () => {
    dispatch(toggleForm());
  }

  return (
    <div className='bg-slate-900 text-white min-h-screen'>
      <div className='max-w-5xl mx-auto py-12 px-4'>
        <Header onNewInvoice={handleNewInvoice}/>
        <InvoiceList />
        {isFormOpen && <InvoiceForm />}
      </div>
    </div>
  )
}

export default AppContent
