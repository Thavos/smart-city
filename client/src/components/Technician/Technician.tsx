import { FC } from "react";
import { User } from "../User";
import styles from "./Technician.module.css";

export const Technician: FC = () => {
  return (
    <>
      <p>Technician menu</p>
      <User />
      <p>My service tickets</p>
    </>
  );
};
