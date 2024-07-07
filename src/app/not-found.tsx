import { Metadata } from "next";

export const metadata:Metadata={
    title:"Not Found",
}
export default function NotFound() {
  //이상한 url로 접근했을때 보여지는 페이지
  return (
    <>
      <div>
        <h1>not found</h1>
      </div>
    </>
  );
}
