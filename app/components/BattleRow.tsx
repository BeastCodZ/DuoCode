import React from "react";

interface BattleRowProps {
  label: string;
  user1Value?: number;
  user2Value?: number;
  icon?: string;
  color?: "green" | "orange" | "purple" | "blue" | "red" | "yellow";
}

const BattleRow: React.FC<BattleRowProps> = ({
  label,
  user1Value = 0,
  user2Value = 0,
  icon,
  color = "green",
}) => {
  const v1 = user1Value || 0;
  const v2 = user2Value || 0;

  const total = v1 + v2 || 1;
  const user1Percentage = (v1 / total) * 100;
  const user2Percentage = (v2 / total) * 100;

  const colorMap: Record<string, { fill: string; border: string }> = {
    green: { fill: "bg-[#58cc02]", border: "border-[#46a302]" },
    orange: { fill: "bg-[#ff9600]", border: "border-[#e58700]" },
    purple: { fill: "bg-[#ce82ff]", border: "border-[#a568cc]" },
    blue: { fill: "bg-[#1cb0f6]", border: "border-[#168dc3]" },
    red: { fill: "bg-[#ff4b4b]", border: "border-[#e54343]" },
    yellow: { fill: "bg-[#ffc800]", border: "border-[#e5b400]" },
  };

  const selectedColor = colorMap[color] || colorMap.green;

  return (
    <div className="bg-[#202f36] border-2 border-b-4 border-[#37464f] rounded-2xl p-5 mb-4 relative overflow-hidden group">
      <div className="flex justify-between items-center mb-3 relative z-10">
        <div className="flex flex-col items-start w-1/3">
          <span className={`text-xl md:text-2xl font-black ${v1 >= v2 ? selectedColor.fill.replace('bg-', 'text-') : 'text-white'}`}>
            {v1.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col items-center w-1/3">
          <div className="flex items-center gap-2">
            {icon && <span className="text-lg">{icon}</span>}
            <span className="text-zinc-400 font-bold uppercase text-[10px] md:text-xs tracking-widest text-center">{label}</span>
          </div>
        </div>
        <div className="flex flex-col items-end w-1/3">
          <span className={`text-xl md:text-2xl font-black ${v2 >= v1 ? selectedColor.fill.replace('bg-', 'text-') : 'text-white'}`}>
            {v2.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex w-full h-4 bg-[#37464f] rounded-full overflow-hidden relative border-2 border-[#131f24]">
        <div
          className={`h-full ${selectedColor.fill} transition-all duration-1000 ease-out relative`}
          style={{ width: `${user1Percentage}%` }}
        >
             {/* The Fire Divider */}
             <div className="absolute right-[-4px] top-0 h-full w-2 z-20 animate-fire rounded-full shadow-[0_0_15px_rgba(255,150,0,0.8)]" />
        </div>
        
        <div
          className={`h-full bg-zinc-700 transition-all duration-1000 ease-out`}
          style={{ width: `${user2Percentage}%` }}
        />
        
        {/* If user 2 is winning, we show the fire on their edge of the common boundary */}
        {v2 > v1 && (
            <div 
                className={`absolute right-0 top-0 h-full ${selectedColor.fill} transition-all duration-1000 ease-out`}
                style={{ width: `${user2Percentage}%` }}
            >
                <div className="absolute left-[-4px] top-0 h-full w-2 z-20 animate-fire rounded-full shadow-[0_0_15px_rgba(255,150,0,0.8)]" />
            </div>
        )}
      </div>
    </div>
  );
};

export default BattleRow;
