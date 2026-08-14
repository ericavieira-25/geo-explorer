/**
 * certificado.js — Comando: certificado <nome> <trilha>
 * Gera e salva um certificado fictício de conclusão de trilha.
 */

const fs   = require('fs');
const path = require('path');
const { carregarBase, normalizar, gerarCodigo, dataFicticia, separador } = require('../utils/helpers');

function executar(args) {
  if (args.length < 2) {
    console.log('\n⚠️  Uso correto: certificado <nome> <trilha>');
    console.log('   Exemplo: certificado Ana "React Intermediário"\n');
    return;
  }

  const nome  = args[0].trim();
  const trilhaArg = args.slice(1).join(' ').replace(/^"|"$/g, '').trim();

  if (!nome) {
    console.log('\n❌ O nome não pode estar vazio.\n');
    return;
  }
  if (!trilhaArg) {
    console.log('\n❌ O nome da trilha não pode estar vazio.\n');
    return;
  }

  // Tenta identificar tecnologia + nível na string da trilha
  const base = carregarBase();
  let tecnologiaEncontrada = null;
  let nivelEncontrado      = null;
  let xpEncontrado         = 0;
  let badgesEncontradas    = [];

  for (const trilha of base.trilhas) {
    const techNorm  = normalizar(trilha.tecnologia);
    const nivelNorm = normalizar(trilha.nivel);
    const argNorm   = normalizar(trilhaArg);
    if (argNorm.includes(techNorm) && argNorm.includes(nivelNorm)) {
      tecnologiaEncontrada = trilha.tecnologia;
      nivelEncontrado      = trilha.nivel;
      xpEncontrado         = trilha.xp;
      badgesEncontradas    = trilha.badges || [];
      break;
    }
  }

  const codigo    = gerarCodigo();
  const data      = dataFicticia();
  const tecnologia = tecnologiaEncontrada || trilhaArg;
  const nivel      = nivelEncontrado      || '—';
  const xp         = xpEncontrado         || '—';
  const badges     = badgesEncontradas.length
    ? badgesEncontradas.join('  |  ')
    : trilhaArg + ' Graduate';

  // ─── Exibição no terminal ─────────────────────────────────────────────────
  const largura = 62;
  const linha   = '║' + ' '.repeat(largura) + '║';

  function centralizar(texto) {
    const espacos = Math.max(0, largura - texto.length);
    const esq     = Math.floor(espacos / 2);
    const dir     = espacos - esq;
    return '║' + ' '.repeat(esq) + texto + ' '.repeat(dir) + '║';
  }

  console.log('\n' + '╔' + '═'.repeat(largura) + '╗');
  console.log(centralizar('🌍  GEO-EXPLORER — CERTIFICADO OFICIAL'));
  console.log('╠' + '═'.repeat(largura) + '╣');
  console.log(linha);
  console.log(centralizar('Este certificado é concedido a:'));
  console.log(linha);
  console.log(centralizar(`✨  ${nome}  ✨`));
  console.log(linha);
  console.log(centralizar('pela conclusão com êxito da trilha:'));
  console.log(linha);
  console.log(centralizar(`🎓  ${trilhaArg}`));
  console.log(linha);
  console.log('╠' + '═'.repeat(largura) + '╣');
  console.log(centralizar(`📅  Data: ${data}`));
  console.log(centralizar(`🖥️  Tecnologia: ${tecnologia}  |  📊 Nível: ${nivel}`));
  console.log(centralizar(`⭐  XP: ${typeof xp === 'number' ? xp.toLocaleString('pt-BR') : xp} XP  |  🆔 Código: ${codigo}`));
  console.log('╠' + '═'.repeat(largura) + '╣');
  console.log(centralizar('🏅  Badges Conquistadas'));
  console.log(centralizar(badges));
  console.log('╠' + '═'.repeat(largura) + '╣');
  console.log(linha);
  console.log(centralizar('"A tecnologia move o mundo."'));
  console.log(centralizar('Assinado por: Geo-Explorer / Bob'));
  console.log(linha);
  console.log('╚' + '═'.repeat(largura) + '╝');

  // ─── Salva o certificado em /certificados ─────────────────────────────────
  const nomeArquivo = `${normalizar(nome).replace(/\s+/g, '-')}-${normalizar(trilhaArg).replace(/\s+/g, '-')}.md`;
  const destino     = path.join(__dirname, '../../certificados', nomeArquivo);

  const conteudoMd = `# 🏆 Certificado de Conclusão — ${nome}

> Emitido pelo Geo-Explorer · Assistente: Bob

---

\`\`\`
╔══════════════════════════════════════════════════════════════╗
║            🌍 GEO-EXPLORER — CERTIFICADO OFICIAL             ║
╠══════════════════════════════════════════════════════════════╣
║  Este certificado é concedido a:                             ║
║                                                              ║
║              ✨  ${nome.padEnd(42)}✨  ║
║                                                              ║
║  Pela conclusão com êxito da trilha:                         ║
║                                                              ║
║           🎓  ${trilhaArg.padEnd(47)}║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║  📅 Data        : ${data.padEnd(43)}║
║  🖥️  Tecnologia  : ${tecnologia.padEnd(43)}║
║  📊 Nível       : ${nivel.padEnd(43)}║
║  ⭐ XP          : ${(typeof xp === 'number' ? xp.toLocaleString('pt-BR') + ' XP' : String(xp)).padEnd(43)}║
║  🆔 Código      : ${codigo.padEnd(43)}║
╠══════════════════════════════════════════════════════════════╣
║  🏅 Badges: ${badges.substring(0, 49).padEnd(49)}║
╠══════════════════════════════════════════════════════════════╣
║  Assinado por: Geo-Explorer / Bob                            ║
║  "A tecnologia move o mundo."                                ║
╚══════════════════════════════════════════════════════════════╝
\`\`\`

---

## 📌 Uso no LinkedIn

- **Nome:** ${trilhaArg} — Geo-Explorer
- **Organização:** Digital Innovation One
- **Data:** ${data}
- **ID da Credencial:** \`${codigo}\`
- **URL:** https://web.dio.me

## 🐙 No GitHub

\`\`\`markdown
## 🏆 Certificados
- 🎓 [${trilhaArg}](https://web.dio.me) — Geo-Explorer / Bob
\`\`\`

---

> Assinatura: **Geo-Explorer / Bob**
`;

  fs.writeFileSync(destino, conteudoMd, 'utf-8');
  console.log(`\n✅ Certificado salvo em: certificados/${nomeArquivo}\n`);
}

module.exports = { executar };
