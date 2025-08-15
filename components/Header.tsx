import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center gap-3 p-6 bg-black">
      <Image src="/Football_Icon.png" alt="Logo" width={32} height={32} className="w-8 h-8" />
      <h1 className="text-xl font-semibold">Fantasy Football</h1>
    </header>
  );
}
