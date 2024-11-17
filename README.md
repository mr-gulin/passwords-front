# @mr-gulin/nextjs

This is a starter project created with `create-next-app` and tweaked a little. The one you can really start with.

## Stack

* node: `20.12.2`
* next: `14.2.3`
* react: `18.3.1`
* react-dom: `18.3.1`
* eslint: `8.57.0`
* prettier: `3.2.5`
* sass: `1.75.0`
* stylelint: `16.4.0`
* typescript: `5.4.5`

## Getting started

1. Clone or fork & clone this repo
2. Install and use required NodeJS version
    ```shell
    nvm install
    ```
   or install from https://nodejs.org
3. Install the dependencies
    ```shell
    npm install
    ```
4. Start the app
    ```shell
    npm run dev
    ```
5. See the result on `http://localhost:3000`
6. Create `.env` file based on [.env.example](env.example)
7. Configure the [theme](theme) (see details in theme's [README.md](theme/README.md))

## Delete theme

If you want to use this starter, but don't want to use [theme](theme), you can delete it following these steps:

1. Delete all usages of `theme` (these usages are only examples).
    1. Go to [app/page.module.scss](app/page.module.scss)
    2. Delete `@use 'theme';`
    3. Delete `$sizes` map
    4. Delete following lines in `.container` class:
        ```scss
        @include theme.sizes($sizes);
        @include theme.typography(heading1);
         ...
        background-color: theme.color(primary);
        ```
    5. Go to [app/globals.scss](app/globals.scss)
    6. Delete `@use 'theme/fonts/declarations`
2. Delete `theme` folder in project

##  Disclaimer
All images in this repo (`public/meta/*` and `public/favicon.ico`) 
are used for demo purposes only and should not be used for production.

While images themselves are not subject to copyright, the font
used on them might not be free for commercial use.

Please refer to [Monofur font licence](https://github.com/powerline/fonts/blob/master/Monofur/LICENSE.txt)

