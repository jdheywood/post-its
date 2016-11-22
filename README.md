# post-its

> This is my demo Vue.js project, it is a collaborative note taking SPA that makes use of a websocket server to sync 
notes across connected clients

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Deploy to hosted environment (Heroku)
Thanks to https://medium.com/@sagarjauhari/quick-n-clean-way-to-deploy-vue-webpack-apps-on-heroku-b522d3904bc8 for the 
tutorial on deploying just the built app.

Set up your remote in heroku as per normal, then push the subtree of the dist folder like so;

``` bash
git subtree push --prefix dist heroku master
```

My hosted app can be found here: http://post-its-demo.herokuapp.com/

## Websocket server
This application connects to a websocket server, a simple echo is all that is needed for basic functionality, however I
have built a server that persist some data to prevent total loss of notes if no-one is online or everyone clears their 
local storage, that lives in the following related repo: https://github.com/jdheywood/post-its-websocket-server

The hosted socket server can be found here: http://post-its-socket-server-demo.herokuapp.com/

## Thoughts on the process

You can read my rambling thoughts on how I put this on the wiki page here: https://github.com/jdheywood/post-its/wiki

Enjoy