#!/usr/bin/env node
/**
 * index.js — Ponto de entrada do CLI Geo-Explorer
 * Uso: node index.js <comando> [args...]
 *
 * Comandos disponíveis:
 *   trilha      <tecnologia> <nível>
 *   desafio     <tecnologia> <nível>
 *   certificado <nome> <trilha>
 */

const trilha      = require('./src/commands/trilha');
const desafio     = require('./src/commands/desafio');
const certificado = require('./src/commands/certificado');

const BANNER = `
╔══════════════════════════════════════════════════════════════╗
║        🌍  GEO-EXPLORER · Assistente Bob  v2.0.0            ║
╚══════════════════════════════════════════════════════════════╝`;

const AJUDA = `
Comandos disponíveis:
  trilha      <tecnologia> <nível>      Plano de estudos
  desafio     <tecnologia> <nível>      Desafio de código
  certificado <nome> <trilha>           Certificado fictício

Tecnologias: JavaScript · Python · Java · React · Node.js
Níveis      : iniciante · intermediário · avançado

Exemplos:
  node index.js trilha react intermediário
  node index.js desafio python avançado
  node index.js certificado Ana "React Intermediário"
`;

const [,, comando, ...args] = process.argv;

console.log(BANNER);

switch ((comando || '').toLowerCase()) {
  case 'trilha':
    trilha.executar(args);
    break;

  case 'desafio':
    desafio.executar(args);
    break;

  case 'certificado':
    certificado.executar(args);
    break;

  case 'ajuda':
  case 'help':
  case '--help':
  case '-h':
    console.log(AJUDA);
    break;

  default:
    if (comando) {
      console.log(`\n❌ Comando "${comando}" não reconhecido.`);
    }
    console.log(AJUDA);
    break;
}
