import { User } from '../types/user';
import { readDB, writeDB } from '../utils/fileUtills';

export class UserModel {
  getAll(): User[] {
    const db = readDB();
    return db.users;
  }

  getById(id: number): User | undefined {
    const db = readDB();
    return db.users.find((user: User) => user.id === id);
  }

  getByEmail(email: string): User | undefined {
    const db = readDB();
    return db.users.find((user: User) => user.email === email);
  }

  create(data: Omit<User, 'id' | 'createdAt' | 'lastLogin'>): User {
    const db = readDB();

    const newUser: User = {
      id: db.users.length ? Math.max(...db.users.map((u: User) => u.id)) + 1 : 1,
      createdAt: new Date().toISOString(),
      lastLogin: '',
      ...data,
    };

    db.users.push(newUser);
    writeDB(db);

    return newUser;
  }

  update(id: number, updates: Partial<User>): User | null {
    const db = readDB();
    const index = db.users.findIndex((u: User) => u.id === id);
    if (index === -1) return null;

    db.users[index] = { ...db.users[index], ...updates };
    writeDB(db);

    return db.users[index];
  }

  delete(id: number): boolean {
    const db = readDB();
    const index = db.users.findIndex((u: User) => u.id === id);
    if (index === -1) return false;

    db.users.splice(index, 1);
    writeDB(db);

    return true;
  }
}
