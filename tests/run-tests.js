/**
 * run-tests.js — Testes automatizados dos três comandos do Geo-Explorer
 * Uso: node tests/run-tests.js
 */

// Redireciona stdout para capturar saída dos comandos
const { execSync } = require('child_process');
const path         = require('path');

const ROOT    = path.join(__dirname, '..');
const CLI     = `node "${path.join(ROOT, 'index.js')}"`;

let passou = 0;
let falhou = 0;

function testar(descricao, comando, esperadoConter, esperadoNaoConter) {
  try {
    const saida = execSync(`${CLI} ${comando}`, { cwd: ROOT, encoding: 'utf-8', stdio: 'pipe' });
    const ok    = esperadoConter.every(t => saida.includes(t));
    const notOk = (esperadoNaoConter || []).some(t => saida.includes(t));

    if (ok && !notOk) {
      console.log(`  ✅ ${descricao}`);
      passou++;
    } else {
      console.log(`  ❌ ${descricao}`);
      if (!ok) console.log(`     → Esperava conter: ${esperadoConter.filter(t => !saida.includes(t)).join(', ')}`);
      if (notOk) console.log(`     → Não deveria conter: ${(esperadoNaoConter || []).filter(t => saida.includes(t)).join(', ')}`);
      falhou++;
    }
  } catch (e) {
    console.log(`  ❌ ${descricao} (erro de execução)`);
    console.log(`     → ${e.message.split('\n')[0]}`);
    falhou++;
  }
}

console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║  🧪  GEO-EXPLORER — Testes Automatizados                     ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

// ─── TRILHA ──────────────────────────────────────────────────────────────────
console.log('📚 TRILHA');
console.log('─'.repeat(60));

testar(
  'T01 — trilha react intermediário (válido)',
  'trilha react intermediário',
  ['TRILHA', 'REACT', 'MÓDULOS', 'PROJETO FINAL', 'BADGES']
);

testar(
  'T02 — trilha python iniciante (válido)',
  'trilha python iniciante',
  ['TRILHA', 'PYTHON', 'MÓDULOS', 'PROJETO FINAL']
);

testar(
  'T03 — trilha tecnologia inválida',
  'trilha cobol iniciante',
  ['não encontrada', 'JavaScript']
);

testar(
  'T04 — trilha nível inválido',
  'trilha python expert',
  ['não encontrado', 'iniciante']
);

testar(
  'T05 — trilha sem argumentos',
  'trilha',
  ['Uso correto']
);

// ─── DESAFIO ─────────────────────────────────────────────────────────────────
console.log('\n🧩 DESAFIO');
console.log('─'.repeat(60));

testar(
  'T06 — desafio python avançado (válido)',
  'desafio python avançado',
  ['DESAFIO', 'PYTHON', 'ENUNCIADO', 'REQUISITOS', 'CRITÉRIOS']
);

testar(
  'T07 — desafio react intermediário (válido)',
  'desafio react intermediário',
  ['DESAFIO', 'REACT', 'ENUNCIADO', 'REQUISITOS']
);

testar(
  'T08 — desafio tecnologia inválida',
  'desafio ruby iniciante',
  ['não encontrada', 'JavaScript']
);

testar(
  'T09 — desafio nível inválido',
  'desafio java expert',
  ['não encontrado', 'iniciante']
);

testar(
  'T10 — desafio sem argumentos',
  'desafio',
  ['Uso correto']
);

// ─── CERTIFICADO ─────────────────────────────────────────────────────────────
console.log('\n🏆 CERTIFICADO');
console.log('─'.repeat(60));

testar(
  'T11 — certificado nome e trilha válidos',
  'certificado João "React Intermediário"',
  ['GEO-EXPLORER', 'João', 'React Intermediário', 'Geo-Explorer / Bob']
);

testar(
  'T12 — certificado com trilha reconhecida (XP e badges)',
  'certificado Maria "Python Avançado"',
  ['Maria', 'Python', 'XP', 'GEO-']
);

testar(
  'T13 — certificado salvo em arquivo',
  'certificado TesteSave "Java Iniciante"',
  ['Certificado salvo em:']
);

testar(
  'T14 — certificado sem argumentos',
  'certificado',
  ['Uso correto']
);

// ─── COMANDO INVÁLIDO ─────────────────────────────────────────────────────────
console.log('\n🔒 COMANDO INVÁLIDO');
console.log('─'.repeat(60));

testar(
  'T15 — comando desconhecido',
  'explorar react',
  ['não reconhecido', 'trilha', 'desafio', 'certificado']
);

testar(
  'T16 — sem comando (ajuda)',
  '',
  ['trilha', 'desafio', 'certificado', 'Exemplos']
);

// ─── RESULTADO FINAL ──────────────────────────────────────────────────────────
const total = passou + falhou;
console.log('\n' + '═'.repeat(60));
console.log(`  RESULTADO: ${passou}/${total} testes passaram  |  ${falhou} falharam`);
console.log('  ' + (falhou === 0 ? '🎉 Todos os testes passaram!' : `⚠️  ${falhou} teste(s) falharam.`));
console.log('═'.repeat(60) + '\n');

process.exit(falhou > 0 ? 1 : 0);
