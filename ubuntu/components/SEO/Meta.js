import React from 'react'
import Head from 'next/head';

export default function Meta() {
    return (
        <Head>
            
           /* Primary Meta Tags */
            <title>Raj's Portfolio</title>
            <meta charSet="utf-8" />
            <meta name="title" content="Raj Datta" />
            <meta name="description"
                content="Raj's Portfolio" />
            <meta name="author" content="Raj Datta (LunarEclipseCode)" />
            <meta name="keywords"
                content="raj, raj datta, raj's portfolio, raj datta's portfolio, LunarEclipseCode, lunareclipse portfolio" />
            <meta name="robots" content="index, follow" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#E95420" />

            /* Search Engine */
            <meta name="image" content="images/logos/favicon.png" />
            /* Schema.org for Google */
            <meta itemProp="name" content="Raj Datta" />
            <meta itemProp="description"
                content="Raj's Portfolio" />
            <meta itemProp="image" content="images/logos/favicon.png" />
            /* Open Graph general */
            <meta name="og:title" content="Raj Datta" />
            <meta name="og:description"
                content="Raj's Portfolio" />
            <meta name="og:image" content="images/logos/favicon.png" />
            <meta name="og:url" content="http://linux.raj-datta.com/" />
            <meta name="og:site_name" content="Raj's Portfolio" />
            <meta name="og:locale" content="en_US" />
            <meta name="og:type" content="website" />

            <link rel="icon" href="images/logos/favicon.png" />
            <link rel="apple-touch-icon" href="images/logos/favicon.png" />
            <link rel="preload" href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" as="style" />
            <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
            
            
        </Head>
    )
}
