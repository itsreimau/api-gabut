import fs from "fs";
import path from "path";
import Head from "next/head";

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), "pages", "home.html");
    const htmlContent = fs.readFileSync(filePath, "utf8");
    return {
        props: {
            htmlContent
        }
    };
}

export default function Home({
    htmlContent
}) {
    return (
<div>
    <Head>
        <title>API Gabut</title>
        <meta name="description" content="A collection of APIs created during idle time." />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <div dangerouslySetInnerHTML="{{" __html: htmlContent }} />
</div>
    );
}