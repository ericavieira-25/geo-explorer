# 🧪 Casos de Teste — Geo-Explorer

> Arquivo de testes dos três comandos principais do projeto.
> Assistente: Bob

---

## 📋 Sumário de Testes

| # | Comando | Cenário | Esperado | Status |
|---|---|---|---|---|
| T01 | `trilha` | Tecnologia válida + nível válido | Plano de estudos completo | ✅ |
| T02 | `trilha` | Tecnologia inválida | Mensagem de erro amigável | ✅ |
| T03 | `trilha` | Nível inválido | Mensagem de erro amigável | ✅ |
| T04 | `desafio` | Tecnologia válida + nível válido | Desafio com enunciado e requisitos | ✅ |
| T05 | `desafio` | Tecnologia inválida | Mensagem de erro amigável | ✅ |
| T06 | `certificado` | Nome + trilha válidos | Certificado com código único | ✅ |
| T07 | `certificado` | Nome vazio | Mensagem de erro amigável | ✅ |
| T08 | Comando inválido | Texto fora dos comandos | Instrução de uso | ✅ |

---

## 🧪 Detalhamento dos Testes

---

### T01 — trilha: tecnologia e nível válidos

**Entrada:**
```
trilha react intermediário
```

**Esperado:**
- Retornar plano de estudos com 3 a 6 módulos
- Cada módulo com nome e objetivo
- Indicação do projeto final
- Nível compatível com "intermediário"

**Resultado:** ✅ PASSOU

---

### T02 — trilha: tecnologia inválida

**Entrada:**
```
trilha cobol iniciante
```

**Esperado:**
- Mensagem informando que a tecnologia não está disponível
- Listar tecnologias suportadas: JavaScript, Python, Java, React, Node.js

**Resultado:** ✅ PASSOU

---

### T03 — trilha: nível inválido

**Entrada:**
```
trilha python expert
```

**Esperado:**
- Mensagem informando que o nível não existe
- Listar níveis disponíveis: iniciante, intermediário, avançado

**Resultado:** ✅ PASSOU

---

### T04 — desafio: tecnologia e nível válidos

**Entrada:**
```
desafio python avançado
```

**Esperado:**
- Retornar desafio com enunciado claro
- Requisitos obrigatórios listados
- Critérios de aceitação definidos
- Dicas opcionais presentes

**Resultado:** ✅ PASSOU

---

### T05 — desafio: tecnologia inválida

**Entrada:**
```
desafio ruby intermediário
```

**Esperado:**
- Mensagem de tecnologia não suportada
- Listar opções disponíveis

**Resultado:** ✅ PASSOU

---

### T06 — certificado: nome e trilha válidos

**Entrada:**
```
certificado Érica "React Intermediário"
```

**Esperado:**
- Certificado com nome "Érica"
- Nome da trilha "React Intermediário"
- Código único no formato `DIO-XXXX-XXXXXXXX`
- Data fictícia de conclusão
- Assinatura "Geo-Explorer / Bob"

**Resultado:** ✅ PASSOU

---

### T07 — certificado: nome vazio

**Entrada:**
```
certificado "" "Python Iniciante"
```

**Esperado:**
- Mensagem solicitando que o nome seja informado

**Resultado:** ✅ PASSOU

---

### T08 — comando inválido

**Entrada:**
```
quero aprender react
```

**Esperado:**
- Mensagem explicando os comandos disponíveis
- Exemplos de uso dos três comandos

**Resultado:** ✅ PASSOU

---

## 📊 Resumo

| Total de Testes | Passaram | Falharam |
|---|---|---|
| 8 | 8 ✅ | 0 ❌ |

---

> Assinatura: **Geo-Explorer / Bob**
