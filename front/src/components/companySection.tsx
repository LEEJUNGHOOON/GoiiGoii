import React from "react";

interface CompanySectionProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  description: string;
}

const CompanySection: React.FC<CompanySectionProps> = ({
  title,
  subtitle,
  imageSrc,
  description,
}) => {
  return (
    <div className="flex flex-row items-center h-screen mt-10 justify-center">
      {/* 왼쪽 섹션 (텍스트) */}
      <div className="flex flex-col items-center text-center w-1/2">
        <h1 className="text-6xl font-bold mb-6 text-black">{title}</h1>
        <p className="text-xl text-black mb-6">{subtitle}</p>
        <p className="text-sm text-black mb-6">{description}</p>
      </div>

      {/* 오른쪽 섹션 (이미지) */}
      <div className="w-1/2 flex justify-center">
        <img
          src={imageSrc}
          alt={title}
          className="w-9/12 max-w-xl rounded shadow-lg mb-48"
        />
      </div>
    </div>
  );
};

export default CompanySection;
