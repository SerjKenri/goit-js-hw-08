import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('textarea[name="message"]'),
    email: document.querySelector('input[name="email"]')
};

const STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInput, 500));

function onFormSubmit (evt) {
    evt.preventDefault();

    evt.currentTarget.reset();

    localStorage.removeItem(STORAGE_KEY);
}

function onInput (evt) {
    const value = {email: refs.email.value, message: refs.textarea.value};
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}


const load = key => {
    try {
        const serializedState = localStorage.getItem(key);
        return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
        console.error('Get state error: ', error.message);
    }
}

const savedData = load(STORAGE_KEY);

if(savedData){
    refs.email.value = savedData.email;
    refs.textarea.value = savedData.message;
}
