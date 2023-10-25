"use client";

import { useState } from "react";
import { setCookie } from "nookies";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { loginAsync } from "../lib/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../lib/redux/store";

import { Eye, EyeOff } from "lucide-react";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Username must be at least 1 character.",
    })
    .max(150, {
      message: "Username must be at max 150 characters.",
    }),
  password: z
    .string()
    .min(1, {
      message: "Password must be at least 1 character.",
    })
    .max(128, {
      message: "Password must be at max 128 characters.",
    }),
});

function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const loginError = useSelector((state: RootState) => state.auth.error);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormInput) => {
    try {
      const response = await dispatch(loginAsync(values)).unwrap();
      if (response) {
        setCookie(null, "isAuthenticated", "true", {
          maxAge: 60 * 60, // 1 hr
          path: "/",
        });
        router.push("/table");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center">
      {loginError && (
        <div className="error-message mb-8 text-red-500 text-lg">
          {loginError}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="w-80">
        <Input
          type="text"
          label="Username"
          variant="bordered"
          color="secondary"
          className="mb-4"
          isClearable
          isDisabled={isLoading}
          errorMessage={errors.username?.message}
          onChange={(e) => setValue("username", e.target.value)}
        />

        <Input
          type={isVisible ? "text" : "password"}
          label="Password"
          variant="bordered"
          color="secondary"
          className="mb-6"
          isDisabled={isLoading}
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          onChange={(e) => setValue("password", e.target.value)}
          endContent={
            <button
              className="focus:outline-none text-center"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeOff size={22} className="pointer-events-none" />
              ) : (
                <Eye size={22} className="pointer-events-none" />
              )}
            </button>
          }
        />
        <div className="text-center">
          <Button
            type="submit"
            color="primary"
            className="hover:bg-blue-700"
            size="lg"
            variant="shadow"
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
