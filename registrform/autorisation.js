// Функция для получения пользователей из localStorage
function getUsers() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        return JSON.parse(storedUsers);
    }
    return [];
}

// Функция для проверки данных авторизации

function authorizeUser(event) {
    event.preventDefault();

    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    const usersArray = getUsers();

    const user = usersArray.find(user => user.nickname === login && user.password === password);

    if (user) {
        alert(`Авторизация успешна! Ваша роль: ${user.role === 'admin' ? 'Администратор' : 'Пользователь'}`);
        localStorage.setItem('userRole', user.role);  // Сохранение роли пользователя в localStorage
        localStorage.setItem('userName', user.nickname); // Сохранение имени пользователя в localStorage
        if (user.role === 'admin') {
            window.location.href = '../mainpage/mainpageAdmin.html';
        } else {
            window.location.href = '../mainpage/mainpage.html';
        }
    } else {
        document.getElementById('login-error').textContent = 'Неверный логин или пароль.';
    }
}


// Активирование кнопки авторизации, если все поля заполнены
function toggleLoginButton() {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    document.getElementById('register-button').disabled = !(login && password);
}

// Слушатель события для формы авторизации
document.getElementById('login-form').addEventListener('submit', authorizeUser);

// Слушатели для полей ввода, чтобы активировать кнопку при заполнении
document.getElementById('login').addEventListener('input', toggleLoginButton);
document.getElementById('password').addEventListener('input', toggleLoginButton);

// Инициализация состояния кнопки
toggleLoginButton();

