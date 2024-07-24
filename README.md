## Rental Management System (RMS)
## Project Overview
The Rental Management System (RMS) is a web-based application designed to facilitate the management of rental properties. It allows rental apartment managers to oversee and manage various apartments, while providing a seamless user experience for tenants. The system includes functionalities for user registration, profile management, apartment booking, and notifications.

## Features
For Tenants
User Registration and Login: Register and log in to the system with email and password.
View and Book Apartments: Browse available apartments, view details, and book rooms.
Profile Management: Update personal information and view booking history.
Notifications: Receive notifications for rent due dates, maintenance schedules, and other important updates.
## For Managers
Apartment Management: Add, update, and remove apartment listings.
User Management: Manage tenant profiles, including viewing and updating their information.
Notice Board: Post important notices for tenants regarding maintenance or other announcements.
Notification System: Send notifications to tenants for various updates.
Project Structure
The project consists of the following key components:

index.html: The main HTML file that serves as the entry point for the application.
styles.css: The stylesheet that defines the look and feel of the application.
scripts.js: The JavaScript file that contains the logic for user interactions, form submissions, and data management.
db.json: The JSON file that acts as the mock database for storing user and apartment information.
## Setup Instructions
Prerequisites:
A web browser (for accessing the application)

## Running the Application

1.Clone the Repository

2.Navigate to the Project Directory

3.Install Dependencies
Ensure you have json-server installed globally to simulate the backend server

4.Start the JSON Server
Start the JSON server to serve db.json as a REST API:

5.Open index.html in your web browser to start using the application.

## Usage
## User Registration
Click on the Register button to open the registration modal.
Fill in the registration form with your name, email, and password.
Submit the form to create a new account.
## User Login
Click on the Login button to open the login modal.
Enter your email and password.
Submit the form to log in.
## Booking an Apartment
Browse the available apartments listed on the homepage.
Click on the View Details button for the desired apartment.
Book a room by selecting the room number and confirming your booking.
## Managing Your Profile
Log in to the system.
Click on your profile icon to open the profile dropdown.
Select View Profile to see your details.
Select Edit Profile to update your information and save changes.
## Viewing Notifications
Click on the notification bell icon.
Review the list of notifications in the modal that appears.
Click on the notification to view more details.
## API Endpoints
The system uses the following endpoints to interact with the db.json file:

GET /registeredUsers: Retrieve all registered users.
POST /registeredUsers: Register a new user.
GET /apartments: Retrieve all available apartments.
POST /sessions: Create a new user session.
GET /sessions: Retrieve active sessions.
POST /notifications: Send a new notification.
Contributing
Contributions to the Rental Management System are welcome. If you have suggestions or improvements, please submit a pull request or open an issue in the repository.

## Contact
For any inquiries or support, please contact:

Name: Nicholas Korir
Email: nickkorir08@gmail.com