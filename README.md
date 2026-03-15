# Payments API

Uma API simples que se conecta um gateway de pagamento para validar uma compra. Caso haja um erro em um dos gateways, o sistema automaticamente vai para o próximo de maior prioridade.

## 🛠 Tecnologias
- [Node.js](https://nodejs.org/)
- [AdonisJS](https://adonisjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MySQL](https://www.mysql.com/)

## 🏁 Como começar
Para copiar e rodar este projeto, você precisará do Node.js v24+ instalado.

### 1. Clonar o repositório
``git clone https://github.com/matheusmgomes/payments-api.git``

### 2. Instalar dependências
`cd payments-api`<br>
`npm install`

### 3. Configurar .env
Criar um arquivo.env, utilize o .env.example como base e preencha com as informações do seu banco MySQL

### 4. Gerar APP_KEY
`node ace generate:key`

### 5. Executar migrations e seeds
`node ace migration:run` <br>
`node ace db:seed`

### 4. Executar projeto
`npm run dev`
