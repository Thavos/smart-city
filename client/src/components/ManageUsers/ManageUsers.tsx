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
//import {ActionCell} from "./ActionCell";

type UserType = {
  id: string;
  name: string;
  surn: string;
  email: string;
  authId: number;
};

export default function ManageUsersTable() {
  const [result, setResult] = useState<any>();

  useEffect(() => {
    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query users {
          users {
            id
            name
            surn
            email
            authId
          }
        }`,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setResult(data.data.users);
      });
  }, []);

  async function handleSelectChange(
    e: ChangeEvent<HTMLSelectElement>,
    item: UserType
  ) {
    console.log(item);
    await fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `mutation updateUser($updateUserInput: UpdateUserInput) {
                  updateUser(id: $updateUserInput) {
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

  async function handleDelete(item: UserType) {
    await fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `mutation removeUser($removeUserId: string) {
                  removeUser(id: $removeUserId){
                    id
                  }
                }`,
        variables: { removeUserId: item.id },
      }),
    });
  }

  return (
    <div>
      <div style={{ color: "white" }}>
        <table>
          <tr>
            <td>First Name</td>
            <td>Last Name</td>
            <td>E-mail</td>
            <td>Role</td>
            <td>Action</td>
          </tr>
          {!result && <>Loading</>}
          {result &&
            result.map((item: UserType) => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.surn}</td>
                  <td>{item.email}</td>
                  <td>
                    <NativeSelect
                      defaultValue={item.authId}
                      sx={{ color: "white" }}
                      onChange={(e) => handleSelectChange(e, item)}
                    >
                      <option value={0}>Citizen</option>
                      <option value={1}>Technician</option>
                      <option value={2}>Manager</option>
                      <option value={3}>Admin</option>
                    </NativeSelect>
                  </td>
                  <td>
                    <Button onClick={() => handleDelete(item)}>Delete</Button>
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
  /*
    return(
        <div >
            <Box sx={{
                height: 600,
                width: '100%'
            }}>
                <DataGrid columns={columns} rows={rows} sx={{
                    borderColor: "white",
                    color: "white"
                }}/>
            </Box>
        </div>
    )*/
}
