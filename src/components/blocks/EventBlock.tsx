import { EventBlockProps } from "@/global";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import CardEvent from "../CardEvent";
import Container from "../Container";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "../ui/image";

export default function EventBlock(data: EventBlockProps) {
  const displayEvents = data?.events || [];
  return (
    <section
      className={`overflow-hidden group ${
        data.isBackgroundHighlight ? "bg-blue-100" : ""
      }`}
    >
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            image={data.backgroundImage}
            className="object-cover w-full h-full object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <Container className="relative z-10 py-12">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-3">
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
              <div className="relative">
                <h2 className="text-4xl uppercase font-bold text-white">
                  {data.title}
                </h2>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-red-500/60 to-red-500 rounded-full"></div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
            </div>
            {data.summary && (
              <p className="mt-6 text-md text-white/90 max-w-2xl mx-auto leading-relaxed">
                {data.summary}
              </p>
            )}
          </div>
          {/* Events Grid */}
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {displayEvents.map((event) => (
                  <CarouselItem
                    key={event.slug}
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <CardEvent {...event} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4 md:-left-12 md:hidden md:group-hover:flex" />
              <CarouselNext className="-right-4 md:-right-12 md:hidden md:group-hover:flex" />
            </Carousel>
          </div>
        </Container>
      </div>
      {/* View More Button */}
      {data.link && (
        <div className="text-center">
          <Button
            asChild
            className="group w-full rounded-none relative bg-blue-900 hover:bg-blue-950 text-white border-blue-900 hover:text-white"
          >
            <Link
              href={data.link.href}
              target={data.link.isExternal ? "_blank" : undefined}
              rel={data.link.isExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2"
            >
              {data.link.text}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      )}
    </section>
  );
}
