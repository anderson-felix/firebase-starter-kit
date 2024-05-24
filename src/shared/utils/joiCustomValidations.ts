import Joi from 'joi';

import { removeSpaceFromString } from './removeSpaceFromString';

interface IJoiCustomValidations {
  name: () => Joi.StringSchema<string>;
  username: () => Joi.StringSchema<string>;
  password: () => Joi.StringSchema<string>;
}

export const joiCustomValidations: IJoiCustomValidations = {
  name: () => {
    const nameRegex = /^[a-zA-ZãÃâÂáÁàÀêÊéÉèÈíÍìÌôÔóÓòÒôÔõôúÚùÙçÇ ]{0,}$/;
    const nameChecker = (name: string, minLength = 0) => nameRegex.test(name) && removeSpaceFromString(name).length >= minLength;

    return Joi.string()
      .min(4)
      .custom((value, helper) => (nameChecker(value) ? removeSpaceFromString(value) : helper.message({ custom: 'Nome inválido' })));
  },
  username: () => {
    const usernameRegex = /^[a-zA-Z0-9_-]{0,}$/;
    const usernameChecker = (value: string, minLength = 8) => usernameRegex.test(value) && removeSpaceFromString(value).length >= minLength;

    return Joi.string()
      .min(4)
      .custom((value, helper) => (usernameChecker(value) ? removeSpaceFromString(value) : helper.message({ custom: 'Nome de usuário inválido' })));
  },
  password: () => {
    const passwordValidator = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9,.!@#$%^&*]{8,64}$/;

    return Joi.string()
      .min(8)
      .custom((value, helper) =>
        passwordValidator.test(value)
          ? value
          : helper.message({
              custom: 'Senha inválida, insira uma senha mais forte.',
            }),
      );
  },
};
