"use client";

import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

export default function BackButton() {
  const router = useRouter();

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <button
      onClick={handleBack}
      className="
        fixed
        top-5
        left-5
        z-50

        flex
        items-center
        gap-2

        rounded-2xl
        border-2
        border-[#333333]

        bg-transparent
        backdrop-blur-sm

        px-4
        py-2

        font-bold
        text-zinc-400

        transition-all
        duration-150

        hover:-translate-y-0.5
        hover:border-white
        hover:text-white

        active:translate-y-0.5
      "
      aria-label="Go back"
    >
      <BiArrowBack size={20} className="w-5 h-5 md:w-6 md:h-6"/>
      <span className="hidden sm:inline">Back</span>
    </button>
  );
}