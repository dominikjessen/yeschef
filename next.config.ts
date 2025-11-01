import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@libsql/client",
    "@libsql/isomorphic-ws",
    "@libsql/core",
    "@prisma/adapter-libsql",
  ],
};

export default nextConfig;
