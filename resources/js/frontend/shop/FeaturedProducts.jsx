import React from "react";
import useProducts from "../../hooks/useProducts";

const FeaturedProducts = () => {
    const [products, setProducts] = useProducts();
    return (
        <div className="row bg-white">
            <div className="container py-16 flex gap-5 flex-wrap">
                {products.slice(0, 5).map((product) => {
                    // Find primary image from product.images
                    let primaryImage =
                        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp";

                    if (Array.isArray(product.images)) {
                        const found = product.images.find(
                            (img) => img.is_primary === 1
                        );
                        if (found && found.image_url) {
                            primaryImage = "storage/" + found.image_url;
                        }
                    }
                    return (
                        <div
                            key={product.id}
                            className="card bg-base-100 w-1/4 shadow-sm"
                        >
                            <figure>
                                <img src={primaryImage} alt={product.title} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{product.title}</h2>
                                <p>{product.description}</p>
                                <p>
                                    Price:{" "}
                                    {product.price
                                        ? "$" + product.price
                                        : "N/A"}
                                </p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FeaturedProducts;
