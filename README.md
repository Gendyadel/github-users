# halan-github-users

Second Frontend task, an app that searches in the Github users using github api
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3.
a web application that allows users to search for GitHub users and view their profiles.

## Features

- Search for GitHub users by username using **RxJs** to handle the API requests and user input when they type to search
- Used **Ngrx** to maintain the app state and control diffrent concerns like loading, usersList, and search term and used reducers, selectors, actions, and effects to achieve that
- View detailed user info (if prefered using **include details** checkbox to decide which endpoint will be called because the search endpoint returns a list of users but it doesn't include info like number of followers, followings and etc..)
- Instead of manually handling errors for each API request using `catchError`, I used `errorInterceptor` to handle errors globally across the app. And it's provided in `app.config.ts`
