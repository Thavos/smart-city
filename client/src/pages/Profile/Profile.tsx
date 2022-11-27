import { FC, useEffect, useState } from "react";
import styles from "./Profile.module.css";

import { MenuBar } from "../../components/MenuBar";

import { Citizen } from "../../components/Citizen";
import { Technician } from "../../components/Technician";
import { Manager } from "../../components/Manager";
import { Admin } from "../../components/Admin";
import { Tickets } from "../../components/Tickets";

enum auhtority {
  "Citizen" = 0,
  "Technician" = 1,
  "Manager" = 2,
  "Admin" = 3,
}

const ProfileType = [Citizen, Technician, Manager, Admin];

type UserType = {
  name: string;
  surn: string;
  authId: number;
};

export const Profile: FC = () => {
  const [user, setUser] = useState<UserType>({
    name: "Jozko",
    surn: "Ferko",
    authId: 0,
  });
  let C: any;

  console.log(user);
  const setC = () => {
    console.log(user);
    if (user) C = ProfileType[user.authId];
    console.log(ProfileType[user.authId]);
    return <C />;
  };

  useEffect(() => {
    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query profile {
          profile {
          name
          surn
          authId
        }
      }`,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        setUser(data.data.profile);
      });
  }, []);

  console.log(user);
  return (
    <>
      {user && (
        <>
          <MenuBar name={user.name} surn={user.surn} />

          {setC()}

          <Tickets />
        </>
      )}
      {!user && (
        <>
          <a className={styles["btn"]} href="/">
            Home
          </a>
          <p>No content for unregistered users</p>
        </>
      )}
    </>
  );
};
