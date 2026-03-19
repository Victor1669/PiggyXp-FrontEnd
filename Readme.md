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

- Node atualizado (Versões 20.x, 22.x e 24.x são garantidas por causa do workflow)
- Gerenciador de pacotes PNPM

## 📦 Gerenciador de pacotes: PNPM

Case não tenha o PNPM, instale com:
| npm install -g pnpm |
| ------------- |

Para instalar as dependências: execute o seguinte comando dentro do projeto:
| pnpm install |
| ------------- |

Para criar as pastas "android" e "ios", execute este comando:
| pnpm run prebuild |
| ------------- |

## 📱 RODANDO O APLICATIVO

Para rodar a aplicação, basta baixar o APK do aplicativo (O link será enviado)

Depois, execute a aplicação com:
| pnpm run start |
| ------------- |

O Expo Go não será usado devido à limitações técnicas, tais como:

- Não suporta notificações push
- Não suporta autenticação com o Facebook (Exige SDK nativo)
- Hot-Reload limitado, podendo ser lento ou simplesmente não funcionar
- Risco da aplicação se comportar diferente na produção, causando problemas

## 📖 Bibliotecas:

```
Normais
axios:                                              Requisições e interceptadores.
jwt-decode:                                         Decodificação de tokens JWT.
expo-router:                                        Roteamento nativo baseado em arquivos.
expo-image-picker:                                  Acesso à câmera e galeria do dispositivo.
expo-updates:                                       Atualizações OTA (Over-the-Air) da aplicação.
expo-dev-client:                                    Execução da aplicação nativamente fora do Expo Go.
expo-notifications:                                 Gerenciamento de notificações push e locais.
expo-secure-store:                                  Armazenamento criptografado de credenciais.
expo-av:                                            Reprodução de áudio e vídeo.
expo-constants:                                     Acesso a constantes do sistema e ambiente.
react-native-toast-message:                         Feedbacks visuais e interativos (Toasts).
react-hook-form:                                    Gestão de formulários dinâmicos e validação.
@react-native-community/netinfo:                    Verificação do estado da conexão de rede.
@react-native-google-signin/google-signin:          Autenticação com Google.
react-native-fbsdk-next:                            Autenticação com Facebook.

Desenvolvimento
typescript:                                         Tipagem estática para uma aplicação mais robusta.
jest:                                               Framework para testes unitários e de integração.
@testing-library/react-native:                      Testes de componentes focados no comportamento do usuário.
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

## ⚠ Variáveis de ambiente:

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
│   └── 📁 Schemas  -> Validações para formulários
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
