import React from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "../../../auth/axios";
import Loader from "../../../components/ui/Loader";
import Alert from "../../../components/ui/Alert";
import useUsers from "../../../hooks/useUsers";
import useProducts from "../../../hooks/useProducts";

const AddOrder = () => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    const [submitText, setSubmitText] = React.useState("Create Order");

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const [users, setUsers] = useUsers();

    const [products, setProducts] = useProducts();

    console.log(products);

    const selectableProducts = products.length
        ? products
              .filter((product) => product.price && product.stock != 0)
              .map((product) => ({
                  value: product.id,
                  label: product.title,
              }))
        : [];

    const [items, setItems] = React.useState([
        { product_id: null, quantity: 1 },
    ]);

    const handleItemChange = (index, field, value) => {
        setItems((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };

    const handleAddItem = () => {
        setItems((prev) => [...prev, { product_id: null, quantity: 1 }]);
    };

    const handleRemoveItem = (index) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (data) => {
        setLoading(true);
        data.items = items.filter(
            (item) => item.product_id && item.quantity > 0
        );

        try {
            await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
                withCredentials: true,
            });

            const response = await axios.post(
                "http://127.0.0.1:8000/api/orders",
                data,
                {
                    withCredentials: true,
                }
            );

            setSuccess(true);
            setLoading(false);
            reset();
            setItems([{ product_id: null, quantity: 1 }]);
            setSubmitText("Update Order");
        } catch (err) {
            console.log(err);
            setSuccess(false);
            setLoading(false);
        }
    };

    return (
        <>
            <Link
                to="/dashboard/orders"
                className="text-brandGreen-900  mb-3 flex items-center"
            >
                <img
                    src="/icons/chevron-left.svg"
                    alt="Back"
                    width={18}
                    height={18}
                />
                Orders
            </Link>

            <div className="orders-form bg-white px-4 py-3 shadow-sm mb-4 rounded-sm">
                <h2 className="block text-2xl font-bold p-3 mb-2">
                    Add New Order
                </h2>

                <form
                    action=""
                    method="post"
                    className="item-add-form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex gap-6">
                        <fieldset className="fieldset order-info w-3/4">
                            <label
                                htmlFor="items"
                                className="label mb-4 items-baseline"
                            >
                                <span className="text-base">Items:</span>

                                <div className="items-holder">
                                    {items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-2 mb-2"
                                        >
                                            <Select
                                                options={selectableProducts}
                                                value={
                                                    selectableProducts.find(
                                                        (opt) =>
                                                            opt.value ===
                                                            item.product_id
                                                    ) || null
                                                }
                                                onChange={(opt) =>
                                                    handleItemChange(
                                                        idx,
                                                        "product_id",
                                                        opt ? opt.value : null
                                                    )
                                                }
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline"
                                                onClick={() =>
                                                    handleItemChange(
                                                        idx,
                                                        "quantity",
                                                        Math.max(
                                                            item.quantity - 1,
                                                            1
                                                        )
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
                                                        Math.max(
                                                            Number(
                                                                e.target.value
                                                            ),
                                                            1
                                                        )
                                                    )
                                                }
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline"
                                                onClick={() =>
                                                    handleItemChange(
                                                        idx,
                                                        "quantity",
                                                        item.quantity + 1
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                            {items.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-error"
                                                    onClick={() =>
                                                        handleRemoveItem(idx)
                                                    }
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-success mt-2"
                                        onClick={handleAddItem}
                                    >
                                        + Add Item
                                    </button>
                                </div>
                            </label>

                            <label htmlFor="status" className="label mb-4">
                                <span className="text-base">Order Status:</span>

                                <div className="w-3/4">
                                    <select
                                        id="status"
                                        className="select bg-base-light"
                                        {...register("status")}
                                        defaultValue="pending"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">
                                            Processing
                                        </option>
                                        <option value="on_hold">On hold</option>
                                        <option value="paid">Paid</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                        <option value="cancelled">
                                            Cancelled
                                        </option>
                                    </select>
                                </div>
                            </label>

                            <label htmlFor="customer_id" className="label mb-4">
                                <span className="text-base">Customer:</span>

                                <div className="w-3/4">
                                    <select
                                        id="customer_id"
                                        className="select bg-base-light"
                                        {...register("customer_id")}
                                        defaultValue="active"
                                    >
                                        {users.length &&
                                            users.map((user) => {
                                                return (
                                                    <option
                                                        key={user.id}
                                                        value={user.id}
                                                    >
                                                        {user.name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                            </label>

                            <label
                                htmlFor="payment_method"
                                className="label mb-4"
                            >
                                <span className="text-base">
                                    Payment Method:
                                </span>

                                <div className="w-3/4">
                                    <select
                                        id="payment_method"
                                        className="select bg-base-light"
                                        {...register("payment_method")}
                                        defaultValue="cod"
                                    >
                                        <option value="cod">
                                            Cash on Delivery
                                        </option>
                                        <option value="card">Card</option>
                                    </select>
                                </div>
                            </label>
                        </fieldset>
                    </div>

                    <input
                        type="submit"
                        className="text-white btn btn-soft btn-info my-4 max-w-48"
                        value={submitText}
                    />
                </form>

                {loading && <Loader />}
                {success && (
                    <Alert type="success" message="Order added successfully!" />
                )}
            </div>
        </>
    );
};

export default AddOrder;
