import data from "@/learn/data.json";
import LearnClient from "./LearnClient";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const problems = data.filter(
    (p: Record<string, unknown>) => p.category === decodedCategory
  );

  return (
    <LearnClient
      category={decodedCategory}
      problems={problems as never}
    />
  );
}