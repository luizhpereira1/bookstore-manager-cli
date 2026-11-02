import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { LibraryService } from "../services/library.service";
import { mainMenu, loansMenu, crudMenu } from "../menus/menus";
import { requirePositiveInteger } from "../utils/errors";

export class CliController {
  private readonly io = createInterface({ input: stdin, output: stdout });
  constructor(private readonly service: LibraryService) {}
  async run(): Promise<void> {
    console.log("\n=== BookStore Manager CLI ==="); let active = true;
    while (active) {
      console.log(mainMenu); const op=(await this.ask("Escolha")).trim();
      try { if(op==="1") await this.authors(); else if(op==="2") await this.books(); else if(op==="3") await this.customers(); else if(op==="4") await this.loans(); else if(op==="0") active=false; else console.log("Opção inválida."); }
      catch(e){this.error(e);}
    }
    this.io.close(); console.log("Até logo!");
  }
  private ask(label:string):Promise<string>{return this.io.question(label+": ");}
  private id(label:string):Promise<number>{return this.ask(label).then(v=>requirePositiveInteger(v,label));}
  private error(e:unknown):void{console.log("Erro: "+(e instanceof Error?e.message:"erro inesperado"));}
  private async crud(label:string):Promise<string>{return (await this.ask(crudMenu(label))).trim();}
  private async authors():Promise<void>{let done=false;while(!done)try{switch(await this.crud("Autores")){
    case "1":await this.service.addAuthor(await this.ask("Nome"),await this.ask("Nacionalidade"));console.log("Autor cadastrado.");break;
    case "2":console.table(await this.service.listAuthors());break;
    case "3":console.table([await this.service.getAuthor(await this.id("ID do autor"))]);break;
    case "4":{const id=await this.id("ID do autor"),a=await this.service.getAuthor(id);await this.service.updateAuthor(id,await this.ask("Nome ["+a.name+"]"),await this.ask("Nacionalidade ["+a.nationality+"]"));console.log("Autor atualizado.");break;}
    case "5":await this.service.deleteAuthor(await this.id("ID do autor"));console.log("Autor removido.");break;case "0":done=true;break;default:console.log("Opção inválida.");}}catch(e){this.error(e);}}
  private async books():Promise<void>{let done=false;while(!done)try{switch(await this.crud("Livros")){
    case "1":await this.service.addBook(await this.ask("Título"),await this.ask("ISBN"),await this.id("Ano"),await this.id("ID do autor"),await this.id("Exemplares"));console.log("Livro cadastrado.");break;
    case "2":console.table(await this.service.listBooks());break;case "3":console.table([await this.service.getBook(await this.id("ID do livro"))]);break;
    case "4":{const id=await this.id("ID do livro"),b=await this.service.getBook(id);await this.service.updateBook(id,await this.ask("Título ["+b.title+"]"),await this.ask("ISBN ["+b.isbn+"]"),await this.id("Ano ["+b.publicationYear+"]"),await this.id("Autor ["+b.authorId+"]"),await this.id("Exemplares ["+b.totalCopies+"]"));console.log("Livro atualizado.");break;}
    case "5":await this.service.deleteBook(await this.id("ID do livro"));console.log("Livro removido.");break;case "0":done=true;break;default:console.log("Opção inválida.");}}catch(e){this.error(e);}}
  private async customers():Promise<void>{let done=false;while(!done)try{switch(await this.crud("Clientes")){
    case "1":await this.service.addCustomer(await this.ask("Nome"),await this.ask("E-mail"),await this.ask("Telefone"));console.log("Cliente cadastrado.");break;
    case "2":console.table(await this.service.listCustomers());break;case "3":console.table([await this.service.getCustomer(await this.id("ID do cliente"))]);break;
    case "4":{const id=await this.id("ID do cliente"),c=await this.service.getCustomer(id);await this.service.updateCustomer(id,await this.ask("Nome ["+c.name+"]"),await this.ask("E-mail ["+c.email+"]"),await this.ask("Telefone ["+c.phone+"]"));console.log("Cliente atualizado.");break;}
    case "5":await this.service.deleteCustomer(await this.id("ID do cliente"));console.log("Cliente removido.");break;case "0":done=true;break;default:console.log("Opção inválida.");}}catch(e){this.error(e);}}
  private async loans():Promise<void>{let done=false;while(!done)try{switch((await this.ask(loansMenu)).trim()){
    case "1":{const book=await this.id("ID do livro"),customer=await this.id("ID do cliente"),days=await this.ask("Prazo em dias [14]");await this.service.createLoan(book,customer,days?requirePositiveInteger(days,"Prazo"):14);console.log("Empréstimo registrado.");break;}
    case "2":await this.service.returnLoan(await this.id("ID do empréstimo"));console.log("Devolução registrada.");break;
    case "3":console.table((await this.service.listLoans()).map(l=>({id:l.id,livro:l.bookTitle,cliente:l.customerName,retirada:l.loanDate.toLocaleDateString("pt-BR"),prazo:l.dueDate.toLocaleDateString("pt-BR"),devolucao:l.returnDate?.toLocaleDateString("pt-BR")??"Ativo"})));break;
    case "4":await this.service.deleteLoan(await this.id("ID devolvido"));console.log("Empréstimo removido.");break;case "0":done=true;break;default:console.log("Opção inválida.");}}catch(e){this.error(e);}}
}
