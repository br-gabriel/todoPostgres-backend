# To Do Postgres - Back-end
## Sobre o projeto
<p>Esse repositório é o back-end do <a href="https://github.com/br-gabriel/todoPostgres-frontend" target="_blank">todoPostgres-frontend</a>.</p>
<p>Trata-se de uma API Restful construida com NodeJS + Express, Prisma, Postgres e Docker e é responsável por enviar e receber dados do usuário de forma autenticada via JWT.</p>

## Tecnologias

* NodeJS
  * Express
  * Cors
  * Bcrypt
  * Cookie-parser
  * JsonWebToken
* Prisma
* Postgres
* Docker

## Funcionalidades

<strong>USUÁRIOS:</strong>

* Criar um novo usuário com email ainda não cadastrado
* Login de usuário registrado no banco de dados
* Logout do usuário

<strong>LISTA DE TAREFAS:</strong>

* Criar uma nova tarefa na conta do usuário
* Ler as tarefas criadas na conta do usuário
* Renomear a tarefa adicionada
* Marcar ou desmarcar a tarefa como concluida
* Deletar tarefa cadastrada

## Como rodar o projeto
### Pré-requisitos
<p>Para executar esse projeto, em ambiente de desenvolvimento, é necessário ter instalado na máquina o NodeJS e o Docker.</p>

<p>Link para instalar o NodeJS: <a href="https://nodejs.org/en/download/" target="_blank">link</a></p>
<p>Link para instalar o Docker: <a href="https://docs.docker.com/get-docker/" target="_blank">link</a></p>

### Instalação
<strong>Clonar o repositório</strong>

```
$ git clone https://github.com/br-gabriel/todoPostgres-backend

$ cd todoPostgres-backend
```

<strong>Instalação das dependências</strong>

```
$ yarn
```

<p>ou</p>

```
$ npm install
```

### Variáveis de ambiente
Para a aplicação funcionar é preciso criar o arquivo `.env` e adicionar as seguintes variáveis, com valores do mesmo tipo descrito no exemplo abaixo.

<strong>Exemplo:</strong>

```
DATABASE_USER="nomeDoUsuario"             //string
DATABASE_PASSWORD="senhaDoBancoDeDados"   //string
DATABASE_NAME="nomeDoBancoDeDados"        //string
DATABASE_URL=`postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:5432/${DATABASE_NAME}` //string

ORIGIN_URL="http://localhost:3000" //string - rota onde o frontend irá rodar

SECRET="962012d09b8170d912f0669f6d7d9d07" //string
```

### Token JWT
O token está definido para expirar após 7 dias do login do usuário, caso queira testar a autenticação, em um tempo diferente, acesse o arquivo: `src/routes/user.routes.js`

```
// Rota - /user/signin
const token = await jwt.sign(
            {
                id: userExists.id,
            },
            secret,
            {expiresIn: '7d'} //Altere aqui para o valor desejado [1m, 1h, 1d]
        );
```

### Docker
1. Para a aplicação funcionar será necessário instalar o docker e o docker-compose, link do download
2. Abrir o docker
3. Usar o comando no terminal:
```
$ docker-compose up -d
```

### Rodando o projeto
<p>Após ter todas as dependências instaladas, as variáveis de ambiente definidas e com o docker rodando, você pode rodar a aplicação com o seguinte comando:</p>

```
$ yarn dev
```
<p>ou</p>

```
$ npm run dev
```

## Rotas

### Rotas de usuário

* POST - /user/signup - Criação de usuário
* POST - /user/signin - Login de usuário
* GET - /user/signout - Logout

### Rotas de tarefas

* POST - /user/todos - Criação de tarefa
* GET - /user/todos - Ler as tarefas
* PUT - /user/todos - Atualiza nome e status da tarefa
* DELETE - /user/todos/:todoid - Deleta a tarefa selecionada
