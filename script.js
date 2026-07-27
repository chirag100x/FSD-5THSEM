const form = document.getElementById('registrationForm');
const message = document.getElementById('message');

const existingUserOne = { name: 'Alice', email: 'alice@example.com', password: '123456' };
const existingUserTwo = { name: 'Bob', email: 'bob@example.com', password: 'abcdef' };

function showMessage(text, type = 'success') {
    message.textContent = text;
    message.style.color = type === 'success' ? 'green' : 'red';
}

if (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        if (!name || !email || !password) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        if (password.length < 6) {
            showMessage('Password must be at least 6 characters long.', 'error');
            return;
        }

        const newUser = { name, email, password };
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const allUsers = [existingUserOne, existingUserTwo, ...storedUsers];

        const userExists = allUsers.some((user) => user.email.toLowerCase() === newUser.email.toLowerCase());
        if (userExists) {
            showMessage('This account already exists. Please use another email.', 'error');
            return;
        }

        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));

        form.reset();
        showMessage('Registration successful! You can now log in.', 'success');
    });
}
