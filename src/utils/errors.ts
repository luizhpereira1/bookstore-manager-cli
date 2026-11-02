export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AppError";
  }
}

export function requireText(value: string, label: string): string {
  const clean = value.trim();
  if (!clean) throw new AppError(`${label} não pode ficar vazio.`);
  return clean;
}

export function requirePositiveInteger(value: string, label: string): number {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) {
    throw new AppError(`${label} deve ser um número inteiro positivo.`);
  }
  return number;
}

export function requireEmail(value: string): string {
  const email = requireText(value, "E-mail").toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new AppError("Informe um e-mail válido.");
  }
  return email;
}
