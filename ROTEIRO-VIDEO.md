# Roteiro do vídeo — siga na ordem

Duração sugerida: 5 a 8 minutos. Grave a tela e fale com calma. Não precisa decorar: acompanhe as falas abaixo.

## Antes de gravar

1. Abra o OBS. Fale uma frase e veja se a barra **Mic/Aux** se mexe. Depois minimize o OBS.
2. Abra o PowerShell pelo menu Iniciar. Digite e pressione Enter:

   `cd "C:\Users\perei\Documents\Codex\2026-10-28\pr\outputs\BookStore-Manager-CLI"`

3. Digite `npm run dev` e pressione Enter. Deixe o terminal aberto no menu inicial.
4. Abra o OBS, clique em **Iniciar gravação**, espere dois segundos e minimize-o.

## 1. Apresentação

**Mostre:** o menu inicial no terminal.

**Fale:** “Olá, meu nome é Luiz Henrique Pereira. Vou apresentar o BookStore Manager CLI, um programa de terminal para organizar autores, livros, clientes e empréstimos.”

## 2. Abra e mostre as pastas do projeto

1. Pressione **Windows + E** para abrir o Explorador de Arquivos.
2. Clique na barra de endereço no alto da janela. Pressione **Ctrl + A**, cole este caminho e pressione **Enter**:

   `C:\Users\perei\Documents\Codex\2026-10-28\pr\outputs\BookStore-Manager-CLI`

3. Mostre as pastas **src** e **database**. Não abra `node_modules`.
4. Dê dois cliques em **src**. Mostre **models**, **repositories**, **services**, **controllers**, **menus**, **data** e **utils**. Clique em Voltar.
5. Dê dois cliques em **database**. Mostre `script.sql` e `DER.pdf`. Abra o PDF, mostre o desenho e feche-o.
6. Volte ao terminal com **Alt + Tab**.

**Fale:** “O projeto foi feito com Node.js e TypeScript. Separei os modelos, as regras, os repositórios e a interação do terminal. A aplicação guarda os dados em memória enquanto está aberta.”

## 3. Consulte os cadastros

No terminal, digite cada número e pressione Enter. No menu interno, escolha **2** para listar; depois **0** para voltar.

- Autores: **1**, depois **2**, mostre a lista, **0**.
- Livros: **2**, depois **2**, mostre a lista, **0**.
- Clientes: **3**, depois **2**, mostre a lista, **0**.

**Fale:** “Aqui estão os dados de exemplo que o sistema carrega ao iniciar.”

## 4. Faça cadastros de demonstração

**Autor:** escolha **1**, depois **1**. Digite nome `Autor de demonstração` e nacionalidade `Brasileira`. Escolha **2** para mostrar. O ID será **3**. Escolha **0**.

**Livro:** escolha **2**, depois **1**. Digite, um campo por vez: título `Livro de demonstração`; ISBN `9786500000001`; ano `2024`; ID do autor **3**; exemplares **1**. Escolha **2** para listar e **0** para voltar.

**Cliente:** escolha **3**, depois **1**. Digite nome `Cliente de demonstração`, e-mail `luiz.demo@example.com` e telefone `11999990003`. Escolha **2** para listar e **0** para voltar.

**Fale:** “Cadastrei exemplos de autor, livro e cliente. O livro está ligado ao autor pelo ID.”

## 5. Empréstimo e devolução

1. Escolha **4** e depois **3** para listar os empréstimos. O empréstimo de exemplo é o ID **1**.
2. Escolha **1** para registrar. Informe livro **1**, cliente **2** e prazo **14** dias.
3. Tente registrar outra vez livro **1**, cliente **2**, prazo **14**. Mostre a mensagem de indisponibilidade: os dois exemplares do livro estão emprestados.
4. Escolha **3** para listar. Depois **2** para devolver e informe o ID do empréstimo novo (**2**). Liste de novo.

**Fale:** “O programa controla os exemplares. Quando não há cópias disponíveis, impede o empréstimo. Na devolução, a cópia fica disponível novamente.”

## 6. Banco de dados e encerramento

1. Pressione **Alt + Tab** até o pgAdmin. Mostre a base `bookstore_manager` e as tabelas **autores**, **livros**, **clientes** e **emprestimos**. Se a árvore estiver fechada, clique na setinha ao lado do servidor, depois em Databases, na base e em Schemas > public > Tables.
2. Volte ao Explorador com **Alt + Tab**, abra `database` e depois `DER.pdf` para mostrar o diagrama.

**Fale:** “O PostgreSQL e a aplicação de terminal são partes separadas do projeto. O diagrama mostra como autores, livros, clientes e empréstimos se relacionam.”

**Finalize:** “Com este projeto pratiquei TypeScript, organização do código, validações e modelagem do banco. Obrigado por assistir.”

## Parar e entregar

1. Volte ao OBS e clique em **Parar gravação**.
2. No OBS, abra **Arquivo > Mostrar gravações** e localize o vídeo. Assista um trecho para confirmar que sua voz foi gravada.
3. Publique o vídeo como **Não listado** no YouTube ou compartilhe pelo Drive/OneDrive.
4. Entregue no AVA os links do repositório e do vídeo.
