import { Service } from 'typedi';

import IAdminRepository from '@modules/admin/repositories/IAdminRepository';
import Admin from '../collections/Admin';
import ICreateAdminDTO from '@modules/admin/dtos/IAdminDTO';
import { BaseFirestoreRepository, getRepository } from 'fireorm';
import { updateCollection } from '@shared/utils';

@Service()
export default class AdminRepository implements IAdminRepository {
  private readonly repository: BaseFirestoreRepository<Admin>;
  constructor() {
    this.repository = getRepository(Admin);
  }

  public async create(dto: ICreateAdminDTO) {
    const newRegister = new Admin();

    updateCollection(newRegister, dto);

    return await this.repository.create(newRegister);
  }

  public async save(collection: Admin) {
    return {} as any;
  }

  public async checkIn(id: string) {
    return {} as any;
  }

  public async findById(id: string) {
    return {} as any;
  }

  public async find() {
    return {} as any;
  }

  public async findByEmail(email: string, withDeleted = false) {
    return {} as any;
  }

  public async delete(collection: Admin) {}
}
