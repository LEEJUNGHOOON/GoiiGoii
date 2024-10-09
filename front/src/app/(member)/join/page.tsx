"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useRouter } from "next/navigation";
import { signinUser, idCheck } from "../../../store/actions/userAction";

interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

const Join: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMismatch, setIsMismatch] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [localPart, setLocalPart] = useState("");
  const [domainPart, setDomainPart] = useState("");
  const [isCustomDomain, setIsCustomDomain] = useState(true);

  const [showVerificationInfo, setShowVerificationInfo] = useState(false);
  const [idCheckTryied, setIdCheckTryied] = useState(false);
  const [showIdCheckInfo, setShowIdCheckInfo] = useState(false);

  const handleIdCheckButtonClick = () => {
    setIdCheckTryied(true);
    let body = {
      id: id,
    };
    const data = dispatch(idCheck(body));
    data.payload.then((result) => {
      console.log(result.idCheckSuccess);
      if (result.idCheckSuccess) {
        //아이디가 중복하지 않을때
        setShowIdCheckInfo((prev) => !prev);
        alert("해당아이디는 사용 가능 합니다.");
      } else if (!result.idCheckSuccess) {
        //아이디가 중복 할때
        alert("해당아이디는 이미 사용 중입니다.");
        return;
      }
    });
  };
  const handleButtonClick = () => {
    setShowVerificationInfo(true);
  };
  const onIdChange = (event: InputChangeEvent) => {
    setId(event.currentTarget.value);
  };
  const onPwChange = (event: InputChangeEvent) => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPwChange = (event: InputChangeEvent) => {
    const value = event.currentTarget.value;
    setConfirmPassword(value);
    setIsMismatch(value == password);
  };
  const onNameChange = (event: InputChangeEvent) => {
    setName(event.currentTarget.value);
  };

  const autoHyphen2 = (value: any) => {
    return value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");
  };

  const onPhoneChange = (event: InputChangeEvent) => {
    let inputValue = event.currentTarget.value.replace(/[^0-9]/g, "");
    if (inputValue.length > 11) {
      inputValue = inputValue.slice(0, 11);
    }
    const formattedValue = autoHyphen2(inputValue);
    setPhone(formattedValue);
  };

  const onLocalPartChange = (event: InputChangeEvent) => {
    console.log(document.getElementById("domain-list"));
    const value: any = event.currentTarget.value;
    setLocalPart(value);
    const domainElement = document.getElementById(
      "domain-list"
    ) as HTMLSelectElement;
    const selectedDomain = isCustomDomain ? domainPart : domainElement.value;
    setEmail(`${value}@${selectedDomain}`);
  };

  const onDomainPartChange = (event: InputChangeEvent) => {
    const value = event.currentTarget.value;
    setDomainPart(value);
    setEmail(`${localPart}@${value}`);
  };

  const onDomainListChange = (event: any) => {
    const value = event.currentTarget.value;
    if (value === "self") {
      setIsCustomDomain(true);
      setDomainPart("");
    } else {
      setIsCustomDomain(false);
      setDomainPart(value);
      setEmail(`${localPart}@${value}`);
    }
  };
  const handleNextButtonClick = () => {
    if (!idCheckTryied) {
      alert("아이디 중복체크를 해주세요");
      return;
    }
    if (
      !id ||
      !password ||
      !confirmPassword ||
      !name ||
      !phone ||
      !email ||
      !localPart ||
      !domainPart
    ) {
      alert("모든 필드를 입력해주세요.");
      return;
    } else if (!isMismatch) {
      alert("비밀번호가 서로 맞지 않습니다");
      return;
    } else if (!showIdCheckInfo) {
      alert("아이디가 중복입니다.");
      return;
    }
    let body = {
      id: id,
      password: password,
      name: name,
      phone: phone,
      email: email,
    };
    const data = dispatch(signinUser(body));
    data.payload.then((result) => {
      console.log(result);
      if (result.success) {
        const queryParams = new URLSearchParams({
          member_id: body.id,
          member_name: body.name,
          member_email: body.email,
        }).toString();
        router.push(`/joincomplete?${queryParams}`);
        console.log("go to login");
      } else if (!result.success) {
        alert("Failed to sign up");
      }
    });
    router.push("/joincomplete");
  };

  return (
    <div className="flex flex-col  justify-center items-center  bg-slate-200 text-black">
      <table className="table-auto border border-l-gray-900 mt-20 mb-10">
        <caption className="text-lg font-semibold mb-4">회원 기본정보</caption>
        <colgroup>
          <col className="w-fit" />
          <col className="w-max" />
        </colgroup>
        <tbody>
          <tr className="border border-l-green-900 p-2">
            <th
              scope="row"
              className="border px-4 py-2 text-left whitespace-nowrap"
            >
              <img
                src="https://img.echosting.cafe24.com/skin/skin/common/ico_required.svg"
                className="inline w-2 h-2 mr-2"
                alt="필수"
              />
              아이디
            </th>
            <td className="border px-4 py-2">
              <div className="flex items-center space-x-2 text-xs">
                <input
                  className="border rounded w-60 h-7 px-2 py-1"
                  value={id}
                  onChange={onIdChange}
                />
                <button
                  type="button"
                  className="btn btn-primary text-xs"
                  onClick={handleIdCheckButtonClick}
                >
                  아이디 중복 확인
                </button>
                <span className="text-xs text-gray-600">
                  (영문소문자/숫자, 4~16자)
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              className="border px-4 py-2 text-left whitespace-nowrap"
            >
              <img
                src="https://img.echosting.cafe24.com/skin/skin/common/ico_required.svg"
                className="inline w-2 h-2 mr-2"
                alt="필수"
              />
              비밀번호
            </th>
            <td className="border px-4 py-2">
              <div className="flex items-center space-x-2">
                <input
                  className="border rounded w-60 h-7 px-2 py-1"
                  value={password}
                  type="password"
                  onChange={onPwChange}
                />
                <span className="text-xs text-gray-600">
                  (영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자)
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              className="border px-4 py-2 text-left whitespace-nowrap"
            >
              <img
                src="https://img.echosting.cafe24.com/skin/skin/common/ico_required.svg"
                className="inline w-2 h-2 mr-2"
                alt="필수"
              />
              비밀번호 확인
            </th>
            <td className="border px-4 py-2">
              <div className="flex items-center space-x-2">
                <input
                  className="border rounded w-60 h-7 px-2 py-1"
                  value={confirmPassword}
                  type="password"
                  onChange={onConfirmPwChange}
                />
                {confirmPassword && !isMismatch && (
                  <span className="text-xs text-red-600">
                    비밀번호가 같지 않습니다.
                  </span>
                )}
              </div>
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              className="border px-4 py-2 text-left whitespace-nowrap"
              id="name_title"
            >
              <img
                src="https://img.echosting.cafe24.com/skin/skin/common/ico_required.svg"
                className="inline w-2 h-2 mr-2"
                alt="필수"
              />
              이름
            </th>
            <td className="border px-4 py-2">
              <div className="flex items-center space-x-2">
                <input
                  className="border rounded w-60 h-7 px-2 py-1"
                  value={name}
                  onChange={onNameChange}
                />
                <p id="under14Msg" className="hidden text-red-500 text-xs">
                  14세 미만 사용자는 법정대리인 동의가 필요합니다.
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              className="border px-4 py-2 text-left whitespace-nowrap"
            >
              <img
                src="https://img.echosting.cafe24.com/skin/skin/common/ico_required.svg"
                className="inline w-2 h-2 mr-2"
                alt="필수"
              />
              휴대전화
            </th>
            <td className="border px-4 py-2">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={phone}
                  onChange={onPhoneChange}
                  className="border rounded w-60 h-7 px-2 py-1"
                  placeholder="Enter phone number"
                />
                <button
                  type="button"
                  className="btn btn-primary text-xs"
                  onClick={handleButtonClick}
                >
                  인증번호받기
                </button>
              </div>
              {showVerificationInfo && (
                <div>
                  <p className="text-xs text-red-500"></p>
                  <ul className="text-xs text-gray-600 ml-1">
                    <li>인증번호가 발송되었습니다.</li>
                    <li>
                      인증번호를 받지 못하셨다면 휴대폰 번호를 확인해 주세요.
                    </li>
                  </ul>
                </div>
              )}
            </td>
          </tr>
          <tr id="confirm_verify_mobile">
            <th
              scope="row"
              className="border px-4 py-2 text-left whitespace-nowrap"
            >
              <img
                src="https://img.echosting.cafe24.com/skin/skin/common/ico_required.svg"
                className="inline w-2 h-2 mr-2"
                alt="필수"
              />
              인증번호
            </th>
            <td className="border px-4 py-2">
              <div className="flex items-center space-x-2 mr-8">
                <input
                  type="text"
                  className="border rounded w-60 h-7 px-2 py-1"
                  placeholder="verification code"
                  disabled={!showVerificationInfo}
                />
                <button type="button" className="btn btn-primary text-xs pl-5">
                  확인
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              className="border px-4 py-2 text-left whitespace-nowrap"
            >
              <img
                src="https://img.echosting.cafe24.com/skin/skin/common/ico_required.svg"
                className="inline w-2 h-2 mr-2"
                alt="필수"
              />
              이메일
            </th>
            <td className="border px-4 py-2 text-xs">
              <div className="flex items-center">
                <input
                  className="box border rounded h-7"
                  type="text"
                  placeholder="local part"
                  value={localPart}
                  onChange={onLocalPartChange}
                />
                @
                <input
                  className="box border rounded h-7 mr-2"
                  type="text"
                  placeholder="domain part"
                  value={domainPart}
                  onChange={onDomainPartChange}
                  disabled={!isCustomDomain}
                />
                <select
                  className="box border rounded h-7"
                  id="domain-list"
                  onChange={onDomainListChange}
                  value={isCustomDomain ? "self" : domainPart}
                >
                  <option value="self">직접입력</option>
                  <option value="naver.com">naver.com</option>
                  <option value="google.com">gmail.com</option>
                  <option value="hanmail.net">hanmail.net</option>
                  <option value="nate.com">nate.com</option>
                  <option value="kakao.com">kakao.com</option>
                </select>
              </div>
              <p className="text-xs text-gray-600" id="emailMsg_id">
                {email}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="ec-base-button gBottom mb-10 flex justify-between">
        <a
          href="/agreement"
          className="btnNormalFix sizeL bg-white border border-slate-400 hover:border-slate-950 text-black px-40 py-4 mx-2 "
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
  );
};

export default Join;
