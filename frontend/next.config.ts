/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // ✅ required for static export
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ivworlds.com",
        pathname: "/backend/uploads/gallery/**"
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com"
      }
    ]
  }
};

module.exports = nextConfig;
