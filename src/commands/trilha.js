/**
 * trilha.js — Comando: trilha <tecnologia> <nível>
 * Exibe o plano de estudos completo para a tecnologia e nível informados.
 */

const { carregarBase, normalizar, separador } = require('../utils/helpers');

function executar(args) {
  if (args.length < 2) {
    console.log('\n⚠️  Uso correto: trilha <tecnologia> <nível>');
    console.log('   Exemplo: trilha react intermediário\n');
    return;
  }

  const tecnologiaArg = args[0];
  const nivelArg      = args.slice(1).join(' '); // suporta "node.js"

  const base = carregarBase();

  // Valida tecnologia
  const tecnologiaValida = base.tecnologias.find(
    t => normalizar(t) === normalizar(tecnologiaArg)
  );
  if (!tecnologiaValida) {
    console.log(`\n❌ Tecnologia "${tecnologiaArg}" não encontrada.`);
    console.log('   Tecnologias disponíveis: ' + base.tecnologias.join(', ') + '\n');
    return;
  }

  // Valida nível
  const nivelValido = base.niveis.find(
    n => normalizar(n) === normalizar(nivelArg)
  );
  if (!nivelValido) {
    console.log(`\n❌ Nível "${nivelArg}" não encontrado.`);
    console.log('   Níveis disponíveis: ' + base.niveis.join(', ') + '\n');
    return;
  }

  // Busca trilha
  const trilha = base.trilhas.find(
    t => normalizar(t.tecnologia) === normalizar(tecnologiaValida) &&
         normalizar(t.nivel)      === normalizar(nivelValido)
  );
  if (!trilha) {
    console.log(`\n⚠️  Trilha para "${tecnologiaValida} ${nivelValido}" ainda não cadastrada.\n`);
    return;
  }

  // ─── Exibição ────────────────────────────────────────────────────────────
  console.log('\n' + separador('═'));
  console.log(`🗺️  TRILHA — ${trilha.tecnologia.toUpperCase()} · ${trilha.nivel.toUpperCase()}`);
  console.log(separador('═'));
  console.log(`\n📋 ${trilha.descricao}`);
  console.log(`⭐ XP Total : ${trilha.xp.toLocaleString('pt-BR')} XP`);
  console.log(`📦 Módulos  : ${trilha.modulos.length}`);

  console.log('\n' + separador());
  console.log('📚 MÓDULOS');
  console.log(separador());
  trilha.modulos.forEach(m => {
    console.log(`  [${String(m.id).padStart(2, '0')}] ${m.nome}`);
    console.log(`       → ${m.objetivo}`);
  });

  console.log('\n' + separador());
  console.log('🏁 PROJETO FINAL');
  console.log(separador());
  console.log(`  ${trilha.projeto_final}`);

  console.log('\n' + separador());
  console.log('🏅 BADGES');
  console.log(separador());
  console.log('  ' + trilha.badges.map(b => `[${b}]`).join('  '));

  console.log('\n' + separador('═'));
  console.log('  Geo-Explorer / Bob');
  console.log(separador('═') + '\n');
}

module.exports = { executar };
