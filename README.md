# php-fpm-bem-demo-heroku

Pure proxy server to render bemjson with bemhtml onto plain html and so on (BEM)
with configurations for `heroku` cloud platform.

## Prerequisites

- Git
- Heroku account
- Heroku CLI
- Node.js
- PHP
- Composer

## Usage

To use it locally:
```
npm i
composer install
heroku local # to run app locally, now you can edit web/index.php file
```

To deploy it on Heroku you need to create an app there:
```sh
heroku apps:create --region eu my-awesome-php-app # this will create an app in heroku
heroku git:remote --app my-awesome-php-app # this will add remote in you git
```

And then just push to redeploy:
```sh
git push heroku master
```

## Pitfalls

- Heroku detects buildpack by defualt automatically.
  To use this package you have to add it manually:
  ```sh
  heroku buildpacks:set heroku/nodejs
  heroku buildpacks:add heroku/php
  ```

- Heroku starts just 1 web app and provide only 1 port.
  Because of that `nginx` with `php-fpm` starting inside `nodejs` app.

## License

MIT
