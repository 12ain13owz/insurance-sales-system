# NodeJS witt Express + Typescript

## Install Dev Dependencies

```
npm i -D @types/config @types/express @types/lodash @types/morgan @types/node pino-pretty ts-node tsx typescript
```

## Install Dependencies

```
npm i config dayjs dotenv express lodash morgan pino
```

## Create .env file

```
PORT=<PORT>
NODE_ENV=<NODE_ENV>
```

## Run

```
npm run dev
```

---

### Options

- Generate keys `(Key Size: 2048 bit)`: https://travistidwell.com/jsencrypt/demo/

```
ACCESS_TOKEN_PRIVATE_KEY="<Private Key>"
ACCESS_TOKEN_PUBLIC_KEY="<Public Key>"

REFRESH_PRIVATE_KEY="<Refresh Private Key>"
REFRESH_PUBLIC_KEY="<Refresh Public Key>"
```
