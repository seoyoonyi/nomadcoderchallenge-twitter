import useMutation from "@/lib/client/useMutation";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const [loginMutation, { loading }] = useMutation(`/api/users/login`);

  const router = useRouter();
  const onValid = async (data: IForm) => {
    if (loading) return;
    try {
      await loginMutation(data);
      router.push("/");
    } catch (error) {
      console.error("Failed to login", error);
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            {...register("email", { required: "Write your email please." })}
          />
          <span>{errors?.email?.message}</span>
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            {...register("password", {
              required: "Write your password please.",
            })}
          />
          <span>{errors?.email?.message}</span>
        </div>
        <button>Login</button>
      </form>
      <Link href={"/create-account"}>회원가입</Link>
    </div>
  );
};

export default Login;
