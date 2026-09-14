# 🐾 Pet Care — CP4

Aplicativo mobile desenvolvido em React Native com integração ao Firebase Authentication, permitindo o cadastro, login e gerenciamento básico da conta do usuário.

---

## 👥 Integrantes

- Aluno: Lucas Rafael Solimene / RM: 565194

---

## 📱 Descrição do Projeto

O **Pet Care** é um aplicativo mobile desenvolvido para aplicar os conceitos de autenticação e gerenciamento de sessão utilizando React Native.

O projeto permite que o usuário crie uma conta, realize login, mantenha sua sessão ativa mesmo após fechar e abrir novamente o aplicativo, recupere sua senha, faça logout e exclua sua conta.

A autenticação é realizada utilizando o **Firebase Authentication**, enquanto o **AsyncStorage** é utilizado para manter a persistência da sessão localmente.

O aplicativo possui uma área não autenticada e uma área protegida para usuários autenticados.

---

## 🚀 Tecnologias Utilizadas

### React Native

Framework utilizado para o desenvolvimento da aplicação mobile.

### Firebase Authentication

Utilizado para:

- Cadastro de usuários;
- Login;
- Autenticação por e-mail e senha;
- Recuperação de senha;
- Logout;
- Exclusão da conta.

### AsyncStorage

Utilizado para a persistência local da sessão de autenticação.

O aplicativo não armazena a senha do usuário no AsyncStorage.

### React Navigation

Utilizado para controlar a navegação entre as telas e separar a área autenticada da área não autenticada.

### JavaScript

Linguagem utilizada no desenvolvimento da aplicação.

---

## 📂 Estrutura do Projeto

```text
src/
│
├── config/
│   └── firebase.js
│
├── navigation/
│   ├── AppNavigation.js
│   ├── AuthStack.js
│   └── UserStack.js
│
├── screens/
│   ├── LoginScreen.js
│   ├── CadastroScreen.js
│   ├── EsqueciSenhaScreen.js
│   ├── HomeScreen.js
│   └── PerfilScreen.js
│
└── services/
    └── authService.js
```

---

## 🔐 Autenticação

O aplicativo possui duas áreas principais.

Área não autenticada

Disponível para usuários que ainda não realizaram login:

- Login
- Cadastro
- Esqueci minha senha
- Área autenticada

Disponível somente para usuários autenticados:

- Home
- Minha Conta / Perfil

A navegação é controlada pelo estado de autenticação do Firebase.

Usuários não autenticados não conseguem acessar diretamente as telas da área autenticada.

---

## ✨ Funcionalidades

### 📝 Cadastro

O usuário pode criar uma nova conta informando:

- Nome;
- E-mail;
- Senha;
- Confirmação de senha.

São realizadas validações para verificar:

- Campos obrigatórios;
- Formato válido do e-mail;
- Senha preenchida;
- Senha com pelo menos 6 caracteres;
- Confirmação da senha;
- Correspondência entre senha e confirmação.

Após o cadastro, o usuário é autenticado pelo Firebase e direcionado para a área autenticada.

### 🔑 Login

O usuário pode acessar sua conta utilizando:

- E-mail;
- Senha.

O aplicativo apresenta mensagens de erro caso as credenciais sejam inválidas ou ocorra algum problema durante a autenticação.

Após o login realizado com sucesso, o usuário é direcionado automaticamente para a Home.

### 💾 Persistência da sessão

A sessão do usuário é mantida utilizando o Firebase Authentication com persistência através do AsyncStorage.

Dessa forma, quando o aplicativo é fechado e aberto novamente, o sistema verifica a sessão existente.

Se o usuário ainda estiver autenticado, ele permanece na área autenticada.

### 🔄 Recuperação de senha

Na tela de Login existe a opção:

"Esqueci minha senha"

O usuário informa seu e-mail e o aplicativo utiliza o recurso de recuperação de senha do Firebase Authentication.

Após a solicitação, o aplicativo apresenta uma mensagem informando o resultado da operação.

### 👤 Minha Conta / Perfil

A tela de Perfil apresenta informações básicas do usuário:

- Nome;
- E-mail.

Também estão disponíveis as opções:

- Sair da conta;
- Excluir conta.

### 🚪 Logout

