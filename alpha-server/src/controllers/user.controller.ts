// alpha-server/src/controllers/user.controller.ts
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services';
import { CreateUserDto, UpdateUserDto } from '../types';
import { logger } from '@/utils';

export class UserController {
  constructor(private userService = new UserService()) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.findAll();
      res.json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const user = await this.userService.findById(id);
      
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      logger.info("userData: ", userData);
      const newUser = await this.userService.create(userData);
      
      // Remove password hash from response
      const { passwordHash, ...userResponse } = newUser;
      
      res.status(201).json({ success: true, data: userResponse });
    } catch (error) {
      if (error instanceof Error && error.message.includes('already exists')) {
        return res.status(409).json({ success: false, message: error.message });
      }
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const userData: UpdateUserDto = req.body;
      const updatedUser = await this.userService.update(id, userData);
      
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      
      // Remove password hash from response
      const { passwordHash, ...userResponse } = updatedUser;
      
      res.json({ success: true, data: userResponse });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const success = await this.userService.delete(id);
      
      if (!success) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}