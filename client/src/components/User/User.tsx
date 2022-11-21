import { FC } from "react";
import styles from "./User.module.css";
import { NewTicket } from "../NewTicket";

export const User: FC = () => {
  return (
    <>
      <p>User menu</p>
      <p>Profile</p>
      <NewTicket />
      <p>Tickets</p>
    </>
  );
};
