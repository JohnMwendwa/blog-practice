import Link from "next/link";
import { useRouter, wit } from "next/router";

function CustomLink({ href, children, as, ...props }) {
  const router = useRouter();
  let path = router.asPath;
  path = path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;

  return (
    <Link href={href} {...props} className={path === href ? "active" : ""}>
      {children}
    </Link>
  );
}

export default CustomLink;
