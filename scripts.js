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

       // Function to fetch user details and display them in the profile modal
function displayUserProfile(userId) {
    fetch(`http://localhost:3000/registeredUsers/${userId}`)
        .then(response => response.json())
        .then(user => {
            if (user) {
                document.getElementById('profileName').innerText = user.name || 'N/A';
                document.getElementById('profileEmail').innerText = user.email || 'N/A';
                document.getElementById('profileApartment').innerText = user.apartment || 'N/A';
                document.getElementById('profileRoom').innerText = user.room || 'N/A';
            } else {
                console.error('User not found');
            }
        })
        .catch(error => console.error('Error fetching user profile:', error));
}

// View Profile Event Listener
document.getElementById('viewProfile').addEventListener('click', (event) => {
    event.preventDefault();
    
    // Retrieve the user ID from sessionStorage
    const userId = sessionStorage.getItem('userId');
    
    if (userId) {
        displayUserProfile(userId);
        modals.viewProfile.style.display = 'block';
        profileDropdown.style.display = 'none';
    } else {
        console.error('No user ID found in sessionStorage');
    }
});


        // Edit Profile Event Listener
document.getElementById('updateProfileForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const userId = sessionStorage.getItem('userId');
    if (!userId) {
        console.error('No user ID found in sessionStorage');
        return;
    }

    const name = document.getElementById('updateName').value.trim();
    const email = document.getElementById('updateEmail').value.trim();
    const password = document.getElementById('updatePassword').value.trim();
    const apartment = document.getElementById('updateApartment').value;
    const room = document.getElementById('updateRoom').value;

    // Basic validation
    if (!name || !email || !room) {
        alert('Name, email, and room are required');
        return;
    }

    const updatedUser = {
        name,
        email,
        password: password || undefined, // Update password only if provided
        apartment,
        room
    };

    fetch(`http://localhost:3000/registeredUsers/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            alert('Profile updated successfully');
            modals.editProfile.style.display = 'none';
        } else {
            console.error('Error updating profile');
            alert('Profile update failed');
        }
    })
    .catch(error => {
        console.error('Error updating profile:', error);
        alert('Profile update failed');
    });
});
console.log('Edit Profile button clicked');

// Cancel Edit Profile Event Listener
document.getElementById('cancelEditProfile').addEventListener('click', () => {
    modals.editProfile.style.display = 'none';
});


        // Function to toggle visibility of login and register elements
function toggleLoginRegisterVisibility(show) {
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');
    
    if (loginButton && registerButton) {
    if (show) {
        loginButton.style.display = 'block';
        registerButton.style.display = 'block';
    } else {
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
    }
} else {
    console.error('Login or Register buttons not found.');
}
}

// Logout
document.getElementById('logout').addEventListener('click', (event) => {
    event.preventDefault();
    
    // Clear session data
    sessionStorage.removeItem('userId');
    
    // Notify user
    alert('Logged out successfully');
    
    // Hide profile dropdown and profile icon
    const profileDropdown = document.getElementById('profileDropdown');
    const profileIcon = document.getElementById('profileIcon');
    
    if (profileDropdown) {
        profileDropdown.style.display = 'none';
    } else {
        console.error('Profile dropdown not found.');
    }
    
    if (profileIcon) {
        profileIcon.style.display = 'none';
    } else {
        console.error('Profile icon not found.');
    }
    
    // Toggle visibility of login/register buttons
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
     // Add click event listeners to each apartment button
        apartmentButtons.forEach(button => {
            button.addEventListener('click', () => {
                const apartmentKey = button.getAttribute('data-apartment');
                fetch('http://localhost:3000/apartments')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok.');
                    }
                    return response.json();
                })
                .then(data => {
                    // Check the structure of 'data'
                    const apartments = data.apartments;
                    if (apartments) {
                        const apartment = apartments[apartmentKey];
                        if (apartment) {
                            // Format and display apartment details
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
                    } else {
                        apartmentDetailsContainer.innerHTML = '<p>No apartments data available.</p>';
                    }
                })
                .catch(error => {
                    console.error('Error fetching apartment details:', error);
                    apartmentDetailsContainer.innerHTML = '<p>Unable to fetch details. Please try again later.</p>';
                });
        });
    });

    // Close modal button event listener
    closeModalButton.addEventListener('click', () => {
        apartmentDetailsModal.style.display = 'none';
    });

    // Click outside modal to close it
    window.addEventListener('click', (event) => {
        if (event.target === apartmentDetailsModal) {
            apartmentDetailsModal.style.display = 'none';
        }
    });
}

// Initialize the function
initApartmentDetails();
    
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
document.getElementById('register-form').addEventListener('submit', async function (e) {
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
document.getElementById('login-form').addEventListener('submit', async function (e) {
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
            const user = users[0]; // Assuming unique email/password combination
            sessionStorage.setItem('userId', user.id); // Store user ID

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

// display registered users
const displayUsers = (users) => {
    const userList = document.getElementById('user-list'); // Assuming you have an element with id 'user-list'
    userList.innerHTML = ''; // Clear existing content
  
    users.forEach(user => {
      const listItem = document.createElement('li');
      listItem.textContent = `${user.name} (${user.email})`;
      userList.appendChild(listItem);
    });
  };
  
  fetch('http://localhost:3000/registeredUsers')
    .then(response => response.json())
    .then(data => displayUsers(data));

    // Register new users
  
    const registerForm = document.getElementById('register-form'); // Assuming you have a form with id 'register-form'

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const apartment = document.getElementById('apartment').value; // Assuming you have a dropdown for apartments
  const room = document.getElementById('room').value; // Assuming you have a dropdown for rooms

  const newUser = {
    name,
    email,
    password,
    apartment,
    room
  };

  fetch('http://localhost:3000/registeredUsers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
  .then(response => response.json())
  .then(data => {
    console.log('User registered:', data);
    fetch('http://localhost:3000/registeredUsers')
      .then(response => response.json())
      .then(data => displayUsers(data)); // Refresh the user list
  });
});

// login functionality
const loginForm = document.getElementById('login-form'); // Assuming you have a form with id 'login-form'

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  fetch('http://localhost:3000/registeredUsers')
    .then(response => response.json())
    .then(users => {
      const user = users.find(user => user.email === email && user.password === password);
      if (user) {
        console.log('Login successful:', user);
        // Handle session creation and redirect or show user dashboard
      } else {
        console.log('Invalid credentials');
      }
    });
});

// handle notification
const userId = 1; // Replace with the actual logged-in user ID

fetch(`http://localhost:3000/notifications?userId=${userId}`)
  .then(response => response.json())
  .then(notifications => {
    const notificationList = document.getElementById('notification-list'); // Assuming you have an element with id 'notification-list'
    notificationList.innerHTML = '';

    notifications.forEach(notification => {
      const listItem = document.createElement('li');
      listItem.textContent = notification.message;
      notificationList.appendChild(listItem);
    });
  });

  // book a room
  const bookRoom = (apartmentId, roomId) => {
    fetch(`http://localhost:3000/apartments/${apartmentId}`)
      .then(response => response.json())
      .then(apartment => {
        const room = apartment.rooms.find(room => room.id === roomId);
        if (room.status === 'available') {
          room.status = 'booked';
          
          fetch(`http://localhost:3000/apartments/${apartmentId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(apartment)
          })
          .then(response => response.json())
          .then(data => {
            console.log('Room booked:', data);
            // Update UI to reflect booking
          });
        } else {
          console.log('Room already booked');
        }
      });
  };
  
  // Example call to book a room
  bookRoom('unity_homes', 1);
  
// Show View Profile Modal with Current User Data
document.getElementById('viewProfile').addEventListener('click', async () => {
    const userId = sessionStorage.getItem('userId'); // Retrieve user ID from session storage

    if (userId) {
        try {
            const response = await fetch(`http://localhost:3000/registeredUsers/${userId}`);
            const user = await response.json();

            if (response.ok) {
                // Populate profile details in the modal
                document.getElementById('profileName').textContent = user.name;
                document.getElementById('profileEmail').textContent = user.email;
                document.getElementById('profileApartment').textContent = user.apartment || 'Not assigned';
                document.getElementById('profileRoom').textContent = user.room || 'Not assigned';

                // Show the profile modal
                modals.viewProfile.style.display = 'block';
                profileDropdown.style.display = 'none';
            } else {
                console.error('Error fetching user data:', user.message);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    } else {
        console.error('No user ID found in sessionStorage');
    }
});

// Hide View Profile Modal
document.querySelector('#viewProfileModal .close').addEventListener('click', () => {
    modals.viewProfile.style.display = 'none';
});

// Show Edit Profile Modal with Current User Data
document.getElementById('editProfile').addEventListener('click', async () => {
    const userId = sessionStorage.getItem('userId'); // Retrieve user ID from session storage

    if (userId) {
        try {
            const response = await fetch(`http://localhost:3000/registeredUsers/${userId}`);
            const user = await response.json();

            if (response.ok) {
                // Populate the form fields with the current user data
                document.getElementById('updateName').value = user.name;
                document.getElementById('updateEmail').value = user.email;
                document.getElementById('updateApartment').value = user.apartment || 'unity_homes';
                document.getElementById('updateRoom').value = user.room || '';

                   
                // Show the edit profile modal
                modals.editProfile.style.display = 'block';
                profileDropdown.style.display = 'none';
            } else {
                console.error('Error fetching user data:', user.message);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    } else {
        console.error('No user ID found in sessionStorage');
    }
});

// Handle Profile Update Form Submission
document.getElementById('updateProfileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Update Profile form submitted');

    
    const userId = sessionStorage.getItem('userId'); // Retrieve user ID from session storage
    const name = document.getElementById('updateName').value.trim();
    const email = document.getElementById('updateEmail').value.trim();
    const password = document.getElementById('updatePassword').value.trim();
    const apartment = document.getElementById('updateApartment').value;
    const room = document.getElementById('updateRoom').value;

    if (!name || !email || !room) {
        alert('Name, email, and room are required');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/registeredUsers/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, apartment, room })
        });

        if (response.ok) {
            alert('Profile updated successfully');
            modals.editProfile.style.display = 'none';
            // Optionally refresh profile data if needed
        } else {
            const errorData = await response.json();
            alert(`Update failed: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Update failed. Please try again.');
    }
});

// Hide Edit Profile Modal
document.getElementById('cancelEditProfile').addEventListener('click', () => {
    //console.log('Cancel Edit Profile button clicked');
    modals.editProfile.style.display = 'none';
});
 // View Profile
 document.getElementById('viewProfile').addEventListener('click', (event) => {
    event.preventDefault();
    console.log('View Profile button clicked');

    const userId = sessionStorage.getItem('userId');
    if (!userId) {
        console.error('No user ID found in sessionStorage');
        return;
    }

    fetch(`http://localhost:3000/registeredUsers/${userId}`)
        .then(response => response.json())
        .then(user => {
            console.log('User data fetched for view:', user);
            document.getElementById('profileName').innerText = user.name;
            document.getElementById('profileEmail').innerText = user.email;
            document.getElementById('profileApartment').innerText = user.apartment;
            document.getElementById('profileRoom').innerText = user.room;

            modals.viewProfile.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
});
; 