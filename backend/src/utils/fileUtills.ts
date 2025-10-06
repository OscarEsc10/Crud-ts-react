import fs from 'fs';
import path from 'path';

const dbPath = path.join(__dirname, '../../db/db.json');

export const readDB = () => {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

export const writeDB = (data: any) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};
