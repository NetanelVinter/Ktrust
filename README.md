# React Notes

## Description

React Notes is a CRUD application for note-taking. With a sleek and intuitive design, users can create, read, update, and delete notes. The application ensures privacy by implementing user authentication; only the rightful user can view and manage their notes.

![Login Window](./ReactNotesPictuers/login%20window.png)


## Installation

### Prerequisites
Ensure you have the following installed on your local machine:

- Node.js
- npm

### Steps
1. Clone the repository to a directory of your choice.
2. Navigate to the directory using the command line.
3. Install the required dependencies by running `npm install`.
4. Set up your environment variables in a .env file in your server directory. You will need to provide:
    - Your MongoDB Atlas connection string as `CONNECTION_STRING`.
    - `PORT` set to 5000.
    - `ACCESS_SECRET` for authentication.
5. Run the server using `npm start`.
6. The application should open in your default web browser. If it doesn't, navigate to `http://localhost:5000`.

## Usage

To use React Notes, follow these steps:

1. Open the application in your web browser.
2. Sign up or log in to your account.
3. Once logged in, you can create, update, and delete notes. Your notes are private and will only be displayed when you are logged in.

![Signup Window](./ReactNotesPictuers/signup%20window.png)
![Notes with User Logged In](./ReactNotesPictuers/notes%20with%20user%20loggedin.png)

## Technologies Used

- Backend: Node.js with Express
- Frontend: React.js
- Database: MongoDB Atlas

## Packages Used

- express
- mongoose
- bcrypt
- http-errors
- cookie-parser
- express-session
- and more..

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
