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
    <div className="relative flex flex-col items-center">      
        <Image src={iconUrl} alt={name} width={200} height={200} className="group w-6 h-6 md:w-8 md:h-8 object-contain" />
    </div>
  );
};

export default BadgeIcon;
