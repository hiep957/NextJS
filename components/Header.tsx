import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Header: React.FC = () => {
  const [userId, setUserId] = useState<string | undefined>();
  const router = useRouter();
  const [user, setUser] = useState<any>();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Load cookie
  useEffect(() => {
    const cookies = document.cookie;
    const userIdCookie = cookies
      .split(";")
      .find((cookie) => cookie.trim().startsWith("userId="));
    if (userIdCookie) {
      const userId = userIdCookie.split("=")[1];
      console.log(userId);
      setUserId(userId);
    }
  }, []);

  useEffect(() => {
    if (!userId) return; // Kiểm tra nếu userId không tồn tại, không thực hiện fetch

    const fetchUser = async () => {
      const res = await fetch(`/api/user/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        console.log(data.user);
      }
    };

    fetchUser();
  }, [userId]); // Thêm userId vào danh sách phụ thuộc

  const isActive = (pathname: string) => router.pathname === pathname;

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // const handleLogout = () => {
  //   document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  //   setUserId(undefined);
  //   router.push("/login");
  // };
  const handleLogout = async() => {
    
      const response = await fetch("/api/auth/sign-out",{
        credentials: "include",
        method: "POST",
      });
      if (response.ok) {
        toast.success("Đăng xuất thành công");
        router.push("/");
      }
    

  };

  return (
    <header className="bg-blue-800 text-white py-4">
      
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-bold ml-2">My Blog</a>
        </Link>
        <ul className="flex space-x-4 mr-1">
        {/* <button onClick={handleLogout}>Logout</button> */}
          {userId ? (
            <div className="relative">
              <button onClick={toggleDropdown}>Xin chào {user?.name}!</button>
              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                  <Link href="/dashboard" legacyBehavior>
                    <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                      Dashboard
                    </a>
                  </Link>
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
                  className={`hover:text-gray-300 ${
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
                className={`hover:text-gray-300 ml-2 ${
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
                className={`hover:text-gray-300 mr-4 ${
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
