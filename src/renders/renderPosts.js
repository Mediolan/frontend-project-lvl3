import i18next from 'i18next';
import renderBorder from './renderBorder.js';

const renderPosts = (posts) => {
  const column = renderBorder('.posts');

  // eslint-disable-next-line array-callback-return
  posts.map((post) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('type', 'button');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = i18next.t('contents.view');

    const aTag = document.createElement('a');
    aTag.classList.add('fw-bold');
    aTag.setAttribute('target', '_blank');
    aTag.setAttribute('rel', 'noopener, noreferrer');
    aTag.setAttribute('data-id', post.id);
    aTag.href = post.link;
    aTag.textContent = post.title;
    button.setAttribute('data-id', post.id);
    li.append(aTag, button);

    column.querySelector('.list-group').prepend(li);
  });
};

export default renderPosts;
