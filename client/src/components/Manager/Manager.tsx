import { FC } from "react";
import { Ticktes } from "../Ticktes";
import styles from "./Manager.module.css";

export const Manager: FC = () => {
  return (
    <>
      <Ticktes />
      <p>Manager menu</p>
      <p>My service tickets</p>
    </>
  );
};
