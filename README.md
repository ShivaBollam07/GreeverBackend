# Greever Platform

Greever is an online learning platform that offers high-quality courses. This repository contains the backend code for the Greever platform.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)


## Features

- User Authentication (Login and Sign-Up with OTP verification)
- MySQL database integration

## Tech Stack

- **Node.js** - Backend server
- **Express.js** - Web framework
- **MySQL** - Database

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MySQL](https://www.mysql.com/)

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

   - Create a MySQL database with the name provided in the `.env` template (`Greever`).
   - Make sure to configure your MySQL user and password correctly.

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
