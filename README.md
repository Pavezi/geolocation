# Construindo a Geolocalização do Futuro

Este é um projeto que simula um cenário real, onde uma API RESTful robusta para gerenciar usuários e localizações.

## 🌍 **Visão Geral**

Em um mundo conectado e globalizado, a geolocalização se torna cada vez mais essencial.

## 🛠 **Especificações Técnicas**

- **Node.js**: Versão 20 ou superior.
- **Banco de Dados**: Mongo 7+.
- **ORM**: Mongoose / Typegoose.
- **Linguagem**: Typescript.
- **Formatação e Linting**: Eslint + prettier.
- **Comunicação com MongoDB**: Feita via container.

## 🔍 **Funcionalidades Esperadas**

### Usuários
- **CRUD** completo para usuários.
- Cada usuário deve ter nome, email, endereço e coordenadas.
- Na criação, o usuário pode fornecer endereço ou coordenadas. Haverá erro caso forneça ambos ou nenhum.
- Uso de serviço de geolocalização para resolver endereço ↔ coordenadas.
- Atualização de endereço ou coordenadas deve seguir a mesma lógica.

### Regiões
- **CRUD** completo para regiões.
- Uma região é definida como um polígono em GeoJSON, um formato padrão para representar formas geográficas. Cada região tem um nome, um conjunto de coordenadas que formam o polígono, e um usuário que será o dono da região.
- Listar regiões contendo um ponto específico.
- Listar regiões a uma certa distância de um ponto, com opção de filtrar regiões não pertencentes ao usuário que fez a requisição.
- Exemplo de um polígono simples em GeoJSON:
  ```json
  {
    "type": "Polygon",
    "coordinates": [
      [
        [longitude1, latitude1],
        [longitude2, latitude2],
        [longitude3, latitude3],
        [longitude1, latitude1] // Fecha o polígono
      ]
    ]
  }
  ```

### Testes
- Unitários e de integração.

## ⚖ **Pontos chave**

1. Organização e clareza do código.
2. Estruturação do projeto.
3. Qualidade e eficiência do código.
4. Cobertura e qualidade de testes.
5. Pontos diferenciais citados acima.
6. Tempo de entrega (será considerado apenas o cumprimento do prazo, sem distinção entre entregas feitas no primeiro ou no último dia, com ênfase na qualidade da entrega).
7. Padronização e clareza das mensagens de erro.
8. Organização dos commits.
9. Implementação de logs.
10. Adesão às boas práticas de API RESTful.

## 🚀 **Entrega**

1. Um repositório público com a base desse código.
2. Uma branch onde realizei o trabalho.
3. Finalizando com um pull request para a branch `main` do meu repositório.
4. Documentação e request disponíveis no postman https://app.getpostman.com/join-team?invite_code=88659e251f5258388079767eb0d7363d56bf52508678893e276551a5242cedf5&target_code=c5cb1385c793cc13f1beaf7328183589

---

Que a força do código esteja com você! 🚀
