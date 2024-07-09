import Image from "next/image";
import goii_main from "../../public/goiigoii/goiigoii_main.jpeg";
import goii_mobile from "../../public/goiigoii/goiigoii_mobile.jpeg";

export default function Home() {
  return (
    <main >
      <Image src={goii_main} alt="GOIIgOOii"/>
    </main>
  );
}
