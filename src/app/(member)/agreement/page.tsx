"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Text1, otherData } from "../../../../public/constraint/Agree";
const Agreement: React.FC = () => {
  const router =useRouter();
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isServiceChecked, setIsServiceChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [isAllADChecked, setIsAllADChecked] = useState(false);
  const [isSMSChecked, setIsSMSChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleCheckAll = () => {
    setIsAllChecked(!isAllChecked);
    setIsServiceChecked(!isAllChecked);
    setIsPrivacyChecked(!isAllChecked);
  };

  const handleServiceCheck = () => {
    setIsServiceChecked(!isServiceChecked);
  };

  const handlePrivacyCheck = () => {
    setIsPrivacyChecked(!isPrivacyChecked);
  };
  const handleCheckAllAD = () => {
    setIsAllADChecked(!isAllADChecked);
    setIsSMSChecked(!isAllADChecked);
    setIsEmailChecked(!isAllADChecked);
  };

  const handleSMSCheck = () => {
    setIsSMSChecked(!isSMSChecked);
  };

  const handleEmailCheck = () => {
    setIsEmailChecked(!isEmailChecked);
  };

  const handleNextButtonClick = () => {
    if (isServiceChecked && isPrivacyChecked) {
        router.push("/join");
    } else {
      // 경고 메시지 표시
      setShowAlert(true);
    }
  };

  return (
    <div className="bg-white text-black ">
      {showAlert && (
        <div className="alert bg-pink-100 text-black p-2 border">
          둘 다 체크해 주세요! 
          <button className="ml-2"onClick={() => setShowAlert(false)}>닫기</button>
        </div>
      )}
      <div className="bg-white text-black ">
        <div className="agreeAll mb-8 text-base bg-white">
          <h3 className="text-base mb-5">전체 동의</h3>
          <p className="mb-4">
            <span className="ec-base-chk inline-block mr-2 mt-1">
              <input
                type="checkbox"
                id="sAgreeAllChecked"
                checked={isAllChecked}
                onChange={handleCheckAll}
              />
              <em className="checkbox"></em>
            </span>
            <label
              htmlFor="sAgreeAllChecked"
              className="inline-block w-[calc(100%-41px)]"
            >
              이용약관 및 개인정보수집 및 이용, 쇼핑정보 수신(선택)에 모두
              동의합니다.
            </label>
            <label
              htmlFor="sAgreeAllChecked"
              className="inline-block w-[calc(100%-41px)]"
            >
              이용약관 및 개인정보수집 및 이용에 모두 동의합니다.
            </label>
          </p>
        </div>

        <div className="agreeInner flex flex-col md:flex-row">
          <div className="left flex-1 md:mr-10">
            <div className="agreeArea terms mb-10">
              <div className="title mb-5">
                <h3 className="text-lg font-semibold flex items-center">
                  <input
                    id="agree_service_check0"
                    name="agree_service_check[]"
                    fw-filter="/1/"
                    fw-label="이용약관 동의"
                    fw-msg="이용약관에 동의 하세요"
                    className="ec-base-chk mr-2 mt-1"
                    value="1"
                    type="checkbox"
                    checked={isServiceChecked}
                    onChange={handleServiceCheck}
                  />
                  <label htmlFor="agree_service_check0">동의함</label>
                  <label htmlFor="agree_service_check0" className="check ml-2">
                    이용약관 동의 (필수)
                  </label>
                </h3>
              </div>
              <div className="contents relative overflow-hidden overflow-y-auto h-[152px] mt-5 p-5 text-gray-600 text-xs leading-5 border border-gray-300 box-border">
                <div className="w-200 h-80 overflow-auto border border-gray-300 p-2">
                  {Text1}
                </div>
              </div>
            </div>
          </div>
          <div className="right flex-1">
            <div className="agreeArea mb-10">
              <div className="title mb-5">
                <h3 className="text-lg font-semibold flex items-center">
                  <input
                    id="agree_privacy_check0"
                    name="agree_privacy_check[]"
                    fw-filter=""
                    fw-label="개인정보 수집 및 이용 방침"
                    fw-msg="개인정보 수집 및 이용 방침에 동의하세요"
                    className="ec-base-chk mr-2 mt-1"
                    value="1"
                    type="checkbox"
                    checked={isPrivacyChecked}
                    onChange={handlePrivacyCheck}
                  />
                  <label htmlFor="agree_privacy_check0">동의함</label>
                  <label htmlFor="agree_privacy_check0" className="check ml-2">
                    개인정보처리방침 동의 (필수)
                  </label>
                </h3>
              </div>
              <div className="contents relative overflow-hidden overflow-y-auto h-[152px] mt-5 p-5 text-gray-600 text-xs leading-5 border border-gray-300 box-border">
                <div className="fr-view overflow-auto border border-gray-300 p-2"></div>
              </div>
            </div>
            <div className="agreeArea hidden mb-10">
              <div className="title mb-5">
                <h3 className="text-lg font-semibold flex items-center">
                  <input
                    id="agree_privacy_optional_check0"
                    name="agree_privacy_optional_check[]"
                    fw-filter=""
                    fw-label="개인정보 수집 및 이용 동의 (선택)"
                    fw-msg=""
                    className="ec-base-chk mr-2 mt-1"
                    value="T"
                    type="checkbox"
                  />
                  <label htmlFor="agree_privacy_optional_check0"></label>
                  <label
                    htmlFor="agree_privacy_optional_check0"
                    className="check ml-2"
                  >
                    개인정보 수집 및 이용 동의 (선택)
                  </label>
                </h3>
              </div>
              <div className="contents relative overflow-hidden overflow-y-auto h-[152px] mt-5 p-5 text-gray-600 text-xs leading-5 border border-gray-300 box-border">
                <div className="fr-view fr-view-privacy-optional"></div>
              </div>
            </div>
            <div className="agreeArea hidden mb-10">
              <div className="title mb-5">
                <h3 className="text-lg font-semibold flex items-center">
                  <input
                    id="agree_information_check0"
                    name="agree_information_check[]"
                    fw-filter=""
                    fw-label="개인정보 제3자 제공 동의"
                    fw-msg=""
                    className="ec-base-chk mr-2 mt-1"
                    value="1"
                    type="checkbox"
                  />
                  <label htmlFor="agree_information_check0"></label>
                  <label
                    htmlFor="agree_information_check0"
                    className="check ml-2"
                  >
                    개인정보 제3자 제공 동의 (선택)
                  </label>
                </h3>
              </div>
              <div className="contents relative overflow-hidden overflow-y-auto h-[152px] mt-5 p-5 text-gray-600 text-xs leading-5 border border-gray-300 box-border">
                <div className="fr-view fr-view-privacy-optional"></div>
              </div>
            </div>
            <div className="agreeArea hidden mb-10">
              <div className="title mb-5">
                <h3 className="text-lg font-semibold flex items-center">
                  <input
                    id="agree_consignment_check0"
                    name="agree_consignment_check[]"
                    fw-filter=""
                    fw-label="개인정보 처리 위탁 동의"
                    fw-msg=""
                    className="ec-base-chk mr-2 mt-1"
                    value="1"
                    type="checkbox"
                  />
                  <label htmlFor="agree_consignment_check0"></label>
                  <label
                    htmlFor="agree_consignment_check0"
                    className="check ml-2"
                  >
                    개인정보 처리 위탁 동의 (선택)
                  </label>
                </h3>
              </div>
              <div className="contents relative overflow-hidden overflow-y-auto h-[152px] mt-5 p-5 text-gray-600 text-xs leading-5 border border-gray-300 box-border">
                <div className="fr-view fr-view-privacy-optional"></div>
              </div>
            </div>
            <div className="agreeArea mb-10">
              <div className="title mb-5">
                <h3 className="text-lg font-semibold flex items-center">
                  <span className="ec-base-chk inline-block mr-2 mt-1">
                    <input
                      type="checkbox"
                      id="sMarketingAgreeAllChecked"
                      checked={isAllADChecked}
                      onChange={handleCheckAllAD}
                    />
                    <em className="checkbox"></em>
                  </span>
                  <label
                    htmlFor="sMarketingAgreeAllChecked"
                    className="check ml-2"
                  >
                    쇼핑정보 수신 동의 (선택)
                  </label>
                </h3>
                <ul className="additional list-none mt-5 space-y-2">
                  <li className="flex items-center">
                    <input
                      id="is_sms0"
                      name="is_sms"
                      fw-label="is_sms"
                      fw-msg=""
                      className="ec-base-chk mr-2 mt-1"
                      value="T"
                      type="checkbox"
                      checked={isSMSChecked}
                      onChange={handleSMSCheck}
                    />
                    <label htmlFor="is_sms0">동의함</label>
                    <label htmlFor="is_sms0" className="check ml-2">
                      SMS 수신 동의 (선택)
                    </label>
                  </li>
                  <li className="flex items-center">
                    <input
                      id="is_news_mail0"
                      name="is_news_mail"
                      fw-label="is_news_mail"
                      fw-msg=""
                      className="ec-base-chk mr-2 mt-1"
                      value="T"
                      type="checkbox"
                      checked={isEmailChecked}
                      onChange={handleEmailCheck}
                    />
                    <label htmlFor="is_news_mail0">동의함</label>
                    <label htmlFor="is_news_mail0" className="check ml-2">
                      이메일 수신 동의 (선택)
                    </label>
                  </li>
                </ul>
              </div>
              <div className=" text-gray-600 text-xs border border-gray-300 p-2">
                <p className="mb-5">
                  할인쿠폰 및 혜택, 이벤트, 신상품 소식 등 쇼핑몰에서 제공하는
                  유익한 쇼핑정보를 SMS나 이메일로 받아보실 수 있습니다. 단,
                  주문/거래 정보 및 주요 정책과 관련된 내용은 수신동의 여부와
                  관계없이 발송됩니다.
                </p>
                <p>
                  선택 약관에 동의하지 않으셔도 회원가입은 가능하며, 회원가입 후
                  회원정보수정 페이지에서 언제든지 수신여부를 변경하실 수
                  있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4 justify-center pb-10 bg-white">
          <a
            href="/agreement"
            className="btnNormalFix sizeL bg-white border border-slate-400 hover:border-stone-950 text-black px-40 py-4 mx-2 "
          >
            취소
          </a>
          <a
            className="btnNormalFix sizeL bg-slate-800 hover:bg-slate-950 text-white px-40 py-4 mx-2"
            onClick={handleNextButtonClick}
          >
            다음
          </a>
        </div>
      </div>
    </div>
  );
};

export default Agreement;
