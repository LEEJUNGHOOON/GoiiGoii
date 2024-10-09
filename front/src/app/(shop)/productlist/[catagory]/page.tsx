// pages/productlist/[category].tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation"; // next/navigation에서 useRouter import
import { useDispatch } from "react-redux";
import { getProductsByCategory } from "@/store/actions/shopAction";
import Link from "next/link";

const categories = [
  "All",
  "Paper",
  "Box",
  "Clothing",
  "Wrapper",
  "Scissors",
  "Ribbon",
  "ETC",
];

const ProductList = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  // pathname을 사용하여 카테고리 추출
  const currentPath = pathname.split("/")[2];
  // '/productlist/[category]' 에서 카테고리 부분만 추출
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const selectedCategory = currentPath || "All";
        const action = getProductsByCategory(selectedCategory);
        const response = await dispatch(action);
        if (response.payload) {
          setProducts(await response.payload);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [currentPath, dispatch]);

  const handleProductClick = (productId: string) => {
    router.push(`/productdetail/${productId}`);
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex space-x-4 justify-center">
        {categories.map((cat) => (
          <Link key={cat} href={`/productlist/${cat}`} legacyBehavior>
            <a
              className={`px-4 py-2 border-b-2 ${
                currentPath === cat
                  ? "border-black text-black"
                  : "border-transparent text-gray-600"
              } hover:border-gray-800 hover:text-gray-800`}
            >
              {cat}
            </a>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 shadow-lg rounded-lg cursor-pointer"
            onClick={() => handleProductClick(product._id)}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="mt-4 text-gray-950 text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.briefDesc}</p>
            <p className="mt-2 text-gray-400 font-bold">{product.price} 원</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
