import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../auth/axios";
import Loader from "../../../ui/Loader";
import Alert from "../../../ui/Alert";

const AddProduct = () => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    // Submit handler
    const onSubmit = async (data) => {
        setLoading(true);

        console.log(data);

        await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', { withCredentials: true });
        
        try {
            await axios.post("http://127.0.0.1:8000/api/products", data, {
                withCredentials: true,
            });

            setSuccess(true);
            setLoading(false);
            reset();

        } catch (err) {

            setSuccess(false);
            setLoading(false);

            if (err.response?.status === 422) {
                const laravelErrors = err.response.data.errors;
                Object.entries(laravelErrors).forEach(([field, messages]) => {
                    setValue(field, data[field]); // reset field value to keep it
                });

            } else {
                console.error("Product create error", err);
            }
        }
    };

    return (
        <>
            <div className="products-header mb-4">
                <h2 className="inline-block text-2xl font-bold mr-3">
                    Add New Product
                </h2>
            </div>

            <div className="products-form bg-white px-4 py-3 shadow-sm mb-4 rounded-sm">
                <form
                    action=""
                    method="post"
                    className="add-product-form flex"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <fieldset className="fieldset product-info w-1/2 p-4">
                        <label htmlFor="title" className="label mb-4">
                            <span className="text-base">Product Title:</span>

                            <div className="w-3/4">
                                <input
                                    type="text"
                                    {...register("title", {
                                        required: "Product title is required",
                                    })}
                                    id="title"
                                    className="input bg-base-light w-full"
                                    placeholder="My Product Title"
                                />
                                {errors.title && (
                                    <p style={{ color: "red" }}>
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>
                        </label>

                        <label htmlFor="description" className="label mb-4">
                            <span className="text-base">
                                Product Description:
                            </span>
                            <div className="w-3/4">
                                <textarea
                                    id="description"
                                    className="textarea bg-base-light w-full"
                                    placeholder="My product desc"
                                    {...register("description")}
                                ></textarea>
                                {errors.description && (
                                    <p style={{ color: "red" }}>
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>
                        </label>

                        <label htmlFor="slug" className="label mb-4">
                            <span className="text-base">Slug</span>
                            <div className="w-3/4">
                                <input
                                    type="text"
                                    id="slug"
                                    className="input bg-base-light w-full"
                                    placeholder="my-product-title"
                                    {...register("slug")}
                                />
                            </div>
                        </label>

                        <label htmlFor="price" className="label mb-4">
                            <span className="text-base">Price ($)</span>
                            <div className="w-3/4">
                                <input
                                    id="price"
                                    type="text"
                                    placeholder="e.g, $40.00"
                                    className="input bg-base-light w-full"
                                    {...register("price")}
                                />
                            </div>
                        </label>

                        <label htmlFor="stock" className="label mb-4">
                            <span className="text-base">Stock Quantity</span>
                            <div className="w-3/4">
                                <input
                                    id="stock"
                                    type="text"
                                    placeholder="e.g, 100"
                                    className="input bg-base-light w-full"
                                    {...register("stock")}
                                />
                            </div>
                        </label>

                        {/* <label htmlFor="on_sale">
                            <span className="text-base">On Sale</span>
                            <input
                                type="checkbox"
                                id="on_sale"
                                defaultChecked
                                className="toggle border-customGray-400 bg-customGray-400"
                            />
                        </label> */}

                        <div className="product-categories flex gap-10 mb-4">
                            <span className="text-base">
                                Product Categories
                            </span>

                            <div className="labels">
                                <label className="block mb-2">
                                    <input
                                        type="checkbox"
                                        value="electronics"
                                        className="checkbox checkbox-accent"
                                    />
                                    <span className="ml-2">Electronics</span>
                                </label>
                                <label className="block mb-2">
                                    <input
                                        type="checkbox"
                                        value="clothing"
                                        className="checkbox checkbox-accent"
                                    />
                                    <span className="ml-2">Clothing</span>
                                </label>
                            </div>
                        </div>

                        <label htmlFor="status" className="label mb-4">
                            <span className="text-base">Status</span>

                            <select
                                id="status"
                                className="select bg-base-light"
                                {...register("status")}
                                defaultValue="active"
                            >
                                <option value="">Select</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </label>

                        <input
                            type="submit"
                            className="text-white btn btn-soft btn-info my-4 max-w-48"
                            value="Add Product"
                        />

                    </fieldset>

                    <fieldset className="fieldset product-image w-1/2 p-4">
                        Product Image
                    </fieldset>
                </form>
                
                {loading && <Loader /> }
                {success ? <Alert
                    type={success ? "success" : "error"}
                    message={
                        success
                            ? "Product added successfully!"
                            : "Failed to add product."
                    }
                /> : ''}
            </div>
        </>
    );
};

export default AddProduct;
