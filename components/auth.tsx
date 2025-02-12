/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth/authStore";
import { useContractStore } from "@/store/contract/contractStore";
import { shallow } from "zustand/shallow";
import { providers } from "ethers";
import { watchAccount } from "@wagmi/core";
import axios from "axios";
import { User } from "@/data-schema/types";

const Auth = ({
  setHasCheckedUserType,
  hasCheckedUserType,
}: {
  setHasCheckedUserType: (hasCheckedUserType: boolean) => void;
  hasCheckedUserType: boolean;
}) => {
  //=============================================================================
  //                               HOOKS
  //=============================================================================

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  watchAccount((account) => {
    const { isConnected, address } = account;

    if (
      userDetails?.wallet &&
      address &&
      userDetails?.wallet !== (address as string)
    ) {
      setHasCheckedUserType(false);
      setWalletConnected(false);
      setLogout();
    }
    if (isConnected) {
      setHasCheckedUserType(false);
      setSelectedAddress(address);
      setWalletConnected(true);
    }
  });

  const { setWalletConnected, setLogout, setUserDetails, userDetails } =
    useAuthStore(
      (state) => ({
        userDetails: state.userDetails,
        setWalletConnected: state.setWalletConnected,
        setLogout: state.setLogout,
        setUserDetails: state.setUserDetails,
      }),
      shallow
    );

  const { setConnectedSigner, setProvider } = useContractStore(
    (state) => ({
      setConnectedSigner: state.setConnectedSigner,
      setProvider: state.setProvider,
    }),
    shallow
  );

  /*
   * This hook will check for the user's wallet address and set the user type and family id. It will also set the provider and signer in the store
   */
  useEffect(() => {
    const fetchUserType = async () => {
      if (!selectedAddress || hasCheckedUserType) return;

      // @ts-ignore
      const provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(selectedAddress);

      // add provider and signer to store
      setProvider(provider);
      setConnectedSigner(signer);

      const { data } = await axios.get(
        `/api/vercel/get-json?key=${selectedAddress}`
      );

      const user: User = data;
      setHasCheckedUserType(true);

      if (user) {
        setUserDetails(user);
      }
    };

    fetchUserType();
  }, [selectedAddress, hasCheckedUserType]);

  /*
   * This hook will check if the user has a dark mode preference set in local storage
   */
  useEffect(() => {
    const colorMode = localStorage.getItem("chakra-ui-color-mode");
    if (colorMode !== "dark") {
      localStorage.setItem("chakra-ui-color-mode", "dark");
    }
  }, []);

  return <></>;
};

export default Auth;
