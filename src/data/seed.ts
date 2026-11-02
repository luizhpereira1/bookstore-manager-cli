import { Author, Book, Customer, Loan } from "../models/entities";
export const seedData = {
  authors: [new Author(1, "Machado de Assis", "Brasileira"), new Author(2, "Clarice Lispector", "Brasileira")],
  books: [new Book(1, "Dom Casmurro", "978-85-359-0277-5", 1899, 1, 2, 1), new Book(2, "A Hora da Estrela", "978-85-325-0611-1", 1977, 2, 1, 1)],
  customers: [new Customer(1, "Ana Souza", "ana@example.com", "11999990001"), new Customer(2, "Bruno Lima", "bruno@example.com", "11999990002")],
  loans: [new Loan(1, 1, 1, new Date("2026-10-20T12:00:00"), new Date("2026-11-03T12:00:00"))],
};

