import { notFound } from "next/navigation";
import { FadeIn } from "@/components/atoms/FadeIn";
import { AppLink } from "@/components/atoms/Link";
import { blogPosts } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  return { title: post?.title ?? "Blog" };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="py-14">
      <div className="mx-auto max-w-3xl px-4">
        <AppLink href="/blog" className="mb-6 inline-block text-sm text-brand">
          ← Back to Blog
        </AppLink>
        <FadeIn>
          <p className="mb-2 text-sm text-muted">{post.date}</p>
          <h1 className="mb-6 text-4xl font-extrabold text-ink">{post.title}</h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt=""
            className="mb-8 w-full object-cover"
          />
          <p className="text-base leading-relaxed text-body">{post.excerpt}</p>
          <p className="mt-4 text-base leading-relaxed text-body">
            This article is part of Tuppl&apos;s knowledge series on delivery,
            staffing, and data-driven technology partnerships. Reach out via our
            contact page if you would like to discuss how these ideas apply to
            your organization.
          </p>
        </FadeIn>
      </div>
    </article>
  );
}
