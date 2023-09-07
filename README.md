
# Accessorize Backend
Welcome to the Accessorize backend repository!
Accessorize is an e-commerce application that allows customers to try on face accessories before making a purchase. 
This repository contains the backend code for the Accessorize project, which is primarily developed using Node.js and JavaScript.

ated users can access certain functionalities and data.

## Modules

The backend serves three main modules: 
- Admin 
- Seller  
- Customer

Each module focuses on different operations and functionalities. Here's a brief overview of each module:

### 1. Admin

The admin module is responsible for managing the overall administration of the Accessorize application. It includes operations such as:

- Accessing and analyzing business statistics such as the total number of customers and sellers.
- Managing customers and sellers.

### 2. Seller

The seller module is designed to facilitate the activities of sellers who wish to showcase and sell their accessories on the Accessorize platform. Key functionalities of the seller module include:

- Adding, editing, and deleting product listings.
- Managing inventory and stock levels.
- Handling order fulfillment and shipping details.

### 3. Customer

The Customer module caters to the needs of individuals who browse and purchase accessories on the Accessorize platform. It focuses on delivering a seamless user experience and offers features such as:

- Browsing and searching for accessories.
- Adding items to the shopping cart.
- Manage Profile.
- Search for products 
- Login and Register

## Tech Stack

The Accessorize backend leverages the following technologies:

- **Node.js**: The backend is primarily built using Node.js, a JavaScript runtime that allows for scalable and efficient server-side applications.

- **MongoDB**: A NoSQL database for storing structured and unstructured data.
    - Mongoose: An elegant MongoDB object modeling for Node.js, providing       schema and validation features.

- **Firebase Cloud Storage**: We have integrated Firebase Cloud Storage to securely store the 3D models used for the try-on feature. This ensures that the models are easily accessible and can be retrieved when needed.

- **CORS**: Cross-Origin Resource Sharing (CORS) is utilized to enable secure communication between the backend server and the frontend application, allowing the frontend to make requests to the backend.

- **Token-based Authentication**: We have implemented token-based authentication to protect endpoints after the user logs in. This ensures that only authentic

## Getting Started
To get started with the Accessorize backend, follow these steps:

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Navigate to project directory.
4. Run the server using `npm start`.

## Endpoints
- Endpoints for customer module start with `/user`
- Endpoints for seller module start with `/seller`
- Endpoints for admin module start with `/admin`

## Contribution
We welcome contributions to the Accessorize backend! 
- Nouran Ibrahim
- Tarek El Shawaf
- Ziad Tarek
- Sara Ahmed
- Ahmed Maged
- Noran Mohamed
