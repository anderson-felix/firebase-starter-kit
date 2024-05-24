import { Inject, Service } from 'typedi';

import IAdminRepository from '@modules/admin/repositories/IAdminRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import ICreateAdminDTO from '@modules/admin/dtos/IAdminDTO';
import { LocaleError } from '@shared/errors/LocaleError';
import Admin from '@modules/admin/infra/fireorm/collections/Admin';

interface IRequest extends ICreateAdminDTO {}

@Service()
export class CreateAdminService {
  constructor(
    @Inject('AdminRepository')
    private adminRepository: IAdminRepository,

    @Inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<Admin> {
    return { email } as any;
    const adminWithSameEmail = await this.adminRepository.findByEmail(email, true);
    if (adminWithSameEmail) throw new LocaleError('emailAlreadyExists');

    const hashedPassword = await this.hashProvider.generateHash(password);

    const admin = await this.adminRepository.create({ name, email, password: hashedPassword });

    return admin;
  }
}
