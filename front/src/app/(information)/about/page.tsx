"use client";

import { useState } from "react";
import {
  FullpageContainer,
  FullpageSection,
} from "@shinyongjun/react-fullpage";
import "@shinyongjun/react-fullpage/css";
import CompanySection from "@/components/companySection";
import Image from "next/image";
import GoiiBuilding from "../../../../public/goiigoii/goiibuilding.jpeg";

function MyPage() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <FullpageContainer
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
    >
      <FullpageSection>
        <CompanySection
          title="GoiiGoii_Seoul"
          subtitle="고이고이 사랑하는 마음을 담아 고이고이 간직하다"
          imageSrc="/goiigoii/goii1.jpeg"
          description="포장 가게를 준비하며 우리가 세운 목표 중 하나는 번거롭고, 어렵게 느껴지는 포장을 쉽게 소개하는 것이었습니다.
누구나 쉽게 따라 할 수 있는 포장법을 제안하고,
포장을 풀고 난 후에도 재사용이 가능한 재료를 만들기 위해 다양한 방법을 고민했습니다."
        />
      </FullpageSection>
      <FullpageSection>
        <CompanySection
          title="Package"
          subtitle="단순 포장이 아닙니다."
          imageSrc="/goiigoii/goii2.jpeg"
          description="선물을 포장하던 재료들이 일상에서 새로운 역할을 하기를 바랍니다.
그렇게 우리의 마음에도, 일상에도 오래오래 남는 선물이 되었으면 좋겠습니다. 🎁"
        />
      </FullpageSection>
      <FullpageSection>
        <CompanySection
          title="Culture"
          subtitle="문화를 만들고자 합니다."
          imageSrc="/goiigoii/goii3.jpeg"
          description="고이고이(goiigoii)는 선물에 마음을 담는 방법을 고민하고, 제안합니다.
선물을 하는 사람과 받는 사람 모두에게 고이고이 간직될 추억을 만드는 공간이 되기를 바랍니다."
        />
      </FullpageSection>
      <FullpageSection isAutoHeight>
        <div>
          <Image className="w-" src={GoiiBuilding} alt="buldingIMG"></Image>
        </div>
      </FullpageSection>
    </FullpageContainer>
  );
}

export default MyPage;
