# ToyShare

## Overview
ToyShare is a fulltstack application designed by the BSEI team for a client to allow users to be able to rent their own toys out to others or to rent toys from others. The app allows users to browse through the current inventory of toys and view the rentee profiles of the users renting each toy without having to login. If a the user wished to rent a toy they will be prompted to login through Google. Once logged in each user will be able to view and edit their own profile as well as rent toys from others.

### Description
1. Home

This component will display the home page of the app. The home page consists of a topbar, toy cards, and a bottombar.

* Topbar
* Toy card gallery
* Bottombar


 The topbar consists of four main features, the name of the app that when clicked will navigate the user back to the home page,  a notification icon that will notify users of requests from other users, a search bar that allows users to serch for specific toys by name, and a toyshare button that when clicked presents the user with a dropdown list. In the list the user will have the ability to login or logout using Google, or navigate to their individual profile. Each toy card is clickable and will navigate the user to that individual toy's information page. Each toy card displays an image of the toy, the toy's rating, and the current rental price. The bottombar consists of four main features, an add toy button that will navigate to the add toy page, a sortby dropdown that will allow users to sort the toy cards, a filter dropdown that will allow users to filter the toy cards, and a map button that will display the location of each of the toys. The topbar component is displayed at the top of every page in the app.

2. Rentee profile

This component will display the rentee profile page of the app. This page consists of a topbar, rentee cards, and rentee rental inventory.

* Topbar
* Rentee card
* Rental inventory

The renteeprofile consists of the three main features, the topbar as described above, the rentee card, and the rentee rental inventory. the rentee card consists of an image, as well as the name, location, rating, and description of the rentee. The rentee inventory consists of a list of all the toys the rentee has made available for users to rent.


3. Add/Edit toy



4. Checkout


5. Individual toy


3. User profile


### Installation

* git clone from "Code" dropdown menu
* run npm install
* start webpack in watch mode by running npm run build-all
* start the server by running npm run server

### Usage - Further details on how the project is meant to be used may be helpful. For a library or framework, this section would outline how to use the library within another project (see socket.io  ). For a service that is meant to be used within a larger project architecture, instructions on how to integrate may be necessary (see node-statsD).

This product is meant to allow parents to have access to lots of different kinds of toys for an affordable price without having to buy them. 