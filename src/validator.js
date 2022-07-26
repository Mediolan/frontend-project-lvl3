/* eslint-disable no-param-reassign */
import * as yup from 'yup';
import { setLocale } from 'yup';

const validationForm = (watchedState, optimazedUrl) => {
  setLocale({
    mixed: {
      notOneOf: () => ('validation.errors.notUnique'),
    },
    string: {
      url: () => ('validation.errors.invalidURL'),
    },
  });
  const schema = yup.string()
    .url()
    .min(1)
    .notOneOf([watchedState.links.map((link) => link.url)]);

  return schema.validate(optimazedUrl);
};

export default validationForm;
