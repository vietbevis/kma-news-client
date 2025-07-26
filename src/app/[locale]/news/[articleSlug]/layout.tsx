import Container from "@/components/Container";
import React from "react";

export default function LayoutNewsPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container className="py-4">{children}</Container>;
}
