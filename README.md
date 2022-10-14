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
<p>Para a aplicação funcionar é preciso criar o arquivo .env e adicionar a variável ‘SECRET’ com o valor de uma string aleatória.</p>
<strong>Exemplo:</strong>

```
SECRET="962012d09b8170d912f0669f6d7d9d07"
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
