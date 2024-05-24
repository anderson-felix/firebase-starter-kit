import { CreateAdminService } from '@modules/admin/services/admin/CreateAdminService';
import { Request, Response } from 'express';
import { Container } from 'typedi';

export default class AdminController {
  public static async create(req: Request, res: Response): Promise<Response> {
    const service = Container.get(CreateAdminService);

    const response = await service.execute({ ...req.body });

    return res.json(response);
  }
}
