const renderFeed = (value) => {
    const inputField = document.getElementById('url-input');
    inputField.classList.remove('is-invalid');
    document.querySelector('.feedback').textContent = '';
    inputField.focus();
    document.querySelector('.rss-form').reset();
}

export default renderFeed;