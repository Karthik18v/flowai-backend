# Floww.ai Node JS - Backend Assignment

This RESTful API allows users to manage their personal financial records, including recording income and expenses, retrieving past transactions, and getting summaries by category or time period. Built using Node.js, Express.js, and MongoDB.

# Setup and Run Instructions
Prerequisites
Node.js (version 14 or higher)
npm (version 6 or higher)
SQLite or MongoDB (for database)

# Installation
Clone the repository: git clone https://https://github.com/Karthik18v/flowai-backend.git
Install dependencies: npm install
Create a .env file with the following variables:
DB_TYPE (either sqlite or mongodb)
DB_URL (database connection URL)
PORT (server port number)
Run the database setup script: npm run db-setup
Start the server: npm start

# API Documentation
# Endpoints
POST /transactions: Adds a new transaction
Request Body:
type (string): income or expense
category (string): transaction category
amount (number): transaction amount
date (string): transaction date (YYYY-MM-DD)
description (string): transaction description
Response: 201 Created with transaction ID
GET /transactions: Retrieves all transactions
Query Parameters:
limit (number): number of transactions to return
offset (number): starting index of transactions
Response: 200 OK with array of transactions
GET /transactions/:id: Retrieves a transaction by ID
Path Parameters:
id (string): transaction ID
Response: 200 OK with transaction object
PUT /transactions/:id: Updates a transaction by ID
Path Parameters:
id (string): transaction ID
Request Body:
type (string): income or expense
category (string): transaction category
amount (number): transaction amount
date (string): transaction date (YYYY-MM-DD)
description (string): transaction description
Response: 200 OK with updated transaction object
DELETE /transactions/:id: Deletes a transaction by ID
Path Parameters:
id (string): transaction ID
Response: 204 No Content
GET /summary: Retrieves a summary of transactions
Query Parameters:
start_date (string): start date of range (YYYY-MM-DD)
end_date (string): end date of range (YYYY-MM-DD)
category (string): transaction category
Response: 200 OK with summary object
