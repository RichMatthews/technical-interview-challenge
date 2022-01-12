## Vetspire Take-home Challenge

### Using the app

Start by cloning the app:

`git clone https://github.com/RichMatthews/technical-interview-challenge.git`

then

`cd technical-interview-challenge`

then

`npm i`

You can run the app by opening another terminal.

In the first terminal start the server with: `npm run start-server`, in the second, run the app with `npm run start-app`

This will take you to http://localhost:3000 where you can observer the app and add a new dog breed

You can run tests by running `yarn test`

### Features

All features including the bonus feature have been built

### Tech Stack

I decided to build the app with the following techologies: Typescript, React, React Router, GraphQL, Express.

### Some notable decisions

-   I would normally use Apollo alongside GraphQL but in the interests of time I thought it would be quicker to hook GraphQL in with http. Also it's something I've not done before so thought it would be a good learning experience
-   Typescript was used to make the code more Robust

### Potential improvements if I had longer

-   I would look into caching mechanisms with GraphQL to see if I could minimize the backend requests
-   I used a custom hook to not repeat code. If I had more time I would look at improving this and potentially using some more elsewhere.
-   The design isn't great (apologies!), if I had longer I would spend time making this look better and adaptable for mobile users / smaller screens
-   Of course I would have written more tests and more thorough ones with more time
