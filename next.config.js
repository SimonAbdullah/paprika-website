/** @type {import('next').NextConfig} */

const nextTranslate = require("next-translate");

const withAntdLess = require("next-plugin-antd-less");

const config = nextTranslate(
  withAntdLess({
    modifyVars: {
      "@primary-color": "#CE4C42",
      "@layout-body-background": "#FFFFFF",
      "@layout-header-background": "@primary-color",
      "@layout-header-color": "@layout-body-background",
      "@layout-footer-background": "#2D303E",
      "@border-radius-base": "5px",
    },
  })
);

module.exports = {
  ...config,
  reactStrictMode: true,
  images: {
    domains: [
      "api.paprika.inter.itland-sy.com",
      "paprika-testing-api.azurewebsites.net",
      "prodapi.paprika-sy.com",
    ],
  },
  async headers() {
    return [
      {
        source: "/images(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=30758400, must-revalidate",
          },
        ],
      },
    ];
  },
};
