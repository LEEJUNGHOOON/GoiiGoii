"use client";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/login") {
    return <>{children}</>;
  }
  return (
    <div className="bg-white">
      <div>
        <div className="section path text-amber-950 block unicode-bidi-isolate overflow-hidden h-30 line-h-30">
          <ol className="flex list-none  my-4 ml-10 mr-3 float-right text-xs space-x-1">
            <li>
              <a href="/">홈</a>
            </li>
            <li>
              <p>/</p>
            </li>
            <li title="현재 위치">
              <p>회원 가입</p>
            </li>
          </ol>
        </div>
        <div className="section titleArea flex justify-center items-center text-black font-medium m-10 text-3xl">
          <h1>회원 가입</h1>
        </div>
        <div className="section ec-stepbase- bg-white flex justify-center items-center mb-10">
          <ol className="flex text-center text-black space-x-8">
            <li
              className={
                pathname === "/agreement" ? "underline-spaced selected" : ""
              }
            >
              1. 약관동의
            </li>
            <li className={pathname === "/join" ? "underline-spaced " : ""}>
              2. 정보입력
            </li>
            <li
              className={pathname === "/joincomplete" ? "underline-spaced" : ""}
            >
              3. 가입완료
            </li>
          </ol>
        </div>
      </div>
      {children}
    </div>
  );
}
