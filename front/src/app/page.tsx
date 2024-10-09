import Image from "next/image";
import goii_main from "../../public/goiigoii/goiigoii_main.jpeg";

export default function Home() {
  return (
    <main>
      <Image src={goii_main} alt="GOIIgOOii" />
    </main>
  );
}
