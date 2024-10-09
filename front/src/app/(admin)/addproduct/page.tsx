"use client";

import { useState } from "react";
import ProductForm from "../../../components/productform";
import { useRouter } from "next/navigation";
import useImageUpload from "../../../hooks/useImageUpload";
import DragAndDropImageUpload from "../../../hooks/DragAndDropImageUpload"; // DragAndDropImageUpload 컴포넌트 import
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"; // Firebase import
import { storage } from "../../../firebase/firebase"; // Firebase 설정을 가져오는 부분
import { useDispatch } from "react-redux";
import { addProductAdmin } from "@/store/actions/adminAction";

const AddProduct = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "", // category 필드 추가
    briefDesc: "",
    description: "",
  });

  const [error, setError] = useState({
    name: "",
    price: "",
    imageUrl: "",
    stock: "",
    category: "", // category 필드 추가
    briefDesc: "",
    description: "",
  });

  const { img, onUpload, selectedFile } = useImageUpload(); // selectedFile 추가

  let isActivated = false;
  if (
    formData.name.trim() !== "" &&
    formData.price.trim() !== "" &&
    img !== "" &&
    formData.stock.trim() !== "" &&
    formData.category.trim() !== "" && // 카테고리 필드 확인 추가
    formData.briefDesc.trim() !== "" &&
    formData.description.trim() !== "" &&
    ["name", "price", "imageUrl", "stock", "briefDesc", "description"].every(
      (key) => error[key] === "" || error[key] === "noError"
    )
  ) {
    isActivated = true;
  }

  const addClick = async () => {
    try {
      // Firebase Storage에 이미지 업로드
      const storageRef = ref(storage, `products/${formData.name}`);
      await uploadBytes(storageRef, selectedFile);

      // 업로드된 이미지의 URL 가져오기
      const imageUrl = await getDownloadURL(storageRef);

      const numericPrice = parseInt(
        formData.price.replace("원", "").replaceAll(",", "")
      );

      // 상품 정보를 담은 객체 생성
      const productData = {
        ...formData,
        price: numericPrice, // 변경된 price 적용
        imageUrl: imageUrl,
      };

      const data = dispatch(addProductAdmin(productData));

      data.payload.then((result) => {
        console.log(result.addProductAdminSuccess);
        if (result.addProductAdminSuccess) {
          console.log(result);
          router.push("/");
        } else if (!result.addProductAdminSuccess) {
          alert("상품등록 실패!");
          return;
        }
      });
    } catch (error) {
      console.error("이미지 업로드 또는 상품 등록 중 오류:", error);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <ProductForm
          formData={formData}
          setFormData={setFormData}
          img={img}
          onUpload={onUpload}
          error={error}
          setError={setError}
        />
      </form>
      <div className="ec-base-button gBottom mb-10 flex justify-between">
        <a
          href="/"
          className="btnNormalFix sizeL bg-white border border-slate-400 hover:border-slate-950 text-black px-40 py-4 mx-2"
        >
          취소
        </a>
        <a // 비활성화된 경우 href를 undefined로 설정
          className={`btnNormalFix sizeL ${
            isActivated
              ? "bg-slate-800 hover:bg-slate-950 text-white"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          } px-40 py-4 mx-2`}
          onClick={isActivated ? addClick : undefined} // 비활성화된 경우 클릭 핸들러를 undefined로 설정
        >
          등록
        </a>
      </div>
    </div>
  );
};

export default AddProduct;
