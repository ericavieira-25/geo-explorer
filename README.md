<div align="center">

# 🌍 Geo-Explorer

**Plataforma fictícia de trilhas de aprendizagem, desafios de código e certificados digitais.**

> Assistente: **Bob** · Powered by [DIO](https://web.dio.me)

[![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-2.0.0-7c5cd8.svg)](#)
[![Tests](https://img.shields.io/badge/Tests-16%2F16%20✅-brightgreen.svg)](#-testes)

</div>

---

## 📌 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Como Usar](#-como-usar)
- [Comandos Disponíveis](#-comandos-disponíveis)
- [Base de Dados](#-base-de-dados)
- [Arquitetura](#-arquitetura)
- [Testes](#-testes)
- [Exemplos de Saída](#-exemplos-de-saída)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Autor](#-autor)

---

## 🧭 Sobre o Projeto

O **Geo-Explorer** é uma ferramenta de linha de comando (CLI) educacional que simula uma plataforma de aprendizagem.

Com ele, qualquer pessoa pode:
- 📚 Explorar **trilhas de estudo** organizadas por tecnologia e nível
- 🧩 Gerar **desafios de código** práticos e contextualizados
- 🏆 Emitir **certificados fictícios** de conclusão salvos automaticamente

O projeto foi construído com **Node.js puro** (sem dependências externas), lendo uma base de dados fictícia em JSON e respondendo via terminal com saída formatada.

---

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| `trilha` | Exibe plano de estudos com módulos, objetivos, XP e badges |
| `desafio` | Gera desafio com enunciado, requisitos e critérios de aceitação |
| `certificado` | Cria certificado com código único e salva `.md` em `/certificados` |
| Validação de entrada | Detecta tecnologia ou nível inválido com sugestões |
| Base de dados JSON | 15 trilhas cobrindo 5 tecnologias × 3 níveis |
| Testes automatizados | 16 casos de teste sem dependências externas |

---

## 📁 Estrutura de Pastas

```
geo-explorer/
│
├── index.js                    ← Ponto de entrada do CLI
├── package.json
├── README.md
├── .gitignore
│
├── src/
│   ├── commands/
│   │   ├── trilha.js           ← Comando: trilha <tecnologia> <nível>
│   │   ├── desafio.js          ← Comando: desafio <tecnologia> <nível>
│   │   └── certificado.js      ← Comando: certificado <nome> <trilha>
│   └── utils/
│       └── helpers.js          ← Utilitários: normalizar, gerarCodigo, etc.
│
├── data/
│   └── trilhas.json            ← Base fictícia (15 trilhas, 5 tecnologias)
│
├── docs/
│   └── README.md               ← Documentação técnica interna
│
├── trilhas/                    ← Exemplos de trilhas em Markdown
├── desafios/                   ← Exemplos de desafios em Markdown
├── certificados/               ← Certificados gerados automaticamente (.md)
│
└── tests/
    ├── run-tests.js            ← Suite de testes automatizados (16 casos)
    └── casos-de-teste.md       ← Documentação dos casos de teste
```

---

## 🚀 Como Usar

### Pré-requisitos

- [Node.js](https://nodejs.org) v18 ou superior
- Nenhuma dependência externa — **zero `npm install`**

### Instalação

```bash
git clone https://github.com/ericavieira-25/geo-explorer.git
cd geo-explorer
```

### Executar

```bash
node index.js <comando> [argumentos]
```

---

## 🛠️ Comandos Disponíveis

### 1. `trilha <tecnologia> <nível>`

Exibe um plano de estudos completo com módulos, objetivos, XP e badges.

```bash
node index.js trilha react intermediário
node index.js trilha python avançado
node index.js trilha java iniciante
```

### 2. `desafio <tecnologia> <nível>`

Gera um desafio de código com enunciado, requisitos obrigatórios, critérios de aceitação e dicas.

```bash
node index.js desafio javascript avançado
node index.js desafio node.js intermediário
node index.js desafio python avançado
```

### 3. `certificado <nome> <trilha>`

Cria um certificado fictício no terminal e salva automaticamente em `certificados/<nome>-<trilha>.md`.

```bash
node index.js certificado Ana "React Intermediário"
node index.js certificado João "Python Avançado"
node index.js certificado Maria "Java Iniciante"
```

### 4. `ajuda`

Exibe o menu de ajuda com todos os comandos e exemplos.

```bash
node index.js ajuda
```

---

## 🗄️ Base de Dados

O arquivo [`data/trilhas.json`](data/trilhas.json) contém **15 trilhas fictícias** com cobertura completa:

| Tecnologia | Iniciante | Intermediário | Avançado |
|---|:---:|:---:|:---:|
| JavaScript | ✅ 5 módulos · 8k XP | ✅ 6 módulos · 13k XP | ✅ 6 módulos · 20k XP |
| Python | ✅ 5 módulos · 8k XP | ✅ 6 módulos · 14k XP | ✅ 6 módulos · 22k XP |
| Java | ✅ 5 módulos · 9k XP | ✅ 6 módulos · 15k XP | ✅ 6 módulos · 23k XP |
| React | ✅ 5 módulos · 9k XP | ✅ 6 módulos · 15k XP | ✅ 6 módulos · 22k XP |
| Node.js | ✅ 5 módulos · 9k XP | ✅ 6 módulos · 15k XP | ✅ 6 módulos · 23k XP |

Cada trilha contém: `tecnologia`, `nivel`, `descricao`, `modulos[]`, `projeto_final`, `xp`, `badges[]`.

---

## 🏗️ Arquitetura

```
Entrada (process.argv)
        │
        ▼
   index.js (CLI router)
        │
   ┌────┴──────────────────┐──────────────────┐
   │                       │                  │
trilha.js             desafio.js       certificado.js
   │                       │                  │
   └───────────┬───────────┘                  │
               ▼                              ▼
         helpers.js                     helpers.js
    (carregarBase,                  (gerarCodigo,
     normalizar,                     dataFicticia,
     separador)                      fs.writeFileSync)
               │
               ▼
       data/trilhas.json
```

**Fluxo de um comando:**
1. `index.js` lê `process.argv` e roteia para o comando correto
2. O comando valida os argumentos contra a base de dados
3. Formata e exibe a saída no terminal
4. `certificado.js` adicionalmente salva o arquivo `.md`

---

## 🧪 Testes

O projeto inclui **16 casos de teste** automatizados sem frameworks externos.

```bash
node tests/run-tests.js
```

**Cobertura:**

| Grupo | Testes | Status |
|---|---|---|
| `trilha` válido | T01, T02 | ✅ |
| `trilha` inválido | T03, T04, T05 | ✅ |
| `desafio` válido | T06, T07 | ✅ |
| `desafio` inválido | T08, T09, T10 | ✅ |
| `certificado` válido | T11, T12, T13 | ✅ |
| `certificado` inválido | T14 | ✅ |
| Comando inválido | T15, T16 | ✅ |

**Resultado:** `16/16 ✅`

---

## 💻 Exemplos de Saída

### `trilha react intermediário`
```
════════════════════════════════════════════════════════════
🗺️  TRILHA — REACT · INTERMEDIÁRIO
════════════════════════════════════════════════════════════

📋 Desenvolvimento de interfaces modernas e escaláveis com React.
⭐ XP Total : 15.000 XP
📦 Módulos  : 6

────────────────────────────────────────────────────────────
📚 MÓDULOS
────────────────────────────────────────────────────────────
  [01] Hooks Essenciais
       → useState, useEffect, useRef e useContext
  [02] Componentes Avançados
       → HOCs, Render Props e composição de componentes
  ...
```

### `certificado Ana "React Intermediário"`
```
╔══════════════════════════════════════════════════════════════╗
║        🌍  GEO-EXPLORER — CERTIFICADO OFICIAL               ║
╠══════════════════════════════════════════════════════════════╣
║  Este certificado é concedido a:                             ║
║                       ✨  Ana  ✨                            ║
║  Pela conclusão com êxito da trilha:                         ║
║               🎓  React Intermediário                        ║
╠══════════════════════════════════════════════════════════════╣
║  📅 Data: 13 de julho de 2025   🆔 Código: GEO-2025-XXXXXX  ║
╚══════════════════════════════════════════════════════════════╝
```

---

## 🔧 Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| **Node.js 24** | Runtime JavaScript |
| **fs** (nativo) | Leitura de JSON e escrita de certificados |
| **path** (nativo) | Resolução de caminhos multiplataforma |
| **child_process** (nativo) | Execução dos testes automatizados |
| **JSON** | Base de dados fictícia de trilhas |
| **Markdown** | Documentação e certificados gerados |

> ✅ **Zero dependências externas.** Nenhum `npm install` necessário.

---

## 👤 Autor

Projeto desenvolvido com assistência do **Bob**, assistente oficial do **Geo-Explorer**.

- 🌐 Plataforma: [web.dio.me](https://web.dio.me)
- 🤖 Assistente: Bob (Geo-Explorer)
- 📦 Versão: 2.0.0
- 🔗 Repositório: [github.com/ericavieira-25/geo-explorer](https://github.com/ericavieira-25/geo-explorer)

---

<div align="center">

**🌍 Geo-Explorer / Bob** · MIT License

</div>
