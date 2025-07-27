import Container from "@/components/Container";
import RelatedEvents from "@/components/RelatedEvents";
import ShareButton from "@/components/ShareButton";
import Tag from "@/components/Tag";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "@/components/ui/image";
import envConfig from "@/config/env-config";
import { getDetailEventBySlug } from "@/data/loader";
import { EventProps } from "@/global";
import { Link } from "@/i18n/navigation";
import { formatDate, formatEventTime } from "@/lib/utils";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function EventPage({
  params,
}: {
  params: Promise<{ locale: Locale; eventSlug: string }>;
}) {
  const { locale, eventSlug } = await params;
  setRequestLocale(locale);
  const data = await getDetailEventBySlug(locale, eventSlug);
  const t = await getTranslations("Common");

  if (!data || data.data.length === 0) {
    return notFound();
  }

  const eventData = data.data[0] as EventProps;

  return (
    <Container className="py-4">
      <div className="grid grid-cols-12 gap-6">
        <div className="lg:col-span-8 xl:col-span-9 col-span-12">
          {eventData.insertToPage && (
            <Breadcrumb className="mb-4">
              <BreadcrumbList className="flex-nowrap">
                <BreadcrumbItem className="text-nowrap whitespace-nowrap inline-block">
                  <BreadcrumbLink asChild>
                    <Link href={`/${eventData.insertToPage.slug}`}>
                      {eventData.insertToPage.text}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    {eventData.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          )}
          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>{eventData.tag && <Tag {...eventData.tag} />}</div>
              <div className="flex items-center gap-2">
                <ShareButton
                  url={`${envConfig.NEXT_PUBLIC_APP_URL}/events/${eventData.slug}`}
                  type="facebook"
                />
                <ShareButton
                  url={`${envConfig.NEXT_PUBLIC_APP_URL}/events/${eventData.slug}`}
                  type="twitter"
                />
                <ShareButton
                  url={`${envConfig.NEXT_PUBLIC_APP_URL}/events/${eventData.slug}`}
                  type="linkedin"
                />
                <ShareButton
                  url={`${envConfig.NEXT_PUBLIC_APP_URL}/events/${eventData.slug}`}
                  type="email"
                />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              {eventData.name}
            </h1>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {eventData.shortDescription}
            </p>
            <div className="flex items-center justify-between flex-wrap gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {t("speakers")}:
                </span>{" "}
                <span className="text-blue-900 hover:text-blue-950 transition-colors">
                  {eventData.speakers}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {t("updatedAt")}:
                </span>{" "}
                {formatDate(eventData.updatedAt)}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-between mt-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {t("location")}:
                </span>{" "}
                <span>{eventData.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {t("date")}:{" "}
                </span>{" "}
                {formatEventTime(eventData.startDate, locale)} -{" "}
                {formatEventTime(eventData.endDate, locale)}
              </div>
            </div>
          </div>
          <div className="mb-8">
            <Image
              image={eventData.thumbnail}
              className="w-full h-auto rounded-lg shadow-lg aspect-video object-cover"
            />
          </div>
          <article className="prose max-w-none w-full">
            <div
              dangerouslySetInnerHTML={{
                __html: eventData.description,
              }}
            />
          </article>
        </div>
        <div className="lg:col-span-4 xl:col-span-3 col-span-12">
          <div className="sticky top-16 flex flex-col gap-4">
            {eventData.relatedEvents && eventData.relatedEvents.length > 0 && (
              <RelatedEvents relatedEvents={eventData.relatedEvents} />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
