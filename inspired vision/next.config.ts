/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ✅ Required for static export
  images: {
    unoptimized: true, // ✅ Static export doesn't support optimized images
    domains: [
      "res.cloudinary.com",
      "m.media-amazon.com",
      "images.unsplash.com",
      "cdn.example.com"
    ],
  },
  // basePath: '/RV-Web-Internship-Task',   // 👈 yaha apne GitHub repo ka naam daalna
  // assetPrefix: '/RV-Web-Internship-Task/', // 👈 same repo name
};

module.exports = nextConfig;  