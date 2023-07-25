# About project

This project is created to show my skills in React library.
For styling is used BEM approach.

## Overview

- Create a React application that shows a list of Posts and associated post Comments that are fetched via provided API.
- Push the code to github + describe the build/run process in a Readme file
- Write approximate time needed to finish the assignment

## Features

- Create 2 routes: '/posts' & 'post/{id}'.
- Posts route should show a list of posts and associated comments. Every post should have a user's name associated.
- Create a search input and filter posts by user name using an input field.
- Clicking a post will redirect to a new page
- MUST! EVERY component once rendered must log in the console 'Hello from <insert component name>' and should be overridable per component. The part 'Hello from' must be sent to a component via props and defined only once within the scope of the application. It should look something like console.log('${propsmessage} ${componentName}'). Feel free to name the variables as you see fit.

## Conditions

- The UI is up to you. This is a React oriented test but at least a minimally usable layout that does not break and is appealing to the eye is required.
- Do not use any 3rd party state management solution. Again this is a React oriented test. That does not mean state management can't be handled in a well structured way.
- Do not use any 3rd party UI component libraries. The UI of the app can be very minimal and does not require 3rd party component libraries.
- Do not use CSS utility libraries (e.g. Bootstrap, Tailwind).
- When writing components try to find a way to make them reusable and resilient, meaning they can easily be integrated into other applications. This part of the test is very important.
- Try to use some of the more advanced concepts like HOC, Render props, Compound components etc.
- You are free to use any React bootstrapping tool (like create-react-app or vite)
- It is also highly recommended to use TypeScript. If not, make sure to use type checking With PropTypes
- You are free to structure the code in any way you like (folder structure) but try to make it as real-world as possible

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
