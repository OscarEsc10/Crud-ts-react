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
    const { name, email, password, role } = req.body;
  
    if (!name || !email || !password || !role) {
      res.status(400).json({ message: 'All fields (name, email, password, role) are required' });
      return;
    }
  
    const existingUser = db.users.find((u: User) => u.email === email);
    if (existingUser) {
      res.status(409).json({ message: 'Email already exists' });
      return;
    }
  
    const newUser: User = {
      id: db.users.length ? Math.max(...db.users.map((u: User) => u.id)) + 1 : 1,
      name,
      email,
      password,
      role,
      createdAt: new Date().toISOString(),
      lastLogin: '',
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
    const id = parseInt(req.params.id);
    const index = db.users.findIndex((u: User) => u.id === id);
  
    if (index === -1) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
  
    const updatedUser = { ...db.users[index], ...req.body };
    db.users[index] = updatedUser;
    writeDB(db);
  
    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser
    });
  }

  delete(req: Request, res: Response): void {
    const db = readDB();
    const id = parseInt(req.params.id);
    const index = db.users.findIndex((u: User) => u.id === id);
  
    if (index === -1) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
  
    db.users.splice(index, 1);
    writeDB(db);
  
    res.status(200).json({ message: 'User deleted successfully' });
  }
  
}
