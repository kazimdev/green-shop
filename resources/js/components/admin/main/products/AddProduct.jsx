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
                <form action="" method="post">
                    <label htmlFor="product_title" className="block mb-4">
                        Product Title: <input type="text" name="product_title" id="product_title" />
                    </label>
                    <label htmlFor="product_desc" className="block">
                        Product Description:
                        <textarea name="product_desc" id="product_desc"></textarea>
                    </label>
                </form>
            </div>

        </>
    );
};

export default AddProduct;