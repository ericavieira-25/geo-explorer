# 🧩 Desafio — React Intermediário

> Gerado pelo Geo-Explorer · Assistente: Bob

---

## 📌 Enunciado

Crie um componente React chamado `TaskBoard` que funcione como um quadro de tarefas simples.
O componente deve permitir ao usuário adicionar, listar e remover tarefas, consumindo um estado global via Context API.

---

## ✅ Requisitos Obrigatórios

- [ ] Criar um `TaskContext` com React Context API
- [ ] Componente `TaskInput` para adicionar novas tarefas
- [ ] Componente `TaskList` para listar as tarefas existentes
- [ ] Componente `TaskItem` com botão de remoção
- [ ] Utilizar `useState` e `useContext` corretamente
- [ ] Estilização básica com CSS Modules ou styled-components

---

## 🎯 Critérios de Aceitação

- O estado deve ser compartilhado via Context (sem prop drilling)
- Tarefas devem ser adicionadas ao pressionar Enter ou clicar em "Adicionar"
- Tarefas removidas devem sumir da lista imediatamente
- A lista deve mostrar mensagem "Nenhuma tarefa adicionada" quando vazia
- O código deve estar organizado em arquivos separados por componente

---

## 💡 Dicas Opcionais

- Use `useReducer` no lugar de múltiplos `useState` para gerenciar o array de tarefas
- Adicione validação para não permitir tarefas com texto vazio
- Considere adicionar um campo de status (pendente / concluída) para cada tarefa

---

> Assinatura: **Geo-Explorer / Bob**
