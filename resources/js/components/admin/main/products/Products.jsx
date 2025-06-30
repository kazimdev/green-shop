import { Link } from "react-router-dom";

const Products = () => {
    return (
        <>
            <div className="products-header mb-4">
                <h2 className="inline-flex items-center gap-3 text-2xl font-bold mr-3">
                    Products
                </h2>

                <Link
                    to="/dashboard/products/add"
                    className="bg-blue-500 px-4 py-2 rounded-full text-white"
                >
                    Add New Product
                </Link>
            </div>

            <div className="products-filters bg-white px-4 py-3 shadow-sm mb-4 rounded-sm">
                Product Filters
            </div>

            <div className="products-list  bg-white px-4 py-3 shadow-sm mb-4 rounded-sm">
                <table className="table-auto w-full text-left">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th className="actions text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#ID: 1026</td>
                            <td>
                                <img src="" alt="" />
                            </td>
                            <td>Product Title</td>
                            <td>Simple</td>
                            <td>$50.00</td>
                            <td>100</td>
                            <td>Published</td>
                            <td className="actions text-right">
                                <button className="edit mr-3">
                                    <img
                                        src="/icons/edit.svg"
                                        alt="Edit"
                                        width={16}
                                        height={16}
                                    />
                                </button>
                                <button className="preview mr-3">
                                    <img
                                        src="/icons/preview.svg"
                                        alt="Preview"
                                        width={16}
                                        height={16}
                                    />
                                </button>
                                <button className="delete">
                                    <img
                                        src="/icons/delete.svg"
                                        alt="Delete"
                                        width={16}
                                        height={16}
                                    />
                                </button>
                            </td>
                        </tr>

                        <tr>
                            <td>#ID: 1027</td>
                            <td>
                                <img src="" alt="" />
                            </td>
                            <td>Product Title</td>
                            <td>Simple</td>
                            <td>$50.00</td>
                            <td>100</td>
                            <td>Published</td>
                            <td className="actions text-right">
                                <button className="edit mr-3">
                                    <img
                                        src="/icons/edit.svg"
                                        alt="Edit"
                                        width={16}
                                        height={16}
                                    />
                                </button>
                                <button className="preview mr-3">
                                    <img
                                        src="/icons/preview.svg"
                                        alt="Preview"
                                        width={16}
                                        height={16}
                                    />
                                </button>
                                <button className="delete">
                                    <img
                                        src="/icons/delete.svg"
                                        alt="Delete"
                                        width={16}
                                        height={16}
                                    />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>#ID: 1028</td>
                            <td>
                                <img src="" alt="" />
                            </td>
                            <td>Product Title</td>
                            <td>Simple</td>
                            <td>$50.00</td>
                            <td>100</td>
                            <td>Published</td>
                            <td className="actions text-right">
                                <button className="edit mr-3">
                                    <img
                                        src="/icons/edit.svg"
                                        alt="Edit"
                                        width={16}
                                        height={16}
                                    />
                                </button>
                                <button className="preview mr-3">
                                    <img
                                        src="/icons/preview.svg"
                                        alt="Preview"
                                        width={16}
                                        height={16}
                                    />
                                </button>
                                <button className="delete">
                                    <img
                                        src="/icons/delete.svg"
                                        alt="Delete"
                                        width={16}
                                        height={16}
                                    />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Products;