O usuário pode sair da sua conta através do botão "Sair da conta".

Antes de realizar o logout, o aplicativo solicita uma confirmação.

Após a confirmação:

- A sessão do Firebase é encerrada;
- A persistência da autenticação deixa de manter o usuário conectado;
- O estado de autenticação é atualizado;
- O usuário retorna automaticamente para a tela de Login.


### 🗑️ Exclusão da conta

O usuário autenticado pode excluir sua conta através do Perfil.

Antes da exclusão, o aplicativo apresenta uma confirmação.

Após a confirmação:

- A conta é excluída do Firebase Authentication;
- A sessão do usuário é encerrada;
- O usuário retorna para a área não autenticada;
- O usuário não consegue realizar login novamente com a conta excluída.

### 🎨 Interface

O aplicativo possui uma interface simples e organizada, priorizando a funcionalidade e a usabilidade.

Foram utilizados:

- Campos identificados;
- Botões claros;
- Mensagens de erro;
- Mensagens de sucesso;
- Indicadores de carregamento;
- Confirmações para ações importantes;
- Navegação coerente;
- ScrollView para telas com formulário;
- KeyboardAvoidingView para melhorar a utilização em dispositivos mobile.

---

## 📦 Instalação

1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

2. Acessar a pasta do projeto

```bash
cd NOME_DO_PROJETO
```

3. Instalar as dependências

```bash
npm install
```

4. Instalar o AsyncStorage

```bash
npx expo install @react-native-async-storage/async-storage
```

5. Instalar o Firebase

```bash
npm install firebase
```

---

## 🔥 Configuração do Firebase

Para executar o projeto, é necessário configurar um projeto no Firebase.

1. Criar um projeto no Firebase

Acesse o Firebase Console e crie um novo projeto.

2. Ativar o Firebase Authentication

No Firebase:

Authentication

- → Sign-in method
- → Email/Password
- → Ativar

3. Criar um aplicativo Web

Adicione um aplicativo Web ao projeto Firebase para obter as configurações necessárias.

4. Configurar o Firebase no projeto

No arquivo:

src/config/firebase.js

informe as configurações do seu projeto Firebase:

```text
const firebaseConfig = {
  apiKey: 'SUA_API_KEY',
  authDomain: 'SEU_AUTH_DOMAIN',
  projectId: 'SEU_PROJECT_ID',
  storageBucket: 'SEU_STORAGE_BUCKET',
  messagingSenderId: 'SEU_MESSAGING_SENDER_ID',
  appId: 'SEU_APP_ID',
};
```

Não publique credenciais ou informações sensíveis adicionais do seu ambiente no repositório.

---

## ▶️ Execução

Após instalar as dependências e configurar o Firebase, execute:

```bash
npx expo start
```

Será exibido o QR Code do Expo.

A aplicação pode ser executada utilizando:

- Expo Go em um dispositivo físico;
- Emulador Android;
- Simulador iOS, quando disponível.

---

## 🧪 Fluxo de utilização

O fluxo principal do aplicativo é:

```text
Login
  │
  ├── Cadastro
  │      ↓
  │   Criar conta
  │      ↓
  │   Home
  │
  ├── Esqueci minha senha
  │      ↓
  │   Recuperação via Firebase
  │
  └── Login
         ↓
       Home
         ↓
       Perfil
       ├── Sair da conta
       │      ↓
       │    Login
       │
       └── Excluir conta
              ↓
            Login
```

---

## 🔒 Proteção das rotas

O aplicativo utiliza uma navegação condicional baseada no estado de autenticação do Firebase.

Usuário não autenticado

```text
AuthStack
├── Login
├── Cadastro
└── EsqueciSenha
```

Usuário autenticado

```text
UserStack
├── Home
└── Perfil
```

Dessa forma, as telas autenticadas não ficam disponíveis para usuários que não possuem uma sessão ativa.

---

## 📹 Vídeo de Apresentação

Durante o vídeo serão demonstrados os principais fluxos do aplicativo:

- Criação de uma conta;
- Login;
- Fechamento e reabertura do aplicativo demonstrando a persistência da sessão;
- Logout;
- Recuperação de senha;
- Exclusão da conta.

---

## 🔗 Link do vídeo

Link: 