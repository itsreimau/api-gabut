import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
<div className="{styles.container}">
    <head>
        <title>API Gabut</title>
        <meta name="description" content="API yang dibuat saat senggang" />
        <link rel="icon" href="/favicon.ico" />
    </head>

    <main className="{styles.main}">
        <h1 className="{styles.title}">
            Welcome to API Gabut!
        </h1>

        <p className="{styles.description}">
            A collection of APIs created during idle time.
        </p>

        <div className="{styles.grid}">
            <a href="#jadwalsholat" className="{styles.card}">
                <h2>Jadwal Sholat API &rarr;</h2>
                <p>Get prayer times based on the city.</p>
            </a>

            <a href="#quote" className="{styles.card}">
                <h2>Random Quote API &rarr;</h2>
                <p>Get random inspirational quotes.</p>
            </a>
        </div>

        <section id="jadwalsholat" className="{styles.section}">
            <h2>Jadwal Sholat API</h2>
            <p><code>GET /jadwalsholat?query=&lt;city&gt;</code></p>
            <p>Parameter:</p>
            <ul>
                <li><code>query</code> (required): Nama kota untuk mendapatkan jadwal sholat.</li>
            </ul>
        </section>

        <section id="quote" className="{styles.section}">
            <h2>Random Quote API</h2>
            <p><code>GET /quote</code></p>
            <p>Response:</p>
            <pre className="{styles.code}">
{`{
  "status": true,
  "creator": "@itsreimau",
  "quote": "The only limit to our realization of tomorrow is our doubts of today."
}`}

            </pre>
        </section>
    </main>

    <footer className="{styles.footer}">
        <a href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
            Powered by{' '}
            <span className="{styles.logo}">
                <img src="/vercel.svg" alt="Vercel Logo" width="{72}" height="{16}" />
            </span>
        </a>
    </footer>
</div>
    )
}