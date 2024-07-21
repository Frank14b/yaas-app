import OnBoardingScreen from "./on-boarding";

export default function OnBoardingLayout({
  handleOnBoarding,
}: {
  handleOnBoarding: () => void;
}) {
  return <OnBoardingScreen handleOnBoarding={handleOnBoarding} />;
}