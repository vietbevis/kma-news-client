import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function PageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return children;
}
