import { WorkspaceView } from "@/components/views";
import { sections } from "@/lib/sections";

export function generateStaticParams() { return sections.filter((item) => item.slug !== "overview").map(({ slug }) => ({ section: slug })); }

export default async function Page({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  return <WorkspaceView section={section} />;
}
