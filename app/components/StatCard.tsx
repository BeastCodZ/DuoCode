import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string; // e.g., "green", "orange", "purple", "blue"
  description?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  color = "green",
  description,
}) => {
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    green: {
      bg: "bg-[#58cc02]",
      text: "text-[#58cc02]",
      border: "border-[#46a302]",
    },
    orange: {
      bg: "bg-[#ff9600]",
      text: "text-[#ff9600]",
      border: "border-[#e58700]",
    },
    purple: {
      bg: "bg-[#ce82ff]",
      text: "text-[#ce82ff]",
      border: "border-[#a568cc]",
    },
    blue: {
      bg: "bg-[#1cb0f6]",
      text: "text-[#1cb0f6]",
      border: "border-[#168dc3]",
    },
    yellow: {
      bg: "bg-[#ffc800]",
      text: "text-[#ffc800]",
      border: "border-[#e5b400]",
    },
    red: {
      bg: "bg-[#ff4b4b]",
      text: "text-[#ff4b4b]",
      border: "border-[#e54343]",
    },
    pink: {
      bg: "bg-[#ff69b4]",
      text: "text-[#ff69b4]",
      border: "border-[#e55fa0]"
    }
  };

  const selectedColor = colorMap[color] || colorMap.green;

  return (
    <div className="bg-[#202f36] border-2 border-b-4 border-[#37464f] rounded-3xl p-5 md:p-6 flex items-start gap-4 transition-transform active:translate-y-1 active:border-b-2 h-full">
      {icon && (
        <div className={`text-3xl ${selectedColor.text}`}>
          {icon}
        </div>
      )}
      <div>
        <p className="text-zinc-400 text-xs md:text-sm font-bold uppercase tracking-widest">
          {label}
        </p>
        <h3 className="text-2xl md:text-3xl font-black text-white mt-1">
          {value}
        </h3>
        {description && (
          <p className="text-zinc-500 text-xs mt-1 font-bold italic">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
