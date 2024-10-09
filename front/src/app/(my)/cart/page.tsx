"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const router = useRouter();

  // 유저의 장바구니를 가져오는 로직
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      router.push("/login");
      return;
    }

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/member/${userId}/cart`
        );
        if (response.data.success) {
          setCartItems(response.data.cartItems);
        } else {
          console.error("Failed to load cart items");
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [router]);

  // 개별 상품 선택
  const handleSelectItem = (productId: string) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // 전체 상품 선택
  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item._id));
    }
  };

  // 선택된 상품 삭제
  const handleDeleteSelected = async () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      router.push("/login");
      return;
    }

    try {
      // 선택된 모든 상품을 삭제하는 API 요청
      await Promise.all(
        selectedItems.map(async (productId) => {
          await axios.delete(
            `http://localhost:3001/member/${userId}/cart/${productId}`
          );
        })
      );
      // 삭제 후 화면에서 제거
      setCartItems(
        cartItems.filter((item) => !selectedItems.includes(item._id))
      );
      setSelectedItems([]);
    } catch (error) {
      console.error("Error deleting selected items:", error);
    }
  };

  // 주문 처리 (아직 구현되지 않음)
  const handleOrder = () => {
    console.log("Order placed for selected items:", selectedItems);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-black text-2xl font-bold mb-4 content-center">
        장바구니
      </h1>

      {/* 장바구니 표 */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-white">
            <th className="border border-gray-300 pl-4 py-2 flex">
              <input
                type="checkbox"
                checked={selectedItems.length === cartItems.length}
                onChange={handleSelectAll}
              />
              <p className="ml-3 text-xs text-gray-700">전체선택</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id} className="text-center text-black">
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item._id)}
                  onChange={() => handleSelectItem(item._id)}
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 justify-items-center">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {item.price.toLocaleString()} 원
              </td>
              <td className="border border-gray-300 px-4 py-2">2,500 원</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 선택된 상품 삭제 버튼 */}
      <div className="flex justify-between mt-6">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleDeleteSelected}
          disabled={selectedItems.length === 0}
        >
          선택 상품 삭제
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleOrder}
          disabled={selectedItems.length === 0}
        >
          주문하기
        </button>
      </div>
    </div>
  );
};

export default CartPage;
