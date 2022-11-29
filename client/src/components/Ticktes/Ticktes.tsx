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

enum status {
  "Waiting" = 0,
  "Assigned" = 1,
  "Resolved" = 2,
  "Declined" = 3,
}

const TicketStatus = ["Waiting", "Assigned", "Resolved", "Declined"];

export interface Props {
  hideNewTicket?: boolean;
}

export const Ticktes: FC<Props> = ({ hideNewTicket }) => {
  const [tickets, setTickets] = useState<[TicketType]>();

  useEffect(() => {
    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query tickets {
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
    <div className={styles["body"]}>
      {!hideNewTicket && (
        <div className={styles["new-tickets"]}>
          <NewTicket />
        </div>
      )}
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
                <div className={styles["ticket-state"]}>
                  {TicketStatus[c.state]}
                </div>
                <div className={styles["ticket-dsc"]}>
                  <p>{c.desc}</p>
                </div>
              </div>
            );
          })}
      </div>

      <footer className={styles["footer-wrapper"]}>
        <div>School project</div>
        <div>Smart City</div>
      </footer>
    </div>
  );
};
