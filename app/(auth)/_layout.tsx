import SignInScreen from "./sign-in";

export default function AuthLayout({
  handleSession,
}: {
  handleSession: () => void;
}) {
  return (
    <>
      <SignInScreen handleSession={handleSession}/>
    </>
  );
}
