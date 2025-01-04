"use client";

import LayoutOffline from "@/app/layoutOffline";
import { User, UserService } from "@/client";
import LoadingScreen from "@/components/LoadingScreen";
import { createContext, useEffect, useState } from "react";

interface UserContextWrapperProps {
  children: React.ReactNode;
}

export const UserContext = createContext<User | null>(null);

export const UserContextWrapper = ({ children }: UserContextWrapperProps) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const expiration = urlParams.get("expiration");

    if (token && expiration) {
      document.cookie = `token=${token}; expires=${expiration}; path=/; domain=${process.env.NEXT_PUBLIC_API_DOMAIN}`;
      window.location.href.replace(window.location.search, "");
    }

    const connectUser = async () => {
      try {
        const user = await UserService.getUserGet()
        setUser(user);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    connectUser();
  }, []);

  if (loading) {
    return <LoadingScreen message={"We are loading your data, please wait"} />;
  }

  if (!user) {
    return <LayoutOffline />;
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
