/** @type {import('next').NextConfig} */

const nextTranslate = require("next-translate");

const withAntdLess = require("next-plugin-antd-less");

const antd = withAntdLess({
  modifyVars: {
    "@primary-color": "#B12116",
    "@layout-body-background": "#FFFFFF",
    "@layout-header-background": "@primary-color",
    "@layout-header-color": "@layout-body-background",
    "@layout-footer-background": "#2D303E",
    "@border-radius-base": "5px",
  },
});

module.exports = nextTranslate({
  ...antd,
  reactStrictMode: true,
});
