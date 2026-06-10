type Props = {
  values: number[];
};

export default function Heatmap({
  values,
}: Props) {
  return (
    <div className="grid grid-cols-7 gap-1.5">
      {values.map(
        (value, index) => {
          let color = "bg-[#202f36]"; // Lighter than background for empty days

          if (value > 0)
            color = "bg-[#58cc02]/30";

          if (value > 2)
            color = "bg-[#58cc02]/60";

          if (value > 4)
            color = "bg-[#58cc02]/80";

          if (value > 8)
            color = "bg-[#58cc02]";

          return (
            <div
              key={index}
              className={`
                w-4
                h-4
                md:w-5
                md:h-5
                rounded-md
                ${color}
                transition-colors
                border border-white/5
              `}
              title={`${value} submissions`}
            />
          );
        }
      )}
    </div>
  );
}
