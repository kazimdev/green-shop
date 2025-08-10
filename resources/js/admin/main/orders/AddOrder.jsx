import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const AddOrder = () => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

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

                <form action="" method="post" className="item-add-form">
                    <div className="flex gap-6">
                        <fieldset className="fieldset order-info w-1/2">
                            <label htmlFor="status" className="label mb-4">
                                <span className="text-base">Order Status:</span>

                                <div className="w-3/4">
                                    <select
                                        id="status"
                                        className="select bg-base-light"
                                        {...register("status")}
                                        defaultValue="active"
                                    >
                                        <option value="pending" selected>
                                            Pending
                                        </option>
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

                            <label htmlFor="customer" className="label mb-4">
                                <span className="text-base">Customer:</span>

                                <div className="w-3/4">
                                    <select
                                        id="customer"
                                        className="select bg-base-light"
                                        {...register("customer")}
                                        defaultValue="active"
                                    >
                                        <option value="guest" selected>
                                            Guest
                                        </option>
                                    </select>
                                </div>
                            </label>
                        </fieldset>
                    </div>

                    <input
                        type="submit"
                        className="text-white btn btn-soft btn-info my-4 max-w-48"
                        value="Create Order"
                    />
                </form>
            </div>
        </>
    );
};

export default AddOrder;
