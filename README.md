# BookStore Manager CLI

Aplicação de terminal para administrar autores, livros, clientes e empréstimos de uma pequena livraria. Os cadastros ficam em memória durante cada execução. O banco PostgreSQL é um exercício separado de modelagem; a aplicação não se conecta a ele.

## Tecnologias
- Node.js 20 ou superior e npm
- TypeScript e PostgreSQL 14+ para executar database/script.sql

## Instalação e execução
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
Abra uma base PostgreSQL e execute database/script.sql pelo pgAdmin (Query Tool). O script cria tabelas, chaves, restrições, índices, dados de exemplo e relatórios. A CLI não usa o banco.

## DER
O diagrama está em database/DER.pdf. Um autor possui vários livros; um livro e um cliente podem ter vários empréstimos. Cada empréstimo aponta para um livro e um cliente. Data de devolução nula identifica empréstimo ativo.

## Arquitetura
- src/models: entidades
- src/repositories: persistência em memória
- src/services: validações e regras de negócio
- src/controllers: interação por terminal
- src/menus: textos e navegação
- src/data: dados iniciais
- src/utils: mensagens de erro
- src/main.ts: inicialização
- database: script PostgreSQL e DER

## Demonstração em vídeo
Consulte ROTEIRO-VIDEO.md para a sequência sugerida.

## Integrantes e Kanban
- Integrante: Luiz Henrique Pereira
- Kanban: não foi utilizado.

## Entrega
Repositório público: https://github.com/luizhpereira1/bookstore-manager-cli
Inclua no AVA o link do repositório e o link do vídeo de demonstração até 03/11/2026 às 22h.
