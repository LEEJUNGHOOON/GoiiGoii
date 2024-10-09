import React from "react";
import ProductImgInput from "../components/inputs/ProductImgInput";
import ProductFormInput from "../components/inputs/ProductFormInput";

const categories = [
  "Paper",
  "Box",
  "Clothing",
  "Wrapper",
  "Scissors",
  "Ribbon",
  "ETC",
];
const ProductForm = ({
  formData,
  setFormData,
  img,
  onUpload,
  error,
  setError,
}) => {
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      category: event.target.value,
    }));
  };
  return (
    <div className="bg-white text-black m-5">
      <ProductImgInput
        id="imageUrl"
        label="이미지 등록"
        img={img}
        onUpload={onUpload}
      />
      <ProductFormInput
        id="name"
        label="이름"
        formData={formData}
        setFormData={setFormData}
        error={error}
        setError={setError}
        inputProps={{
          type: "text",
          placeholder: "2~15자 이내여야 합니다.",
          autoComplete: "off",
        }}
      />
      <ProductFormInput
        id="price"
        label="가격"
        formData={formData}
        setFormData={setFormData}
        error={error}
        setError={setError}
        inputProps={{
          type: "text",
          placeholder: "숫자만 입력 가능합니다.",
          value: formData.price,
          autoComplete: "off",
        }}
      />
      <ProductFormInput
        id="stock"
        label="재고"
        formData={formData}
        setFormData={setFormData}
        error={error}
        setError={setError}
        inputProps={{
          type: "text",
          placeholder: "숫자만 입력 가능합니다.",
          value: formData.stock,
          autoComplete: "off",
        }}
      />
      <div className="mb-6 bg-white">
        <label
          htmlFor="category"
          className="block mb-2 text-lg font-semibold text-gray-800"
        >
          카테고리
        </label>
        <select
          id="category"
          value={formData.category || ""}
          onChange={handleCategoryChange}
          className="w-full p-3 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
        >
          <option value="" disabled>
            카테고리를 선택하세요
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {error.category && (
          <span className="block mt-2 text-sm text-red-500">
            *{error.category}
          </span>
        )}
      </div>
      <ProductFormInput
        id="briefDesc"
        label="간략설명"
        formData={formData}
        setFormData={setFormData}
        error={error}
        setError={setError}
        inputProps={{
          type: "text",
          placeholder: "30자 이내 설명",
          autoComplete: "off",
        }}
      />
      <ProductFormInput
        id="description"
        label="상품설명"
        formData={formData}
        setFormData={setFormData}
        error={error}
        setError={setError}
        inputProps={{
          type: "text",
          placeholder: "상품설명을 써주세요",
          autoComplete: "off",
        }}
      />
    </div>
  );
};

export default ProductForm;
