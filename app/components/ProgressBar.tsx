import React from "react";

interface ProgressBarProps {
  label: string;
  value: number;
  total: number;
  color?: string;
  showNumbers?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  value,
  total,
  color = "green",
  showNumbers = true,
}) => {
  const percentage = total > 0 ? Math.min(Math.round((value / total) * 100), 100) : 0;

  const colorMap: Record<string, { bg: string; fill: string; border: string }> = {
    green: {
      bg: "bg-[#37464f]",
      fill: "bg-[#58cc02]",
      border: "border-[#46a302]",
    },
    orange: {
      bg: "bg-[#37464f]",
      fill: "bg-[#ff9600]",
      border: "border-[#e58700]",
    },
    blue: {
      bg: "bg-[#37464f]",
      fill: "bg-[#1cb0f6]",
      border: "border-[#168dc3]",
    },
    red: {
      bg: "bg-[#37464f]",
      fill: "bg-[#ff4b4b]",
      border: "border-[#e54343]",
    },
    yellow: {
      bg: "bg-[#37464f]",
      fill: "bg-[#ffc800]",
      border: "border-[#e5b400]",
    },
  };

  const selectedColor = colorMap[color] || colorMap.green;

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        <span className="text-white font-black text-sm uppercase tracking-wide">
          {label}
        </span>
        {showNumbers && (
          <span className="text-zinc-400 font-bold text-xs">
            <span className="text-white">{value}</span> / {total}
          </span>
        )}
      </div>
      <div className={`w-full h-4 ${selectedColor.bg} rounded-full relative overflow-hidden`}>
        <div
          className={`absolute left-0 top-0 h-full ${selectedColor.fill} border-b-4 ${selectedColor.border} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
