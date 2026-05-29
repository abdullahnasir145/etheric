import HomeContainer from "@/container/appContainer/HomeContainer";
import "../../global.css";

export default function HomeScreen() {
  return (
    <>
      <HomeContainer />
    </>
  );
}

// REDIRECT FOR SUPABASE AUTH FLOW
// import { Redirect } from "expo-router";

// export default function Index() {
//   return <Redirect href="/(auth)/login" />;
// }
