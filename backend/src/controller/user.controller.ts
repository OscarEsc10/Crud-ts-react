import { Request, Response } from 'express';
import { readDB, writeDB } from '../utils/fileUtills';
import { User } from '../types/user';

export class UserController {
  getAll(req: Request, res: Response): void {
    const db = readDB();
    res.json(db.users);
  }

  getById(req: Request, res: Response): void {
    const db = readDB();
    const user = db.users.find((u: User) => u.id === parseInt(req.params.id));
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  }

  create(req: Request, res: Response): void {
    const db = readDB();

    const newUser: User = {
      id: db.users.length + 1,
      createdAt: new Date().toISOString(),
      ...req.body,
    };

    db.users.push(newUser);
    writeDB(db);

    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  }

  update(req: Request, res: Response): void {
    const db = readDB();
    const index = db.users.findIndex((u: User) => u.id === parseInt(req.params.id));

    if (index === -1) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    db.users[index] = { ...db.users[index], ...req.body };
    writeDB(db);

    res.json({
      message: 'User updated successfully',
      user: db.users[index],
    });
  }

  delete(req: Request, res: Response): void {
    const db = readDB();
    const index = db.users.findIndex((u: User) => u.id === parseInt(req.params.id));

    if (index === -1) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    db.users.splice(index, 1);
    writeDB(db);

    res.status(200).json({ message: 'User deleted successfully' });
  }
}
