# Roteiro do vídeo — 5 a 10 minutos

**Antes de gravar:** abra dois terminais. No primeiro, entre na pasta do projeto, rode `npm run dev` e deixe o menu visível. No segundo, abra `database/script.sql` e `database/DER.pdf` no computador; abra o pgAdmin com uma base de demonstração pronta. Grave a tela inteira e narre com suas palavras. Duração sugerida: 7 minutos.

## 0:00–0:40 | Apresentação
“Olá, meu nome é [seu nome]. Este é o BookStore Manager CLI, um sistema de terminal para gerenciar autores, livros, clientes e empréstimos. O objetivo do trabalho foi aplicar TypeScript, orientação a objetos, arquitetura em camadas e modelagem relacional.”

## 0:40–1:30 | Organização do projeto
Mostre `src/`: models contém as entidades; repositories guarda os dados em `Map`; services aplica as regras de negócio; controllers recebe as escolhas do terminal; menus organiza os textos; data contém os exemplos; utils valida os campos. Explique que os métodos são assíncronos e que a CLI mantém os dados em memória durante a execução.

## 1:30–2:30 | Banco de dados
Abra `database/DER.pdf`. Explique as cardinalidades: autor 1:N livros, livro 1:N empréstimos ao longo do tempo e cliente 1:N empréstimos. Mostre no pgAdmin a execução integral de `database/script.sql`, as quatro tabelas e as consultas. Aponte PK, FK, UNIQUE, CHECK e os relatórios de livros disponíveis/emprestados, livros por autor, empréstimos por livro e clientes com empréstimos ativos. Reforce que o banco é independente e não há conexão com a aplicação.

## 2:30–3:00 | Inicialização
No terminal, mostre `npm run dev`. A aplicação carrega exemplos: autores IDs 1 e 2; livros IDs 1 e 2; clientes IDs 1 e 2; empréstimo ativo ID 1. Navegue pelos menus e liste cada conjunto.

## 3:00–5:45 | Operações e regras
Demonstre cadastros, consultas, atualizações e remoções. Sugestão de fluxo: crie um autor de teste (ID 3); cadastre um livro de teste vinculado a ele; consulte e atualize o livro; remova esse livro e depois o autor. Cadastre um cliente de teste (ID 3), consulte, atualize e remova.

No menu de empréstimos, liste o empréstimo ID 1. O empréstimo ID 1 já usa um exemplar. Registre mais um empréstimo do livro ID 1; assim, os dois exemplares ficam emprestados e outra tentativa deve exibir “Livro indisponível para empréstimo.” Registre devoluções pelos IDs apresentados na listagem e mostre o aumento da disponibilidade.

## 5:45–6:30 | Tratamento de erros
Mostre pelo menos três casos: consultar um ID que não existe; tentar cadastrar cliente com e-mail inválido; tentar emprestar livro sem exemplares disponíveis. Explique que a mensagem aparece e o menu continua ativo.

## 6:30–7:15 | Encerramento
“Os principais desafios foram manter as relações entre as entidades coerentes e controlar a disponibilidade durante empréstimos e devoluções. O projeto ajudou a praticar a separação entre camadas, validações e consultas relacionais. Como próximos passos, seria possível persistir os dados, criar testes automatizados e conectar a aplicação a uma API ou banco de dados. Obrigado.”

**Depois da gravação:** publique como “não listado” no YouTube (ou compartilhe pelo Drive/OneDrive) e confira que o link abre em janela anônima. Cole o link do repositório e do vídeo no AVA antes do prazo.

