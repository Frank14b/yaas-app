import { useCallback, useState } from "react";
import SignInAdminScreen from "./sign-in-admin";
import SignInScreen from "./sign-in";

export type ScreenProps = {
  handleChangeScreen: (screen: string) => void;
};

export default function AuthLayout() {
  //
  const [screen, setScreen] = useState<string>("sign-in-admin");
  const handleChangeScreen = useCallback(
    (screen: string) => setScreen(screen),
    [setScreen]
  );

  return (
    <>
      {screen == "sign-in-admin" && (
        <SignInAdminScreen handleChangeScreen={handleChangeScreen} />
      )}
      {screen == "sign-in" && (
        <SignInScreen handleChangeScreen={handleChangeScreen} />
      )}
    </>
  );
}
