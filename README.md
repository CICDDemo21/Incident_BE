<h1 align="center">Welcome to Incident Management System - Backend 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

## Install

```sh
npm install express

npm install cors

```

## Usage

Follow below steps to configure

Update entry point (package.json)

entry point: (index.js)

Update DB settings in config.js

DB_HOST=XXX
DB_PORT=XXX
DB_USER=XXX
DB_PASSWORD=XXX
DB_NAME=XXX
LIST_PER_PAGE=XXXX

```sh
npm run start
```

## Author

This application used Express.js to build backend.  For more info

Express: It provides one of the most simple yet powerful ways to create a web server. Its minimalist approach, unopinionated, focused on the core features of a server, is key to its success.

https://expressjs.com/

👤 **sparescnx.com**

## TABLE SCRIPT

-- Table: public.incidents

-- DROP TABLE IF EXISTS public.incidents;

CREATE TABLE IF NOT EXISTS public.incidents
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    inc_title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    inc_desc character varying(255) COLLATE pg_catalog."default",
    inc_type character varying(255) COLLATE pg_catalog."default",
    is_acked boolean NOT NULL DEFAULT false,
    acked_by uuid,
    acked_name character varying(255) COLLATE pg_catalog."default",
    is_deleted boolean NOT NULL DEFAULT false,
    created_by character varying(100) COLLATE pg_catalog."default" NOT NULL DEFAULT 'SYSTEM'::character varying,
    created_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT incident_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.incidents
    OWNER to postgres;

-- Table: public.incident_users

-- DROP TABLE IF EXISTS public.incident_users;

CREATE TABLE IF NOT EXISTS public.incident_users
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    first_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(255) COLLATE pg_catalog."default",
    user_role character varying(100) COLLATE pg_catalog."default",
    created_by character varying(100) COLLATE pg_catalog."default" DEFAULT 'SYSTEM'::character varying,
    created_date date DEFAULT CURRENT_TIMESTAMP,
    is_deleted boolean DEFAULT false,
    CONSTRAINT incident_users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.incident_users
    OWNER to postgres;

COMMENT ON TABLE public.incident_users
    IS 'Incident Users';

COMMENT ON COLUMN public.incident_users.is_deleted
    IS 'is_deleted';

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_