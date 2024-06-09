"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input, Button, Image } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import toast, { Toaster } from "react-hot-toast";
import { set } from "mongoose";
import useAuth from "@/context/auth";

type Props = {};

const SignUp = (props: Props) => {
  const router = useRouter();
  const [user, setUser] = React.useState({ name: "", email: "", password: "" });
  const [isVisible, setIsVisible] = React.useState(false);
  const { firstVisit, setFirstVisit } = useAuth();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      toast("Signing up...");
      await axios.post("/api/users/signup", user);
      toast.success("Signup successful");
      setFirstVisit(false);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.name && user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image width={300} alt="Logo" src="/logo.png" />
      <Input
        isClearable
        label="Name"
        variant="bordered"
        className="p-2 m-2  max-w-md"
        type="text"
        id="name"
        value={user.name}
        onClear={() => setUser({ ...user, name: "" })}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <Input
        isClearable
        label="Email"
        variant="bordered"
        className="p-2 m-2  max-w-md"
        type="email"
        id="email"
        value={user.email}
        errorMessage="Please enter a valid email"
        onClear={() => setUser({ ...user, email: "" })}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <Input
        label="Password"
        variant="bordered"
        className="m-2 p-2 max-w-md"
        endContent={
          <button
            className=" focus:outline-none ml-2"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashIcon className="size-5 text-default-400 pointer-events-none" />
            ) : (
              <EyeIcon className=" size-5 text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <Button
        isLoading={loading}
        className="p-2 m-2 rounded-lg "
        color="primary"
        variant="ghost"
        onClick={onSignup}
        isDisabled={buttonDisabled}
      >
        Signup
      </Button>
      <Link href="/login" className="text-slate-500">
        Already registered? Go to login page.
      </Link>
    </div>
  );
};

export default SignUp;
