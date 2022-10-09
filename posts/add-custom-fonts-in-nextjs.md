---
title: "Adding Custom Fonts in Next.js"
date: "October 1, 2022"
excerpt: "Have you tried using a custom font in your Nextjs app and it seems not to apply at all? Here is how you can add your custom fonts... "
image: "image.png"
category: "JavaScript"
author: "John Mwendwa"
author_image: "https://randomuser.me/api/portraits/men/12.jpg"
isFeatured: true
---

## Next.js only supports Google Fonts and TypeKit ?

At the time of writing this article, Next.js by default only suports font optimization for _Google Fonts_ and _TypeKit_. To add google fonts into Next.js app, create a special document in your pages folder (i.e pages/\_document.js ). Then add a link tag with the font url as shown below :

```js
// pages/_document.js

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

Read more about Google Font Optimization in the official [Next](https://nextjs.org/docs/basic-features/font-optimization) documentation

## Adding Custom Fonts

To include custom fonts in your Next.js project, you first need to download the fonts. You can checkout [onlinewebfonts](https://www.onlinewebfonts.com/) to download the fonts for free.

Next create a fonts folder inside your public folder

```
project
│
|__public
    |
    |___fonts
      │   Jokerman.eot
      │   Jokerman.ttf
      |   Jokerman.woff
      │   Jokerman.woff2

```

Go to the styles global.css file in styles folder and add the following css code:

```
project
|
|__styles
 |   global.css


```

```css
/* styles/global.css */

@font-face {
  font-family: "Jokerman";
  src: url("../public/fonts/Jokerman.eot"),
    url("../public/fonts/Jokerman.woff2") format("woff2"), url("../public/fonts/Jokerman.woff")
      format("woff"), url("../public/fonts/Jokerman.ttf") format("truetype");
}
```

After adding the **@font-face** property, you can use your fonts on any element in your project.
