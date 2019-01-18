# PlayBook Web Application
The main client for accessing the PlayBook service is this web application, written using the ReactJS framework.

## Quickstart
Run the following commands from the terminal:

```text
npm install
npm run build
npm run serve
```

Alternatively, you can simply run `npm start` after installing the dependencies to use the local development server provided by Webpack. You can also specify the server on which to serve the built client application with `npm run serve -- --port <port>` or `npm start -- --port <port>`. The output of the `start` and `serve` commands will indicate on what port the web application is running.

## Configuration
The application gets its configuration by loading a JSON file from the web server after the React application has loaded on the client's web browser. This uses the [`@bradenhc/client-config`](https://www.npmjs.com/package/@bradenhc/client-config) library found on NPM. The config file is located under `src/assets/config`. It supports setting the API version and port number, which are used to construct the URL the web application will use when communicating with the [API Backend](../api-server).

For local development, **do not edit the `default.json` file directly**. Instead, create a `local.json` file, which will be ignored by source control but will still be loaded by the configuration library.

## Technologies Involved

| Technology/Library | Description | Link |
|---|---|---|
| ReactJS | Single-page-application framework | [Details](https://reactjs.org/) |
| React Router | URL routing for react applications | [Details](https://reacttraining.com/react-router/web/guides/quick-start) |
| Material UI | React library implementing Google's material design UI principles | [Details](https://material-ui.com/) |