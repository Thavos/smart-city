import { MenuBar } from "../../components/MenuBar";
import { Box, Button, Checkbox, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./ServiceTicket.module.css";
import { convertToObject } from "typescript";

export const ServiceTicket = () => {
  const [showModal, setShowModal] = useState(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [technicians, setTechnicians] = useState<any>();
  useEffect(() => {
    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query technicians {
                    technicians {
                        id
                        user{
                            id
                            name
                            surn
                            email
                            authId
                        }
                    }
                }`,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.data.technicians) setTechnicians(data.data.technicians);
      });
  }, [setTechnicians]);

  function handleShowModal() {
    setShowModal(true);
  }

  function handleNewServiceticket(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    NewServiceTicket(
      event.target.name,
      event.target.description.value,
      event.target.technician.value
    );
  }

  function handleCheckbox(ticket: any) {
    console.log("Fetch na update stavu ticketu");
    console.log(ticket);
  }

  const [servTickets, setServTickets] = useState<any[]>();
  useEffect(() => {
    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query serviceRequests {
                    serviceRequests {
                        id
                        name
                        desc
                        state
                        price
                        expectedFinish
                        Technician{
                            userId
                        }
                    }
                }`,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        if (data.data.serviceRequests)
          setServTickets(data.data.serviceRequests);
      });
  }, []);

  return (
    <div className={styles["wrapper"]}>
      <nav className={styles["nav"]}>
        <a className={styles["nav-link"]} href="/profile">
          Profile
        </a>
        <div>{">"}</div>
        <a className={styles["nav-link"]} href="/ticketsPage">
          Tickets
        </a>
      </nav>
      <Button onClick={handleShowModal}>Create new service ticket</Button>
      <div style={{ color: "white" }}>
        <table>
          {servTickets &&
            servTickets.map((item: any) => {
              if (technicians)
                technicians.forEach((tech: any) => {
                  if (tech.user.id === item.Technician.userId)
                    item.email = tech.user.email;
                });
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.desc}</td>
                  <td>{item.email}</td>
                  <td>{item.price}</td>
                  <td>{item.expectedFinish}</td>
                  <td>
                    <Checkbox
                      checked={item.state}
                      onChange={() => handleCheckbox(item)}
                    />
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={style}>
          <form onSubmit={handleNewServiceticket}>
            <h2>Create new service ticket</h2>
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Name"
              defaultValue=""
            />
            <input
              name="description"
              type="text"
              className="form-control"
              placeholder="Description"
              defaultValue=""
            />
            <p />
            <select id="technician">
              {technicians &&
                technicians.map((item: any) => {
                  return <option value={item.email}>{item.email}</option>;
                })}
            </select>
            <p />
            <Button type="submit">Create</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

function NewServiceTicket(name: String, desc: String, tech: String) {
  console.log(
    "Fetch na vytvoření novýho service ticketu s descriptionem desc a zadaným technikem tech"
  );
  console.log(name);
  console.log(desc);
  console.log(tech);
  //fetch
}
