const { PagesUrls, TranslationFiles } = require("./src/core/core");

module.exports = {
  locales: ["en", "ar"],
  defaultLocale: "en",
  pages: {
    "*": [TranslationFiles.COMMON],
    [PagesUrls.HOME]: [TranslationFiles.HOME],
    [PagesUrls.RESTAURANTS]: [TranslationFiles.RESTAURANTS],
    [`${PagesUrls.RESTAURANTS}/[restaurantName]`]: [
      TranslationFiles.RESTAURANT,
    ],
    [`${PagesUrls.EVENT}/[eventId]`]: [TranslationFiles.HOME],
    [`${PagesUrls.POST}/[postId]`]: [TranslationFiles.HOME],
    [`${PagesUrls.MEAL}/[restaurantId]/[categoryId]/[mealId]`]: [
      TranslationFiles.HOME,
    ],
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./src/utils/locales/${lang}/${ns}.json`).then((m) => m.default),
};
