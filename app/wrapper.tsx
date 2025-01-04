"use client";

import ChakraProvider from "@/providers/ChakraProvider";
import { AccountableContextWrapper } from "@/providers/ContextProvider";
import LayoutOnline from "./layoutOnline";
import { UserContextWrapper } from "@/providers/UserProvider";

interface WrapperProps {
  children: React.ReactNode;
}
const UserWrapper = ({ children }: WrapperProps) => {
  return (
    <ChakraProvider>
      <UserContextWrapper>
        <AccountableContextWrapper>
          <LayoutOnline>{children}</LayoutOnline>
        </AccountableContextWrapper>
      </UserContextWrapper>
    </ChakraProvider>
  );
};

export default UserWrapper;
