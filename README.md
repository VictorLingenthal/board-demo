# BoardDemo

A simple Demo of a Trello like Board using NodeJS written with React/Typescript, GraphQL/Apollo and MongoDB.


### Prerequisites

- NodeJS
- MongoDB
- Typescript


### Installing

1) `git clone`
2) `npm install`
3) configuring mongoDB

Create a `.env` file in the root directory of this project,
paste this code
```
ATLAS_URI=mongodb+srv://username:password@cluster0.fgtd8.mongodb.net/board?retryWrites=true&w=majority

```
replace `username`, `password` with your MongoDB Login Credentials

go to mongodb.com and create a new project called `board`
replace `cluster0.fgtd8.mongodb.net` with your cluster,
which you can find under Clusters/Connect

4) `npm start`
5) `cd frontend && npm install && npm build` (optional)


## Running tests

- `npm test`


## Deployment

1) create heroku account
2) create new heroku app and follow the instructions
3) `git push heroku graphql:master`


## Todos

- Add Login/Persistent User
- Drag & Drop for Cards


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
