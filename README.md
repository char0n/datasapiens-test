# TeamZeus Frontend

## Prerequisites

You need to have `Node.js` server and with `npm` (node package manager) version 3 and above. You can just install new stable version of Node.js(^6) that came with new version of npm(^3).


## Installation

Edit `postgres-config.json` with valid credentials to postgres database.

> `psql -U <username> -h <hostname> -W -f postgres-schema.sql` - creates database
> `npm i` - installs modules
> `npm run fixtures` - loads postgres fixtures (truncate tables before re-importing again)


## Development & Run

> `npm run dev` - run development mode

> `npm run dev nolint` - run in development mode without eslint 

When you run development mode, new window of your default browser will open with this app at `localhost:PORT`,
if you want to disable this behavior just add `.env` file with `DISABLE_OPEN=true` in root folder.

You can use `NODE_ENV` variable inside of your Javascript code to access actual enviroment value (the NODE_ENV var is processed by Webpack). Possible values are `production`, `development` and `test` for Karma tests.
