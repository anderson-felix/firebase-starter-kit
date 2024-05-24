declare namespace Express {
  export interface Request {
    language: import('@shared/errors/localeErrors').LocaleErrorLanguage;
    admin: import('@modules/admin/infra/fireorm/collections/Admin').default;
  }
}
