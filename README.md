# Interview Scheduler
Interview Scheduler is an app used to place appointments for interviews on all weekdays. The app is made using React and is a dynamic single-page application. An example deployment of this app can be found at the link below:

[**Interview Scheduler**](https://frosty-colden-62906c.netlify.app/)
## Previews
___
![Empty slots for appointments](https://github.com/BenjaminJSLee/scheduler/tree/master/docs/empty.png)
___
![Create an appointment](https://github.com/BenjaminJSLee/scheduler/tree/master/docs/create.png)
___
![Edit an appointment](https://github.com/BenjaminJSLee/scheduler/tree/master/docs/edit.png)
___
![Delete an appointment (on a different day)](https://github.com/BenjaminJSLee/scheduler/tree/master/docs/empty.png)
___
## Setup

You'll have to start the scheduler-api server along with the database to actually receive any data when you start the application. Instructions onthe scheduler-api server can be found here: https://github.com/BenjaminJSLee/scheduler-api

Install dependencies with `npm install`.

## Dependencies
- axios: ^0.21.0,
- classnames: ^2.2.6
- normalize.css: ^8.0.1
- react": ^16.9.0
- react-dom": ^16.9.0
- react-scripts: 3.0.0

## Developer Dependencies
- @babel/core: ^7.4.3
- @storybook/addon-actions: ^5.0.10
- @storybook/addon-backgrounds ^5.0.10
- @storybook/addon-links: ^5.0.10
- @storybook/addons: ^5.0.10
- @storybook/react: ^5.0.10
- @testing-library/jest-dom: ^4.0.0
- @testing-library/react: ^8.0.7
- @testing-library/react-hooks: ^3.7.0
- babel-loader: ^8.0.5
- node-sass: ^4.14.1
- prop-types: ^15.7.2
- react-test-renderer: ^16.14.0

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
