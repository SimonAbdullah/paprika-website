const { PagesUrls, TranslationFiles } = require("./src/core/core");

module.exports = {
  locales: ["en", "ar"],
  defaultLocale: "en",
  pages: {
    "*": [TranslationFiles.COMMON],
    [PagesUrls.HOME]: [TranslationFiles.HOME],
    [PagesUrls.RESTAURANTS]: [TranslationFiles.RESTAURANTS],
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./src/utils/locales/${lang}/${ns}.json`).then((m) => m.default),
};
