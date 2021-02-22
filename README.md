<table>
  <tr>
    <td><img width="250px" src="https://raw.githubusercontent.com/enterprise-oss/osso/main/.github/logo.png" /></td>
    <td>+</td>
    <td><img width="250px" src="https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png" /></td>
  </tr>
 </table>

# Osso + SuperTokens Demo app

This demo app shows how to integrate Osso in a Node and React app that uses SuperTokens for user authentication.

You'll need an Osso instance which you can [self-host](https://ossoapp.com/docs/deploy/overview) or [purchase as a SaaS subscription](https://ossoapp.com/pricing). You can also utilize Osso's [Demo Instance](https://demo.ossoapp.com) for testing - `.env.example` includes variables for working with the Osso demo instance.

You'll also need a SuperTokens instance, which you can also self-host or purchase a SaaS subscription. If you've found this project we assume you are already familiar with SuperTokens.

## Project setup

Use `npm` to install the project dependencies:

```bash
npm install
```

# Osso credentials

Copy the `.env.example` file. If you are using your own Osso instance, replace the relevant variables with the information for your instance and OAuth client.

```bash
   cp .env.example .env
```

In your Osso instance, add an allowed redirect URI for each of your OAuth clients with the path `/auth/callback/osso`. 

For instance, if you are running this application locally, add `http://localhost:3000/auth/callback/osso` to your Development OAuth Client.

## Run the demo app

This compiles and serves the React app and starts the backend API server on port 3001.

```bash
npm run dev
```

The app will start on `http://localhost:3000`

## Project structure & Parameters

- The frontend code is located in the `src` folder.
- The backend API is in the `api-server.js` file.
- You can provide the following params to the `npm run` commands:
  - `REACT_APP_API_PORT`: To change the port for the API. The default is `3001`
  - `REACT_APP_API_URL`: In case the API is not hosted on `localhost`. This must contain the port as well.
  - `REACT_APP_WEBSITE_PORT`: To change the port of the website server. The default is `3000`
  - `REACT_APP_WEBSITE_URL`: In case the website is not hosted on `localhost`. This must contain the port as well.


## Deployment

### Compiles and minifies for production

```bash
npm run build
```

### Live demo

A live demo is available at <https://supertokens-example.ossoapp.com>.

### Running in production

```bash
npm run prod
```

## Author

Created with :heart: by the folks at SuperTokens.io, forked and updated by the folks at Ossoapp.com

## License

This project is licensed under the Apache 2.0 license.