import { FC, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";

import { Admin } from "../../components/Admin";
import { Manager } from "../../components/Manager";
import { Technician } from "../../components/Technician";
import { User } from "../../components/User/User";

enum auhtority {
  "Registered" = 0,
  "Technician" = 1,
  "Manager" = 2,
  "Admin" = 3,
}

const ProfileType = [User, Technician, Manager, Admin];

type UserType = {
  name: string;
  surn: string;
  authId: number;
};

export const Profile: FC = () => {
  const [user, setUser] = useState<UserType>();
  let C: any;

  const navigate = useNavigate();

  const setC = () => {
    if (user) C = ProfileType[user.authId];
    return <C />;
  };

  const logout = async () => {
    console.log("here");

    await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(() => navigate("/"));
  };

  useEffect(() => {
    fetch("/graphql", {
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
  });

  return (
    <>
      <button
        onClick={logout}
        className={styles["btn"]}
        style={{ backgroundColor: "#d63624" }}
      >
        Logout
      </button>
      {user && (
        <>
          <div>
            <p>{user?.name || "Name"}</p>
            <p>{user?.surn || "Surname"}</p>
            <p>{auhtority[user.authId]}</p>
          </div>

          <div>{setC()}</div>
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
