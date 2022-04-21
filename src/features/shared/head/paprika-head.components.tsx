import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { FunctionComponent } from "react";
import { HomeMetaData } from "../../../core/constants";
import { TranslationFiles } from "../../../core/core";

interface PaprikaHeadProps {
  restaurantName?: string;
  ogUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

const PaprikaHead: FunctionComponent<PaprikaHeadProps> = ({
  restaurantName,
  ogUrl,
  ogTitle,
  ogDescription,
  ogImage,
}) => {
  const { t: tCommon } = useTranslation(TranslationFiles.COMMON);

  const { t } = useTranslation(TranslationFiles.HOME);

  const extractDimensionsFromImageURL = (url: string) => {
    let regEx = new RegExp("~([0-9]+)x([0-9]+)~");

    let matches = url?.match(regEx);

    var width = matches ? parseInt(matches[1].toString()) : 480;
    var height = matches ? parseInt(matches[2].toString()) : 360;

    return [width, height];
  };

  const imageDimensions = extractDimensionsFromImageURL(ogImage);

  return (
    <Head>
      <title>
        {restaurantName
          ? `${restaurantName} | ${tCommon("paprika")}`
          : t("paprika")}
      </title>
      <meta property="og:url" content={ogUrl} />
      <meta property="og:site_name" content={HomeMetaData.siteName} />
      <meta property="og:type" content={"website"} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content={`${imageDimensions[0]}`} />
      <meta property="og:image:height" content={`${imageDimensions[1]}`} />
    </Head>
  );
};
export default PaprikaHead;
