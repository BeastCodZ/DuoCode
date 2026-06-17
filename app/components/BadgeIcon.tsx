import React from "react";
import Image from "next/image";

interface BadgeIconProps {
  name: string;
  icon: string;
}

const BadgeIcon: React.FC<BadgeIconProps> = ({ name, icon }) => {
  const iconUrl = icon.startsWith("http")
    ? icon
    : `https://leetcode.com${icon}`;

  return (
    <div className="group relative flex flex-col items-center">
      <div className="bg-[#202f36] border-2 border-b-4 border-[#37464f] rounded-2xl p-3 md:p-4 transition-transform hover:scale-110 active:translate-y-1 active:border-b-2">
        <Image src={iconUrl} alt={name} width={200} height={200} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
      </div>
      <div className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 text-white text-[10px] px-2 py-1.5 rounded-lg whitespace-nowrap z-20 pointer-events-none border border-zinc-700 font-bold shadow-2xl">
        {name}
      </div>
    </div>
  );
};

export default BadgeIcon;
