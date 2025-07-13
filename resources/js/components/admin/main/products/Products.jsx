import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../../ui/Loader";
import axios from "../../../auth/axios";

const Products = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Call Sanctum CSRF endpoint first
                await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
                    withCredentials: true,
                });

                const response = await axios.get(
                    "http://127.0.0.1:8000/api/products",
                    {
                        withCredentials: true,
                    }
                );
                setProducts(response.data.data || response.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const getPrimaryImageUrl = (images) => {
        const primary = images?.find((img) => img.is_primary);
        return primary
            ? `http://127.0.0.1:8000/storage/${primary.image_url}`
            : null;
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }
        setLoading(true);
        try {
            await axios.delete(`http://127.0.0.1:8000/api/products/${id}`, {
                withCredentials: true,
            });
            setProducts((prev) => prev.filter((product) => product.id !== id));
        } catch (error) {
            console.error("Failed to delete product:", error);
            alert("Failed to delete product.");
        }
        setLoading(false);
    };

    return (
        <>
            <div className="content-header mb-4">
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

            <div className="content-filters bg-white px-4 py-3 shadow-sm mb-4 rounded-sm">
                Product Filters
            </div>

            <div className="products-list  bg-white px-4 py-3 shadow-sm mb-4 rounded-sm">
                <table className="table-auto w-full text-left">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Categories</th>
                            <th>Status</th>
                            <th className="actions text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="8" className="text-center">
                                    <Loader />
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => {
                                const imageUrl = getPrimaryImageUrl(
                                    product.images || []
                                );

                                return (
                                    <tr key={product.id}>
                                        <td>#{product.id}</td>
                                        <td>
                                            <img
                                                src={
                                                    imageUrl ||
                                                    "/images/no-image.webp"
                                                }
                                                alt={product.title}
                                                className="w-8 h-8 object-cover"
                                            />
                                        </td>
                                        <td>{product.title}</td>
                                        <td>
                                            {product?.price
                                                ? "$" +
                                                  parseFloat(
                                                      product.price
                                                  ).toFixed(2)
                                                : "N/A"}
                                        </td>
                                        <td>{product.stock}</td>
                                        <td>
                                            {Array.isArray(
                                                product.categories
                                            ) && product.categories.length > 0
                                                ? product.categories
                                                      .map((cat) => cat.name)
                                                      .join(", ")
                                                : "-"}
                                        </td>
                                        <td>{product.status}</td>
                                        <td className="actions text-right">
                                            <Link
                                                to={`/dashboard/products/edit/${product.id}`}
                                                className="edit mr-3"
                                            >
                                                <img
                                                    src="/icons/edit.svg"
                                                    alt="Edit"
                                                    width={16}
                                                    height={16}
                                                />
                                            </Link>

                                            <button className="preview mr-3">
                                                {" "}
                                                <img
                                                    src="/icons/preview.svg"
                                                    alt="Preview"
                                                    width={16}
                                                    height={16}
                                                />
                                            </button>

                                            <button
                                                onClick={(e) =>
                                                    handleDelete(e, product.id)
                                                }
                                                className="delete"
                                            >
                                                <img
                                                    src="/icons/delete.svg"
                                                    alt="Delete"
                                                    width={16}
                                                    height={16}
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Products;
