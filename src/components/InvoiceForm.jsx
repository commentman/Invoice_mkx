import { X, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { addInvoice, toggleForm, updateInvoice } from "../store/InvoiceSlice";
import { useDispatch } from "react-redux";
import { format, addDays } from "date-fns";

// InvoiceForm เป็นฟอร์มสำหรับสร้าง invoice ใหม่
const InvoiceForm = ({ invoice }) => {
  // ใช้ useDispatch เพื่อเรียก action ไปยัง Redux store
  const dispatch = useDispatch();

  // สร้าง state สำหรับเก็บข้อมูลฟอร์ม โดยใช้ useState
  const [formData, setFormData] = useState(() => {
    if (invoice) {
      return { ...invoice };
    }

    return {
      id: `INV${Math.floor(Math.random() * 10000)}`,
      status: "pending",
      billFrom: { streetAddress: "", city: "", postCode: "" },
      billTo: {
        clientEmail: "",
        streetAddress: "",
        city: "",
        postCode: "",
        country: "",
      },
      clientName: "",
      items: [],
      paymentTerms: "Net 30 Days",
      projectDescription: "",
      invoiceDate: format(new Date(), "yyyy-mm-dd"),
      dueDate: format(addDays(new Date(), 30), "yyyy-mm-dd"),
      amount: 0,
    };
  });

  useEffect(() => {
    if (invoice) {
      setFormData(invoice);
    }
  }, [invoice]);

  // เมื่อ submit ฟอร์ม จะ dispatch action เพื่อเพิ่ม invoice ใหม่
  const handleSubmit = (e) => {
    e.preventDefault();
    if (invoice) {
      dispatch(updateInvoice(formData));
    } else {
      dispatch(addInvoice(formData));
    }
  }

  // เพิ่ม item ใหม่ในรายการสินค้า
  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: "", qty: 0, price: 0, total: 0 }],
    });
  };

  // อัปเดตข้อมูลของแต่ละ item
  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;

    // คำนวณ total ของแต่ละ item
    if (field === "qty" || field === "price") {
      const qty = field === "qty" ? value : newItems[index].qty;
      const price = field === "price" ? value : newItems[index].price;
      newItems[index].total = qty * price;
    }
    setFormData({ ...formData, items: newItems });
  };

  // ลบ item ออกจากรายการ
  const removeItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    })
  }

  return (
    // กล่องฟอร์มแบบ modal
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center overflow-y-auto">
      <div className="bg-slate-800 p-8 rounded-lg w-full max-w-2xl mt-8 nb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add</h2>
          {/* ปุ่มปิดฟอร์ม */}
          <button type="button" onClick={() => dispatch(toggleForm())}>
            <X size={24} />
          </button>
        </div>

        {/* ฟอร์มกรอกข้อมูล invoice */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* ส่วนกรอกข้อมูลผู้ส่งบิล */}
          <div className="space-y-4">
            <h3 className="text-violet-500 font-bold">Bill Table</h3>
            <input
              type="text"
              placeholder="Street Address"
              value={formData.billFrom.streetAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billFrom: {
                    ...formData.billFrom,
                    streetAddress: e.target.value,
                  },
                })
              }
              required
              className="w-full bg-slate-900 rounded-lg p-3"
            />
          </div>

          {/* กรอกข้อมูลเมือง รหัสไปรษณีย์ ประเทศ */}
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="City"
              className="w-full bg-slate-900 rounded-lg p-3"
              value={formData.billFrom.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billFrom: {
                    ...formData.billFrom,
                    city: e.target.value,
                  },
                })
              }
            />
            <input
              type="text"
              placeholder="post code"
              className="w-full bg-slate-900 rounded-lg p-3"
              value={formData.billFrom.postCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billFrom: {
                    ...formData.billFrom,
                    postCode: e.target.value,
                  },
                })
              }
            />
            <input
              type="text"
              placeholder="Country"
              className="w-full bg-slate-900 rounded-lg p-3"
              value={formData.billFrom.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billFrom: {
                    ...formData.billFrom,
                    country: e.target.value,
                  },
                })
              }
            />
          </div>

          {/* ส่วนกรอกข้อมูลผู้รับบิล */}
          <div className="space-y-4">
            <h3 className="text-violet-500 font-bold">Bill to</h3>
            <input
              type="text"
              placeholder="Client Name"
              required
              className="w-full bg-slate-900 rounded-lg p-3"
              value={formData.clientName}
              onChange={(e) =>
                setFormData({ ...formData, clientName: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Client Email"
              required
              className="w-full bg-slate-900 rounded-lg p-3"
              value={formData.billTo.clientEmail}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: {
                    ...formData.billTo,
                    clientEmail: e.target.value,
                  },
                })
              }
            />
            <input
              type="text"
              placeholder="Street Address"
              required
              className="w-full bg-slate-900 rounded-lg p-3"
              value={formData.billTo.streetAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: {
                    ...formData.billTo,
                    streetAddress: e.target.value,
                  },
                })
              }
            />
          </div>

          {/* กรอกข้อมูลเมือง รหัสไปรษณีย์ ประเทศ ของผู้รับบิล */}
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="City"
              className="w-full bg-slate-900 rounded-lg p-3"
              value={formData.billTo.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: {
                    ...formData.billTo,
                    city: e.target.value,
                  },
                })
              }
            />
            <input
              type="text"
              placeholder="post code"
              className="w-full bg-slate-900 rounded-lg p-3"
              value={formData.billTo.postCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: {
                    ...formData.billTo,
                    postCode: e.target.value,
                  },
                })
              }
            />
            <input
              type="text"
              placeholder="Country"
              className="w-full bg-slate-900 rounded-lg p-3"
              value={formData.billTo.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: {
                    ...formData.billTo,
                    country: e.target.value,
                  },
                })
              }
            />
          </div>

          {/* กรอกวันที่และเงื่อนไขการชำระเงิน */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                className="bg-slate-900 rounded-lg p-3"
                value={formData.invoiceDate}
                onChange={(e) => {
                  const newDate = e.target.value;
                  setFormData({
                    ...formData,
                    invoiceDate: newDate,
                    dueDate: format(
                      addDays(new Date(newDate), 30),
                      "yyyy-mm-dd"
                    ),
                  });
                }}
              />
              <select
                className="bg-slate-900 rounded-lg p-3"
                required
                value={formData.paymentTerms}
                onChange={(e) => {
                  setFormData({ ...formData, paymentTerms: e.target.value });
                }}
              >
                <option>Net 30 Days</option>
                <option>Net 60 Days</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Project Description"
              required
              className="w-full bg-slate-900 rounded-lg p-3"
              value={formData.projectDescription}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  projectDescription: e.target.value,
                });
              }}
            />
          </div>

          {/* รายการสินค้า/บริการ */}
          <div className="space-y-4">
            <h3>Item list</h3>
            {formData.items.map((item, index) => (
              <div className="grid grid-cols-12 gap-4 item-center" key={index}>
                <input
                  type="text"
                  placeholder="Item Name"
                  className="bg-slate-900 rounded-lg p-3 col-span-5"
                  value={item.name}
                  onChange={(e) => updateItem(index, "name", e.target.value)}
                />
                <input
                  type="Number"
                  placeholder="Qty"
                  className="bg-slate-900 rounded-lg p-3 col-span-2"
                  min="1"
                  required
                  value={item.qty}
                  onChange={(e) => updateItem(index, "qty", parseInt(e.target.value) || 0)}
                />
                <input
                  type="Number"
                  placeholder="price"
                  className="bg-slate-900 rounded-lg p-3 col-span-2"
                  min="0"
                  step="0.01"
                  required
                  value={item.price}
                  onChange={(e) => updateItem(index, "price", parseFloat(e.target.value) || 0)}
                />
                {/* แสดงราคารวมของแต่ละรายการ */}
                <div className="col-span-2 text-right">${item.total.toFixed(2)}</div>
                {/* ปุ่มลบรายการ */}
                <button
                  type="button"
                  className="text-slate-400 hover:text-red-500"
                  onClick={() => removeItem(index)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            {/* ปุ่มเพิ่มรายการสินค้า */}
            <button
              type="button"
              className="w-full bg-slate-700 hover:bg-slate-600 rounded-lg p-3 flex items-center justify-center space-x-2"
              onClick={addItem}
            >
              <Plus size={20} />
              <span>Add New Item</span>
            </button>
          </div>

          {/* ปุ่มยกเลิกและสร้าง invoice */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-violet-500 hover:bg-violet-600 rounded-full px-6 py-3 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-violet-500 hover:bg-violet-600 rounded-full px-6 py-3 text-white"
            >
              {invoice ? "Save Changes" : "Create Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
