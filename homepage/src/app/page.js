import HeroSection from "./components/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-screen h-screen relative bg-[#000000]">
      <div className="absolute bottom-0 right-0 z-[10]">
        <Image
          src="/images/horse.png"
          alt="horse"
          height={300}
          width={300}
          className="absolute right-55 top-40"
        />

        <Image src="/images/cliff.webp" alt="cliff" width={480} height={480} />
      </div>

      <div className="absolute bottom-0 z-[5] w-full h-auto">
        <Image
          src="/images/trees.webp"
          alt="trees"
          width={2000}
          height={2000}
          className="w-full h-full"
        />
      </div>

      <Image
        src="/images/stars.png"
        alt="stars"
        height={300}
        width={300}
        className="absolute top-0 left-0 z-[10]"
      />

      <div
        className="flex items-center w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url(/images/main-bg.webp)" }}
      >
        <div className="pl-10 md:pl-20 sm:pl-20 lg:pl-40 pb-56 md:pb-20 flex flex-col gap-5 z-[15]">
          <HeroSection />
        </div>
      </div>
    </main>
  );
}
