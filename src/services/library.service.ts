import { Author, Book, Customer, Entity, Loan, LoanDetails } from "../models/entities";
import { MemoryRepository } from "../repositories/memory.repository";
import { AppError, requireEmail, requireText } from "../utils/errors";

export class LibraryService {
  private readonly authors = new MemoryRepository<Author>();
  private readonly books = new MemoryRepository<Book>();
  private readonly customers = new MemoryRepository<Customer>();
  private readonly loans = new MemoryRepository<Loan>();
  private readonly nextIds = { author: 1, book: 1, customer: 1, loan: 1 };

  private next(kind: keyof LibraryService["nextIds"]): number { return this.nextIds[kind]++; }

  async listAuthors(): Promise<Author[]> { return this.authors.findAll(); }
  async getAuthor(id: number): Promise<Author> { return this.mustGet(this.authors, id, "Autor"); }
  async addAuthor(name: string, nationality: string): Promise<Author> {
    name = requireText(name, "Nome"); nationality = requireText(nationality, "Nacionalidade");
    if ((await this.authors.findAll()).some(a => a.name.toLowerCase() === name.toLowerCase())) throw new AppError("Já existe um autor com esse nome.");
    return this.authors.create(new Author(this.next("author"), name, nationality));
  }
  async updateAuthor(id: number, name: string, nationality: string): Promise<Author> {
    await this.getAuthor(id); name = requireText(name, "Nome"); nationality = requireText(nationality, "Nacionalidade");
    if ((await this.authors.findAll()).some(a => a.id !== id && a.name.toLowerCase() === name.toLowerCase())) throw new AppError("Já existe outro autor com esse nome.");
    return (await this.authors.update(id, { name, nationality }))!;
  }
  async deleteAuthor(id: number): Promise<void> {
    await this.getAuthor(id);
    if ((await this.books.findAll()).some(b => b.authorId === id)) throw new AppError("Não é possível remover: há livros vinculados a este autor.");
    await this.authors.delete(id);
  }

  async listBooks(): Promise<Book[]> { return this.books.findAll(); }
  async getBook(id: number): Promise<Book> { return this.mustGet(this.books, id, "Livro"); }
  async addBook(title: string, isbn: string, year: number, authorId: number, copies: number): Promise<Book> {
    title = requireText(title, "Título"); isbn = requireText(isbn, "ISBN"); await this.getAuthor(authorId);
    if (!Number.isInteger(year) || year < 1000 || year > new Date().getFullYear()) throw new AppError("Ano de publicação inválido.");
    if (!Number.isInteger(copies) || copies < 1) throw new AppError("A quantidade de exemplares deve ser positiva.");
    if ((await this.books.findAll()).some(b => b.isbn === isbn)) throw new AppError("Já existe um livro com esse ISBN.");
    return this.books.create(new Book(this.next("book"), title, isbn, year, authorId, copies, copies));
  }
  async updateBook(id: number, title: string, isbn: string, year: number, authorId: number, copies: number): Promise<Book> {
    const current = await this.getBook(id); await this.getAuthor(authorId);
    title = requireText(title, "Título"); isbn = requireText(isbn, "ISBN");
    if ((await this.books.findAll()).some(b => b.id !== id && b.isbn === isbn)) throw new AppError("Já existe um livro com esse ISBN.");
    if (!Number.isInteger(year) || year < 1000 || year > new Date().getFullYear()) throw new AppError("Ano de publicação inválido.");
    if (!Number.isInteger(copies) || copies < current.totalCopies - current.availableCopies) throw new AppError("Quantidade inválida: não pode ser menor que os exemplares emprestados.");
    return (await this.books.update(id, { title, isbn, publicationYear: year, authorId, totalCopies: copies, availableCopies: copies - (current.totalCopies - current.availableCopies) }))!;
  }
  async deleteBook(id: number): Promise<void> {
    await this.getBook(id);
    if ((await this.loans.findAll()).some(l => l.bookId === id)) throw new AppError("Não é possível remover: há empréstimos associados a este livro.");
    await this.books.delete(id);
  }

