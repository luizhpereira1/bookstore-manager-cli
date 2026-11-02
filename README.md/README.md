# BookStore Manager CLI

Aplicação de terminal para administrar autores, livros, clientes e empréstimos de uma pequena livraria. Os cadastros ficam em memória durante cada execução. O banco PostgreSQL é um exercício separado de modelagem; a aplicação não se conecta a ele.

## Tecnologias
- Node.js 20 ou superior e npm
- TypeScript e PostgreSQL 14+ (para executar database/script.sql)

## Instalação
npm install
npm run dev

Para compilar e executar: npm run build e npm start.

## Funcionalidades
- CRUD de autores, livros e clientes
- Registro, consulta e devolução de empréstimos
- Dados de exemplo carregados na inicialização
- Validações de campos, IDs, duplicidade, referências e quantidade disponível
- Regras para impedir exclusões que deixariam referências órfãs

## Banco de dados
Abra uma base PostgreSQL e execute database/script.sql pelo pgAdmin (Query Tool). O script cria tabelas, chaves, restrições, índices, dados de exemplo e relatórios.

## DER
O diagrama está em database/DER.pdf. Um autor possui vários livros; um livro e um cliente podem ter vários empréstimos. Cada empréstimo aponta para um livro e um cliente. Data de devolução nula identifica empréstimo ativo.

## Estrutura
src/models: entidades; src/repositories: persistência em memória; src/services: regras de negócio; src/controllers: interação por terminal; src/menus: menus; src/data: dados iniciais; src/utils: erros; src/main.ts: inicialização.

## Demonstração
Consulte ROTEIRO-VIDEO.md para a sequência sugerida.

## Integrantes e Kanban
Integrante(s): preencher com o nome completo antes da entrega.
Kanban: não foi utilizado.

## Entrega
O prazo indicado no enunciado é 03/11/2026 às 22h. Inclua no AVA os links do repositório e do vídeo de demonstração.
