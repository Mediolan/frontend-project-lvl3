import validationForm from './validator.js';

const handler = (watchedState) => {
    const submitForm = document.querySelector('.rss-form');
    submitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputData = new FormData(e.target).get("url");
        validationForm(watchedState, inputData);
    })
};

export default handler;