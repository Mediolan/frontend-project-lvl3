/* eslint-disable no-param-reassign */
import axios from 'axios';
import uniqueId from 'lodash/uniqueId.js';
import parser from './parser.js';

const buildUrl = (url) => {
  const urlWithProxy = new URL('/get', 'https://allorigins.hexlet.app');
  urlWithProxy.searchParams.set('url', url);
  urlWithProxy.searchParams.set('disableCache', 'true');
  return urlWithProxy.toString();
};

const getData = (watchedState, url) => {
  const newUrl = buildUrl(url);
  axios.get(newUrl)
    .catch(() => {
      watchedState.errorKey = 'validation.errors.netIssue';
      watchedState.validationStatus = false;
      throw new Error();
    })
    .then((response) => parser(response.data.contents))
    .catch((e) => {
      watchedState.errorKey = e.message;
      watchedState.validationStatus = false;
      throw new Error();
    })
    .then((parsedRSS) => {
      const { feed, posts } = parsedRSS;
      feed.id = uniqueId();
      const postsWithId = posts.map((post) => ({
        ...post, id: uniqueId(), feedId: feed.id,
      }));
      watchedState.validationStatus = true;
      watchedState.feeds.push(feed);
      watchedState.posts.push(...postsWithId);
    });
};

export default getData;
