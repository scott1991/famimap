# express-es6-spa-example

Getting Started
---------------

```sh
git clone https://github.com/scott1991/express-es6-spa-example <project-name>
cd <project-name>
npx rimraf ./.git
git init
npm init
```

Add React SPA
---------------
```sh
sh create_reactSPA.sh
```
It will use creat-react-app and set .env to bind different port 3001 instead of express server port(3000)
And set proxy 'http://localhost:3000' to redirect api call in React app.
