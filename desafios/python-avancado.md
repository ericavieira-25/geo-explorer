# 🧩 Desafio — Python Avançado

> Gerado pelo Geo-Explorer · Assistente: Bob

---

## 📌 Enunciado

Implemente um sistema de pipeline de processamento de dados utilizando Python.
O sistema deve ler um arquivo CSV, aplicar transformações configuráveis e exportar o resultado em JSON.

---

## ✅ Requisitos Obrigatórios

- [ ] Leitura de arquivo CSV com a biblioteca `pandas`
- [ ] Remoção de linhas duplicadas e valores nulos
- [ ] Aplicação de pelo menos 2 transformações (ex: normalização, renomeação de colunas)
- [ ] Exportação do resultado em formato JSON
- [ ] Tratamento de erros com `try/except` e mensagens claras
- [ ] Código organizado em funções com docstrings

---

## 🎯 Critérios de Aceitação

- O script deve aceitar o caminho do arquivo CSV como argumento via terminal (`argparse`)
- As transformações devem ser configuráveis via dicionário de parâmetros
- O arquivo JSON exportado deve conter apenas os dados transformados
- Deve haver log de cada etapa do processamento (usando `logging`)
- Cobertura de testes unitários mínima de 70% com `pytest`

---

## 💡 Dicas Opcionais

- Use `dataclasses` para modelar as configurações do pipeline
- Considere usar `pathlib` no lugar de `os.path` para manipulação de caminhos
- Adicione suporte a múltiplos formatos de saída (JSON, CSV, Parquet)

---

> Assinatura: **Geo-Explorer / Bob**
