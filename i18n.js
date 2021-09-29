const { PagesUrls } = require("./src/core/core");

module.exports = {
  locales: ["en", "ar"],
  defaultLocale: "en",
  pages: {
    "*": ["common"],
    [PagesUrls.HOME]: ["home"],
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./src/utils/locales/${lang}/${ns}.json`).then((m) => m.default),
};
