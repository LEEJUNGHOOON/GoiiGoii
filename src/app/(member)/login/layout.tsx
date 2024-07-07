// import { useRouter,usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
              <p >로그인</p>
            </li>
          </ol>
        </div>
        <div className="section titleArea flex justify-center items-center text-black font-medium m-10 text-3xl">
          <h1>Login</h1>
        </div>
      </div>
      {children}
    </div>
  );
}