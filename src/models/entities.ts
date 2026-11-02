export interface Entity {
  id: number;
}

export class Author implements Entity {
  constructor(
    public id: number,
    public name: string,
    public nationality: string,
  ) {}
}

export class Book implements Entity {
  constructor(
    public id: number,
    public title: string,
    public isbn: string,
    public publicationYear: number,
    public authorId: number,
    public totalCopies: number,
    public availableCopies: number,
  ) {}
}

export class Customer implements Entity {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public phone: string,
  ) {}
}

export class Loan implements Entity {
  constructor(
    public id: number,
    public bookId: number,
    public customerId: number,
    public loanDate: Date,
    public dueDate: Date,
    public returnDate: Date | null = null,
  ) {}

  get isActive(): boolean {
    return this.returnDate === null;
  }
}

export interface LoanDetails extends Loan {
  bookTitle: string;
  customerName: string;
}
