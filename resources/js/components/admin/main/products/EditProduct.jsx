import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "../../../auth/axios";
import Alert from "../../../ui/Alert";
import Loader from "../../../ui/Loader";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const [initialGallery, setInitialGallery] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
                const product = res.data;

                setValue("title", product.title);
                setValue("description", product.description);
                setValue("slug", product.slug);
                setValue("price", product.price);
                setValue("stock", product.stock);
                setValue("status", product.status);

                // Handle images
                if (product.images && product.images.length > 0) {
                    const primary = product.images.find(img => img.is_primary);
                    setImagePreview(primary ? `/storage/${primary.image_url}` : null);
                    const gallery = product.images.filter(img => !img.is_primary).map(img => `/storage/${img.image_url}`);
                    setInitialGallery(gallery);
                } else {
                    setImagePreview(null);
                    setInitialGallery([]);
                }
            } catch (err) {
                console.error("Failed to fetch product", err);
            }
            setLoading(false);
        };
        fetchProduct();
    }, [id, setValue]);

    const handleImagePreview = (e, type) => {
        if (type === 'primary') {
            const file = e.target.files[0];
            if (file) {
                setImagePreview(URL.createObjectURL(file));
            }
        } else {
            const files = Array.from(e.target.files);
            const previews = files.map((file) => URL.createObjectURL(file));
            setGalleryPreviews(previews);
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        setValidationErrors({});
        const formData = new FormData();
        let hasImage = false;

        // Only append fields if they have values
        Object.keys(data).forEach((key) => {
            if (key === 'image' && data.image && data.image.length > 0 && data.image[0] instanceof File) {
                formData.append('image', data.image[0]);
                hasImage = true;
            } else if (key === 'gallery' && data.gallery && data.gallery.length > 0) {
                Array.from(data.gallery).forEach((file) => {
                    if (file instanceof File) {
                        formData.append('gallery[]', file);
                    }
                });
            } else if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
                formData.append(key, data[key]);
            }
        });

        // If user did not choose a new image, send the current image URL as a hidden field
        if (!hasImage && imagePreview) {
            const imagePath = imagePreview.replace(/^\/storage\//, '');
            formData.append('current_image', imagePath);
        }

        await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
            withCredentials: true,
        });

        try {
            formData.append('_method', 'PUT');
            await axios.post(`http://127.0.0.1:8000/api/products/${id}`, formData, {
                withCredentials: true,
                headers: {
                    // "Content-Type": "multipart/form-data", // Let the browser set it
                },
            });
            setSuccess(true);
            setLoading(false);
        } catch (err) {
            setSuccess(false);
            setLoading(false);
            if (err.response?.status === 422) {
                const laravelErrors = err.response.data.errors;
                setValidationErrors(laravelErrors);
                console.error('Backend validation errors:', laravelErrors);
                Object.entries(laravelErrors).forEach(([field, messages]) => {
                    setValue(field, data[field]);
                });
            } else {
                console.error("Product update error", err);
            }
        }
    };

    return (
        <>
            <Link
                to="/dashboard/products"
                className="text-brandGreen-900 mb-3 flex items-center"
            >
                <img
                    src="/icons/chevron-left.svg"
                    alt="Back"
                    width={18}
                    height={18}
                />
                Products
            </Link>
            <div className="products-form bg-white px-4 py-3 shadow-sm mb-4 rounded-sm">
                <h2 className="block text-2xl font-bold p-3 mb-2">
                    Edit Product
                </h2>
                <form
                    action=""
                    method="post"
                    className="add-product-form p-3"
                    onSubmit={handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                >
                    <div className="flex gap-6">
                        <fieldset className="fieldset product-info w-1/2">
                            <label htmlFor="title" className="label mb-4">
                                <span className="text-base">Product Title:</span>
                                <div className="w-3/4">
                                    <input
                                        type="text"
                                        {...register("title", { required: "Product title is required" })}
                                        id="title"
                                        className="input bg-base-light w-full"
                                        placeholder="My Product Title"
                                    />
                                    {errors.title && (
                                        <p style={{ color: "red" }}>{errors.title.message}</p>
                                    )}
                                </div>
                            </label>
                            <label htmlFor="description" className="label mb-4">
                                <span className="text-base">Product Description:</span>
                                <div className="w-3/4">
                                    <textarea
                                        id="description"
                                        className="textarea bg-base-light w-full"
                                        placeholder="My product desc"
                                        {...register("description")}
                                    ></textarea>
                                    {errors.description && (
                                        <p style={{ color: "red" }}>{errors.description.message}</p>
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
                        </fieldset>
                        <fieldset className="fieldset product-image w-1/2 p-4">
                            <label htmlFor="image">Product Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("image")}
                                onChange={(e) => handleImagePreview(e, 'primary')}
                                className="file-input file-input-ghost"
                            />
                            {imagePreview && (
                                <div style={{ marginTop: "10px" }}>
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{ width: "400px", height: "400px", objectFit: "cover" }}
                                    />
                                </div>
                            )}
                            {(!imagePreview && initialGallery.length > 0) && (
                                <div style={{ marginTop: "10px" }}>
                                    <img
                                        src={initialGallery[0]}
                                        alt="Current"
                                        style={{ width: "400px", height: "400px", objectFit: "cover" }}
                                    />
                                </div>
                            )}
                            <label htmlFor="gallery" className="mt-12">Product Gallery</label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                {...register("gallery")}
                                onChange={(e) => handleImagePreview(e, 'gallery')}
                                className="file-input file-input-ghost"
                            />
                            {(galleryPreviews.length > 0 || initialGallery.length > 1) && (
                                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                    {galleryPreviews.length > 0
                                        ? galleryPreviews.map((src, i) => (
                                            <img
                                                key={i}
                                                src={src}
                                                alt="Preview"
                                                style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                            />
                                        ))
                                        : initialGallery.slice(1).map((src, i) => (
                                            <img
                                                key={i}
                                                src={src}
                                                alt="Current"
                                                style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                            />
                                        ))}
                                </div>
                            )}
                        </fieldset>
                    </div>
                    {Object.keys(validationErrors).length > 0 && (
                        <div className="mb-4">
                            {Object.entries(validationErrors).map(([field, messages]) => (
                                <p key={field} style={{ color: 'red' }}>
                                    {messages.join(' ')}
                                </p>
                            ))}
                        </div>
                    )}
                    <input
                        type="submit"
                        className="text-white btn btn-soft btn-info my-4 max-w-48"
                        value="Update Product"
                    />
                </form>
                {loading && <Loader />}
                {success ? (
                    <Alert
                        type={success ? "success" : "error"}
                        message={success ? "Product updated successfully!" : "Failed to update product."}
                    />
                ) : (
                    ""
                )}
            </div>
        </>
    );
};

export default EditProduct;
