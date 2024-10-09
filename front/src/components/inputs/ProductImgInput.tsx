import React, { ChangeEvent } from "react";
import Image from "next/image";
import ProductBasic from "../../../public/Icon/이미지 추가.png";

interface ProductImgInputProps {
  id: string;
  img: string;
  onUpload: (file: File) => void;
  label: string;
}

const ProductImgInput: React.FC<ProductImgInputProps> = ({
  id,
  img,
  onUpload,
  label,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    onUpload(file);
  };

  return (
    <>
      <label htmlFor={id} className="block mb-4">
        {label}
        <div className="mt-2 w-full max-w-xs"> {/* 부모 요소의 크기를 제어 */}
          <Image
            src={img === "" ? ProductBasic : img}
            alt="상품 이미지"
            layout="responsive"
            width={1}  // 비율을 유지하기 위해서 비율만 지정
            height={1} // 비율을 유지하기 위해서 비율만 지정
            className="object-cover rounded"
          />
        </div>
      </label>
      <input
        id={id}
        type="file"
        className="sr-only"
        onChange={handleChange}
        accept="image/*"
      />
    </>
  );
};

export default ProductImgInput;
