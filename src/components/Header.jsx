import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Filter, Plus } from 'lucide-react'

function Header() {
    return (
        <Header className='flex items-center justify-between'>
            <div>
                <h1 className='text-3xl font-bold text-white mb-2'>Invoice</h1>
                <p className='text-slate-400'>0 invoices</p>
            </div>
            <div className='flex items-center space-x-4'>
                <Menu as='div' className='relative'>
                    <Menu.Button className='flex items-center space-x-2 text-white'>
                        <Filter size={20} />
                        <span>Filter By Status</span>
                    </Menu.Button>

                    <Menu.Items className='absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg p-2 z-10'>
                        <Menu.Item>
                            <button className='w-full text-left px-4 py-2 rounded-lg capitalize'>Status</button>
                        </Menu.Item>
                    </Menu.Items>
                </Menu>

                <button type='button' className='bg-violet-500 hover:bg-violet-600 text-white px-6 py-2 rounded-full flex items-center space-x-2'>
                    <div className='bg-white rounded-full p-2'>
                        <Plus size={16} className='text-violet-500' />
                    </div>
                    <span>New Invoice</span>
                </button>
            </div>
        </Header>
    )
}

export default Header