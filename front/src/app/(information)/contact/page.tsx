"use client";

import { useState } from "react";
import emailjs from "emailjs-com";
import Script from "next/script";
import { useEffect } from "react";

const ContactPage = () => {
  const [from_name, setFromName] = useState("");
  const [message, setMessage] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  // 이메일 전송 함수
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    const templateParams = {
      from_name: from_name,
      message: message,
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        () => {
          setIsEmailSent(true);
        },
        (error) => {
          console.log("Failed to send email:", error);
        }
      );
  };

  useEffect(() => {
    // 카카오 맵 스크립트 로드
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false`;
    kakaoMapScript.async = true;
    document.head.appendChild(kakaoMapScript);

    kakaoMapScript.onload = () => {
      // 카카오 맵 API 로드
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map"); // 지도를 표시할 div
        const mapOption = {
          center: new window.kakao.maps.LatLng(
            37.524015364020876,
            126.96813810152221
          ), // 신용산역, 용산역 근처 좌표
          level: 4, // 지도의 확대 레벨
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        // 마커 표시
        const markerPosition = new window.kakao.maps.LatLng(
          37.524015364020876,
          126.96813810152221
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-full p-8 bg-white text-black">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* 왼쪽 회사 정보 */}
        <div className="flex flex-col bg-white p-6 shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-4">회사 정보</h2>
          <p>주소: 04388 서울특별시 용산구 서빙고로20길 7</p>
          <p>전화: 070-7779-1919</p>
          <p>이메일: info@designbug.co.kr</p>
          <p>URL: www.designbug.co.kr</p>
          <p>등록: 건축사 등록 제 16812 호</p>
          <p className="mt-4">
            신용산역에서 이촌역방면으로 7분정도 도보로 방문가능합니다.
          </p>
          <p>
            프로젝트 의뢰는 이메일, 또는 유선 전화로 받고 있습니다. 우측에 있는
            메일보내기로 구체적인 의뢰 내용을 알려주세요.
          </p>
        </div>

        {/* 오른쪽 이메일 전송 폼 */}
        <div className="flex flex-col bg-white p-6 shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-4">이메일 보내기</h2>
          <form onSubmit={sendEmail} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-lg mb-2">
                보내는 사람 이메일
              </label>
              <input
                type="email"
                id="email"
                required
                value={from_name}
                onChange={(e) => setFromName(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg mb-2">
                메일 내용
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 border border-black text-black bg-white rounded-md hover:bg-gray-500 hover:text-white transition-colors"
            >
              Send Email
            </button>
          </form>
          {isEmailSent && (
            <p className="mt-4 text-green-600">
              이메일이 성공적으로 전송되었습니다!
            </p>
          )}
        </div>
      </div>

      {/* 카카오 맵 */}
      <div className="w-full h-96 mt-8">
        <div id="map" className="w-full h-full"></div>
      </div>
    </div>
  );
};

export default ContactPage;
