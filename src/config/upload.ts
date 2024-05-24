import path from 'path';

export interface IUploadConfig {
  driver: 'cloud' | 'disk';
  directory: string;
}

const uploadConfig: IUploadConfig = {
  driver: process.env.NODE_ENV?.toLowerCase() === 'production' ? 'cloud' : 'disk',
  directory: path.resolve(__dirname, '..', '..', 'tmp'),
};

export default uploadConfig;
