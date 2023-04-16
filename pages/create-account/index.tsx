import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  name: string;
  email: string;
  password: string;
}

const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onValid = async (data: IForm) => {
    if (!loading) {
      setLoading(true);

      const request = await fetch("/api/users/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (request.status === 200) {
        alert("Account already exists! Please log in!");
      }
      if (request.status === 201) {
        alert("Account created! Please log in!");
      }
      if (request.status !== 405) {
        router.push("/log-in");
      }

      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 h-5/6">
        <h1 className="flex justify-center h-12 mb-6">
          <Link
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
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
        <h2 className="flex justify-center h-12 mb-6 text-3xl font-bold">
          지금 트위터에 가입하세요
        </h2>
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col justify-between h-5/6"
        >
          <div>
            <div className="mb-2">
              {/* <label htmlFor="name" className="block mb-2 text-gray-700">
                Name:
              </label> */}
              <input
                type="text"
                placeholder="이름"
                {...register("name", { required: "이름을 입력주세요." })}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md h-14 focus:outline-none focus:border-blue-500 focus:border-2"
              />
              <span className="text-red-500">{errors?.name?.message}</span>
            </div>
            <div className="mb-2">
              {/* <label htmlFor="email" className="block mb-2 text-gray-700">
                Email:
              </label> */}
              <input
                type="email"
                placeholder="이메일"
                {...register("email", { required: "이메일을 입력주세요." })}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md h-14 focus:outline-none focus:border-blue-500 focus:border-2"
              />
              <span className="text-red-500">{errors?.email?.message}</span>
            </div>
            <div className="mb-2">
              {/* <label htmlFor="password" className="block mb-2 text-gray-700">
                Password:
              </label> */}
              <input
                type="password"
                placeholder="비밀번호"
                {...register("password", {
                  required: "비밀번호를 입력주세요.",
                })}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md h-14 focus:outline-none focus:border-blue-500 focus:border-2"
              />
              <span className="text-red-500">{errors?.password?.message}</span>
            </div>
          </div>
          <button className="w-full px-4 py-4 text-lg font-bold text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-600">
            {loading ? "가입하는 중" : "가입하기"}
          </button>
        </form>
        <div className="mt-6 text-center">
          계정이 있으신가요?
          <span className="mt-6 ml-2 text-center text-blue-500 hover:underline">
            <Link href={"/log-in"}>로그인하기</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
