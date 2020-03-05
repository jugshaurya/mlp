## Learning [NEXT.js](https://nextjs.org/learn/basics/)

🐳 Next.js is a react framework means it consist of all the functionality that we
may require anytime during app development by wrting the javascript in form of
React JSX, component, Declarative, state, props way.

🐳 Next.js is used for serving react code to browser but by the means of Server side Rendering. Cool Intro right!

🐳 Also by default Next.js is made to be deployed over Zeit Now, Hey! that is what i like the most and struggled the most in recent times.

🐳 Next has only two required directories `/pages` and `/public`

# [Setup](https://nextjs.org/learn/basics/getting-started/setup)

npm init -y
npm install react react-dom next
mkdir pages // next needs a page directory with it to work

### Start Client

npm run dev

### Start Server

npm start

- Link of react router dom is on 'next/link'

```
  <Link href="/about">
    <a>About Page</a>
  </Link>
```

- @hapi/joi - The most powerful schema description language and data validator for JavaScript.

- express-jwt to validate jwt
- jsonwebtoken - to create a jw-token

## Environment variables in next.js

#### Not working

```
 - https://nextjs.org/docs/api-reference/next.config.js/environment-variables

  - Note: Trying to destructure process.env variables won't work due to the nature of webpack DefinePlugin.

#### working

 - https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration

```
