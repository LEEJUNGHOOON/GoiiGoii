import { useState } from "react";

const useImageUpload = () => {
  const [img, setImg] = useState<string>(""); // 이미지 미리 보기용 URL 상태
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // 실제 업로드할 파일 상태

  const onUpload = (file: File) => {
    setSelectedFile(file); // 업로드할 파일을 상태에 저장

    const reader = new FileReader();
    reader.onloadend = () => {
      setImg(reader.result as string); // 미리 보기용 이미지 URL을 상태에 저장
    };

    if (file) {
      reader.readAsDataURL(file); // 파일을 Data URL로 읽어서 이미지 미리 보기
    }
  };

  return {
    img,
    selectedFile,
    onUpload,
  };
};

export default useImageUpload;