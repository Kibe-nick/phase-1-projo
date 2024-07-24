document.addEventListener('DOMContentLoaded', () => {
    // Define Modals
    const modals = {
        about: document.getElementById('aboutModal'),
        contact: document.getElementById('contactModal'),
        viewProfile: document.getElementById('viewProfileModal'),
        editProfile: document.getElementById('editProfileModal'),
        notification: document.getElementById('notificationModal'),
        apartmentDetails: document.getElementById('apartmentDetailsModal'),
        register: document.getElementById('registerModal'),
        login: document.getElementById('loginModal')
    };

    // Initialize Sidebar and Navbar
    initSidebar();
    initProfileDropdown();
    initModals(modals);
    initNotifications();
    initApartmentDetails();
    initAuth(modals);

    // Functions to initialize different parts of the page

    // Initialize Sidebar and Navbar
    function initSidebar() {
        const sidebar = document.getElementById('sidebar');
        const sidebarLinks = sidebar.querySelectorAll('a');
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const closeBtn = document.querySelector('.close-btn');

        function toggleSidebar() {
            sidebar.classList.toggle('active');
        }

        function handleLinkClick(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (modals[targetId]) {
                modals[targetId].style.display = 'block';
            }
            sidebar.classList.remove('active');
        }

        sidebarLinks.forEach(link => {
            link.addEventListener('click', handleLinkClick);
        });

        hamburgerMenu.addEventListener('click', toggleSidebar);
        closeBtn.addEventListener('click', toggleSidebar);
    }


    // Initialize Profile Dropdown
    function initProfileDropdown() {
        const profileIcon = document.getElementById('profileIcon');
        const profileDropdown = document.getElementById('profileDropdown');

        profileIcon.addEventListener('click', () => {
            profileDropdown.style.display = profileDropdown.style.display === 'none' ? 'block' : 'none';
        });

        window.addEventListener('click', (event) => {
            if (!profileIcon.contains(event.target) && !profileDropdown.contains(event.target)) {
                profileDropdown.style.display = 'none';
            }
        });

        // View Profile
        document.getElementById('viewProfile').addEventListener('click', (event) => {
            event.preventDefault();
            modals.viewProfile.style.display = 'block';
            profileDropdown.style.display = 'none';
        });

        // Edit Profile
        document.getElementById('editProfile').addEventListener('click', (event) => {
            event.preventDefault();
            modals.editProfile.style.display = 'block';
            profileDropdown.style.display = 'none';
        });

        // Logout
        document.getElementById('logout').addEventListener('click', (event) => {
            event.preventDefault();
            alert('Logged out successfully');
            profileDropdown.style.display = 'none';
            toggleLoginRegisterVisibility(true);
        });
    }

    // Initialize Modals
    function initModals(modals) {
        const modalCloseButtons = document.querySelectorAll('.modal .close');

        modalCloseButtons.forEach(btn => {
            btn.addEventListener('click', (event) => {
                const modal = event.target.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });

        window.addEventListener('click', (event) => {
            Object.values(modals).forEach(modal => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    }

    // Initialize Notifications
    function initNotifications() {
        const notificationBell = document.querySelector('.notification-bell');
        const notificationModal = modals.notification;
        const notificationList = document.getElementById('notificationList');
        const closeNotificationModalBtn = notificationModal.querySelector('.close');
        const notificationCount = document.querySelector('.notification-count');

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
        window.addEventListener('click', (event) => {
            if (event.target === notificationModal) {
                closeNotificationModal();
            }
        });

        updateNotificationCount();
    }

    // Initialize Apartment Details Modal
    // Fetch apartment details by ID or name
    function initApartmentDetails() {
        const apartmentButtons = document.querySelectorAll('.view-details');
        const apartmentDetailsModal = modals.apartmentDetails;
        const apartmentDetailsContainer = document.querySelector('#apartmentDetailsContainer');
        const closeModalButton = apartmentDetailsModal.querySelector('.close');
    
        apartmentButtons.forEach(button => {
            button.addEventListener('click', () => {
                const apartmentKey = button.parentElement.getAttribute('data-apartment');
                fetch(`http://localhost:3000/apartments`)
                    .then(response => response.json())
                    .then(data => {
                        const apartment = data[apartmentKey];
                        if (apartment) {
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
                            apartmentDetailsContainer.innerHTML = apartmentDetails;
                            apartmentDetailsModal.style.display = 'block';
                        } else {
                            apartmentDetailsContainer.innerHTML = '<p>Apartment not found.</p>';
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching apartment details:', error);
                        apartmentDetailsContainer.innerHTML = '<p>Unable to fetch details. Please try again later.</p>';
                    });
            });
        });
    
        closeModalButton.addEventListener('click', () => {
            apartmentDetailsModal.style.display = 'none';
        });
    
        window.addEventListener('click', (event) => {
            if (event.target === apartmentDetailsModal) {
                apartmentDetailsModal.style.display = 'none';
            }
        });
    }
    
    // Initialize Authentication Modals
    function initAuth(modals) {
        const registerBtn = document.getElementById('registerButton');
        const loginBtn = document.getElementById('loginButton');
    
        // Open modals
        registerBtn.addEventListener('click', () => {
            modals.register.style.display = 'block';
        });
    
        loginBtn.addEventListener('click', () => {
            modals.login.style.display = 'block';
        });
        // Handle Registration Form Submission
        document.getElementById('registrationForm').addEventListener('submit', async function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
  // Basic validation
            if (!name || !email || !password) {
                alert('All fields are required');
             return;
            }
            try {
                const response = await fetch('http://localhost:3000/registeredUsers', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });
        
                if (response.ok) {
                    alert('Registration successful');
                    document.getElementById('registerModal').style.display = 'none';
                } else {
                    const errorData = await response.json();
                    alert(`Registration failed: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Error during registration:', error);
                alert('Registration failed. Please try again.');
            }
        });
        
        // Handle Login Form Submission
        document.getElementById('loginForm').addEventListener('submit', async function (e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value.trim();
        // Basic validation
        if (!email || !password) {
             alert('Email and password are required');
             return;
        }
        try {
            const response = await fetch(`http://localhost:3000/registeredUsers?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
            const users = await response.json();
    
            if (users.length > 0) {
                alert('Login successful');
                document.getElementById('loginModal').style.display = 'none';
                toggleLoginRegisterVisibility(false); // Show profile icon and hide login/register buttons
            } else {
                alert('Invalid email or password');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Login failed. Please try again.');
        }
    });    
        // Show or hide login/register buttons and profile icon
        function toggleLoginRegisterVisibility(show) {
            document.getElementById('loginButton').style.display = show ? 'block' : 'none';
            document.getElementById('registerButton').style.display = show ? 'block' : 'none';
            document.getElementById('profileIcon').style.display = show ? 'none' : 'block';
        }

        // Initially show login/register buttons
        toggleLoginRegisterVisibility(true);
    }
});
