import Link from "next/link";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();

  const isActive = (pathname: string) => router.pathname === pathname;
  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-bold">My Blog</a>
        </Link>
        <ul className="flex space-x-4 mr-1">
          <li>
            <Link href="/" legacyBehavior>
              <a
                className={`hover:text-gray-300 ${
                  isActive("/") ? "text-blue-400" : ""
                }`}
              >
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link href="/posts/new" legacyBehavior>
              <a
                className={`hover:text-gray-300 ${
                  isActive("/posts/new") ? "text-blue-400" : ""
                }`}
              >
                New Post
              </a>
            </Link>
          </li>
          <li>
            <Link href="/products" legacyBehavior>
              <a
                className={`hover:text-gray-300 ${
                  isActive("/products") ? "text-blue-400" : ""
                }`}
              >
                Product
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
