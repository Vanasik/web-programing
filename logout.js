document.addEventListener("DOMContentLoaded", function() {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'user') {
        document.querySelector('.startnow').style.display = 'none';
        document.querySelector('.login-icon').style.display = 'block';
        document.querySelector('.login-icon').addEventListener('click', function() {
            const modal = document.getElementById("myModal");
            const userName = localStorage.getItem('userName'); // Имя пользователя из localStorage
            document.getElementById('user-name').textContent = `Hello, ${userName}`;
            modal.style.display = "block";
        });
    }
    else if(userRole === 'admin')
    {
        document.querySelector('.startnow').style.display = 'none';
        document.querySelector('.admin').addEventListener('click', function() {
            const modal = document.getElementById("myModal");
            const userName = localStorage.getItem('userName'); // Имя пользователя из localStorage
            document.getElementById('user-name').textContent = `Hello, ${userName}`;
            modal.style.display = "block";
        });
    }
    else{
        document.querySelector('.startnow').style.display = 'blok';
    }
});


// Закрыть модальное окно при нажатии на крестик
document.querySelector('.close').addEventListener('click', function() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
});

// Закрыть модальное окно при нажатии вне окна
window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Функция выхода из аккаунта
function logout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    window.location.reload();  // Обновление страницы
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
    document.querySelector('.original-button').style.display = 'block';
    document.querySelector('.login-icon').style.display = 'none';
}

document.getElementById('logout-button').addEventListener('click', logout);