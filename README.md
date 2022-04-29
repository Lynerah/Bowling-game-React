# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


## My App

The application has been divided into different components. we have several components with the front end of the project (Board.js, Frame.js, Controls.js)

In the Game.js file you will find all the logic of the application. 

At the start of the application, a board is created. This board will contain all the scores found in our game grid.

As the board fills up, the total score is calculated at the end of the 3 rolls. 
In case of special moves (spare and strike) the score will be calculated at the end of the 3 standard rolls + the next 2-3 rolls. 

The buttons above represent the number of pins and adapt after a roll to represent only the number of pins left. 

A reset button is provided to restart the game.