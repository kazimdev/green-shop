const AddProduct = () => {
    return (
        <>
            <div className="products-header mb-4">
                <h2 className="inline-block text-2xl font-bold mr-3">
                    Add New Product
                </h2>
            </div>

            <div className="products-form bg-white px-4 py-3 shadow-sm mb-4 rounded-sm">
                <form action="" method="post" className="add-product-form flex">
                    <fieldset className="fieldset product-info w-1/2 p-4">
                        <label htmlFor="product_title" className="label mb-4">
                            <span className="text-base">Product Title:</span>
                            <input
                                type="text"
                                name="product_title"
                                id="product_title"
                                className="input bg-base-light"
                                placeholder="My product Title"
                            />
                        </label>
                        <label htmlFor="product_desc" className="label mb-4">
                            <span className="text-base">
                                Product Description:
                            </span>
                            <textarea
                                name="product_desc"
                                id="product_desc"
                                className="textarea bg-base-light"
                                placeholder="My product desc"
                            ></textarea>
                        </label>

                        <label htmlFor="product_slug" className="label mb-4">
                            <span className="text-base">Slug</span>
                            <input
                                type="text"
                                name="product_slug"
                                id="product_slug"
                                className="input bg-base-light"
                                placeholder="my-product-title"
                            />
                        </label>

                        <label htmlFor="product_price" className="label mb-4">
                            <span className="text-base">Price ($)</span>
                            <input
                                id="product_price"
                                name="product_price"
                                type="text"
                                placeholder="0.00"
                                className="input bg-base-light"
                            />
                        </label>

                        <label htmlFor="product_stock" className="label mb-4">
                            <span className="text-base">Stock Quantity</span>
                            <input
                                id="product_stock"
                                name="product_stock"
                                type="text"
                                placeholder="90"
                                className="input bg-base-light"
                            />
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
                                    name="product_categories[]"
                                    value="electronics"
                                    className="checkbox checkbox-accent"
                                />
                                <span className="ml-2">Electronics</span>
                            </label>
                            <label className="block mb-2">
                                <input
                                    type="checkbox"
                                    name="product_categories[]"
                                    value="clothing"
                                    className="checkbox checkbox-accent"
                                />
                                <span className="ml-2">Clothing</span>
                            </label>
                            </div>
                        </div>

                        <label htmlFor="product_status" className="label mb-4">
                            <span className="text-base">Status</span>

                            <select
                                name="product_status"
                                id="product_status"
                                className="select bg-base-light"
                            >
                                <option value="">Select</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </label>

                        <input
                            type="submit"
                            className="text-white btn btn-soft btn-info mt-4 max-w-48"
                            value="Add Product"
                        />
                    </fieldset>

                    <fieldset className="fieldset product-image w-1/2 p-4">
                        Product Image
                    </fieldset>
                </form>
            </div>
        </>
    );
};

export default AddProduct;
