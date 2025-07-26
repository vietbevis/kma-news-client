import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/uploads/**/*",
      },
      {
        protocol: "https",
        hostname: "minio-api.vittapcode.id.vn",
      },
      {
        protocol: "https",
        hostname: "kma-admin.vittapcode.id.vn",
      },
    ],
  },
  output: "standalone",
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
