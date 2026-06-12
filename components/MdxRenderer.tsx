import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

type MdxRendererProps = {
  source: string;
  className?: string;
};

export function MdxRenderer({ source, className }: MdxRendererProps) {
  return (
    <article
      className={cn(
        "prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-h1:text-4xl prose-h1:font-semibold prose-h2:border-t prose-h2:border-border prose-h2:pt-8 prose-a:text-primary prose-pre:rounded-md prose-pre:bg-slate-950",
        className
      )}
    >
      <MDXRemote source={source} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
    </article>
  );
}
