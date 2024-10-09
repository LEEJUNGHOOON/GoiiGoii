import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CategoryFilterProps {
  currentCategory: string;
}

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

const CategoryFilter: React.FC<CategoryFilterProps> = ({ currentCategory }) => {
  const router = useRouter();

  return (
    <div className="flex space-x-4 mb-6 text-black">
      {categories.map((category) => {
        const isActive = currentCategory === category.toLowerCase();
        return (
          <Link
            key={category}
            href={
              category === "All"
                ? "/productlist"
                : `/productlist/${category.toLowerCase()}`
            }
            passHref
          >
            {/* <a
              className={`px-4 py-2 border-b-2 ${
                isActive
                  ? "border-black text-black"
                  : "border-transparent text-gray-400 hover:text-black hover:border-gray-300"
              }`}
            >
              {category}
            </a> */}
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
