import { ChevronRight } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format, parseISO } from 'date-fns';
import { setSelectedInvoice } from '../store/InvoiceSlice';

// InvoiceList ใช้สำหรับแสดงรายการ invoice (ปัจจุบันเป็น static แต่สามารถเชื่อมกับ Redux ได้)
function InvoiceList() {
    const dispatch = useDispatch();
    const { invoices, filter } = useSelector((state) => state.invoices);

    const filteredInvoices = invoices.filter((invoice) => {
        if (filter === 'all') return true;
        return invoice.status === filter;
    })

    if (filteredInvoices.length === 0) {
        return (
        <div className='text-center py-12'>
            <p className='text-xl text-slate-400'> No Invoices </p>
        </div>
        )
    }

    const handleInvoiceClick = (invoice) => {
        dispatch(setSelectedInvoice(invoice));
    }

    const formatDate = (date) => {
        try {
            return format(parseISO(date), 'MM/dd/yyyy');
        } catch (error) {
            console.error('Error formatting date:', error);
        }
    }

    return (
        // กล่องหลักของรายการ invoice
        <div className='space-y-4'>
            {filteredInvoices.map((invoice) => (
                <div className='bg-slate-800 rounded-lg p-6 my-5 flex items-center justify-between hover:bg-slate-700 transition-colors duration-200 cursor-pointer' key={invoice.id} onClick={() => handleInvoiceClick(invoice)}>
                    <div className='flex items-center space-x-6'>
                        <span className='text-slate-400'>{invoice.id}</span>
                        <span className='text-slate-400'>Due {formatDate(invoice.dueDate)}</span>
                        <span className='text-slate-300'>{invoice.clientName}</span>
                    </div>
                    {/* invoice body */}
                    <div className='flex items-center space-x-6'>
                        <span className='text-2xl font-bold'>${invoice.amount?.toFixed(2) || '0.00'}</span>

                        <div className={`px-4 py-2 rounded-lg flex items-center space-x-2 
                        ${invoice.status === 'paid' ? 'bg-green-900/20 text-green-50'
                                : invoice.status === 'pending' ? 'bg-orange-900/20 text-orange-500'
                                    : 'bg-slate-700/50 text-slate-400'
                            }`}>

                            <div className={`w-2 h-2 rounded-full ${invoice.status === 'paid'
                            ? 'bg-green-500' : invoice.status === 'pending' ? 'bg-orange-500' :'bg-slate-400'
                            }`}>
                        </div>
                        <span className='capitalize'>{invoice.status}</span>
                    </div>
                    <ChevronRight className='text-violet-500' />
                </div>
            </div>
    ))
}
        </div >
    )
}

export default InvoiceList
