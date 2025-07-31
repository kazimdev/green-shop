import React from "react";
import { useEffect, useState } from "react";
import axios from "../auth/axios";

const useProducts = () => {
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
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };
        fetchProducts();
    }, []);

    return [products, setProducts];
};

export default useProducts;
