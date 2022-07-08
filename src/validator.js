import * as yup from 'yup';
import { setLocale } from 'yup';

const validationForm = (watchedState, url) => {
    const optimazedUrl = url.replace(/\/$/, '').trim().toLowerCase();
    setLocale({
        string: {
          url: () => ({ key: 'errors.invalidURL' }),
          notOneOf: () => ({ key: 'errors.notUnique' }),
        },
      });
    const schema = yup.string()
    .url()
    .notOneOf(watchedState.feeds);

    schema.validate(optimazedUrl)
    .then(() => watchedState.feeds.push(optimazedUrl))
    .catch((e) => watchedState.errorKey = e.errors.map((err) => err.key))
};

export default validationForm;
