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
  return axios.get(newUrl)
    .catch(() => {
      throw new Error('validation.errors.netIssue');
    })
    .then((response) => {
      const id = uniqueId();
      const parsedRSS = parser(response.data.contents);
      const { feed, posts } = parsedRSS;
      feed.id = id;
      const postsWithId = posts.map((post) => ({
        ...post, id: uniqueId(), feedId: id,
      }));
      watchedState.links.push({ url, id });
      watchedState.feeds.push(feed);
      watchedState.posts.push(...postsWithId);
      watchedState.feedLoader.state = 'success';
      watchedState.feedLoader.errorKey = null;
    })
    .catch((e) => {
      if (e.message === 'RSS not found') {
        throw new Error('validation.errors.invalidRSS');
      } else {
        throw new Error('validation.errors.unknownError');
      }
    });
};

export const updateFeed = (watchedState) => {
  if (watchedState.links.length === 0) {
    setTimeout(() => updateFeed(watchedState), 5000);
    return;
  }
  const promises = watchedState.links.map((link) => {
    const newUrl = buildUrl(link.url);
    const comparedFeed = watchedState.posts.filter((post) => post.feedId === link.id);
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
  Promise.all(promises)
    .then((data) => {
      const posts = data.flat();
      if (posts.length !== 0) watchedState.posts.push(...posts);
    })
    .catch((e) => { throw new Error(e); })
    .finally(() => setTimeout(() => updateFeed(watchedState), 5000));
};

export default getFeed;
