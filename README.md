# 🐾 Pet Care — CP5

Aplicativo mobile desenvolvido em **React Native** com **Firebase Authentication**, **Cloud Firestore** e **AsyncStorage**, com o objetivo de permitir que usuários cadastrem e gerenciem seus pets de forma segura.

O projeto é uma evolução do CP4, mantendo o sistema de autenticação e adicionando persistência de dados no **Cloud Firestore**, com operações completas de **CRUD (Create, Read, Update e Delete)**.

---

## 👥 Integrantes

* Nome: Lucas Rafael Solimene
* RM: 565194

---

## 📌 Tema do Projeto

**Pet Care — Gerenciamento de Pets**

O aplicativo foi desenvolvido para facilitar o gerenciamento das informações dos animais de estimação cadastrados pelo usuário.

Cada usuário possui seus próprios registros de pets e pode:

* Criar novos pets;
* Visualizar seus pets;
* Editar informações;
* Excluir pets;
* Gerenciar sua conta;
* Fazer login e logout;
* Recuperar a senha;
* Excluir a própria conta.

---

## 🎯 Objetivo

O objetivo do projeto é desenvolver uma aplicação mobile funcional utilizando serviços Firebase para autenticação e armazenamento de dados.

A aplicação permite que cada usuário tenha seus próprios registros no Firestore, garantindo que os dados de um usuário não sejam exibidos ou modificados por outro usuário.

---

# 🛠️ Tecnologias utilizadas

### React Native

Framework utilizado para o desenvolvimento da aplicação mobile.

### Firebase Authentication

Utilizado para:

* Cadastro de usuários;
* Login;
* Logout;
* Recuperação de senha;
* Exclusão de conta;
* Controle do usuário autenticado.

### Cloud Firestore

Banco de dados utilizado para armazenar as informações dos pets.

O Firestore realiza as operações de:

* Create;
* Read;
* Update;
* Delete.

### AsyncStorage

Utilizado juntamente com a persistência do Firebase Authentication para manter a sessão do usuário mesmo após fechar e abrir o aplicativo.

### Expo

Utilizado para facilitar o desenvolvimento e execução do aplicativo React Native.

---

# 🔐 Autenticação

O aplicativo possui uma área pública e uma área protegida.

## Área não autenticada

O usuário pode acessar:

* Login;
* Cadastro;
* Recuperação de senha.

## Área autenticada

Depois do login, o usuário pode acessar:

* Home;
* Meu Perfil;
* Cadastro de Pet;
* Meus Pets;
* Edição de Pet.

A navegação é protegida através do estado de autenticação do Firebase.

---

# 🐶 CRUD de Pets

O aplicativo possui um CRUD completo para gerenciamento dos pets.

## CREATE — Cadastro

O usuário pode cadastrar um pet informando:

* Nome;
* Espécie;
* Raça;
* Idade.

Os campos possuem validação básica antes do envio.

Após o cadastro, os dados são armazenados no Cloud Firestore.

---

## READ — Listagem

A tela **Meus Pets** consulta os registros diretamente no Firestore e apresenta os pets cadastrados pelo usuário.

São exibidas informações como:

* Nome;
* Espécie;
* Raça;
* Idade.

Quando não existem pets cadastrados, o aplicativo apresenta uma mensagem informando que nenhum pet foi cadastrado.

---

## UPDATE — Edição

O usuário pode selecionar um pet e editar suas informações.

Após salvar:

1. Os dados são atualizados no Firestore;
2. Uma mensagem de sucesso é apresentada;
3. A lista de pets é atualizada.

---

## DELETE — Exclusão

O usuário pode excluir um pet.

Antes da exclusão, o aplicativo apresenta uma confirmação.

Após confirmar:

1. O registro é removido do Firestore;
2. O pet desaparece da lista;
3. Uma mensagem de sucesso é apresentada.

---

# 🗄️ Estrutura do Firestore

Os dados dos pets são organizados por usuário autenticado.

A estrutura utilizada é:

```text
usuarios
└── {uid}
    └── pets
        ├── {petId}
        │   ├── nome
        │   ├── especie
        │   ├── raca
        │   └── idade
        │
        └── {petId}
            ├── nome
            ├── especie
            ├── raca
            └── idade
```

O `{uid}` representa o identificador único do usuário autenticado no Firebase Authentication.

Dessa forma, cada usuário possui sua própria coleção de pets.

---

# 🔒 Segurança e isolamento dos dados

As regras do Firestore foram configuradas para permitir acesso somente ao usuário autenticado que é proprietário dos dados.

A aplicação utiliza o seguinte conceito:

```text
Usuário autenticado
        ↓
Firebase Authentication
        ↓
UID do usuário
        ↓
usuarios/{uid}/pets
```

As regras verificam se:

```text
request.auth.uid == userId
```

Assim:

* Um usuário pode visualizar seus próprios pets;
* Um usuário pode criar seus próprios pets;
* Um usuário pode editar seus próprios pets;
* Um usuário pode excluir seus próprios pets;
* Um usuário não pode acessar os pets de outro usuário.

---

# 📱 Telas da aplicação

## 🔑 Login

Permite que o usuário informe:

* E-mail;
* Senha.

Também possui acesso para:

