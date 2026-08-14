/**
 * helpers.js — Utilitários compartilhados do Geo-Explorer
 */

const fs   = require('fs');
const path = require('path');

// ─── Carrega a base de dados fictícia ────────────────────────────────────────
function carregarBase() {
  const arquivo = path.join(__dirname, '../../data/trilhas.json');
  const conteudo = fs.readFileSync(arquivo, 'utf-8');
  return JSON.parse(conteudo);
}

// ─── Normaliza texto para comparação (sem acentos, minúsculo) ────────────────
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// ─── Gera código único de certificado ────────────────────────────────────────
function gerarCodigo() {
  const ano  = new Date().getFullYear();
  const hash = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `GEO-${ano}-${hash}`;
}

// ─── Formata data fictícia por extenso ───────────────────────────────────────
function dataFicticia() {
  const meses = [
    'janeiro','fevereiro','março','abril','maio','junho',
    'julho','agosto','setembro','outubro','novembro','dezembro'
  ];
  const d = new Date();
  return `${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`;
}

// ─── Linha separadora ────────────────────────────────────────────────────────
function separador(char = '─', tamanho = 60) {
  return char.repeat(tamanho);
}

module.exports = { carregarBase, normalizar, gerarCodigo, dataFicticia, separador };
