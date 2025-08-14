import Image from 'next/image';

export default function BackgroundShapes() {
  return (
    <div className="absolute inset-0 z-0">
      <Image
        src="/Shape1.png"
        alt="Decorative shape"
        width={208}
        height={208}
        className="absolute right-[5%] w-52 h-52"
        priority={false}
      />
      <Image
        src="/Shape2.png"
        alt="Decorative shape"
        width={208}
        height={208}
        className="absolute bottom-[20%] left-[5%] w-52 h-52 md:w-[40%] md:h-[60%]"
        priority={false}
      />
      <Image
        src="/Shape2.png"
        alt="Decorative shape"
        width={208}
        height={208}
        className="hidden md:block absolute bottom-[2%] transform -scale-x-100 right-[2%] w-52 h-52 md:w-[30%] md:h-[30%]"
        priority={false}
      />
    </div>
  );
}