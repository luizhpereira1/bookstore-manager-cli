export const mainMenu = "\n1 Autores | 2 Livros | 3 Clientes | 4 Empréstimos | 0 Sair";
export const loansMenu = "\nEmpréstimos: 1 Registrar 2 Devolver 3 Listar 4 Remover devolvido 0 Voltar";
export function crudMenu(label: string): string { return `\n${label}: 1 Cadastrar 2 Listar 3 Consultar 4 Atualizar 5 Remover 0 Voltar`; }
