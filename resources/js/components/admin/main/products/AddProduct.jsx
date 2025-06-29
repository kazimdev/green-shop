const AddProduct = () => {
    return (
        <>
            <input type="checkbox" defaultChecked className="toggle" />

            <div className="products-header mb-4">
                <h2 className="inline-block text-2xl font-bold mr-3">
                    Add New Product
                </h2>
            </div>

            <div className="products-form bg-white px-4 py-3 shadow-sm mb-4 rounded-sm">
                <form action="" method="post" className="add-product-form flex">
                    <fieldset className="fieldset product-info w-1/2 p-4">
                        <label htmlFor="product_title" className="label mb-4">
                            <span>Product Title:</span>
                            <input
                                type="text"
                                name="product_title"
                                id="product_title"
                                className="input bg-base-light"
                                placeholder="My product Title"
                            />
                        </label>
                        <label htmlFor="product_desc" className="label mb-4">
                            <span>Product Description:</span>
                            <textarea
                                name="product_desc"
                                id="product_desc"
                                className="textarea bg-base-light"
                                placeholder="My product desc"
                            ></textarea>
                        </label>

                        <label className="label mb-4">
                            <span>Slug</span>
                            <input
                                type="text"
                                className="input bg-base-light"
                                placeholder="my-product-title"
                            />
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
