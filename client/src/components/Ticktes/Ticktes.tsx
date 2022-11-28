import { FC, useEffect, useState } from "react";
import styles from "./Ticktes.module.css";
import { NewTicket } from "../NewTicket";
import moment from "moment";

type TicketType = {
  name: string;
  desc: string;
  state: number;
  createdAt: string;
  userId: number;
};

export const Ticktes: FC = () => {
  const [tickets, setTickets] = useState<[TicketType]>();

  useEffect(() => {
    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query ticket {
          tickets {
          name
          desc
          state
          createdAt
          userId
        }
      }`,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        if (data.data.tickets) setTickets(data.data.tickets);
      });
  }, [setTickets]);

  return (
    <div>
      <div className={ styles["new-tickets"] }>
        <NewTicket />
      </div>
      <div className={styles["all-tickets"]}>
        {tickets &&
          tickets.map((c) => {
            return (
              <div className={styles["ticket"]}>
                <header className={styles["ticket-name"]}>{c.name}</header>
                <div className={styles["ticket-date"]}>
                  {new Intl.DateTimeFormat("cs-CZ", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(parseInt(c.createdAt))}
                </div>
                <div className={styles["ticket-state"]}>{c.state}</div>
                <div className={styles["ticket-dsc"]}>
                  <p>{c.desc}</p>
                </div>
              </div>
            );
          })}
      </div>
      <div className={styles["footer-wrapper"]}>
        <div>School project</div>
        <div>Smart City</div>
      </div>
    </div>
  );
};
