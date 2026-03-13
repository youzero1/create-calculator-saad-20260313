import "reflect-metadata";
import { DataSource } from "typeorm";
import { Contact } from "../entities/Contact";
import path from "path";

const dbPath = path.join(process.cwd(), "database.sqlite");

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: dbPath,
  synchronize: true,
  logging: false,
  entities: [Contact],
  migrations: [],
  subscribers: [],
});

let initialized = false;

export async function getDataSource(): Promise<DataSource> {
  if (!initialized) {
    await AppDataSource.initialize();
    initialized = true;
  }
  return AppDataSource;
}
