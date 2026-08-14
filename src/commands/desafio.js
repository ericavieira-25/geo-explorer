/**
 * desafio.js — Comando: desafio <tecnologia> <nível>
 * Gera um desafio de código contextualizado para a tecnologia e nível informados.
 */

const { carregarBase, normalizar, separador } = require('../utils/helpers');

// ─── Banco de desafios fictícios por tecnologia + nível ──────────────────────
const DESAFIOS = {
  'javascript-iniciante': {
    enunciado: 'Crie uma função chamada `calculadora` que receba dois números e uma operação (+, -, *, /) e retorne o resultado correto.',
    requisitos: [
      'A função deve aceitar três parâmetros: num1, num2, operacao',
      'Suportar as quatro operações básicas: +, -, *, /',
      'Retornar null para operação inválida',
      'Retornar null para divisão por zero',
      'Exibir o resultado no console com uma mensagem clara',
    ],
    criterios: [
      'calculadora(10, 5, "+") retorna 15',
      'calculadora(10, 0, "/") retorna null',
      'calculadora(3, 3, "?") retorna null',
      'Todos os casos cobertos com if/else ou switch',
    ],
    dicas: [
      'Use switch/case para tratar cada operação',
      'Valide os parâmetros antes de calcular',
    ],
  },
  'javascript-intermediario': {
    enunciado: 'Implemente um módulo de busca de filmes que consuma uma API pública (ex: OMDb API), exiba os resultados filtrados e permita marcar filmes como favoritos usando localStorage.',
    requisitos: [
      'Buscar filmes via fetch com async/await',
      'Tratar erros de rede com try/catch',
      'Filtrar resultados por ano ou tipo',
      'Salvar e recuperar favoritos via localStorage',
      'Exibir lista de favoritos separada dos resultados',
    ],
    criterios: [
      'A busca retorna resultados corretamente',
      'Erros de API exibem mensagem amigável',
      'Favoritos persistem após recarregar a página',
      'Código usa ES6+ (destructuring, arrow functions, template literals)',
    ],
    dicas: [
      'Use Promise.all se precisar fazer múltiplas buscas em paralelo',
      'Crie funções puras para transformar os dados da API',
    ],
  },
  'javascript-avancado': {
    enunciado: 'Desenvolva uma biblioteca JavaScript chamada `EventBus` que implemente o padrão Observer, com suporte a eventos nomeados, listeners múltiplos e cancelamento de inscrição. Publique-a como pacote NPM com TypeScript e testes.',
    requisitos: [
      'Classe EventBus com métodos: on(event, fn), off(event, fn), emit(event, ...args)',
      'Suporte a listeners únicos com once(event, fn)',
      'Tipagem completa com TypeScript',
      'Publicação no NPM com package.json correto',
      'Cobertura de testes ≥ 90% com Jest',
    ],
    criterios: [
      'on() registra listener e emit() o dispara corretamente',
      'off() remove apenas o listener especificado',
      'once() dispara uma única vez e se auto-remove',
      'Tipos TypeScript sem uso de any',
      'Build gera arquivos .js e .d.ts',
    ],
    dicas: [
      'Use Map<string, Set<Function>> para armazenar listeners',
      'Considere usar WeakRef para evitar memory leaks',
    ],
  },
  'python-iniciante': {
    enunciado: 'Escreva um script Python que organize arquivos de uma pasta por extensão, movendo-os para subpastas nomeadas pela extensão (ex: .pdf → pasta "pdf").',
    requisitos: [
      'Receber o caminho da pasta como argumento via input()',
      'Listar todos os arquivos da pasta',
      'Criar subpastas por extensão automaticamente',
      'Mover cada arquivo para a subpasta correta',
      'Ignorar subdiretórios existentes',
    ],
    criterios: [
      'Arquivos sem extensão vão para pasta "outros"',
      'Script não quebra se a pasta já existir',
      'Exibe mensagem de sucesso ao final',
      'Trata FileNotFoundError com mensagem clara',
    ],
    dicas: [
      'Use os.path.splitext() para obter a extensão',
      'Use shutil.move() para mover arquivos',
    ],
  },
  'python-intermediario': {
    enunciado: 'Desenvolva uma API REST com Flask para gerenciamento de tarefas, com autenticação JWT, persistência em SQLite via SQLAlchemy e testes com Pytest.',
    requisitos: [
      'Endpoints: POST /login, GET /tasks, POST /tasks, PUT /tasks/:id, DELETE /tasks/:id',
      'Autenticação via JWT em todas as rotas exceto /login',
      'Modelo Task com: id, titulo, descricao, status, criado_em',
      'Validação de dados de entrada',
      'Testes cobrindo todos os endpoints',
    ],
    criterios: [
      'Login retorna token JWT válido',
      'Rotas protegidas retornam 401 sem token',
      'CRUD de tarefas funciona corretamente',
      'Testes passam com pytest sem erros',
    ],
    dicas: [
      'Use flask-jwt-extended para simplificar a autenticação',
      'Use pytest fixtures para criar o app e banco de testes',
    ],
  },
  'python-avancado': {
    enunciado: 'Implemente um pipeline de Machine Learning com FastAPI que leia um CSV, treine um modelo de classificação com Scikit-learn, exponha um endpoint de predição e containerize tudo com Docker.',
    requisitos: [
      'Leitura e pré-processamento do CSV com Pandas',
      'Treinamento de modelo de classificação (ex: RandomForest)',
      'Endpoint POST /predict que recebe features e retorna a predição',
      'Endpoint GET /metrics que retorna acurácia, precisão e recall',
      'Dockerfile funcional para build e execução',
      'Testes de integração com Pytest + TestClient',
    ],
    criterios: [
      'Modelo treinado com acurácia ≥ 80%',
      '/predict retorna label e probabilidade',
      'Docker build e run funcionam sem erros',
      'Cobertura de testes ≥ 70%',
    ],
    dicas: [
      'Use joblib para serializar e carregar o modelo treinado',
      'Use Pydantic para validar o payload do endpoint',
    ],
  },
  'java-iniciante': {
    enunciado: 'Crie um sistema de cadastro de alunos em Java puro com operações de adicionar, listar, buscar por nome e remover alunos, armazenando os dados em um ArrayList.',
    requisitos: [
      'Classe Aluno com: id, nome, email, nota',
      'Classe CadastroAlunos com métodos CRUD',
      'Menu interativo via Scanner no console',
      'Busca por nome (parcial, case-insensitive)',
      'Validação de nota entre 0 e 10',
    ],
    criterios: [
      'Adicionar aluno com ID auto-incrementado',
      'Listar exibe todos os alunos formatados',
      'Busca retorna todos os alunos cujo nome contém o termo',
      'Remoção por ID confirma antes de excluir',
    ],
    dicas: [
      'Use UUID.randomUUID() ou um contador estático para o ID',
      'Use stream().filter() para a busca por nome',
    ],
  },
  'java-intermediario': {
    enunciado: 'Implemente um sistema bancário em Java com POO, suportando criação de contas, depósito, saque, transferência entre contas e extrato, usando JDBC para persistência em H2.',
    requisitos: [
      'Classes: Conta, ContaCorrente, ContaPoupanca (herança)',
      'Interface Operacao com métodos depositar(), sacar(), transferir()',
      'Persistência com JDBC + banco H2 em memória',
      'Tratamento de saldo insuficiente com exceção customizada',
      'Testes unitários com JUnit 5 para regras de negócio',
    ],
    criterios: [
      'ContaPoupanca aplica rendimento no depósito',
      'Transferência debita e credita atomicamente',
      'SaldoInsuficienteException lançada corretamente',
      'Extrato exibe todas as transações ordenadas por data',
    ],
    dicas: [
      'Use o padrão DAO para separar acesso a dados da lógica de negócio',
      'Use try-with-resources para fechar conexões JDBC',
    ],
  },
  'java-avancado': {
    enunciado: 'Construa um sistema de e-commerce com microsserviços Spring Boot: serviço de produtos, serviço de pedidos e serviço de autenticação, comunicando-se via REST e mensageria com RabbitMQ.',
    requisitos: [
      'Três microsserviços independentes com Spring Boot',
      'Autenticação OAuth2 com JWT no serviço de auth',
      'Serviço de pedidos publica eventos no RabbitMQ',
      'Serviço de produtos consome e atualiza estoque',
      'Docker Compose orquestrando todos os serviços',
      'Testes de integração com JUnit 5 e Mockito',
    ],
    criterios: [
      'Login retorna JWT válido consumível por todos os serviços',
      'Pedido criado dispara evento de baixa no estoque',
      'Docker Compose sobe todos os serviços sem erros',
      'Cobertura de testes ≥ 75% nos serviços críticos',
    ],
    dicas: [
      'Use Spring Cloud OpenFeign para chamadas REST entre serviços',
      'Use @RabbitListener para consumir mensagens assíncronas',
    ],
  },
  'react-iniciante': {
    enunciado: 'Crie uma aplicação To-Do List em React com adição, remoção e marcação de tarefas como concluídas, usando apenas useState.',
    requisitos: [
      'Campo de input para adicionar tarefa',
      'Botão "Adicionar" ou tecla Enter para confirmar',
      'Lista exibindo todas as tarefas',
      'Botão para remover cada tarefa',
      'Checkbox para marcar tarefa como concluída',
      'Tarefas concluídas exibidas com estilo diferente (riscado)',
    ],
    criterios: [
      'Não permite adicionar tarefas com texto vazio',
      'Estado atualiza a lista imediatamente',
      'Componentes separados: App, TaskInput, TaskList, TaskItem',
      'Código sem warnings no console',
    ],
    dicas: [
      'Use Date.now() como key temporária para cada tarefa',
      'Use className condicional para o estilo de concluída',
    ],
  },
  'react-intermediario': {
    enunciado: 'Desenvolva um dashboard de tarefas com React, Context API, React Router e consumo de uma API REST fake (JSONPlaceholder), com rotas protegidas por autenticação simulada.',
    requisitos: [
      'TaskContext com Context API para estado global',
      'Rotas: /login, /dashboard, /tasks/:id',
      'Rota /dashboard e /tasks/:id protegidas (redirect para /login)',
      'Listagem de tarefas consumindo JSONPlaceholder',
      'Página de detalhe de cada tarefa',
      'Testes de componentes com React Testing Library',
    ],
    criterios: [
      'Estado compartilhado via Context sem prop drilling',
      'Rota protegida redireciona usuário não autenticado',
      'Dados da API carregados com loading e tratamento de erro',
      'Testes cobrem pelo menos TaskList e TaskItem',
    ],
    dicas: [
      'Use useReducer no Context para gerenciar ações complexas',
      'Use axios com interceptors para adicionar token nas requisições',
    ],
  },
  'react-avancado': {
    enunciado: 'Construa uma plataforma de e-commerce com Next.js, Redux Toolkit, SSR para listagem de produtos e SSG para páginas estáticas, com acessibilidade completa (ARIA e score Lighthouse ≥ 90).',
    requisitos: [
      'getServerSideProps para listagem dinâmica de produtos',
      'getStaticProps + getStaticPaths para páginas de produto',
      'Carrinho de compras com Redux Toolkit (RTK Query para API)',
      'Score Lighthouse Accessibility ≥ 90',
      'Custom hooks: useCart, useProduct',
      'Testes com Jest + React Testing Library ≥ 80% de cobertura',
    ],
    criterios: [
      'SSR retorna HTML com dados ao carregar a página',
      'Navegação por teclado funciona em todos os componentes',
      'Carrinho persiste entre navegações via Redux',
      'Build Next.js sem erros ou warnings',
    ],
    dicas: [
      'Use next/image para otimização automática de imagens',
      'Use aria-label em botões sem texto visível',
    ],
  },
  'nodejs-iniciante': {
    enunciado: 'Crie uma API REST de notas pessoais com Express e MongoDB (Mongoose), com operações de criar, listar, buscar por ID, atualizar e deletar notas.',
    requisitos: [
      'Modelo Note: titulo, conteudo, criado_em',
      'Rotas: GET /notes, GET /notes/:id, POST /notes, PUT /notes/:id, DELETE /notes/:id',
      'Validação de campos obrigatórios (titulo e conteudo)',
      'Respostas JSON com status HTTP corretos',
      'Conexão com MongoDB via Mongoose',
    ],
    criterios: [
      'POST retorna 201 com a nota criada',
      'GET /notes/:id retorna 404 se não encontrada',
      'PUT atualiza apenas os campos enviados',
      'DELETE retorna 204 sem corpo',
    ],
    dicas: [
      'Use express.Router() para organizar as rotas',
      'Use mongoose.Schema com timestamps: true para criado_em e atualizado_em automáticos',
    ],
  },
  'nodejs-intermediario': {
    enunciado: 'Desenvolva uma API de blog com Node.js, Express, autenticação JWT, upload de imagens com Multer, persistência em PostgreSQL com Sequelize e testes com Jest + Supertest.',
    requisitos: [
      'Autenticação: POST /auth/register, POST /auth/login',
      'Posts: CRUD completo em /posts (rotas protegidas exceto GET)',
      'Upload de imagem de capa via multipart/form-data',
      'Paginação em GET /posts com query params page e limit',
      'Testes cobrindo auth e posts com Supertest',
    ],
    criterios: [
      'Token JWT expira em 24h e é validado nas rotas protegidas',
      'Upload salva arquivo localmente e armazena o path no banco',
      'Paginação retorna meta: { total, page, totalPages }',
      'Testes passam com npm test sem erros',
    ],
    dicas: [
      'Use bcrypt para hash de senhas antes de salvar',
      'Use Sequelize migrations para controlar o schema do banco',
    ],
  },
  'nodejs-avancado': {
    enunciado: 'Implemente uma API REST de gerenciamento de usuários com Clean Architecture, autenticação OAuth2, cache com Redis, filas com Bull e deploy automatizado via Docker + GitHub Actions.',
    requisitos: [
      'Arquitetura em camadas: domain, application, infra, presentation',
      'OAuth2 com login social (Google) e JWT de refresh',
      'Cache de listagens com Redis (TTL de 5 minutos)',
      'Fila de e-mail de boas-vindas com Bull + Redis',
      'Dockerfile multi-stage e docker-compose completo',
      'CI/CD com GitHub Actions: lint, test e build',
    ],
    criterios: [
      'Camada domain sem dependências de frameworks externos',
      'Redis invalidado automaticamente ao atualizar um usuário',
      'Fila processa e-mail de forma assíncrona sem bloquear a resposta',
      'Pipeline CI/CD passa em todas as etapas',
    ],
    dicas: [
      'Use inversify ou tsyringe para injeção de dependências',
      'Use ioredis para conexão com Redis no Node.js',
    ],
  },
};

