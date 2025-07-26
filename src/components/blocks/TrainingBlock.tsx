import { TrainingBlockProps } from "@/global";
import { Link } from "@/i18n/navigation";
import { ArrowRight, BookOpen } from "lucide-react";
import CardArticle from "../CardArticle";
import { Button } from "../ui/button";

export default function TrainingBlock(data: TrainingBlockProps) {
  const displayArticles = data.articles.slice(0, 4);

  return (
    <section
      className={`py-20 ${data.isBackgroundHighlight ? "bg-blue-100" : ""}`}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
            <div className="relative">
              <h2 className="text-4xl uppercase font-bold">{data.title}</h2>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-red-500/60 to-red-500 rounded-full"></div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
          </div>
          {data.summary && (
            <p className="text-muted-foreground mt-6 text-md max-w-2xl mx-auto leading-relaxed">
              {data.summary}
            </p>
          )}
        </div>

        {/* Training Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {displayArticles.map((article) => (
            <CardArticle key={article.slug} {...article} />
          ))}
        </div>

        {/* View More Link */}
        {data.link && (
          <div className="text-center">
            <Button
              size="lg"
              asChild
              className="group bg-blue-900 hover:bg-blue-950 text-white hover:text-white"
            >
              <Link
                href={
                  data.link.isExternal ? data.link.href : `/${data.link.href}`
                }
                target={data.link.isExternal ? "_blank" : undefined}
                rel={data.link.isExternal ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                {data.link.text}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
