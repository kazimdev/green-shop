import React, { useState } from "react";
import Select from "react-select";
import useProducts from "../../hooks/useProducts";

const AddItem = ({ items, setItems }) => {
        const [products] = useProducts();
        const selectableProducts = products.length
        ? products
              .filter((product) => product.price && product.stock > 0)
              .map((product) => ({
                  value: product.id,
                  label: product.title,
              }))
        : [];

    const handleItemChange = (index, field, value) => {
        setItems((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };

    const handleRemoveItem = (index) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    };

    return items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2 mb-2">
            <Select
                options={selectableProducts}
                value={
                    selectableProducts.find(
                        (opt) => opt.value === item.product_id
                    ) || null
                }
                onChange={(opt) =>
                    handleItemChange(idx, "product_id", opt ? opt.value : null)
                }
            />
            <span>${item.price}</span>
            <button
                type="button"
                className="btn btn-sm btn-outline"
                onClick={() =>
                    handleItemChange(
                        idx,
                        "quantity",
                        Math.max(item.quantity - 1, 1)
                    )
                }
            >
                -
            </button>
            <input
                type="number"
                min={1}
                className="input input-sm bg-slate-100 w-16 text-center"
                value={item.quantity}
                onChange={(e) =>
                    handleItemChange(
                        idx,
                        "quantity",
                        Math.max(Number(e.target.value), 1)
                    )
                }
            />
            <button
                type="button"
                className="btn btn-sm btn-outline"
                onClick={() =>
                    handleItemChange(idx, "quantity", item.quantity + 1)
                }
            >
                +
            </button>

            <button
                type="button"
                className="btn btn-sm btn-error"
                onClick={() => handleRemoveItem(idx)}
            >
                ×
            </button>
        </div>
    ));
};

export default AddItem;
