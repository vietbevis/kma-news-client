/* eslint-disable no-restricted-imports */
import envConfig from "@/config/env-config";
import { ImageProps } from "@/global";
import NextImage, { ImageProps as NextImageProps } from "next/image";

const checkImageUrl = (url: string) => {
  if (!url) return "";

  return url.startsWith("http")
    ? url
    : `${envConfig.NEXT_PUBLIC_API_ENDPOINT}${url}`;
};

export default function Image({
  image,
  ...props
}: { image: ImageProps } & Omit<
  NextImageProps,
  "src" | "alt" | "width" | "height"
>) {
  if (!image) {
    return (
      <NextImage
        src={"/placeholder.svg"}
        alt="placeholder"
        {...props}
        width={500}
        height={500}
      />
    );
  }

  return (
    <NextImage
      {...props}
      src={checkImageUrl(image.url)}
      alt={image.alternativeText || image.url}
      width={image.width}
      height={image.height}
    />
  );
}