// ─── Função principal ─────────────────────────────────────────────────────────
function executar(args) {
  if (args.length < 2) {
    console.log('\n⚠️  Uso correto: desafio <tecnologia> <nível>');
    console.log('   Exemplo: desafio python avançado\n');
    return;
  }

  const tecnologiaArg = args[0];
  const nivelArg      = args.slice(1).join(' ');

  const base = carregarBase();

  const tecnologiaValida = base.tecnologias.find(
    t => normalizar(t) === normalizar(tecnologiaArg)
  );
  if (!tecnologiaValida) {
    console.log(`\n❌ Tecnologia "${tecnologiaArg}" não encontrada.`);
    console.log('   Disponíveis: ' + base.tecnologias.join(', ') + '\n');
    return;
  }

  const nivelValido = base.niveis.find(
    n => normalizar(n) === normalizar(nivelArg)
  );
  if (!nivelValido) {
    console.log(`\n❌ Nível "${nivelArg}" não encontrado.`);
    console.log('   Disponíveis: ' + base.niveis.join(', ') + '\n');
    return;
  }

  const chave    = `${normalizar(tecnologiaValida)}-${normalizar(nivelValido)}`
    .replace('.', '');
  const desafio  = DESAFIOS[chave];

  if (!desafio) {
    console.log(`\n⚠️  Desafio para "${tecnologiaValida} ${nivelValido}" ainda não disponível.\n`);
    return;
  }

  // ─── Exibição ────────────────────────────────────────────────────────────
  console.log('\n' + separador('═'));
  console.log(`🧩 DESAFIO — ${tecnologiaValida.toUpperCase()} · ${nivelValido.toUpperCase()}`);
  console.log(separador('═'));

  console.log('\n📌 ENUNCIADO');
  console.log(separador());
  console.log('  ' + desafio.enunciado);

  console.log('\n✅ REQUISITOS OBRIGATÓRIOS');
  console.log(separador());
  desafio.requisitos.forEach((r, i) => console.log(`  ${i + 1}. ${r}`));

  console.log('\n🎯 CRITÉRIOS DE ACEITAÇÃO');
  console.log(separador());
  desafio.criterios.forEach((c, i) => console.log(`  ${i + 1}. ${c}`));

  if (desafio.dicas && desafio.dicas.length) {
    console.log('\n💡 DICAS OPCIONAIS');
    console.log(separador());
    desafio.dicas.forEach((d, i) => console.log(`  ${i + 1}. ${d}`));
  }

  console.log('\n' + separador('═'));
  console.log('  Geo-Explorer / Bob');
  console.log(separador('═') + '\n');
}

module.exports = { executar };
