# Teach Yourself Code

- A free platform for learning programming that curates tutorials from Youtube; the main value propositions are that...

1. Users will be able to watch videos with minimal distraction/in a 'focus' mode
2. Users will be able to 'subscribe' to tutorials/save them to their profile
3. Users will be able to add notes to each video

## Tech Stack

- [NextJs](https://nextjs.org/) - a React framework
- [Redux-Toolkit](https://redux-toolkit.js.org/) - state container
- [Hasura](https://hasura.io/) - a GraphQL engine for querying a Postgres database
- [Auth0](https://auth0.com/) - authentication provider
- [Apollo GraphQL](https://www.apollographql.com/docs/react/) - GraphQL hooks for fetching data from database
- [Bulma](https://bulma.io/) - open-source CSS framework
- [Jest](https://jestjs.io/en/) - unit-testing library

## To Get It Up And Running Locally

### Install locally

```
   yarn install
   yarn run dev
```

### Obtain the following .env variables by setting up YouTube API, Hasura, and Auth0:

Create a .env file in your project root with:

```
AUTH0_DOMAIN =
AUTH0_CLIENT_ID =
AUTH0_CLIENT_SECRET =
REDIRECT_URI= http://localhost:3000/api/callback
POST_LOGOUT_REDIRECT_URI= http://localhost:3000/
SESSION_COOKIE_SECRET =
SESSION_COOKIE_LIFETIME = 7200, // 2 hours
YOUTUBE_API_KEY =

```

**Get the vars by following these:**

1. Sign-up for a YouTube API key. [Follow This](https://www.slickremix.com/docs/get-api-key-for-youtube/)

```
YOUTUBE_API_KEY=
```

2. [![Deploy A Hasura GraphQL Engine](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku) to obtain the following two values. Hasura is used to query our Postgres db.

```
HASURA_ADMIN_SECRET=
HASURA_GRAPHQL_JWT_SECRET=
```

Hasura admin secret Docs are [here](https://hasura.io/docs/1.0/graphql/manual/deployment/heroku/securing-graphql-endpoint.html#add-the-hasura-graphql-admin-secret-env-var).

Hasura graphql jwt secret can be generated [here](https://hasura.io/jwt-config/).

Add jwt Secret to the env vars as you did for `HASURA_ADMIN_SECRET`.

3. Create a free account at Auth0 and set-up a test application following the [Auth0 config instructions here](https://auth0.com/docs/quickstart/spa/react#configure-auth0). It explains where to get the following values:

```
AUTH0_DOMAIN=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
```

4. Create a 32-character secret with a random string generator like [this](https://passwordsgenerator.net/).

```
SESSION_COOKIE_SECRET=jtftEOwNtDLVwRw0OgrdzsZDeQIeP9yioxPKlgrS5bIVXoPSMP_u-VT4saodFOqN
```

5. Add localhost URLs for redirection upon login and logout.

```
REDIRECT_URI=http://localhost:3000/api/callback
POST_LOGOUT_REDIRECT_URI=http://localhost:3000/
```

### Create the following rules in your Auth0 Dashboard

Directly through Dashbaord, Under the tab `Rules`.
Do remember to change the `url: "<your-hasura-graphql-endpoint>"` in `hasura-user-sync` function.

1. hasura-jwt-claim

```
function hasuraClaimsRule(user, context, callback) {
  const namespace = "https://hasura.io/jwt/claims";

  context.idToken[namespace] = {
    "x-hasura-default-role": "user",

    // do some custom logic to decide allowed roles

    "x-hasura-allowed-roles": ["user"],
    "x-hasura-user-id": user.user_id
  };

  callback(null, user, context);
}
```

2. hasura-user-sync

```
function userSyncRule(user, context, callback) {
  const userId = user.user_id;
  const email = user.email;

  const mutation = `mutation($userId: String!, $email: String) {
    insert_users(objects: [{
        auth0_id: $userId,
        email: $email
      }],
      on_conflict: {
        constraint: users_pkey,
        update_columns: [last_seen, email]
      }) {
        affected_rows
      }
    }`;

  request.post(
    {
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret": configuration.ACCESS_KEY
      },
      url: "<your-hasura-graphql-endpoint>",
      body: JSON.stringify({ query: mutation, variables: { userId, email } })
    },
    function(error, response, body) {
      console.log(body);
      callback(error, user, context);
    }
  );
}
```

### Set up Postgres Database via Hasura Console

Run the following SQL command.

```
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.users (
    id integer NOT NULL,
    auth0_id text NOT NULL,
    email text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    last_seen timestamp with time zone DEFAULT now() NOT NULL,
    current_playlist_id integer
);
CREATE TABLE public.notes (
    id integer NOT NULL,
    note text NOT NULL,
    video_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id text NOT NULL,
    "timestamp" integer
);
CREATE SEQUENCE public.notes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.notes_id_seq OWNED BY public.notes.id;
CREATE VIEW public.online_users AS
 SELECT users.email,
    users.last_seen
   FROM public.users
  WHERE (users.last_seen >= (now() - '00:00:30'::interval));
CREATE TABLE public.playlists (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    thumbnail text,
    topic_id integer NOT NULL,
    playlist_id text NOT NULL,
    channel text
);
CREATE SEQUENCE public.playlists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.playlists_id_seq OWNED BY public.playlists.id;
CREATE TABLE public.topics (
    id integer NOT NULL,
    title text NOT NULL
);
CREATE SEQUENCE public.topics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.topics_id_seq OWNED BY public.topics.id;
CREATE TABLE public.user_playlists (
    id integer NOT NULL,
    user_id integer NOT NULL,
    playlist_id integer NOT NULL,
    current_video_id text
);
CREATE SEQUENCE public.user_playlists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.user_playlists_id_seq OWNED BY public.user_playlists.id;
CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
ALTER TABLE ONLY public.notes ALTER COLUMN id SET DEFAULT nextval('public.notes_id_seq'::regclass);
ALTER TABLE ONLY public.playlists ALTER COLUMN id SET DEFAULT nextval('public.playlists_id_seq'::regclass);
ALTER TABLE ONLY public.topics ALTER COLUMN id SET DEFAULT nextval('public.topics_id_seq'::regclass);
ALTER TABLE ONLY public.user_playlists ALTER COLUMN id SET DEFAULT nextval('public.user_playlists_id_seq'::regclass);
ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.playlists
    ADD CONSTRAINT playlists_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.user_playlists
    ADD CONSTRAINT user_playlists_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_auth0_id_key UNIQUE (auth0_id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(auth0_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.playlists
    ADD CONSTRAINT playlists_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_playlists
    ADD CONSTRAINT user_playlists_playlist_id_fkey FOREIGN KEY (playlist_id) REFERENCES public.playlists(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_playlists
    ADD CONSTRAINT user_playlists_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_current_playlist_id_fkey FOREIGN KEY (current_playlist_id) REFERENCES public.playlists(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
```

### Build for Production

```
  yarn run build
```
