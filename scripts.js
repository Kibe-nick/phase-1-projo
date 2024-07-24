// Hamburger menu
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarLinks = sidebar.querySelectorAll('a');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const closeBtn = document.querySelector('.close-btn');

    const aboutModal = document.getElementById('aboutModal');
    const contactModal = document.getElementById('contactModal');

    const modals = [aboutModal, contactModal];
    const modalCloseButtons = document.querySelectorAll('.modal .close');
    
    function toggleSidebar() {
        sidebar.classList.toggle('active');
    }

    function handleLinkClick(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        
        if (targetId === 'about') {
            aboutModal.style.display = 'block';
        } else if (targetId === 'contact') {
            contactModal.style.display = 'block';
        }

        // Close the sidebar
        sidebar.classList.remove('active');
    }

    function closeModal(event) {
        const modal = event.target.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });

    hamburgerMenu.addEventListener('click', toggleSidebar);
    closeBtn.addEventListener('click', toggleSidebar);

    modalCloseButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    window.addEventListener('click', (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});
//profile dropdown
document.addEventListener('DOMContentLoaded', () => {
    const profileIcon = document.getElementById('profileIcon');
    const profileDropdown = document.getElementById('profileDropdown');

    profileIcon.addEventListener('click', () => {
        profileDropdown.style.display = profileDropdown.style.display === 'none' ? 'block' : 'none';
    });

    // Close the dropdown when clicking outside of it
    window.addEventListener('click', (event) => {
        if (!profileIcon.contains(event.target) && !profileDropdown.contains(event.target)) {
            profileDropdown.style.display = 'none';
        }
    });

    // Modal elements
    const viewProfileModal = document.getElementById('viewProfileModal');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeModalButtons = document.querySelectorAll('.modal .close');

    // View Profile
    document.getElementById('viewProfile').addEventListener('click', (event) => {
        event.preventDefault();
        viewProfileModal.style.display = 'block';
        profileDropdown.style.display = 'none';
    });

    // Edit Profile
    document.getElementById('editProfile').addEventListener('click', (event) => {
        event.preventDefault();
        editProfileModal.style.display = 'block';
        profileDropdown.style.display = 'none';
    });

    // Logout
    document.getElementById('logout').addEventListener('click', (event) => {
        event.preventDefault();
        alert('Logged out successfully');
        profileDropdown.style.display = 'none';
    });

    // Close modals
    closeModalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewProfileModal.style.display = 'none';
            editProfileModal.style.display = 'none';
        });
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === viewProfileModal) {
            viewProfileModal.style.display = 'none';
        }
        if (event.target === editProfileModal) {
            editProfileModal.style.display = 'none';
        }
    });
});


const notificationBell = document.querySelector('.notification-bell');
    const notificationModal = document.getElementById('notificationModal');
    const notificationList = document.getElementById('notificationList');
    const closeNotificationModalBtn = notificationModal.querySelector('.close');
    const notificationCount = document.querySelector('.notification-count');

    // Sample notifications data
    let notifications = [
        { id: 1, message: 'New message from John' },
        { id: 2, message: 'Your rent is due' },
        { id: 3, message: 'New apartment listing added' }
    ];

    function updateNotificationCount() {
        const unreadCount = notifications.length;
        notificationCount.textContent = unreadCount;
    }

    function showNotificationModal() {
        notificationList.innerHTML = notifications.map(notification => 
            `<li>${notification.message}</li>`
        ).join('');
        notificationModal.style.display = 'block';
        notifications = []; // Clear notifications after showing
        updateNotificationCount(); // Update the count
    }

    function closeNotificationModal() {
        notificationModal.style.display = 'none';
    }

    notificationBell.addEventListener('click', showNotificationModal);
    closeNotificationModalBtn.addEventListener('click', closeNotificationModal);

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === notificationModal) {
            closeNotificationModal();
        }
    });

    // Initial update of notification count
    updateNotificationCount();

// Handle apartment details modal
document.addEventListener('DOMContentLoaded', function () {
    const apartmentButtons = document.querySelectorAll('.view-details');
    const apartmentDetailsModal = document.querySelector('#apartmentDetailsModal');
    const apartmentDetailsContainer = document.querySelector('#apartmentDetailsContainer');
    const closeModalButton = document.querySelector('.close');

    apartmentButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Get the apartment name from the data attribute
            const apartmentName = this.parentElement.getAttribute('data-apartment');

            // Fetch apartment details from the server
            fetch(`http://localhost:3000/apartments/${apartmentName}`)
                .then(response => response.json())
                .then(apartment => {
                    // Construct HTML for the apartment details
                    const apartmentDetails = `
                        <h2>${apartment.name}</h2>
                        <p>${apartment.description || 'No description available.'}</p>
                        <p>Total Rooms: ${apartment.rooms.length}</p>
                        <ul>
                            ${apartment.rooms.map(room => `
                                <li>Room ${room.number}: ${room.status} - Price: $${room.price}</li>
                            `).join('')}
                        </ul>
                    `;

                    // Update the modal content and show the modal
                    apartmentDetailsContainer.innerHTML = apartmentDetails;
                    apartmentDetailsModal.style.display = 'block';
                })
                .catch(error => {
                    console.error('Error fetching apartment details:', error);
                    apartmentDetailsContainer.innerHTML = '<p>Unable to fetch details. Please try again later.</p>';
                });
        });
    });

    // Close modal when the close button is clicked
    closeModalButton.addEventListener('click', function () {
        apartmentDetailsModal.style.display = 'none';
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function (event) {
        if (event.target === apartmentDetailsModal) {
            apartmentDetailsModal.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Modal Elements
    const registerModal = document.getElementById('registerModal');
    const loginModal = document.getElementById('loginModal');
    const registerBtn = document.getElementById('registerBtn'); // Button to open registration modal
    const loginBtn = document.getElementById('loginBtn'); // Button to open login modal
    const closeBtns = document.querySelectorAll('.close'); // Close buttons for modals

    // Open Registration Modal
    registerBtn.addEventListener('click', function () {
        registerModal.style.display = 'block';
    });

    // Open Login Modal
    loginBtn.addEventListener('click', function () {
        loginModal.style.display = 'block';
    });

    // Close Modals
    closeBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            registerModal.style.display = 'none';
            loginModal.style.display = 'none';
        });
    });

    // Handle Registration
    document.getElementById('registrationForm').addEventListener('submit', async function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/registeredUsers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            if (response.ok) {
                alert('Registration successful');
                registerModal.style.display = 'none'; // Close modal on success
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Handle Login
    document.getElementById('loginForm').addEventListener('submit', async function (e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('http://localhost:3000/registeredUsers');
            const users = await response.json();
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                const sessionId = `${user.id}-${Date.now()}`;
                await fetch('http://localhost:3000/sessions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: user.id, sessionId, expiresAt: new Date(Date.now() + 3600000).toISOString() })
                });
                localStorage.setItem('sessionId', sessionId);
                alert('Login successful');
                loginModal.style.display = 'none'; // Close modal on success
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Close Modal When Clicking Outside
    window.addEventListener('click', function (event) {
        if (event.target === registerModal) {
            registerModal.style.display = 'none';
        }
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });
});
