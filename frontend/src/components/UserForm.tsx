import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

interface UserFormProps {
  onUserAdded: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ onUserAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/users", {
        name,
        email,
        address,
      });
      setName("");
      setEmail("");
      setAddress("");
      onUserAdded(); // Atualiza a lista
    } catch (error) {
      console.error("Erro ao cadastrar usuário", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Endereço"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <Button type="submit" variant="contained">
        Adicionar Usuário
      </Button>
    </Box>
  );
};

export default UserForm;
