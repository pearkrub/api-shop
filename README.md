# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new api-shop --api-only
```

or manually clone the repo and then run `npm install`.

Use the adonis command to generate app_key

```bash
adonis key:generate
```

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

```js
adonis seed
```

### Run project on dev

```bash
adonis serve --dev
```
