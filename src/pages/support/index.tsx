import type { NextPage } from "next";
import Head from "next/head";
import { Image } from "antd";

const RestaurantsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{`Support | Paprika`}</title>
      </Head>
      <body dir="ltr">
        <div
          style={{
            width: "80%",
            marginLeft: "10%",
            marginTop: "50px",
            padding: "20px",
            height: "500px",
          }}
        >
          <h1>Paprika Support Team</h1>
          <p>
            For any support needed, please reach us on{" "}
            <a href="mailto:support@paprika-rest.sy">support@paprika-rest.sy</a>.
          </p>
          <p>
            We’ll get back to you about your order as soon as possible. Feel
            free to reach us anytime, we are available for our customers 24/7.
          </p>
          <p>Thank you in advanced.</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image
              src="/images/logo/paprika.png"
              alt="Paprika Logo"
              width={200}
              height={200}
              preview={false}
            />
          </div>
        </div>
      </body>
    </>
  );
};

export default RestaurantsPage;
