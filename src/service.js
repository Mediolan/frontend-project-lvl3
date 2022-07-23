/* eslint-disable no-param-reassign */
import axios from 'axios';
import uniqueId from 'lodash/uniqueId.js';
import parser from './parser.js';
import renderPosts from './renders/renderPosts.js';

const buildUrl = (url) => {
  const urlWithProxy = new URL('/get', 'https://allorigins.hexlet.app');
  urlWithProxy.searchParams.set('url', url);
  urlWithProxy.searchParams.set('disableCache', 'true');
  return urlWithProxy.toString();
};

const getFeed = (watchedState, url) => {
  const newUrl = buildUrl(url);
  const id = uniqueId();
  axios.get(newUrl)
    .catch(() => {
      watchedState.errorKey = 'validation.errors.netIssue';
      watchedState.validationStatus = false;
      watchedState.formMode = 'active';
    })
    .then((response) => {
      const parsedRSS = parser(response.data.contents);
      watchedState.validationStatus = true;
      const { feed, posts } = parsedRSS;
      feed.id = id;
      const postsWithId = posts.map((post) => ({
        ...post, id: uniqueId(), feedId: id,
      }));
      watchedState.links.push({ url, id });
      watchedState.feeds.push(feed);
      watchedState.posts.push(...postsWithId);
      watchedState.formMode = 'active';
    })
    .catch((e) => {
      if (e.message === 'RSS not found') {
        watchedState.errorKey = 'validation.errors.invalidRSS';
      } else {
        watchedState.errorKey = 'validation.errors.unknownError';
      }
      watchedState.validationStatus = false;
      watchedState.formMode = 'active';
    });
};

export const updateFeed = (state) => {
  if (state.links.length === 0) {
    setTimeout(() => updateFeed(state), 5000);
    return;
  }
  const promises = state.links.map((link) => {
    const newUrl = buildUrl(link.url);
    const comparedFeed = state.posts.filter((post) => post.feedId === link.id);
    return axios.get(newUrl).then((response) => {
      const parsedRSS = parser(response.data.contents);
      const newPosts = parsedRSS.posts.reduce((acc, post) => {
        const coincidences = comparedFeed.filter((oldPost) => Object.keys(post)
          .every((key) => oldPost[key] === post[key]));
        if (coincidences.length === 0) acc.push({ ...post, id: uniqueId(), feedId: link.id });
        return acc;
      }, []);
      return newPosts;
    });
  });
  const promise = Promise.all(promises);
  promise.then((data) => renderPosts(...data))
    .catch((e) => { throw new Error(e); })
    .finally(() => setTimeout(() => updateFeed(state), 5000));
};

export default getFeed;
