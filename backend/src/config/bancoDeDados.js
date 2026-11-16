import pg from 'pg';
import { Sequelize } from 'sequelize';
import 'dotenv/config';

// Mantém a sua conexão antiga para as funções com SQL puro
export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});


// Adiciona a nova conexão para os Models do Sequelize
export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
});
