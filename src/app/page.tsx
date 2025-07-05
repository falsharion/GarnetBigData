import Image from "next/image";

export default function Home() {
  return (
    <div className=" flex bg-white flex-col md:flex-row justify-center items-center h-screen font-[family-name:var(--font-geist-sans)]">
      <img src="/GARNET.png" alt="Garnetbigdata Logo" />
      <h1 className=" text-4xl md:text-5xl text-black font-extrabold">Coming Soon</h1>
    </div>
  );
}
