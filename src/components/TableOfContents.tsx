"use client";
import { Dock } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import tocbot from "tocbot";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function TableOfContents() {
  const t = useTranslations("TOC");
  useEffect(() => {
    tocbot.init({
      tocSelector: ".js-toc",
      contentSelector: ".js-toc-content",
      headingSelector: "h1, h2, h3, h4, h5, h6",
      scrollSmooth: true,
      activeLinkClass: "is-active-link",
      hasInnerContainers: true,
      linkClass: "toc-link",
      listClass: "toc-list",
      listItemClass: "toc-list-item",
      activeListItemClass: "is-active-li",
      collapseDepth: 0,
      scrollSmoothOffset: -100,
      headingsOffset: 100,
    });
    return () => tocbot.destroy();
  }, []);

  return (
    <Card className="p-0 overflow-hidden gap-0 lg:flex hidden">
      <CardHeader className="bg-blue-900 text-white gap-0 px-4 py-2">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Dock className="size-5" />
          {t("tableOfContents")}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-2">
        <nav className="toc-container flex flex-col gap-4 overflow-hidden relative">
          <div className="js-toc" />
        </nav>
      </CardContent>
    </Card>
  );
}
