import { FC, useEffect, useState } from "react";
import styles from "./Tickets.module.css";
import { NewTicket } from "../NewTicket";

type TicketType = {
  name: string;
  desc: string;
  state: number;
  createdAt: string;
  userId: number;
};

export const Tickets: FC = () => {
  const [tickets, setTickets] = useState<[TicketType]>();

  useEffect(() => {
    fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query ticket {
          ticket {
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
        if (data.data.ticket) setTickets(data.data.ticket);
      });
  }, []);

  return (
    <div>
      <NewTicket />
      <h2>Tickets</h2>
      <div style={{ color: "white" }}>
        <p>Ticket Label</p>
        <p>Date</p>
        <p>State</p>
        <p>User</p>
      </div>
      <ul>
        {tickets &&
          tickets.map((c) => {
            return (
              <li style={{ color: "white" }}>
                <div>{c.name}</div>
                <div>{new Date(parseInt(c.createdAt)).toString()}</div>
                <div>{c.state}</div>
                <div>{c.userId}</div>
                <div>{c.desc}</div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