* Criar uma conta;
* Recuperar senha.

---

## 📝 Cadastro

Permite criar uma nova conta informando:

* Nome;
* E-mail;
* Senha;
* Confirmação da senha.

---

## 🔄 Recuperação de senha

Permite informar o e-mail cadastrado para receber a recuperação da senha através do Firebase Authentication.

---

## 🏠 Home

A tela inicial da área autenticada apresenta os principais acessos:

* **Meu Perfil**
* **Cadastrar Pet**
* **Meus Pets**

---

## 👤 Meu Perfil

Apresenta os dados do usuário autenticado e disponibiliza:

* Logout;
* Exclusão da conta.

---

## 🐕 Cadastro de Pet

Permite cadastrar um novo pet com:

* Nome;
* Espécie;
* Raça;
* Idade.

---

## 📋 Meus Pets

Apresenta todos os pets cadastrados pelo usuário.

Cada registro possui as opções:

* Editar;
* Excluir.

Também existe a opção de cadastrar um novo pet.

---

## ✏️ Editar Pet

Permite alterar:

* Nome;
* Espécie;
* Raça;
* Idade.

---

# 📂 Estrutura do projeto

```text
cp04-mobile/
│
├── assets/
│
├── src/
│   │
│   ├── config/
│   │   └── firebase.js
│   │
│   ├── navigation/
│   │   ├── AppNavigation.js
│   │   ├── AuthStack.js
│   │   └── UserStack.js
│   │
│   ├── screens/
│   │   ├── LoginScreen.js
│   │   ├── CadastroScreen.js
│   │   ├── EsqueciSenhaScreen.js
│   │   ├── HomeScreen.js
│   │   ├── PerfilScreen.js
│   │   ├── CadastroPetScreen.js
│   │   ├── PetsScreen.js
│   │   └── EditarPetScreen.js
│   │
│   └── services/
│       ├── authService.js
│       └── firestoreService.js
│
├── App.js
├── app.json
├── index.js
├── package.json
└── README.md
```

---

# ⚙️ Instalação

## 1. Clonar o projeto

```bash
git clone [URL_DO_REPOSITÓRIO]
```

Entre na pasta do projeto:

```bash
cd cp05-mobile
```

---

## 2. Instalar as dependências

Execute:

```bash
npm install
```

---

## 3. Configurar o Firebase

O projeto utiliza:

* Firebase Authentication;
* Cloud Firestore.

É necessário configurar um projeto no Firebase e utilizar as credenciais correspondentes no arquivo:

```text
src/config/firebase.js
```

O Authentication deve estar habilitado no Firebase.

Também é necessário habilitar o **Cloud Firestore**.

---

# ▶️ Execução

Para iniciar o projeto utilizando Expo:

```bash
npx expo start
```

Depois disso, é possível executar o aplicativo utilizando:

* Expo Go;
* Emulador Android;
* Emulador iOS;
* Dispositivo físico compatível.

---

# 🔄 Fluxo da aplicação

```text
                 ┌──────────────┐
                 │    Login     │
                 └──────┬───────┘
                        │
              ┌─────────┴─────────┐
              │                   │
         Criar conta        Recuperar senha
              │
              ↓
        Firebase Auth
              │
              ↓
          ┌────────┐
          │  Home  │
          └───┬────┘
              │
       ┌──────┼─────────────┐
       │      │             │
       ↓      ↓             ↓
    Perfil  Cadastro      Meus Pets
              Pet            │
                             │
                       ┌─────┴─────┐
                       │           │
                       ↓           ↓
                    Editar      Excluir
                       │           │
                       └─────┬─────┘
                             ↓
                         Firestore
```

---

# 🧪 Funcionalidades testadas

O projeto foi desenvolvido e testado considerando:

* [x] Cadastro de usuário;
* [x] Login;
* [x] Logout;
* [x] Recuperação de senha;
* [x] Exclusão de conta;
* [x] Persistência da sessão;
* [x] Cadastro de pets;
* [x] Listagem de pets;
* [x] Edição de pets;
* [x] Exclusão de pets;
* [x] Validação dos campos;
* [x] Mensagens de sucesso;
* [x] Mensagens de erro;
* [x] Loading durante operações;
* [x] Confirmação antes da exclusão;
* [x] Isolamento dos dados entre usuários;
* [x] Regras de segurança do Firestore;
* [x] Navegação entre as telas.

---

# 🔐 Fluxo de segurança

A aplicação não armazena senhas no Firestore.

A autenticação é realizada pelo **Firebase Authentication**.

Os dados dos pets são associados ao UID do usuário autenticado:

```text
Firebase Authentication
          │
          ↓
        UID
          │
          ↓
usuarios/{uid}/pets
```

As regras do Firestore impedem que um usuário acesse diretamente os registros pertencentes a outro usuário.

---

# 🎥 Vídeo de apresentação

**Link do vídeo no YouTube:**

Link Youtube:

No vídeo serão demonstrados:

* Cadastro de usuário;
* Login;
* Acesso à Home;
* Cadastro de pelo menos dois pets;
* Consulta dos pets no Firestore;
* Edição de um pet;
* Exclusão de um pet;
* Isolamento dos dados entre usuários;
* Logout;
* Persistência da sessão.