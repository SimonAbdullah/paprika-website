/** @type {import('next').NextConfig} */

const nextTranslate = require("next-translate");

const withAntdLess = require("next-plugin-antd-less");

const translate = nextTranslate();

const antd = withAntdLess({
  modifyVars: {
    "@primary-color": "#B12116",
    "@border-radius-base": "5%",
  },
});

module.exports = {
  ...translate,
  ...antd,
  reactStrictMode: true,
};
