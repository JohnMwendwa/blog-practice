import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <div>
        <Link href="/">
          <a> Mwendwa&quot;s Blog</a>
        </Link>
      </div>

      <ul>
        <li>
          <Link href="/posts">
            <a> Posts</a>
          </Link>
          <Link href="/about">
            <a> About</a>
          </Link>
          <Link href="/contact">
            <a> Contact</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
