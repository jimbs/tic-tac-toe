import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {

  return (
    <Html lang="en">
      <Head />
      <body>
        <div className="display-block content-end justify-end flex">
          <span className="min-w-fit px-2 mx-4 my-2 bg-lime-100 text-black border-teal-100 flex">
            {process.env.NEXT_PUBLIC_DOLE_MONITORING_API}:
            <b id="dole_status" className="ml-2">
              status...
            </b>
          </span>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
