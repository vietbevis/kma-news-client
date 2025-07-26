import Container from "@/components/Container";
import Image from "@/components/ui/image";
import { getGlobalSetiings, getListStaff } from "@/data/loader";
import { StaffProps } from "@/global";
import { Link } from "@/i18n/navigation";
import { Metadata } from "next";
import { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const { data } = await getGlobalSetiings(locale);
  const t = await getTranslations("Common");

  return {
    title: t("staff"),
    description: t("staff"),
    openGraph: {
      title: t("staff"),
      description: t("staff"),
      images: [
        {
          url: data.favicon.url,
          width: data.favicon.width,
          height: data.favicon.height,
          alt: data.favicon.alternativeText,
        },
      ],
    },
    icons: {
      icon: data.favicon.url,
    },
  };
};

export default async function StaffsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const data = await getListStaff(locale);

  return (
    <Container className="py-4">
      <div className="grid grid-cols-12 gap-4">
        {data.data.map((item: StaffProps) => (
          <div
            key={item.id}
            className="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 flex flex-col gap-4 p-2 border border-border rounded-lg shadow"
          >
            <div>
              <Image
                image={item.avatar}
                className="w-full h-full object-cover"
              />
            </div>
            <Link
              href={`/staff/${item.username}`}
              className="text-lg font-bold hover:text-blue-900 transition-colors"
            >
              {item.displayName}
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
}
