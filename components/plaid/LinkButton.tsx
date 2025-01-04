"use client";

import { ItemService } from "@/client";
import { Spinner, Text, Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { usePlaidLink, PlaidLinkOptionsWithLinkToken } from "react-plaid-link";

export default function LinkButton() {
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/data/link`,
          {
            withCredentials: true,
          }
        );
        setToken(data.linkToken);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchToken();
  }, []);

  const onSuccess = async (publicToken: string) => {
    try {
      await ItemService.createItemPost({ publicToken });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const config: PlaidLinkOptionsWithLinkToken = {
    onSuccess,
    onExit: () => {},
    onEvent: () => {},
    token: token,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <Button onClick={() => open()} size={"sm"} disabled={loading}>
      {loading ? <Spinner size={"xs"} /> : <FaPlus fontSize={"10px"} />}
      <Text ml={"10px"} fontWeight={300}>
        Plaid Account
      </Text>
    </Button>
  );
}
