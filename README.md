# Library Management API

## Overview
This is a NestJS application designed to manage various aspects of a library system.
The application includes features such as user management, book management, and loan management.
The application is built with a modular architecture to ensure scalability and maintainability.

## Features
 - User Management: Create, update, and delete user profiles.
 - Book Management: Add, update, and remove books from the catalog.
 - Author Management: Add, update and remove authors from the catalog
 - Loan Management: Manage book loans, including creating, updating, and tracking loan status.
 - Role-Based Access Control: Secure endpoints based on user roles.
 - Authentication: JWT-based authentication and refresh token handling.


## Set up
### Set up the environment variables
Create a .env file in the root directory and add the following variables. Don't forget to replace the placeholders with your actual data.

```
# Database
DB_HOST={your_db_host}
DB_PORT={your_db_port}
DB_USERNAME={your_db_username}
DB_PASSWORD={your_db_password}
DB_DATABASE={your_db_name}

## Token
ACCESS_SECRET_KEY={your_access_secret_key}
REFRESH_SECRET_KEY={your_refresh_sercret_key}
ACCESS_KEY_EXPIRATION_TIME={your_access_key_expiration_time} // e.x 15m
REFRESH_KEY_EXPIRATION_TIME={your_refresh_token_expiration_time}
```

### Run database migrations
```
npm run migration:run
```



