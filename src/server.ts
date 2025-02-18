import app from "./app";
import config from "./config";
import "reflect-metadata";

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
