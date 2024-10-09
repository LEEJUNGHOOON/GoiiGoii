import React, { useState } from "react";

interface DragAndDropImageUploadProps {
  onImageUpload: (files: File[]) => void;
}

const DragAndDropImageUpload: React.FC<DragAndDropImageUploadProps> = ({
  onImageUpload,
}) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedImages(files);
    onImageUpload(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="w-full h-64 border-2 border-dashed border-gray-400 flex justify-center items-center"
    >
      <p>Drag and drop your images here</p>
      {selectedImages.length > 0 && (
        <div className="mt-4">
          {selectedImages.map((file, idx) => (
            <p key={idx}>{file.name}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default DragAndDropImageUpload;
