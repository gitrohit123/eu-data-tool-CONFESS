import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input, Button, Image } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
import useAuth from "@/context/auth";
import LandingPage from "@/app/login/LandingPage";

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();
  const [user, setUserData] = React.useState({ email: "", password: "" });
  const [isVisible, setIsVisible] = React.useState(false);
  const { setUser } = useAuth();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const [showLandingPage, setShowLandingPage] = React.useState(true);

  const hideLandingPage = () => {
    setShowLandingPage(false);
  };

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      if (response.status === 200) {
        const userInfo = await axios.get("/api/users/user", {
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        const userData = userInfo.data.data;
        setUser(userData);
        router.push("/");
      } else {
        throw new Error(response.data.error);
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div>
      {showLandingPage ? (
        <LandingPage onSelectPlan={hideLandingPage}/>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <Image width={300} alt="Logo" src="/logo.png" />
          <Input
            isClearable
            label="Email"
            variant="bordered"
            className="p-2 m-2  max-w-md"
            type="email"
            id="email"
            value={user.email}
            errorMessage="Please enter a valid email"
            onClear={() => setUserData({ ...user, email: "" })}
            onChange={(e) => setUserData({ ...user, email: e.target.value })}
          />
          <Input
            label="Password"
            variant="bordered"
            className="p-2 m-2 max-w-md"
            type={isVisible ? "text" : "password"}
            endContent={
              <button
                className="focus:outline-none ml-2"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashIcon className="size-5 text-default-400 pointer-events-none" />
                ) : (
                  <EyeIcon className="size-5 text-default-400 pointer-events-none" />
                )}
              </button>
            }
            id="password"
            value={user.password}
            onChange={(e) => setUserData({ ...user, password: e.target.value })}
          />
          <Button
            className="p-2 m-2 rounded-lg "
            color="primary"
            variant="ghost"
            onClick={onLogin}
          >
            {" "}
            Login
          </Button>
          <Link href="/signup" className="text-slate-500">
            Not registered? Go to signup page.
          </Link>
        </div>)}
    </div>
  );
};

export default Login;