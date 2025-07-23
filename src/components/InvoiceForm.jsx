import { Trash2 } from 'lucide-react'
import { Plus } from 'lucide-react'
import { X } from 'lucide-react'
import React from 'react'
import { toggleForm } from '../store/InvoiceSlice'
import { useDispatch } from 'react-redux'

const InvoiceForm = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState(() => {
        return {
            id: `INV${Math.floor(Math.random() * 10000)}`,
        }
    })

    return (
        <div className='fixed inset-0 bg-black/50 flex items-start justify-center overflow-y-auto'>
            <div className='bg-slate-800 p-8 rounded-lg w-full max-w-2xl mt-8 nb-8'>
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-2xl font-bold'>Add</h2>
                    <button type='button' onClick={() => dispatch(toggleForm())}>
                        <X size={24} />
                    </button>
                </div>

                <form className='space-y-6'>
                    <div className='space-y-4'>
                        <h3 className='text-violet-500 font-bold'>Bill Table</h3>
                        <input
                            type='text'
                            placeholder='Street Address'
                            required
                            className='w-full bg-slate-900 rounded-lg p-3' />
                    </div>

                    <div className='grid grid-cols-3 gap-4'>
                        <input
                            type='text'
                            placeholder='City'
                            className='w-full bg-slate-900 rounded-lg p-3'
                        />
                        <input
                            type='text'
                            placeholder='post code'
                            className='w-full bg-slate-900 rounded-lg p-3'
                        />
                        <input
                            type='text'
                            placeholder='Country'
                            className='w-full bg-slate-900 rounded-lg p-3'
                        />
                    </div>

                    <div className='space-y-4'>
                        <h3 className='text-violet-500 font-bold'>Bill to</h3>
                        <input
                            type='text'
                            placeholder='Client Name'
                            required
                            className='w-full bg-slate-900 rounded-lg p-3'
                        />
                        <input
                            type='email'
                            placeholder='Client Email'
                            required
                            className='w-full bg-slate-900 rounded-lg p-3'
                        />
                        <input
                            type='text'
                            placeholder='Street Address'
                            required
                            className='w-full bg-slate-900 rounded-lg p-3'
                        />
                    </div>

                    <div className='grid grid-cols-3 gap-4'>
                        <input
                            type='text'
                            placeholder='City'
                            className='w-full bg-slate-900 rounded-lg p-3'
                        />
                        <input
                            type='text'
                            placeholder='post code'
                            className='w-full bg-slate-900 rounded-lg p-3'
                        />
                        <input
                            type='text'
                            placeholder='Country'
                            className='w-full bg-slate-900 rounded-lg p-3'
                        />
                    </div>

                    <div className='space-y-4'>
                        <div className='grid grid-cols-2 gap-4'>
                            <input type='date' className='bg-slate-900 rounded-lg p-3' />
                            <select className='bg-slate-900 rounded-lg p-3' required>
                                <option>Net 30 Days</option>
                                <option>Net 60 Days</option>
                            </select>
                        </div>
                        <input
                            type='text'
                            placeholder='Invoice Description'
                            required
                            className='w-full bg-slate-900 rounded-lg p-3' />
                    </div>

                    <div className='space-y-4'>
                        <h3>Item list</h3>
                        <div className='grid grid-cols-12 gap-4 item-center'>
                            <input
                                type='text'
                                placeholder='Item Name'
                                className='bg-slate-900 rounded-lg p-3 col-span-5' />
                            <input
                                type='Number'
                                placeholder='Qty'
                                className='bg-slate-900 rounded-lg p-3 col-span-2'
                                min='1'
                                required />
                            <input
                                type='Number'
                                placeholder='price'
                                className='bg-slate-900 rounded-lg p-3 col-span-2'
                                min='0'
                                step='0.01'
                                required />
                            <div className='col-span-2 text-right'>Total Amount</div>
                            <button type='button' className='text-slate-400 hover:text-red-500'>
                                <Trash2 size={20} />
                            </button>
                        </div>
                        <button
                            type='button'
                            className='w-full bg-slate-700 hover:bg-slate-600 rounded-lg p-3 flex items-center justify-center space-x-2'>
                            <Plus size={20} />
                            <span>Add New Item</span>
                        </button>
                    </div>

                    <div className='flex justify-end space-x-4'>
                        <button
                            type='button'
                            className='bg-violet-500 hover:bg-violet-600 rounded-full px-6 py-3 text-white'>
                            Cancel
                        </button>
                        <button
                            type='button'
                            className='bg-violet-500 hover:bg-violet-600 rounded-full px-6 py-3 text-white'>
                            Create Ivoice
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default InvoiceForm
