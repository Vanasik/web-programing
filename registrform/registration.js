let usersArray = [];

// Получение пользователей из файла user.json
async function fetchUsersFromJSON() {
    try {
        const response = await fetch('user.json');
        if (!response.ok) {
            throw new Error('Ошибка при загрузке файла user.json');
        }
        const usersFromFile = await response.json();
        usersArray = usersArray.concat(usersFromFile);
        localStorage.setItem('users', JSON.stringify(usersArray));
        localStorage.setItem('usersFromJSONLoaded', 'true');
    } catch (error) {
        console.error(error);
    }
}

// Получение пользователей из localStorage
function getUsers() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        usersArray = JSON.parse(storedUsers);
    }
}

document.querySelector('.Autorisation').addEventListener('click', function(event) {
    event.preventDefault();
    document.body.classList.add('fade-out');
    setTimeout(function() {
        window.location.href = '../registrform/autorisation.html';
    }, 500); // Должно соответствовать продолжительности перехода в CSS
});


// Вызов функции получения пользователей при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    getUsers();
    if (!localStorage.getItem('usersFromJSONLoaded')) {
        fetchUsersFromJSON();
    }
});

// Регулярные выражения для валидации
const phoneRegex = /^\+375\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

// Функция для валидации
function validateInput(input, regex, errorMessage, errorElementId) {
    const isValid = regex.test(input);
    document.getElementById(errorElementId).textContent = isValid ? '' : errorMessage;
    return isValid;
}

function validateBirthdate(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const isValid = (age > 16 || (age === 16 && monthDifference >= 0 && today.getDate() >= birthDate.getDate()));
    document.getElementById('birthdate-error').textContent = isValid ? '' : 'Вы должны быть старше 16 лет.';
    return isValid;
}

function generatePassword() {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*?&";
    return Array.from({ length }, () => charset.charAt(Math.floor(Math.random() * charset.length))).join('');
}

function generateNickname() {
    const nicknameInput = document.getElementById('nickname');
    nicknameInput.value = 'user' + Math.floor(Math.random() * 10000);
}

document.querySelector('.Autorisation').addEventListener('click', function(event) {
    event.preventDefault();
    document.body.classList.add('fade-out');
    setTimeout(function() {
        window.location.href = '../registrform/autorisationform.html';
    }, 500); // Должно соответствовать продолжительности перехода в CSS
});


function isNicknameUnique(nickname) {
    return !usersArray.some(user => user.nickname === nickname);
}

function togglePasswordField() {
    const passwordAuto = document.getElementById('password-auto-generation').checked;
    const passwordFields = document.querySelectorAll('#password, #confirm-password, #password-label, #confirm-password-label');
    passwordFields.forEach(field => {
        field.style.display = passwordAuto ? 'none' : 'block';
        if (field.tagName === 'INPUT') field.required = !passwordAuto;
    });
    validateForm();
}

function validateForm() {
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const birthdate = document.getElementById('birthdate').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const nickname = document.getElementById('nickname').value;
    const agreement = document.getElementById('agreement').checked;

    let isValid = true;
    isValid &= validateInput(phone, phoneRegex, 'Неверный формат номера телефона.', 'phone-error');
    isValid &= validateInput(email, emailRegex, 'Неверный формат email.', 'email-error');
    isValid &= validateBirthdate(birthdate);
    
    const passwordAuto = document.getElementById('password-auto-generation').checked;
    if (!passwordAuto) {
        isValid &= validateInput(password, passwordRegex, 'Пароль должен содержать от 8 до 20 символов, включая заглавную букву, строчную букву, цифру и специальный символ.', 'password-error');
        const passwordsMatch = (password === confirmPassword);
        document.getElementById('confirm-password-error').textContent = passwordsMatch ? '' : 'Пароли не совпадают.';
        isValid &= passwordsMatch;
    }

    const nicknameUnique = isNicknameUnique(nickname);
    document.getElementById('nickname-error').textContent = nicknameUnique ? '' : 'Такой никнейм уже существует.';
    isValid &= nicknameUnique;
    
    const agreementChecked = agreement;
    document.getElementById('agreement-error').textContent = agreementChecked ? '' : 'Вы должны согласиться с условиями Пользовательского соглашения.';
    isValid &= agreementChecked;

    document.getElementById('register-button').disabled = !isValid;
    return !!isValid; // Приведение к булевому значению

    
}

function submitForm(event) {
    event.preventDefault();
    if (validateForm()) {
        const passwordAuto = document.getElementById('password-auto-generation').checked;
        const password = passwordAuto ? generatePassword() : document.getElementById('password').value;

        const newUser = {
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            birthdate: document.getElementById('birthdate').value,
            password: password,
            fio: document.getElementById('fio').value,
            nickname: document.getElementById('nickname').value,
            role: 'user'
        };

        const isPhoneUnique = !usersArray.some(user => user.phone === newUser.phone);
        const isEmailUnique = !usersArray.some(user => user.email === newUser.email);

        if (!isPhoneUnique) {
            document.getElementById('phone-error').textContent = 'Пользователь с таким номером телефона уже существует.';
            return;
        }

        if (!isEmailUnique) {
            document.getElementById('email-error').textContent = 'Пользователь с таким email уже существует.';
            return;
        }

        usersArray.push(newUser);
        localStorage.setItem('users', JSON.stringify(usersArray));
        alert('Пользователь успешно зарегистрирован!' + newUser.nickname);
        console.log(usersArray);

        // Плавный переход на основную страницу
        document.body.classList.add('fade-out');
        setTimeout(function() {
            window.location.href = '../mainpage/mainpage.html';
        }, 500); // Должно соответствовать продолжительности перехода в CSS
    }
}

// Добавляем класс для плавного перехода на страницу при загрузке
document.addEventListener("DOMContentLoaded", function() {
    document.body.classList.add('fade-in');
});

// CSS для плавного перехода
const style = document.createElement('style');
style.textContent = `
    body.fade-out {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    body.fade-in {
        opacity: 1;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style);

document.getElementById('registration-form').addEventListener('input', validateForm);
document.getElementById('registration-form').addEventListener('submit', submitForm);
document.getElementById('password-auto-generation').addEventListener('change', togglePasswordField);
document.getElementById('nickname').addEventListener('input', validateForm);
document.querySelector('button[onclick="generateNickname()"]').addEventListener('click', generateNickname);
togglePasswordField();

window.onload = function() {
    setTimeout(function() {
        window.location.href = "../mainpage/mainpage.html";
    }, 500000);
};
console.log(usersArray);


