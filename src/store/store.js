import { configureStore } from '@reduxjs/toolkit'
import InvoiceReducer from './InvoiceSlice'

// สร้าง Redux store โดยใช้ configureStore จาก Redux Toolkit
export const store = configureStore ({
    reducer: {
        // กำหนด slice invoices ให้ใช้ InvoiceReducer
        invoices: InvoiceReducer,
    }
})