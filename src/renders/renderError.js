import i18next from "i18next";

const renderError = (key) => {
    const inputField = document.getElementById('url-input');
    inputField.classList.add('is-invalid');
    document.querySelector('.feedback').textContent = i18next.t(key);
};

export default renderError;