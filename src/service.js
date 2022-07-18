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

const getFeed = (watchedState, url) => {
  const newUrl = buildUrl(url);
  axios.get(newUrl)
    .then((response) => {
      const parsedRSS = parser(response.data.contents);
      watchedState.validationStatus = true;
      const { feed, posts } = parsedRSS;
      feed.id = uniqueId();
      const postsWithId = posts.map((post) => ({
        ...post, id: uniqueId(), feedId: feed.id,
      }));
      watchedState.links.push(url);
      watchedState.feeds.push(feed);
      watchedState.posts.push(...postsWithId);
    })
    .catch((e) => {
      if (e.message === 'RSS not found') {
        watchedState.errorKey = 'validation.errors.invalidRSS';
      } else if (e.message === 'Request aborted') {
        watchedState.errorKey = 'validation.errors.netIssue';
      } else {
        watchedState.errorKey = 'validation.errors.unknownError';
      }
      watchedState.validationStatus = false;
    });
};

export default getFeed;
