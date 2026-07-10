import { FadeIn } from "@/components/atoms/FadeIn";
import { Heading } from "@/components/atoms/Heading";
import { AppLink } from "@/components/atoms/Link";
import { blogPosts } from "@/content/site";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        <FadeIn>
          <Heading eyebrow="Insights" align="center">
            Blog
          </Heading>
        </FadeIn>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {blogPosts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.05}>
              <article className="overflow-hidden bg-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt=""
                  className="h-44 w-full object-cover"
                />
                <div className="p-5">
                  <p className="mb-2 text-xs text-muted">{post.date}</p>
                  <h3 className="mb-2 text-lg font-bold text-ink">
                    <AppLink href={`/blog/${post.slug}`}>{post.title}</AppLink>
                  </h3>
                  <p className="text-sm text-body">{post.excerpt}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
