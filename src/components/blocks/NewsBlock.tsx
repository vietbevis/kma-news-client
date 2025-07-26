import { NewsBlockProps } from "@/global";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import CardArticle from "../CardArticle";
import Container from "../Container";
import { Button } from "../ui/button";

export default async function NewsBlock(data: NewsBlockProps) {
  const displayArticles = data.articles.slice(0, 4);
  const t = await getTranslations("Common");

  return (
    <section
      className={`pt-12 ${data.isBackgroundHighlight ? "bg-blue-100" : ""}`}
    >
      <Container>
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
            <div className="relative">
              <h2 className="text-4xl uppercase font-bold">{data.title}</h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-red-500/60 to-red-500 rounded-full"></div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
          </div>
          {data.summary && (
            <p className="text-muted-foreground mt-6 text-md max-w-2xl mx-auto leading-relaxed">
              {data.summary}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {displayArticles.map((article) => (
            <CardArticle key={article.slug} {...article} />
          ))}
        </div>
      </Container>
      {/* View More Link */}
      {data.link && (
        <div className="text-center">
          <Button
            asChild
            className="w-full rounded-none bg-blue-900 hover:bg-blue-950 text-white border-blue-900 hover:text-white"
          >
            <Link
              href={
                data.link.isExternal ? data.link.href : `/${data.link.href}`
              }
              target={data.link.isExternal ? "_blank" : undefined}
              rel={data.link.isExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2"
            >
              {data.link.text}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </section>
  );
}
