import { Container } from 'typedi';

/** PROVIDERS IMPORTS */
import StorageProvider from './providers/StorageProvider/implementations/StorageProvider';
import IStorageProvider from './providers/StorageProvider/models/IStorageProvider';

import HashProvider from './providers/HashProvider/implementations/HashProvider';
import IHashProvider from './providers/HashProvider/models/IHashProvider';

/** REPOSITORY IMPORTS */
import AdminRepository from '@modules/admin/infra/fireorm/repositories/AdminRepository';
import IAdminRepository from '@modules/admin/repositories/IAdminRepository';

/** PROVIDERS DECLARATION */
Container.set<IStorageProvider>('StorageProvider', new StorageProvider());
Container.set<IHashProvider>('HashProvider', new HashProvider());

/** REPOSITORY DECLARATION */
Container.set<IAdminRepository>('AdminRepository', new AdminRepository());
