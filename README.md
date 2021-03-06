# Prisma-Heroku Postinstall Reproduction

## How to Reproduce

```bash
git clone https://github.com/williamluke4/prisma-heroku-repoduction.git
cd prisma-heroku-repoduction
rm -rf ./.git
git init
git add . 
git commit -m 'Initial commit'
heroku login
heroku apps:create prisma-repoduction
heroku git:remote --app prisma-repoduction
heroku addons:create heroku-postgresql:hobby-dev
heroku pg:credentials:url
```

Now add the Postgres Connection URL to a root `.env` with the name DATABASE_URL. 


```env
DATABASE_URL="postgresql://__USER__:__PASSWORD__@__HOST__:__PORT__/__DATABASE__"
```

```shell
npx prisma migrate save --experimental --name "init"
npx prisma migrate up --experimental
heroku config:set NPM_CONFIG_LOGLEVEL=verbose 
git push heroku main
```

If you look at the build log you will see that the postinstall hook for `@prisma/client` is run. This initializes a sudo package in `node_modules/.prisma/client/xx`. 

![build log](./build-log.png)

I created a postinstall hook that shows that even though `@prisma/client` postinstall is called, `.prisma/client` is not initialized.

![postinstall log](./heroku_not_initializing.png)


For more information about the deployment you may look at this [guide](https://www.prisma.io/docs/guides/deployment/deploying-to-heroku)

- 2.12.1 Working
- 2.13.1 Working