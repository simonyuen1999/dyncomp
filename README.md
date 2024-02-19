# DynCompApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.

# commands
[Reference](https://angular.dev/guide/components/programmatic-rendering)
```
ng new dyn-comp-app
cd dyn-comp-app
ng generate component AdminBio
ng generate component StandardBio
ng serve --open
```
When creating (v17) a new Angular app using the Angular CLI, it sets up a **standalone app** by default. 

**Note**: The App and 2 Components are standalone.   Even app.module.ts is not created, it still works.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Build and Deployment

> `npm build` command generates `dist\app\browser` and `dist\app\server` output directories, what is that server directory for?

The `dist\app\browser` and `dist\app\server` directories are generated as a result of **Angular Universal**, which is a technology that renders Angular applications on the server.

- `dist\app\browser`: This directory contains the **client-side version** of your application. It's the standard Angular application that runs in the browser using JavaScript.

- `dist\app\server`: This directory contains the **server-side version** of your application. It's used by Angular Universal to render your application on the server. The server-side version of your application can run on Node.js and it's used to improve performance and facilitate SEO by pre-rendering your application on the server.

When a user first navigates to your application in their browser, they receive the server-rendered version of the app. Then, the client-side JavaScript takes over and the app behaves just like a standard Angular application. This process is often referred to as "**hydration**".

> For deploying this Angular application on Apache, where to copy these files into Apache `/var/www/html` directory?

When deploying an Angular application on an Apache server, you typically only need to deploy the client-side application, which is located in the `dist/app/browser` directory.

1. Build your Angular application with the `ng build --prod` command. This will create a `dist/app/browser` directory with your built application.

2. Copy the contents of the `dist/app/browser` directory to your Apache server's document root, typically `/var/www/html`. You can use the `cp` command in the terminal:

```
cp -r dist/app/browser/* /var/www/html
```

3. Make sure the `.htaccess` file is properly configured to handle **HTML5 pushState**. You might need to add a rewrite rule to serve `index.html` for all routes:

```cmd
RewriteEngine On

# If an existing asset or directory is requested go to it as it is
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]

# If the requested resource doesn't exist, use index.html
RewriteRule ^ /index.html
```

4. Restart your Apache server to apply the changes.

Please note that the server-side application (`dist/app/server`) is not typically used with Apache, as Apache doesn't have built-in support for running Node.js applications. The server-side application is used for server-side rendering (SSR) with Node.js.

## SSR with Angular

For `Server-Side Rendering (SSR)` with Angular, you typically use a **Node.js** server. This is because the server-side application in the `dist/app/server` directory is a Node.js application.

You can use **Express**, a popular Node.js web server framework, to serve your **server-side rendered** Angular application. When you build an Angular application with SSR, Angular CLI generates a `server.ts` file in your project root, which sets up an Express server to serve your application.

Here's a simplified example of what this `server.ts` file might look like:

```js
import * as express from 'express';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { AppServerModule } from './src/main.server';

const app = express();

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModule,
}));

app.set('view engine', 'html');
app.set('views', './dist/app/browser');

app.get('*.*', express.static('./dist/app/browser', {
  maxAge: '1y'
}));

app.get('*', (req, res) => {
  res.render('index', { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
});

app.listen(4000, () => {
  console.log(`Node Express server listening on http://localhost:4000`);
});
```

This **Express** server serves the static files from the `dist/app/browser` directory and uses the `@nguniversal/express-engine` to render Angular routes on the server.

You can run this server with a command like `node server.js`, assuming your transpiled `server.ts` file is named `server.js`.

> While you can use `http-server` to serve static files, it **doesn't support server-side rendering** because it can't execute your Angular application on the server. For SSR, you need a `Node.js` server like **Express**.

## Only build client side application

To build only the client-side application and skip the server-side application, you can use the `ng build` command without the `--prod` flag. This will generate the client-side application in the dist directory.

```
ng build
```

This command compiles your application into an output directory named `dist/` at the root of your workspace. By default, this command `ng build` builds both client and server side application.    This will apply production such as **ahead-of-time (AOT)** compilation, smaller bundle sizes, and more.

```
ng build
```

Please note that these commands will only build the client-side application. If you want to build the server-side application, you need to use the `ng run` command with your app's server target. For example:

```
ng run your-app:server
```

Replace `your-app` with the name of your application.
