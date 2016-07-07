# TeamZeus Frontend

## Prerequisites

You need to have `Node.js` server and with `npm` (node package manager) version 3 and above. You can just install new stable version of Node.js(^5) that came with new version of npm(^3).


## Installation

Edit `postgres-config.json` with valid credentials to postgres database.

> `psql -U <username> -h <hostname> -W -f postgres-schema.sql` - creates database
> `npm i` - installs modules
> `npm run fixtures` - loads postgres fixtures (truncate tables before re-importing again)


## Development

> `npm run dev` - run development mode

> `npm run dev nolint` - run in development mode without eslint 

When you run development mode, new window of your default browser will open with this app at `localhost:PORT`,
if you want to disable this behavior just add `.env` file with `DISABLE_OPEN=true` in root folder.

You can use `NODE_ENV` variable inside of your Javascript code to access actual enviroment value (the NODE_ENV var is processed by Webpack). Possible values are `production`, `development` and `test` for Karma tests.

## Build

> `npm run build` - run build script

> Build script bundles and compresses all js, html templates, css and small images(as BASE64). Then copyies all necessary files into `./dist` folder. For production simply copy contents of distribution folder into your server root direcotry.  

> `npm run porod-server` - run server with production assets from `./dist` folder, this is mostly for testing purposes.

## Coding Stuff
Use `"ngInject";` in the begginging of each angular controller function that uses dependency injection pattern. Otherwise uglified production code wont work. This declaration automatically injects all dependencies with `$inject` Property Annotation - ng-annotate(-loader) will take care of that.

## IDE Configuration
When developing the application and working with Webpack HMR, note that solution is refreshed after each change so you might want to disable `save files automatically` feature or similar functionality in order to have a control over the actual reaload.

If you are using WebStorm please disable `Smart indent` feature in settings(indents automatically whole file including template html)

## Troubleshooting

When things go wrong, you can try:

Remove node_modules folder `rm -rf node_modules` and reinstall all modules `npm i`

Clear npm cache `npm cache clear`

If none of steps above resolve your problem, please contact <michal.podhradsky@gmail.com>
