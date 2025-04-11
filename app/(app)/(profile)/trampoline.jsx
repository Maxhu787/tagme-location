import { Redirect, useLocalSearchParams } from "expo-router";

export default function Trampoline() {
  const { user } = useLocalSearchParams();
  if (!user) return null;

  return <Redirect href={`/(app)/(profile)/${user}`} />;
}
