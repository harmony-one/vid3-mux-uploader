import React, { useCallback } from "react";
import { Button, Spinner } from "grommet";
import { observer } from "mobx-react-lite";
import { metamaskStore } from "../stores/stores";

interface Props {}

export const LoginButton: React.FC<Props> = observer(() => {
  const handleLogin = useCallback(() => {
    metamaskStore.signInMetamask();
  }, []);

  const icon = metamaskStore.loginInProgress ? <Spinner /> : undefined;
  const disabled = metamaskStore.loginInProgress;

  return (
    <Button
      disabled={disabled}
      icon={icon}
      label="Login with MetaMask"
      onClick={handleLogin}
    />
  );
});

LoginButton.displayName = "LoginButton";
