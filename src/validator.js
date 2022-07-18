/* eslint-disable no-param-reassign */
import * as yup from 'yup';
import { setLocale } from 'yup';
import getFeed from './service.js';

const validationForm = (watchedState, url) => {
  const optimazedUrl = url.replace(/\/$/, '').trim().toLowerCase();
  setLocale({
    mixed: {
      notOneOf: () => ({ key: 'validation.errors.notUnique' }),
    },
    string: {
      url: () => ({ key: 'validation.errors.invalidURL' }),
      min: () => ({ key: 'validation.errors.notEmpty' }),
    },
  });
  const schema = yup.string()
    .url()
    .min(1)
    .notOneOf(watchedState.links);

  schema.validate(optimazedUrl)
    .then(() => getFeed(watchedState, optimazedUrl))
    .catch((e) => {
      watchedState.errorKey = e.errors[0].key;
      watchedState.validationStatus = false;
    });
};

export default validationForm;
