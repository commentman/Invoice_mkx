import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    invoices: [],
    filter: 'all',
    isFormOpen: false,
    selectedInvoice: null,
}

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        toggleForm: (state) => {
            state.isFormOpen = !state.isFormOpen;
            if (!state.isFormOpen) {
                state.seldectedInvoice = null;
            }
        }
    },
})
export const { toggleForm } = invoiceSlice.actions;

export default invoiceSlice.reducer;