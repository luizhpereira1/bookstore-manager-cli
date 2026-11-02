import { seedData } from "./data/seed";
import { CliController } from "./controllers/cli.controller";
import { LibraryService } from "./services/library.service";
async function main(): Promise<void> { const service=new LibraryService(); await service.seed(seedData.authors,seedData.books,seedData.customers,seedData.loans); await new CliController(service).run(); }
main().catch((error: unknown)=>{console.error("Falha ao iniciar a aplicação:",error);process.exitCode=1;});
