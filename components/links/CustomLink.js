import Link from "next/link";
import { useRouter } from "next/router";

function CustomLink({ href, children, ...props }) {
  const router = useRouter();

  return (
    <Link
      href={href}
      {...props}
      className={router.asPath === href ? "active" : ""}
    >
      {children}
    </Link>
  );
}

export default CustomLink;
