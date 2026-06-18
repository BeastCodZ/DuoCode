"use client";

import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

export default function BackButton() {
  const router = useRouter();

  function handleBack() {
    // If the user has history, go back.
    // Otherwise, send them home.
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
        border-b-4
        border-[#37464f]

        bg-[#202f36]

        px-4
        py-2

        font-bold
        text-zinc-200

        transition-all
        duration-150

        hover:-translate-y-0.5
        hover:border-[#58CC02]
        hover:text-white

        active:translate-y-0.5
        active:border-b-2
      "
      aria-label="Go back"
    >
      <BiArrowBack size={20}/>
      <span className="hidden sm:inline">Back</span>
    </button>
  );
}