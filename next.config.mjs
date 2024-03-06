/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ydnsdnymorpywtnyzhvd.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ydnsdnymorpywtnyzhvd.supabase.co",
        port: "",
        pathname: "storage/v1/object/public/avatars/",
      },
    ],
  },
};

export default nextConfig;
