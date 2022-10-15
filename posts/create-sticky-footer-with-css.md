---
title: "Create a sticky footer with CSS"
date: "October 10, 2022"
excerpt: "A sticky footer should always 'stick' at the bottom of the page irregardless of whether the page content is too short or long."
image: "image.png"
category: "CSS"
author: "John Mwendwa"
author_image: "https://randomuser.me/api/portraits/men/12.jpg"
isFeatured: true
---

## 1. Using flexbox

```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

footer {
  margin-top: auto;
}
```

## 2. Using calc() function

To use this method you should know or set the height of your footer.

```html
<!--HTML-->
<body>
  <div class="content">content</div>
  <footer class="footer"></footer>
</body>
```

```css
.content {
  min-height: calc(100vh - 50px);
}
.footer {
  height: 50px;
}
```
