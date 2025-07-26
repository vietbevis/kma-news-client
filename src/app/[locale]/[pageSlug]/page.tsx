import CardArticle from "@/components/CardArticle";
import Container from "@/components/Container";
import SidebarNavigation from "@/components/SidebarNavigation";
import {
  getListArticleByNavigationId,
  getNavigationBySlug,
} from "@/data/loader";
import { ArticlesProps } from "@/global";
import { redirect } from "@/i18n/navigation";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const generateStaticParams = async ({
  params,
}: {
  params: Promise<{ locale: Locale; pageSlug: string }>;
}) => {
  const { locale, pageSlug } = await params;
  const data = await getNavigationBySlug(locale, pageSlug);
  return data.data.map((item: any) => ({
    pageSlug: item.slug === "home" ? "/" : item.slug,
  }));
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale; pageSlug: string }>;
}) {
  const { locale, pageSlug } = await params;
  setRequestLocale(locale);
  const data = await getNavigationBySlug(locale, pageSlug);

  if (
    !data ||
    !data?.data ||
    !Array.isArray(data.data) ||
    data.data.length === 0
  ) {
    return notFound();
  }

  const navigation = data.data[0];

  if (!navigation.navigation && navigation.navigations.length === 0) {
    return notFound();
  }

  // Chuyển đến trang con đầu tiên khi vào trang cha
  const firstChild = navigation.navigations[0];
  if (firstChild) {
    redirect({
      href: firstChild.slug === "home" ? "/" : firstChild.slug,
      locale,
    });
  }

  const listArticle = await getListArticleByNavigationId(locale, navigation.id);

  return (
    <Container className="py-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-4 xl:col-span-3">
          <SidebarNavigation {...navigation} />
        </div>
        <div className="col-span-12 lg:col-span-8 xl:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-12">
            {listArticle.data.map((article: ArticlesProps) => (
              <CardArticle key={article.slug} {...article} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
