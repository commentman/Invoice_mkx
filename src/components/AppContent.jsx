// AppContent เป็นคอมโพเนนต์หลักที่รวม Header, InvoiceList และ InvoiceForm
import React from 'react'
import Header from './Header'
import InvoiceList from './InvoiceList'
import InvoiceForm from './InvoiceForm'
import InvoiceDetails from './InvoiceDetails'
import { useDispatch, useSelector } from 'react-redux'
import { toggleForm } from '../store/InvoiceSlice.js'

function AppContent() {
  // สร้าง dispatch function สำหรับส่ง action ไปยัง Redux store
  const dispatch = useDispatch();
  // ดึงค่า isFormOpen จาก state (slice invoices) เพื่อตรวจสอบว่าควรแสดงฟอร์มหรือไม่
  const { isFormOpen, selectedInvoice } = useSelector((state) => state.invoices);

  // ฟังก์ชันสำหรับเปิด/ปิดฟอร์มสร้าง invoice ใหม่
  const handleNewInvoice = () => {
    dispatch(toggleForm());
  }

  return (
    // โครงสร้างหลักของหน้า กำหนดพื้นหลังและขนาด
    <div className='bg-slate-900 text-white min-h-screen'>
      <div className='max-w-5xl mx-auto py-12 px-4'>
        <Header onNewInvoice={handleNewInvoice} />
        {selectedInvoice ? (<InvoiceDetails invoice={selectedInvoice} />
        ) : (
          <InvoiceList />
        )}
        {isFormOpen && <InvoiceForm />}
      </div>
    </div>
  )
}

export default AppContent
