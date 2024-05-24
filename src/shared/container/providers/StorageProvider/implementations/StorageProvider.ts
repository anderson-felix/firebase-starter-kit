import DiskStorageProvider from './DiskStorageProvider';

const CloudStorageProvider = DiskStorageProvider; // TODO: Implement Cloud Storage Provider

const StorageProvider = process.env.NODE_ENV?.toLowerCase() === 'production' ? CloudStorageProvider : DiskStorageProvider;

export default StorageProvider;
