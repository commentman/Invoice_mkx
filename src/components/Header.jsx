import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Filter, Plus } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/InvoiceSlice';

const status = ["all", "daft", "paid", "pending"];

// Header แสดงหัวข้อ, จำนวน invoice, ปุ่ม filter และปุ่มสร้าง invoice ใหม่
function Header({ onNewInvoice }) {
    
    const dispatch = useDispatch();
    const { invoices, filter } = useSelector((state) => state.invoices);

    return (
        <div className='flex items-center justify-between'>
            <div>
                {/* แสดงหัวข้อและจำนวน invoice */}
                <h1 className='text-3xl font-bold text-white mb-2'>Invoice</h1>
                <p className='text-slate-400'>{invoices.length === 0 ? "No Invoice" : `These are ${invoices.length} total Invoices`}</p>
            </div>
            <div className='flex items-center space-x-4'>
                {/* เมนู filter สถานะ invoice */}
                <Menu as='div' className='relative'>
                    <Menu.Button className='flex items-center space-x-2 text-white'>
                        <Filter size={20} />
                        <span>Filter By Status</span>
                    </Menu.Button>

                    <Menu.Items className='absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg p-2 z-10'>
                        {status.map((item) => (
                            <MenuItem key={item} className='cursor-pointer hover:bg-slate-700 p-2 rounded-lg'>
                                {({ active }) => (
                                    // ปุ่มเลือก filter สถานะ invoice
                                    <button className={`${active ? 'bg-slate-700' : ""} w-full text-left px-4 py-2 rounded-lg capitalize ${filter === item ? 'text-violet-500' : 'text-white'}`}
                                    onClick={() => dispatch(setFilter(item))}
                                    >
                                        {item}
                                    </button>
                                )}
                            </MenuItem>
                        ))}
                    </Menu.Items>
                </Menu>

                {/* ปุ่มสร้าง invoice ใหม่ เรียก onNewInvoice */}
                <button type='button' className='bg-violet-500 hover:bg-violet-600 text-white px-6 py-2 rounded-full flex items-center space-x-2' onClick={onNewInvoice}>
                    <div className='bg-white rounded-full p-2'>
                        <Plus size={16} className='text-violet-500' />
                    </div>
                    <span>New Invoice</span>
                </button>
            </div>
        </div>
    )
}

export default Header