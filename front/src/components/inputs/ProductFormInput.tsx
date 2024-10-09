import React, { ChangeEvent, KeyboardEvent } from "react";

const ERROR_MSG = {
  required: "필수 입력사항을 입력해주세요.",
  namePattern: "잘못된 네이밍 형식입니다.",
  pricePattern: "너무 높은 가격! 백만원 이하로 써주세요.",
  stockPatten: "10000개 이하로 써주세요.",
  briefDescPattern: "30자 이하로 써주세요.",
  descriptionPattern: "잘못된 상품설명 형식입니다.",
  categoryRequired: "카테고리를 선택해주세요.", // 카테고리 오류 메시지 추가
};

const NAME_REGEX = /^[가-힣a-z0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{2,15}$/i;
const PRICE_REGEX = /^(?:[0-9]{1,6}|1000000|0)$/; // 1,000,000원 이하의 값만 허용
const BRIEF_DESC_REGEX =
  /^[가-힣a-z0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{2,30}$/i;
const DESCRIPTION_REGEX =
  /^[가-힣a-z0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{2,100}$/i;
const STOCK_REGEX = /^(?:[0-9]{1,4}|10000|0)$/; // 10000개 이하의 값만 허용

const CATEGORIES = [
  "Paper",
  "Box",
  "Clothing",
  "Wrapper",
  "Scissors",
  "Ribbon",
  "ETC",
];

interface ProductFormInputProps {
  id: "name" | "price" | "briefDesc" | "stock" | "description" | "category";
  label: string;
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  error: Record<string, string>;
  setError: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const ProductFormInput: React.FC<ProductFormInputProps> = ({
  id,
  label,
  formData,
  setFormData,
  error,
  setError,
  inputProps,
}) => {
  const validateValue = (value: string) => {
    let result: string;

    if (value.length === 0)
      result = id === "category" ? "categoryRequired" : "required";
    else {
      switch (id) {
        case "name":
          result = NAME_REGEX.test(value) ? "noError" : "namePattern";
          break;
        case "price":
          const numericValue = value.replace(/[^0-9]/g, "");
          result = PRICE_REGEX.test(numericValue) ? "noError" : "pricePattern";
          break;
        case "stock":
          result = STOCK_REGEX.test(value) ? "noError" : "stockPatten";
          break;
        case "briefDesc":
          result = BRIEF_DESC_REGEX.test(value)
            ? "noError"
            : "briefDescPattern";
          break;
        case "description":
          result = DESCRIPTION_REGEX.test(value)
            ? "noError"
            : "descriptionPattern";
          break;
        case "category":
          result = CATEGORIES.includes(value) ? "noError" : "categoryRequired";
          break;
        default:
          result = "noError";
          break;
      }
    }
    setError((prevError) => ({
      ...prevError,
      [id]:
        result === "noError" ? "" : ERROR_MSG[result as keyof typeof ERROR_MSG],
    }));
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = event.target;

    let updatedValue = value;
    if (id === "price") {
      const numericValue = value.replace(/[^0-9]/g, "");
      const formattedPrice = numericValue
        ? `${parseFloat(numericValue).toLocaleString("ko-KR")}원`
        : "";
      updatedValue = formattedPrice;
    }

    setFormData((prevData) => ({
      ...prevData,
      [id]: updatedValue,
    }));

    validateValue(updatedValue);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (id === "price" && event.key === "Backspace") {
      event.preventDefault();
      const { value } = event.target as HTMLInputElement;
      const numericValue = value.replace(/[^0-9]/g, "");
      const updatedValue = numericValue.substring(0, numericValue.length - 1);
      const formattedPrice = updatedValue
        ? `${parseInt(updatedValue).toLocaleString("ko-KR")}원`
        : "";
      setFormData((data) => ({
        ...data,
        [id]: formattedPrice,
      }));
      validateValue(formattedPrice);
    }
  };

  const isInvalid = error[id] !== "noError" && error[id] !== "";

  return (
    <div className="mb-6 bg-white">
      <label
        htmlFor={id}
        className="block mb-2 text-lg font-semibold text-gray-800"
      >
        {label}
      </label>
      {id === "category" ? (
        <select
          id={id}
          value={formData[id]}
          onChange={handleChange}
          className={`w-full p-3 text-lg border ${
            isInvalid ? "border-red-500" : "border-gray-300"
          } rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
            isInvalid ? "focus:ring-red-500" : "focus:ring-gray-800"
          }`}
        >
          <option value="" disabled className="text-gray-400">
            카테고리를 선택하세요
          </option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          {...inputProps}
          value={formData[id]}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={`w-full p-3 text-lg border ${
            isInvalid ? "border-red-500" : "border-gray-300"
          } rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
            isInvalid ? "focus:ring-red-500" : "focus:ring-gray-800"
          }`}
        />
      )}
      {isInvalid && (
        <span className="block mt-2 text-sm text-red-500">{`*${error[id]}`}</span>
      )}
    </div>
  );
};

export default ProductFormInput;
