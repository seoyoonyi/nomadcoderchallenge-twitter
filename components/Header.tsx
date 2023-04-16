import Link from "next/link";
import React from "react";

const Header = ({ handleLogout, userData }: any) => {
  return (
    <div className="flex justify-between w-full h-20 px-6 py-2">
      <h1 className="flex justify-center h-full py-4">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-full"
          >
            <path
              d="M24 4.563c-.875.389-1.823.656-2.826.774a4.883 4.883 0 0 0 2.136-2.693 9.77 9.77 0 0 1-3.102 1.18 4.89 4.89 0 0 0-8.306 4.47A13.865 13.865 0 0 1 1.66 3.46a4.884 4.884 0 0 0 1.513 6.526A4.843 4.843 0 0 1 1 9.986v.062a4.884 4.884 0 0 0 3.905 4.781c-.362.1-.737.15-1.13.15-.274 0-.542-.025-.803-.072a4.883 4.883 0 0 0 4.553 3.38 9.784 9.784 0 0 1-6.067 2.088c-.39 0-.777-.023-1.158-.067a13.86 13.86 0 0 0 7.474 2.192c9.032 0 13.978-7.494 13.978-13.977 0-.212-.005-.422-.014-.63a9.994 9.994 0 0 0 2.457-2.54l-.001-.001z"
              fill="#1DA1F2"
            ></path>
          </svg>
        </Link>
      </h1>

      {userData && userData.ok ? (
        <button
          className="font-semibold text-blue-500 transition rounded  hover:text-blue-500/75"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      ) : (
        <Link href={"/log-in"}>
          <a className="text-white hover:underline">로그인</a>
        </Link>
      )}
    </div>
  );
};
export default Header;
