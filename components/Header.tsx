import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "../lib/UserContext";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearUser } from "../features/user/userSlice";

const Header: React.FC = () => {
  const router = useRouter();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dispatch = useAppDispatch();
  const user1 = useAppSelector((state) => state.user.user);
  const isActive = (pathname: string) => router.pathname === pathname;

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    const response = await fetch("/api/auth/sign-out", {
      credentials: "include",
      method: "POST",
    });
    if (response.ok) {
      toast.success("Đăng xuất thành công");

      dispatch(clearUser());
      router.push("/");
    }
  };
  //fixed top-0 left-0 right-0 z-50
  return (
    <header className="bg-white shadow-md py-4 ">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-bold text-blue-600">My Blog</a>
        </Link>
        <ul className="flex space-x-4 items-center">
          {user1 ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Xin chào {user1?.name}!
              </button>
              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
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
                className={`hover:text-blue-600 ${
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
                className={`hover:text-blue-600 ${
                  isActive("/posts/new") ? "text-blue-400" : ""
                }`}
              >
                New Post
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
