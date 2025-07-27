import ArticleGrid from "@/components/ArticleGrid";
import Container from "@/components/Container";
import EventsGrid from "@/components/EventsGrid";
import SidebarNavigation from "@/components/SidebarNavigation";
import StaffGrid from "@/components/StaffGrid";
import {
  getAllNavigation,
  getListArticleByNavigationId,
  getListEventByNavigationId,
  getListStaff,
  getNavigationBySlug,
} from "@/data/loader";
import { NavigationItemProps } from "@/global";
import { redirect } from "@/i18n/navigation";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const generateStaticParams = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const { locale } = await params;
  const data = await getAllNavigation(locale);
  return data.data
    .filter((item: any) => item.slug !== "home")
    .map((item: any) => ({
      pageSlug: item.slug,
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

  const navigation = data.data[0] as NavigationItemProps;

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

  const [listArticle, listEvent, listStaff] = await Promise.all([
    getListArticleByNavigationId(locale, navigation.id),
    getListEventByNavigationId(locale, navigation.id),
    getListStaff(locale),
  ]);

  return (
    <Container className="py-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-4 xl:col-span-3">
          <SidebarNavigation {...navigation} />
        </div>
        <div className="col-span-12 lg:col-span-8 xl:col-span-9">
          {navigation.pageType === "news" && listArticle && (
            <ArticleGrid listArticle={listArticle.data} />
          )}
          {navigation.pageType === "events" && listEvent && (
            <EventsGrid listEvent={listEvent.data} />
          )}
          {navigation.pageType === "single" && (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: navigation.singlePageContent,
              }}
            />
          )}
          {navigation.pageType === "staff" && listStaff && (
            <StaffGrid listStaff={listStaff.data} />
          )}
        </div>
      </div>
    </Container>
  );
}
