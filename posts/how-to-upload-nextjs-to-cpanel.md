---
title: "How to upload Nextjs to cpanel"
date: "September 26, 2022"
excerpt: "If you're having problems uploading your nextjs application on cpanel, here is how you should do it..."
image: "nextjs-cpanel.png"
category: "Javascript"
author: "John Mwendwa"
author_image: "https://randomuser.me/api/portraits/men/12.jpg"
isFeatured: true
---

## Step 1 : Navigate to the domains section

![show subdomain](show-subdomain.png)

## Step 2 : Create a subdomain

If you are not building for the main domain of your site, you should first create a subdomain for your new application.

![create subdomain](create-subdomain.png)

## Step 3 : Go to the software section and click Setup Node.js App

![show nodejs path](show-nodejs.png)

## Step 4 : Create a new application

Click the create application button to create a new Nodejs application.

![create application](create-application.png)

## Step 5 : Choose the Nodejs version and Application mode

Choose the appropriate Nodejs version for your application.
The recommended version is **14.18.3** or **higher** but you can choose according to the version you used in your machine when creating your Nextjs application.

Under the application mode, select production mode.

![setup nodejs](setup-nodejs.png)

## Step 6 : Go to File Manager

![show file-manager](show-file-manager.png)

## Step 7 : Upload your files

Before you upload your files you must first make changes to your **package.json** file.
Insert the following lines in your script :

```js
 "scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "NODE_ENV=production node server.js"
  }
```

Then create a **server.js** file and insert the following code :

```js
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT || 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === "/a") {
        await app.render(req, res, "/a", query);
      } else if (pathname === "/b") {
        await app.render(req, res, "/b", query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```

You can learn more about the custom server file from [Nextjs](https://nextjs.org/docs/advanced-features/custom-server).

Next, run your build command :

```js
$ npm run build
```

For you to upload your application files you have to zip them first.

The only files you're going to zip are your **package.json**, **next.config.js**, **server.js** and **.next** folder.

Click the upload link in the file manager and drag your zip file there to upload. Then extract your files and delete the zip file.

![file-manager](upload-files.png)

## Step 8 : Copy the virtual environment command provided

Navigate back to the setup Nodejs section and press the edit icon. Press the **STOP APP** button and then copy the environment command located at the top of the page. You can just click it and it will be automatically saved to your clipboard.

![copy terminal](copy-terminal.png)

## Step 9 : Navigate to the advanced section and click the Terminal link

![show terminal](show-terminal.png)

## Step 10 : Paste the command you copied

In the terminal, paste the command you've just copied. If you're on window use the _Ctrl + Shift + V_ to paste the command.

![terminal](terminal.png)

Then run the below command to install all your dependencies :

```js
$ npm install
```

After all the dependencies have been installed, go back to the **Setup Nodejs App section** and start your application. There you go, your app is now online.
