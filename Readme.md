# 🐖 PiggyXp FrontEnd

## Projeto de TCC

Este é o repositório do FrontEnd do nosso projeto de TCC, o PiggyXp.

## 👨‍💻 Tecnologias do FrontEnd:

- React Native
- TypeScript
- JavaScript
- Jest

## IMPORTANTE

Esse projeto precisa de:

- Node atualizado
- Gerenciador de pacotes PNPM
- Opções de desenvolvedor ativadas no celular
- Android SDK, SDK Platform, Android SDK Build-Tools e ADB (Android Debug Bridge)

Esses últimos são obtidos baixando o Android Studio

## 📦 Gerenciador de pacotes: PNPM

Case não tenha o PNPM, instale com:
| npm install -g pnpm |
| ------------- |

Para instalar as dependências: execute o seguinte comando dentro do projeto:
| pnpm install |
| ------------- |

Para criar as pastas "android" e "ios", execute este comando:
| pnpm expo prebuild |
| ------------- |

Para rodar a aplicação, execute o seguinte comando (é necessário conectar o celular no computador):
| pnpm expo run:android |
| ------------- |
AVISO: Na primeira vez executanto depois de criar as pastas, demora minutos para configurar tudo, inclusive em algumas partes vai exigir mais do processamento

O Expo Go não será usado porque ele não tem suporte para configurações, fora que a development build do Android oferece várias vantagens, como hot-reload mais rápido, e um teste mais próximo da produção.

### 📖 Bibliotecas:

```
Normais

- axios:                            Requisições e Interceptadores
- react-hook-form                   Formulários dinâmicos
- expo-router                       Roteamento das telas
- expo-notifications                Notificações no celular
- react-native-toast-message        Feedbacks interativos
- expo-secure-store                 Armazenamento criptografado de credenciais
- react-native-fbsdk-next           Autenticação com Facebook
- expo-auth-session                 Autenticações no geral (usado com Google nessa aplicação)

Desenvolvimento

- typescript                        Aplicação mais robusta
- react-dom + react-native-web      Testes no navegador
- jest                              Testes unitários
- @testing-library                  Complemento ao Jest
```

## 🏪 Convenções:

### Extensões (Fique livre pra escolher alternativas):

- Material Icon: Ícones de arquivos e pastas, útil para seguir padrões de projetos
- Prettier: Formatação do código

### Branches no Git:

#### Essa convenção serve para organização dos commits

(Todos em minúsculo na hora de criar as branchs)

- Main: A branch de "produção", onde o conteúdo só irá ser adicionado após testes e correções do conteúdo
- Feature: Voltada para adição de conteúdo
- HotFix: Caso a Main ou a Feature tenham problemas, essa serve para correção do código
- Doc: Para alteração no ReadMe e no TODO, para manter a documentação atualizada

### Extensões de arquivos:

#### Essa convenção não se aplica a arquivos de configuração, ela serve pra melhorar a experiência no desenvolvimento do código.

- .js: Arquivos de configurações
- .jsx: Arquivos que representam as telas
- .ts: Services e Hooks
- .css.ts: Arquivos de estilização (JAMAIS CRIE UM DESSES DENTRO DE app/)
- .test.js: Arquivos de teste
- .tsx: Qualquer arquivo que não se encaixe nos outros requisitos

### Desenvolvimento

NUNCA coloque os arquivos do projeto em alguma máquina que não seja sua, apenas em último caso com real necessidade

## Variáveis de ambiente:

O arquivo .env precisa estar na raiz do projeto

### Variáveis usadas:

```
- EXPO_PUBLIC_BACKEND_URL                   URL onde o BackEnd está hospedado/rodando
- EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID      ID do cliente android no Google Cloud
- EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID          ID do cliente iOS no Google Cloud
- EXPO_PUBLIC_FACEBOOK_APP_ID               ID do app no Meta Developers
- EXPO_PUBLIC_FACEBOOK_CLIENT_TOKEN         Token de cliente do app
```

## 🗃️ Arquitetura do projeto (esboço):

```
├── 📁 app              -> Pasta onde as páginas estarão configuradas
│   ├── 📄 _layout.js   -> Configuração da rota
│   └── 📄 index.jsx    -> Arquivo principal da pasta, como app/ é a raiz do projeto, a rota dele é "/"
├── 📁 assets           -> Pasta principal de imagens
├── 📁 src              -> Pasta onde a maioria do conteúdo vai estar
│   ├── 📁 Components   -> Pedaços de interface
|   |   └── 📄 *.css.ts   -> Arquivo com a estilização da página
│   ├── 📁 Features     -> Cada feature estará aqui
│   └── 📁 Hooks        -> Lógica reutilizável
│   └── 📁 Services     -> Conexão com o BackEnd
│   └── 📁 Contexts     -> Gerenciamento de estado avançado
│   └── 📁 Styles       -> Estilização
│   └── 📁 Utils        -> Funções simples que podem ser usadas independentemente do projeto (Ex: uma função que converte a data em um certo formato)
│   └── 📁 Helpers      -> Funções específicas reutilizáveis feitas pro projeto/regra de negócios
│   └── 📁 Tests        -> Testes unitários pro CI/CD
│   └── 📁 Validations  -> Validações para formulários
│   └── 📁 Types        -> Tipos personalizados comuns
├── ⚙️ .gitignore       -> Arquivo que lista o que NÃO deve ir pro repositório na hora do git push
├── 📝 Readme.md        -> Arquivo com informações do projeto (O que você está lendo agora)
├── 📝 TODO.md          -> Lista de tarefas para documentar o que vai ser feito na versão
├── ⚙️ app.config.js    -> Configurações do Mobile
|
|   ARQUIVOS ESSENCIAIS PARA INSTALAÇÃO DE DEPENDÊNCIAS, NÃO MEXA!!!
├── ⚙️ package.json
├── ⚙️ pnpm-lock.yaml
└── ⚙️ pnpm-workspace.yaml
```
