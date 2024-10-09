"use client";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import Image from "next/image";
import GoiiBuilding from "../../../../public/goiigoii/goiibuilding.jpeg";
import designBug1 from "../../../../public/designBug/디자인버그1.jpg";
import designBug2 from "../../../../public/designBug/디자인버그2.jpg";
import designBug3 from "../../../../public/designBug/디자인버그3.jpg";
import designBug4 from "../../../../public/designBug/디자인버그4.jpeg";
import lobby1 from "../../../../public/lobby/3FLOBBY_1.jpeg";
import lobby2 from "../../../../public/lobby/3FLOBBY_2.jpg";
import lobby3 from "../../../../public/lobby/3FLOBBY_3.jpg";

import React from "react";
import Slider from "react-slick";

const settings = {
  dots: true, // 슬라이드 하단에 페이지네이션 (점)
  infinite: true, // 무한 루프 슬라이드
  speed: 500, // 슬라이드 전환 속도
  slidesToShow: 1, // 한 번에 보여줄 슬라이드 개수
  slidesToScroll: 1, // 한 번에 넘길 슬라이드 개수
  arrows: true, // 좌우 네비게이션 화살표 사용
};
const Archive = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="p-6 space-y-64 text-black relative">
      {/* 첫 번째 div */}
      <div
        data-aos="fade-up"
        className=" mt-20 relative p-4 shadow-lg rounded-lg bg-gray-200 w-[60%] ml-80 space-y-4"
        style={{ height: "400px" }} // 직사각형 높이 설정
      >
        <h2 className="text-xl font-semibold ">Design Bug</h2>
        <div className="p-4">
          <Slider {...settings}>
            <div>
              <Image
                className="w-full h-60 object-cover rounded-lg"
                src={designBug1}
                alt="Image 1"
                priority={true} // 이 이미지를 우선 로드
              />
            </div>
            <div>
              <Image
                className="w-full h-60 object-cover rounded-lg"
                src={designBug2}
                alt="Image 2"
                priority={true} // 이 이미지를 우선 로드
              />
            </div>
            <div>
              <Image
                className="w-full h-60 object-cover rounded-lg"
                src={designBug3}
                alt="Image 3"
                priority={true} // 이 이미지를 우선 로드
              />
            </div>
            <div>
              <Image
                className="w-full h-60 object-cover rounded-lg"
                src={designBug4}
                alt="Image 4"
                priority={true} // 이 이미지를 우선 로드
              />
            </div>
          </Slider>
        </div>
        <a
          href="http://www.designbug.co.kr/"
          className="absolute right-4 bottom-4 text-gray-900 font-bold"
          target="_blank"
        >
          Go
        </a>
      </div>

      {/* 두 번째 div */}
      <div
        data-aos="fade-up"
        className="relative p-4 shadow-lg rounded-lg bg-white w-[60%]  space-y-4"
        style={{ height: "400px" }} // 직사각형 높이 설정
      >
        <h2 className="text-xl font-semibold">3F/Lobby</h2>
        <div className="p-4">
          <Slider {...settings}>
            <div>
              <Image
                className="w-full h-60 object-cover rounded-lg"
                src={lobby1}
                alt="Image 1"
                priority={true} // 이 이미지를 우선 로드
              />
            </div>
            <div>
              <Image
                className="w-full h-60 object-cover rounded-lg"
                src={lobby2}
                alt="Image 2"
                priority={true} // 이 이미지를 우선 로드
              />
            </div>
            <div>
              <Image
                className="w-full h-60 object-cover rounded-lg"
                src={lobby3}
                alt="Image 3"
                priority={true} // 이 이미지를 우선 로드
              />
            </div>
          </Slider>
        </div>
        <a
          href="https://www.instagram.com/3f_lobby/"
          className="absolute right-4 bottom-4 text-gray-900 font-bold"
          target="_blank"
        >
          Go
        </a>
      </div>

      {/* 세 번째 div */}
      <div
        data-aos="fade-up"
        className="pb-64 relative p-4 shadow-lg rounded-lg bg-gray-300 w-[60%] ml-80  "
        style={{ height: "400px" }} // 직사각형 높이 설정
      >
        <h2 className="text-xl font-semibold">GoiiGoii</h2>
        <div className="p-4">
          <Image
            className="w-full h-60 object-cover rounded-lg"
            src={GoiiBuilding}
            alt="Image 3"
          />
        </div>
        <a
          href="https://goiigoii.com/"
          className="absolute right-4 bottom-4 text-gray-900 font-bold"
          target="_blank"
        >
          Go
        </a>
      </div>
    </div>
  );
};

export default Archive;
