"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProductDetail } from "@/store/actions/shopAction"; // 상품 상세 정보 가져오기 액션
import { useDispatch } from "react-redux";
import { addUserCart } from "@/store/actions/userAction";
import axios from "axios";

interface IParams {
  params: { id: string };
}

const ProductDetail = ({ params: { id } }: IParams) => {
  const [productDetail, setProductDetail] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1); // 수량 상태
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      const fetchProductDetail = async () => {
        try {
          const action = getProductDetail(id); // 상품 상세 정보 가져오는 액션
          const response = await dispatch(action);
          if (response.payload) {
            setProductDetail(await response.payload);
          }
        } catch (error) {
          console.error("Failed to fetch product details:", error);
        }
      };

      fetchProductDetail();
    }
  }, [id, dispatch]);

  // 수량 증가
  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // 수량 감소 (최소 1)
  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  // 장바구니 추가 버튼 클릭 시 동작
  const addToCart = async () => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    try {
      const cartData = { productId: id, userId: userId };
      const response = dispatch(addUserCart(cartData));
      console.log(response);

      response.payload.then((result) => {
        if (result.addUserCartSuccess) {
          console.log(result);
          alert("장바구니에 상품이 추가되었습니다.");
        } else if (!result.addUserCartSuccess) {
          alert("상품 추가에 실패했습니다.");
          return;
        }
      });
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      alert("상품 추가 중 오류가 발생했습니다.");
    }
  };

  if (!productDetail) {
    return <div>Loading...</div>;
  }

  // 총 가격 계산
  const totalPrice = productDetail.price * quantity;

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row bg-white p-6 shadow-lg rounded-lg">
        {/* 이미지 영역 */}
        <div className="w-full md:w-1/2">
          <img
            src={productDetail.detailImageUrl || productDetail.imageUrl}
            alt={productDetail.name}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* 상품 정보 영역 */}
        <div className="w-full md:w-1/2 md:pl-8 text-black">
          <h1 className="text-3xl font-semibold">{productDetail.name}</h1>
          <p className="text-2xl font-bold mt-4">{productDetail.price} 원</p>
          <hr className="my-4" />
          <p className="text-gray-600">Stock: {productDetail.stock}</p>
          <p className="text-gray-600">배송방법 택배</p>
          <p className="text-gray-600">
            배송비 2,500원 (50,000원 이상 구매 시 무료)
          </p>

          {/* 수량 선택 및 가격 계산 */}
          <div className="mt-6">
            <p className="text-lg font-semibold">수량</p>
            <div className="flex items-center mt-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded-l-lg"
                onClick={decrementQuantity}
              >
                -
              </button>
              <span className="px-4 py-2 border-t border-b">{quantity}</span>
              <button
                className="px-4 py-2 bg-gray-200 rounded-r-lg"
                onClick={incrementQuantity}
              >
                +
              </button>
            </div>

            {/* 총 가격 표시 */}
            <div className="mt-4">
              <p className="text-lg font-semibold">
                Total ({quantity} 개): {totalPrice.toLocaleString()} 원
              </p>
            </div>

            {/* 장바구니에 추가 버튼 */}
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
