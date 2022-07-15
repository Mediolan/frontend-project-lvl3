const renderModal = (state, postId) => {
  const modal = document.querySelector('#modal');
  const { title, link, description } = state.posts.find((obj) => obj.id === postId);
  modal.querySelector('.modal-title').textContent = title;
  modal.querySelector('.modal-body ').textContent = description;
  modal.querySelector('.full-article').href = link;
  const seenPost = document.querySelector(`a[data-id='${postId}']`);
  seenPost.classList.remove('fw-bold');
  seenPost.classList.add('fw-normal', 'link-secondary');
};

export default renderModal;
