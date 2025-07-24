import { createSlice } from "@reduxjs/toolkit";
import { addDays, format } from "date-fns";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("State");
    if (serializedState === null) {
      return {
        invoices: [],
        filter: "all",
        isFormOpen: false,
        selectedInvoice: null,
      };
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading state:", error);
    return {
      invoices: [],
      filter: "all",
      isFormOpen: false,
      selectedInvoice: null,
    };
  }
};

// initialState กำหนด state เริ่มต้นของ invoice module
const initialState = loadState();

// saveState ใช้สำหรับบันทึก state ลง localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("State", serializedState);
  } catch (error) {
    console.error("Error saving state:", error);
  }
};

// calculateAmount คำนวณยอดรวมของสินค้าใน invoice
const calculateAmount = (items) => {
  return items.reduce((acc, item) => {
    return acc + item.qty * item.price;
  }, 0);
};

// สร้าง slice ด้วย Redux Toolkit
const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    // เพิ่ม invoice ใหม่
    addInvoice: (state, action) => {
      const newInvoice = {
        ...action.payload,
        amount: calculateAmount(action.payload.items), // คำนวณยอดรวม
        status: action.payload.status || "pending",
        dueDate:
          action.payload.dueDate ||
          format(addDays(new Date(), 30), "MM/dd/yyyy"),
      };
      state.invoices.push(newInvoice);
      saveState(state); // บันทึก state ลง localStorage
      state.isFormOpen = false;
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    // เปิด/ปิดฟอร์มสร้าง invoice
    toggleForm: (state) => {
      state.isFormOpen = !state.isFormOpen;
      if (!state.isFormOpen) {
        state.selectedInvoice = null;
      }
    },

    setSelectedInvoice: (state, action) => {
      state.selectedInvoice = action.payload;
      state.isFormOpen = false;
    },
    markAsPaid: (state, action) => {
      const invoice = state.invoices.find((inv) => inv.id === action.payload);

      if (invoice) {
        invoice.status = "paid";
        state.selectedInvoice = null;
        state.isFormOpen = false;
        saveState(state);
      }
    },
  },
});

// export action creators สำหรับใช้ใน component
export const {
  toggleForm,
  addInvoice,
  setFilter,
  setSelectedInvoice,
  markAsPaid,
} = invoiceSlice.actions;

// export reducer สำหรับใช้ใน store
export default invoiceSlice.reducer;
