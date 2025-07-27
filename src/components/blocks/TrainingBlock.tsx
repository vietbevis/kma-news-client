import { TrainingBlockProps } from "@/global";
import { Link } from "@/i18n/navigation";
import { ArrowRight, BookOpen } from "lucide-react";
import CardArticle from "../CardArticle";
import Container from "../Container";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export default function TrainingBlock(data: TrainingBlockProps) {
  const displayArticles = data?.articles || [];

  return (
    <section
      className={`py-20 group ${
        data.isBackgroundHighlight ? "bg-blue-100" : ""
      }`}
    >
      <Container>
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
            <div className="relative">
              <h2 className="xl:text-4xl md:text-3xl text-2xl uppercase font-bold">
                {data.title}
              </h2>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-red-500/60 to-red-500 rounded-full"></div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
          </div>
          {data.summary && (
            <p className="text-muted-foreground mt-6 text-base lg:text-md max-w-2xl mx-auto leading-relaxed">
              {data.summary}
            </p>
          )}
        </div>

        {/* Training Programs Grid */}
        <div className="relative mb-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {displayArticles.map((article) => (
                <CarouselItem
                  key={article.slug}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <CardArticle {...article} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-12 md:hidden md:group-hover:flex" />
            <CarouselNext className="-right-4 md:-right-12 md:hidden md:group-hover:flex" />
          </Carousel>
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
      </Container>
    </section>
  );
}
