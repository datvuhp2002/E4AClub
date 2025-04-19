/** @type {import('next').NextConfig} */
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const nextConfig = {
  reactStrictMode: false,
  env: {
    ROOT: process.env.ROOT,
    API_URL: process.env.API_URL,
    FILE_URL: process.env.FILE_URL,
    FLIPBOOK_URL: process.env.FLIPBOOK_URL,
    REACT_APP_SITE_KEY: process.env.REACT_APP_SITE_KEY,
    SITE_SECRET: process.env.SITE_SECRET,
    TENANT: process.env.TENANT,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    const rootDir = path.join(__dirname, "./");
    config.externals.push({
      canvas: "canvas",
    });
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(
              rootDir,
              "node_modules/pdfjs-dist/build/pdf.worker.min.js"
            ),
            to: path.join(__dirname, "public"),
          },
          {
            from: path.join(
              rootDir,
              "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
            ),
            to: path.join(__dirname, "public"),
          },
        ],
      })
    );
    return config;
  },
};

module.exports = nextConfig;
