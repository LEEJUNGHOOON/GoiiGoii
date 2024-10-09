"use client";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import React from "react";

const KakaoMap = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">회사 위치</h2>
      <Map // 지도 표시
        center={{ lat: 37.519972, lng: 126.989553 }} // 좌표 설정 (서울특별시 용산구 서빙고로 20길 7)
        style={{ width: "100%", height: "400px" }} // 지도의 크기 설정
        level={3} // 지도 확대 레벨
      >
        <MapMarker position={{ lat: 37.519972, lng: 126.989553 }}>
          {" "}
          {/* 마커 위치 */}
          <div style={{ padding: "5px", color: "#000" }}>
            여기가 우리 회사입니다!
          </div>
        </MapMarker>
      </Map>
    </div>
  );
};
