# Greever Platform

This repository contains the backend code for the Greever platform.

To see the API flow go through this [Postman documentation](https://documenter.getpostman.com/view/26166586/2sAXjGda8p)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)

## Features

- User Authentication (`Login`, `Sign-Up` and `ForgotPassword` with OTP verification)
- Implementation of `UserDetails` API for handling `User` personal data
- Implementation of `Courses` API for handling `courses`
- Implementation of `Videos` API for handling `Videos` acrosss courses in the `course_videos` collection
- Implementation of `Readinglst_API` for handling different `Reads`
- Implementation of `ReadingList_API` to handle Items of different `Reads`
- Implementation of `Education API`  to handle Education APIs
- Implementation of `Experience API` to handle Experience APIs
- Still In progress
  - Implementation of `Projects API` to handle Projects APIs
  - Implementation of `Skills API` to handle Skills APIs
  - Implementation of `Certifications API` to handle Certifications APIs
  - Implementation of `Quizes` in the `Courses API`
  - Implementation of Resume making functionality based on the `Education`, `Experience`, `Projects`, `Skills`, `Certifications` and `Courses`

## Tech Stack

- **Node.js** - Backend server
- **Express.js** - Web framework
- **MySQL** - Database
- **MongoDB** - Database
- **JavaScript** - Programming language

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MySQL](https://www.mysql.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ShivaBollam07/GreeverBackend.git
   cd GreeverBackend
   ```
2. **Install Dependencies**

   ```bash
   npm install
   ```
3. **Set Up the Database**

   - Create a MySQL database with the name provided in the `config.env` template (`Greever`).
   - Make sure to configure your MySQL user and password and other keys correctly.
   - Create tables `users` and `user_deatils` with the schema provided in the `Schema` Folder
   - Create Database `Greever` in MongoDB atlas and connect with the `URI`
   - Create Collections in `MongoDB` are `courses `and `course_videos - 26-08-2024 `
   - Create Collection `reading_list` in the `MongoDB `
   - Create Collection `reading_list_items` in the `MongoDB
   - Create New tables  `education_helper_table` and `education`
   - Create New tables  `experience_helper_table` and `experience`

### Running the Application

1. **Set Up Environment Variables**

   Create a `config.env` file in the root directory of the project and configure it based on the `config.env` template provided:

   ```plaintext
   BackendPort=3000
   JWTSecret=jK4fL7nR9z!wX1qT#dU8eS2vP@aY6bM$cG0mJ5hV3o
   JWTExpire=1000000000
   Mysql_DB_NAME=Greever
   Mysql_USER=root
   Mysql_PASSWORD=
   Mysql_HOST=localhost
   EmailForSendingOtp=
   EmailPasswordForSendingOtp=
   SessionSecret=zimbabwae
   token=
   MongoDB_URI=
   MongoDB_DBName=
   ```
2. **Start the Server**

   ```bash
   npm start
   ```
