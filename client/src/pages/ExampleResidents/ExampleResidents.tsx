import { FC, useState } from "react";
import styles from "./ExampleResidents.module.css";
import { useQuery, gql, useMutation } from "@apollo/client";

const GET_RESIDENTS = gql`
  query GetResidents {
    residents {
      id
      name
    }
  }
`;
// pozriet si tag function ... do vs na gql
const ADD_RESIDENT = gql`
  mutation createResident($createResidentInput: CreateResidentInput!) {
    createResident(createResidentInput: $createResidentInput) {
      id
      name
    }
  }
`;

export const ExampleResidents: FC = () => {
  const [newName, setNewName] = useState<string>("New Name");

  const { data } = useQuery(GET_RESIDENTS);
  const [addTodo] = useMutation(ADD_RESIDENT);

  const newResident = () => {
    if (newName) {
      addTodo({
        variables: {
          createResidentInput: {
            name: newName,
          },
        },
      });
    }
  };

  return (
    <>
      <h1>Example Residents Page</h1>
      <a href="/">Link to example home page</a>

      <ul>
        {data &&
          data.residents.map((resident: any) => {
            return <li key={resident.id}>{resident.name}</li>;
          })}
      </ul>
      <button>Get residents</button>

      <br />
      <input
        type="text"
        placeholder={newName}
        onChange={(e) => {
          setNewName(e.target.value);
        }}
      />
      <button onClick={newResident}>Create new resident</button>
    </>
  );
};
