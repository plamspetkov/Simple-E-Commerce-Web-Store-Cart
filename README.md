# Simple E-Commerce Web Store Cart
This is the code repository for an E-commerce web store built using React and Redux, with functionality for browsing products, adding items to cart, and checking out. The app also features a backend server run on Firebase real-time database, which is used for storing user data and shopping cart information.

Getting Started
To run the application locally on your machine, simply clone this repository and run the following commands in your terminal:

Copy code# install dependencies
npm install

# run the development server
npm run dev

Features
The application has several core features, including:

Product browsing: Users can browse the app's selection of products and view details such as product image, name, description, and price.
Adding items to cart: Users can add items to their shopping cart by clicking the "Add to Cart" button on each product page. The cart contents are stored in the Firebase real-time database.
Cart management: Users can view their shopping cart by clicking the cart icon in the app header. The user can then remove items from the cart or adjust quantities of items already in the cart.
Checkout: When a user is ready to checkout, they can complete the checkout process using a simple form that validates user input and submits the order. The order information is also stored in the Firebase database.
Notifications: The app features a notification system that displays messages to the user indicating the status of various actions, such as adding items to the cart or submitting an order.
Technologies Used
The app is built using the following technologies:

React: JavaScript library for building user interfaces
Redux: JavaScript library for managing the app's state
Firebase: Cloud-based platform for web and mobile development, used to store user data and app information
Vite: Fast build tool for modern web apps, used as a development server
CSS: Styling language used to style the app's components
