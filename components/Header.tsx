import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "../lib/UserContext";

const Header: React.FC = () => {
  const [userId, setUserId] = useState<string | undefined>();
  const router = useRouter();
  const {user, setUser} = useUser();
  const [dropdownVisible, setDropdownVisible] = useState(false);

 

  const isActive = (pathname: string) => router.pathname === pathname;

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };


  const handleLogout = async() => {
    
      const response = await fetch("/api/auth/sign-out",{
        credentials: "include",
        method: "POST",
      });
      if (response.ok) {
        toast.success("Đăng xuất thành công");
        setUser(null);
        router.push("/");
      }
    

  };

  return (
    <header className="bg-white-800 text-black py-4  ">
      
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-bold ml-2">My Blog</a>
        </Link>
        <ul className="flex space-x-4 mr-1">
        {/* <button onClick={handleLogout}>Logout</button> */}
          {user ? (
            <div className="relative">
              <button onClick={toggleDropdown}>Xin chào {user?.name}!</button>
              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                  {/* <Link href="/dashboard" legacyBehavior>
                    <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                      Dashboard
                    </a>
                  </Link> */}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <li>
              <Link href="/login" legacyBehavior>
                <a
                  className={`hover:text-blue-600 ${
                    isActive("/login") ? "text-blue-400" : ""
                  }`}
                >
                  Login
                </a>
              </Link>
            </li>
          )}

          <li>
            <Link href="/" legacyBehavior>
              <a
                className={`hover:text-blue-600 ml-2 ${
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
                className={`hover:text-blue-600 mr-2 ${
                  isActive("/posts/new") ? "text-blue-400" : ""
                }`}
              >
                New Post
              </a>
            </Link>
          </li>
          {/* <li>
            <Link href="/products" legacyBehavior>
              <a
                className={`hover:text-gray-300 mr-4 ${
                  isActive("/products") ? "text-blue-400" : ""
                }`}
              >
                Product
              </a>
            </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
