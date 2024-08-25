document.getElementById('adminLoginBtn').addEventListener('click', () => {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    if (username === 'admin' && password === 'adminpass') { // Simple example, use more secure methods in production
        window.location.href = 'admin2.html';
    } else {
        alert('Invalid admin credentials.');
    }
});

document.getElementById('staffLoginBtn').addEventListener('click', () => {
    const username = document.getElementById('staffUsername').value;
    const password = document.getElementById('staffPassword').value;

    if (username === 'staff' && password === 'staffpass') { // Simple example, use more secure methods in production
        window.location.href = 'staff2.html';
    } else {
        alert('Invalid staff credentials.');
    }
});