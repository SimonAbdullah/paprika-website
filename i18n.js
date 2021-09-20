module.exports = {
  locales: ["en", "ar"],
  defaultLocale: "en",
  pages: {
    "*": ["common"],
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./src/utils/locales/${lang}/${ns}.json`).then((m) => m.default),
};
