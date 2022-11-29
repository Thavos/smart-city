import {
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, NativeSelect } from "@mui/material";
import { Citizen } from "../Citizen";
import { Technician } from "../Technician";
import { Manager } from "../Manager";
import { Admin } from "../Admin";
import styles from "./managetechnicians.module.css"

type UserType = {
  id: string;
  userId: string;
  user: {
    id: string;
    name: string;
    surn: string;
    email: string;
    authId: number;
  };
};


export default function ManageTechniciansTable() {

  const [result, setResult] = useState<any>();

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
        console.log(data);
        setResult(data.data.technicians);
      });
  }, []);

  async function handleSelectChange(
    e: ChangeEvent<HTMLSelectElement>,
    item: UserType
  ) {
    console.log(item.id);
    await fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `mutation updateUser($updateUserInput: UpdateUserInput) {
                  updateUser(updateUserInput: $updateUserInput) {
                    id
                  }
                }`,
        variables: {
          updateUserInput: { id: item.id, authId: parseInt(e.target.value) },
        },
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div>
      <div style={{ color: "white" }} className={ styles["wrapper"]}>
        <table>
          {!result && <>Loading</>}
          {result &&
            result.map((item: UserType) => {
              if (item.user.authId < 3)
                return (
                  <tr>
                    <td>{item.user.name}</td>
                    <td>{item.user.surn}</td>
                    <td>{item.user.email}</td>
                    <td>
                      <NativeSelect
                        defaultValue={item.user.authId}
                        sx={{ color: "white" }}
                        onChange={(e) => handleSelectChange(e, item)}
                      >
                        <option value={0}>Citizen</option>
                        <option value={1}>Technician</option>
                      </NativeSelect>
                    </td>
                  </tr>
                );
              else return <></>;
            })}
        </table>
      </div>
    </div>
  );
}
