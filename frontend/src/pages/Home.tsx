import { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import { getUsers } from "../api/userService";
interface User {
  id: string;
  name: string;
  email: string;
}
export function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Usuários
      </Typography>
      {users.map((user: User) => (
        <Typography key={user.id}>
          {user.name} - {user.email}
        </Typography>
      ))}
      <Button variant="contained" color="primary">
        Adicionar Usuário
      </Button>
    </Container>
  );
}
