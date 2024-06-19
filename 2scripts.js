document.addEventListener('DOMContentLoaded', () => {
    const statusMessage = document.getElementById('statusMessage');
    const userInfo = document.getElementById('userInfo');
    if (statusMessage && userInfo) {
        const loginStatus = localStorage.getItem('loginStatus');
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        
        if (loginStatus === 'success' && loggedInUser) {
            statusMessage.textContent = 'Logged in successfully!';
            userInfo.textContent = `Logged in as: ${loggedInUser.firstName} ${loggedInUser.lastName} (Username: ${loggedInUser.username})`;
            localStorage.removeItem('loginStatus'); // Remove the status after displaying the message
        }
    }
});

document.getElementById('registrationForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ firstName, lastName, phoneNumber, address, email, username, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Registration successful! You can now log in.');
    window.location.href = 'login.html';
});

document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);
    
    const loginMessage = document.getElementById('loginMessage');
    
    if (user) {
        localStorage.setItem('loginStatus', 'success');
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        loginMessage.textContent = 'Login successful! Redirecting to home page...';
        loginMessage.style.color = 'green';
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 2000); // Redirect after 2 seconds
    } else {
        loginMessage.textContent = 'Invalid username or password. Please try again.';
        loginMessage.style.color = 'red';
    }
});

document.getElementById('logoutButton')?.addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
    alert('You have been logged out.');
    window.location.href = 'login.html';
});
