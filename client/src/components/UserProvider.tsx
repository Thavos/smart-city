import { useState } from "react";

const UserProvider = ({ children }: any) => {
  const [isLoggedIn, setLoggedIn] = useState(
    localStorage.get("IS_LOGGED_IN") === "1"
  );

  // const { data: profile, isLoading } = useQuery(PROFILE_QUERY, {
  //   enabled: isLoggedIn,
  // });

  // if (isLoading) {
  //   return "Loading....";
  // }

  // if (!profile) {
  //   <LoginPage setLoggedIn={setLoggedIn} />;
  // }

  return children;
};
