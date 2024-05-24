import ICreateAdminDTO from '../dtos/IAdminDTO';
import Admin from '../infra/fireorm/collections/Admin';

export default interface IAdminRepository {
  create(dto: ICreateAdminDTO): Promise<Admin>;
  save(collection: Admin): Promise<Admin>;
  checkIn(id: string): Promise<Admin | null>;
  findById(id: string): Promise<Admin | null>;
  find(): Promise<Admin[]>;
  findByEmail(email: string, softDelete?: boolean): Promise<Admin | null>;
  delete(collection: Admin): Promise<void>;
}
