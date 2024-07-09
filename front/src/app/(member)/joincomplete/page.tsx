"use client"
import { useRouter } from "next/navigation";

const JoinComplete: React.FC = () => {
  const router = useRouter();
  const goToMain = () => {
    router.push("/");
  };
  return (
    <div className="bg-white  text-black">
      <div className="titleArea text-center my-10 text-black">
        <h2 className="text-2xl font-bold">회원 가입 완료</h2>
      </div>

      <div className="memberArea gInnerMargin mx-auto max-w-2xl px-6 py-12 border border-gray-300">
        <div className="joinComplete">
          <p className="desc text-center text-lg font-semibold mb-6 text-bl">
            회원가입이 완료 되었습니다.
          </p>

          <div className="memberSpecial my-6">
            <p className="text-center text-base text-gray-700">
              <strong className="text-black"> 님</strong>은{" "}
              <strong className="text-black"></strong> 회원이십니다.
            </p>
          </div>

          <div className="ec-base-box typeMember gMessage border-t border-b border-gray-300 py-4">
            <div className="information">
              <div className="description">
                <dl className="ec-base-desc space-y-2">
                  <div className="flex justify-between">
                    <dt className="w-24">아이디</dt>
                    <dd className="flex-1">$member_id</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="w-24">이름</dt>
                    <dd className="flex-1">$member_name</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="w-24">이메일</dt>
                    <dd className="flex-1">$member_email</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="ec-base-button gBottom mt-6 flex justify-center space-x-4">
          <a
            className="btnNormalFix sizeM bg-gray-300 text-neutral-500 text-opacity-40 py-2 px-4 rounded"
            onClick={goToMain}
          >
            메인으로 이동
          </a>
          <a className="btnSubmitFix sizeM bg-green-500 text-white py-2 px-4 rounded" onClick={()=>router.push("/login")}>
            로그인
          </a>
        </div>
      </div>
    </div>
  );
};

export default JoinComplete;
