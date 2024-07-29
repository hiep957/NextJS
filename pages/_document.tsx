import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

class AppDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {/* <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""></link> */}
                    {/* <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap" rel="preload" as="font" type="font/woff2" crossOrigin="anonymous"></link> */}

                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

AppDocument.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App: any) => (props) => <App {...props} />
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        styles: [
            ...React.Children.toArray(initialProps.styles),
        ]
    }
}


export default AppDocument;