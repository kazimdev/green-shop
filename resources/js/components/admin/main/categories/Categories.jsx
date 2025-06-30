import { useEffect, useState } from "react";
import Loader from "../../../ui/Loader";
import axios from ".././../../auth/axios";

const Categories = () => {
    const [name, setName] = useState("");
    const [parentId, setParentId] = useState(null);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/categories",
                    {
                        withCredentials: true, // Important for Sanctum
                    }
                );
                setCategories(response.data.data || response.data); // depending on your Resource response
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/categories",
                {
                    name,
                    parent_id: parentId,
                },
                {
                    withCredentials: true,
                }
            );

            console.log("Category created:", response.data);
            setSuccess(true);
            setErrors({});
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error("Error creating category:", error);
            }
        }
    };

    loading && <Loader />;
    
    return (
        <div className="categories flex gap-x-24">
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <br />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>

                <br />
                <br />

                <label>
                    Parent ID (optional):
                    <br />
                    <input
                        type="number"
                        value={parentId || ""}
                        onChange={(e) => setParentId(e.target.value || null)}
                    />
                </label>

                <br />
                <br />

                <button type="submit" className="bg-blue-500 p-2 rounded">
                    Create Category
                </button>

                {success && <p>Category created successfully!</p>}
                {errors.name && (
                    <p style={{ color: "red" }}>{errors.name[0]}</p>
                )}
            </form>



            <div className="category-list">
                <h2 className="text-xl font-bold">Categories</h2>
                {loading ? (
                     <Loader />
                ) : (
                    <ul>
                        {categories.map((category) => (
                            <li key={category.id}>
                                {category.name}{" "}
                                {category.parent_id &&
                                    `(Parent ID: ${category.parent_id})`}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Categories;
