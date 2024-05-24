import { Collection } from 'fireorm';

@Collection(`Admin`)
export default class Admin {
  id: string;

  name: string;

  email: string;

  username: string;

  password: string;

  deleted_at: Date | null;

  created_at: Date;

  updated_at: Date;
}
