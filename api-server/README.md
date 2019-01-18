# PlayBook API Server
The PlayBook service is implemented using a Node.js backend with MongoDB for persistence. In order to develop/test/run the backend, you will need to have a running MongoDB instance accessble, either locally on your machine or remotely through a public URL. The recommended way of running MongoDB locally is with [Docker](https://www.docker.com/).

## Quickstart with Docker
Run the following commands from the terminal. They assume you have already installed Node.js and Docker.

```text
npm install
docker run --rm -d -p 27017:27017 mongo
npm start
```

The output should indicate that there is a web server running locally and that the server has successfully connected to the MongoDB instance.

## Configuration
The `config/` directory contains configuration for the server. The NPM [`config`](https://www.npmjs.com/package/config) library is used to load the config files, which are in YAML format. In these files you can specify things such as the database connection parameters and the server security settings. See the [`default.yml`](./config/default.yml) file for more information.

## Technologies Involved

| Technology/Library | Description | Link |
|---|---|
| Node.js | Execution runtime | [Details](https://nodejs.org/en/) |
| MongoDB | Data persistence | [Details](https://www.mongodb.com/) |
| Mongoose | Database access and schema validation | [Details](https://www.npmjs.com/package/mongoose) |
| Passport.js | Web server route authentication | [Details](http://www.passportjs.org/) |
| JSON Web Tokens | Stateless, authenticated HTTP requests | [Details](https://jwt.io/) |