  async listCustomers(): Promise<Customer[]> { return this.customers.findAll(); }
  async getCustomer(id: number): Promise<Customer> { return this.mustGet(this.customers, id, "Cliente"); }
  async addCustomer(name: string, email: string, phone: string): Promise<Customer> {
    name = requireText(name, "Nome"); email = requireEmail(email); phone = requireText(phone, "Telefone");
    if ((await this.customers.findAll()).some(c => c.email === email)) throw new AppError("Já existe um cliente com esse e-mail.");
    return this.customers.create(new Customer(this.next("customer"), name, email, phone));
  }
  async updateCustomer(id: number, name: string, email: string, phone: string): Promise<Customer> {
    await this.getCustomer(id); name = requireText(name, "Nome"); email = requireEmail(email); phone = requireText(phone, "Telefone");
    if ((await this.customers.findAll()).some(c => c.id !== id && c.email === email)) throw new AppError("Já existe outro cliente com esse e-mail.");
    return (await this.customers.update(id, { name, email, phone }))!;
  }
  async deleteCustomer(id: number): Promise<void> {
    await this.getCustomer(id);
    if ((await this.loans.findAll()).some(l => l.customerId === id)) throw new AppError("Não é possível remover: há empréstimos associados a este cliente.");
    await this.customers.delete(id);
  }

  async createLoan(bookId: number, customerId: number, days = 14): Promise<Loan> {
    const book = await this.getBook(bookId); await this.getCustomer(customerId);
    if (book.availableCopies < 1) throw new AppError("Livro indisponível para empréstimo.");
    if (!Number.isInteger(days) || days < 1) throw new AppError("O prazo deve ser um número positivo de dias.");
    const loanDate = new Date(); const dueDate = new Date(loanDate); dueDate.setDate(dueDate.getDate() + days);
    const loan = await this.loans.create(new Loan(this.next("loan"), bookId, customerId, loanDate, dueDate));
    await this.books.update(bookId, { availableCopies: book.availableCopies - 1 });
    return loan;
  }
  async returnLoan(id: number): Promise<Loan> {
    const loan = await this.mustGet(this.loans, id, "Empréstimo");
    if (!loan.isActive) throw new AppError("Este empréstimo já foi devolvido.");
    const book = await this.getBook(loan.bookId);
    await this.loans.update(id, { returnDate: new Date() });
    await this.books.update(book.id, { availableCopies: book.availableCopies + 1 });
    return loan;
  }
  async listLoans(): Promise<LoanDetails[]> {
    const [loans, books, customers] = await Promise.all([this.loans.findAll(), this.books.findAll(), this.customers.findAll()]);
    return loans.map(loan => ({ ...loan, bookTitle: books.find(b => b.id === loan.bookId)?.title ?? "Livro removido", customerName: customers.find(c => c.id === loan.customerId)?.name ?? "Cliente removido", isActive: loan.isActive }));
  }
  async deleteLoan(id: number): Promise<void> {
    const loan = await this.mustGet(this.loans, id, "Empréstimo");
    if (loan.isActive) throw new AppError("Devolva o livro antes de remover o registro do empréstimo.");
    await this.loans.delete(id);
  }

  async seed(authors: Author[], books: Book[], customers: Customer[], loans: Loan[]): Promise<void> {
    for (const item of authors) { await this.authors.create(item); this.nextIds.author = Math.max(this.nextIds.author, item.id + 1); }
    for (const item of books) { await this.books.create(item); this.nextIds.book = Math.max(this.nextIds.book, item.id + 1); }
    for (const item of customers) { await this.customers.create(item); this.nextIds.customer = Math.max(this.nextIds.customer, item.id + 1); }
    for (const item of loans) { await this.loans.create(item); this.nextIds.loan = Math.max(this.nextIds.loan, item.id + 1); }
  }

  private async mustGet<T extends Entity>(repo: MemoryRepository<T>, id: number, label: string): Promise<T> {
    const item = await repo.findById(id);
    if (!item) throw new AppError(`${label} com ID ${id} não encontrado.`);
    return item;
  }
}


