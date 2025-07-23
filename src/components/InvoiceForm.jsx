import { X, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { toggleForm } from "../store/InvoiceSlice";
import { useDispatch } from "react-redux";
import { format, addDays } from "date-fns";

const InvoiceForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(() => {
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

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: "", qty: 0, price: 0, total: 0 }],
    });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;

    if (field === "qty" || field === "price") {
      const qty = field === "qty" ? value : newItems[index].qty;
      const price = field === "price" ? value : newItems[index].price;
      newItems[index].total = qty * price;
    }
    setFormData({ ...formData, items: newItems });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center overflow-y-auto">
      <div className="bg-slate-800 p-8 rounded-lg w-full max-w-2xl mt-8 nb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add</h2>
          <button type="button" onClick={() => dispatch(toggleForm())}>
            <X size={24} />
          </button>
        </div>

        <form className="space-y-6">
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
                <div className="col-span-2 text-right">${item.total.toFixed(2)}</div>
                <button
                  type="button"
                  className="text-slate-400 hover:text-red-500"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              className="w-full bg-slate-700 hover:bg-slate-600 rounded-lg p-3 flex items-center justify-center space-x-2"
              onClick={addItem}
            >
              <Plus size={20} />
              <span>Add New Item</span>
            </button>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-violet-500 hover:bg-violet-600 rounded-full px-6 py-3 text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-violet-500 hover:bg-violet-600 rounded-full px-6 py-3 text-white"
            >
              Create Ivoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
