"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useAuth from "@/context/auth";
import Cookies from "js-cookie";

type NavbarProps = {};

export default function NavigationBar({}: NavbarProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isAuthenticated, user, setUser } = useAuth();

  const links = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Assessments", href: "/admin/exams", admin: true },
    { name: "Reports", href: "/admin/reports", admin: true },
  ];

  const logout = async () => {
    try {
      setUser(null);
      await axios.get("/api/users/logout");
      Cookies.remove("name");
      Cookies.remove("token");
      Cookies.remove("admin");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isAuthenticated && (
        <Navbar onMenuOpenChange={setIsMenuOpen} className="absolute">
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
            <Link href="/">
              <NavbarBrand className="p-4">
                <div className="bg-slate-200/50 rounded-b-xl m-4">
                  <Image
                    src="/logo.png"
                    width={200}
                    alt="LOGO"
                    className="mt-2"
                  />
                </div>
              </NavbarBrand>
            </Link>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {links.map((link) => {
              if (link.admin) {
                if (user.isAdmin)
                  return (
                    <NavbarItem key={link.name}>
                      <Link color="foreground" href={link.href}>
                        {link.name}
                      </Link>
                    </NavbarItem>
                  );
              } else
                return (
                  <NavbarItem key={link.name}>
                    <Link color="foreground" href={link.href}>
                      {link.name}
                    </Link>
                  </NavbarItem>
                );
            })}
          </NavbarContent>
          <NavbarContent justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <UserCircleIcon className="size-11 m-1" />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <Link href="">
                    <div>
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold">{user.name}</p>
                    </div>
                  </Link>
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onClick={logout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
          <NavbarMenu>
            {links.map((item, index) => {
              if (item.admin) {
                if (user.isAdmin)
                  return (
                    <NavbarMenuItem key={`${item.name}-${index}`}>
                      <Link className="w-full" href={item.href} size="lg">
                        {item.name}
                      </Link>
                    </NavbarMenuItem>
                  );
              } else
                return (
                  <NavbarMenuItem key={`${item.name}-${index}`}>
                    <Link className="w-full" href={item.href} size="lg">
                      {item.name}
                    </Link>
                  </NavbarMenuItem>
                );
            })}
          </NavbarMenu>
        </Navbar>
      )}
    </>
  );
}
