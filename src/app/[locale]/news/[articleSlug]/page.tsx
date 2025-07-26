import Container from "@/components/Container";
import RelatedArticles from "@/components/RelatedArticles";
import ShareButton from "@/components/ShareButton";
import TableOfContents from "@/components/TableOfContents";
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
import { getDetailArticleBySlug, getListArticle } from "@/data/loader";
import { Link } from "@/i18n/navigation";
import { formatDate, processHeadings } from "@/lib/utils";
import { Calendar, Clock, User } from "lucide-react";
import { Metadata } from "next";
import { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateStaticParams({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const data = await getListArticle(locale);
  return data.data.map((item: { slug: string }) => ({
    articleSlug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; articleSlug: string }>;
}): Promise<Metadata> {
  const { locale, articleSlug } = await params;
  const data = await getDetailArticleBySlug(locale, articleSlug);
  return {
    title: data.data[0].title,
    description: data.data[0].shortDescription,
    openGraph: {
      title: data.data[0].title,
      description: data.data[0].shortDescription,
      images: [
        {
          url: data.data[0].thumbnail.url,
          width: data.data[0].thumbnail.width,
          height: data.data[0].thumbnail.height,
          alt: data.data[0].thumbnail.alternativeText,
        },
      ],
    },
  };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: Locale; articleSlug: string }>;
}) {
  const { locale, articleSlug } = await params;
  setRequestLocale(locale);
  const data = await getDetailArticleBySlug(locale, articleSlug);
  const t = await getTranslations("Common");

  if (!data || data.data.length === 0) {
    return notFound();
  }

  const article = data.data[0];

  return (
    <Container className="py-4">
      <div className="grid grid-cols-12 gap-6">
        <div className="lg:col-span-8 xl:col-span-9 col-span-12">
          {article.insertToPage && (
            <Breadcrumb className="mb-6">
              <BreadcrumbList className="flex-nowrap">
                <BreadcrumbItem className="text-nowrap whitespace-nowrap inline-block">
                  <BreadcrumbLink asChild>
                    <Link href={`/${article.insertToPage.slug}`}>
                      {article.insertToPage.text}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    {article.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          )}
          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>{article.tag && <Tag {...article.tag} />}</div>
              <div className="flex items-center gap-2">
                <ShareButton
                  url={`${envConfig.NEXT_PUBLIC_APP_URL}/news/${article.slug}`}
                  type="facebook"
                />
                <ShareButton
                  url={`${envConfig.NEXT_PUBLIC_APP_URL}/news/${article.slug}`}
                  type="twitter"
                />
                <ShareButton
                  url={`${envConfig.NEXT_PUBLIC_APP_URL}/news/${article.slug}`}
                  type="linkedin"
                />
                <ShareButton
                  url={`${envConfig.NEXT_PUBLIC_APP_URL}/news/${article.slug}`}
                  type="email"
                />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {article.shortDescription}
            </p>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {article.author && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {t("author")}:
                    <Link
                      href={`/staff/${article.author.username}`}
                      className="text-blue-900 hover:text-blue-950 transition-colors"
                    >
                      {article.author.displayName}
                    </Link>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {t("publishedAt")}: {formatDate(article.publishedAt)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    {t("updatedAt")}: {formatDate(article.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <Image
              image={article.thumbnail}
              className="w-full h-auto rounded-lg shadow-lg aspect-video object-cover"
            />
          </div>
          <article className="prose js-toc-content max-w-none w-full">
            <div
              dangerouslySetInnerHTML={{
                __html: processHeadings(article.content),
              }}
            />
          </article>
        </div>
        <div className="lg:col-span-4 xl:col-span-3 col-span-12">
          <div className="sticky top-16 flex flex-col gap-4">
            <TableOfContents />
            {article.relatedArticles && article.relatedArticles.length > 0 && (
              <RelatedArticles relatedArticles={article.relatedArticles} />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
