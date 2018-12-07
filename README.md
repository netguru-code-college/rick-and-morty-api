[![Travis](https://img.shields.io/travis/afuh/rick-and-morty-api.svg?style=flat-square)](https://travis-ci.org/afuh/rick-and-morty-api)
[![Coveralls github branch](https://img.shields.io/coveralls/github/afuh/rick-and-morty-api/master.svg?style=flat-square)](https://coveralls.io/github/afuh/rick-and-morty-api?branch=feature%2Fcover)
[![Twitter Follow](https://img.shields.io/twitter/follow/rickandmortyapi.svg?style=flat-square&label=Follow)](https://twitter.com/rickandmortyapi)


# The Rick and Morty API


> Hey, did you ever want to hold a terry fold?,
>  I got one right here, grab my terry flap.

[The Rick and Morty API](http://tiny-rick.tk) (or ShlaAPI) is a RESTful and GraphQL API based on the television show [Rick and Morty](https://www.adultswim.com/videos/rick-and-morty). You will access to data about hundreds of characters, images, locations and episodes.

**To get started check the documentation n [tiny-rick.tk](http://tiny-rick.tk/documentation) or just keep reading ;)**

You can check the code of the site [here](https://github.com/afuh/rick-and-morty-api-site)

### Contents

- [Introduction](#introduction)
  - [Rate limit](#rate-limit)
  - [GraphQL](#graphql)
  - [REST](#rest)
  - [Info and pagination](#info-and-pagination)
- [Character](#character)
  - [Character schema](#character-schema)
  - [Get all characters](#get-all-characters)
  - [Get a single character](#get-a-single-character)
  - [Get multiple characters](#get-multiple-characters)
  - [Filter characters](#filter-characters)
- [Location](#location)
  - [Location schema](#location-schema)
  - [Get all locations](#get-all-locations)
  - [Get a single location](#get-a-single-location)
  - [Get multiple locations](#get-multiple-locations)
  - [Filter locations](#filter-locations)
- [Episode](#episode)
  - [Episode schema](#episode-schema)
  - [Get all episodes](#get-all-episodes)
  - [Get a single episode](#get-a-single-episode)
  - [Get multiple episodes](#get-multiple-episodes)
  - [Filter episodes](#filter-episodes)
- [Libraries](#libraries)
  - [Elixir](#elixir)
  - [GraphQL](#graphql)
  - [JavaScript](#javascript)
  - [.NET](#net)
  - [Python](#python)
  - [Ruby](#ruby)
- [Run the API locally](#run-the-api-locally)

## Introduction
This documentation will help you get familiar with the resources of the **Rick and Morty API** and show you how to make different queries, so that you can get the most out of it.

### Rate limit
The **Rick and Morty API** is an open API, no authentication is required for use. Nonetheless, to prevent malicious usage of the API there is a limit on the number of requests a given IP address can make. This limit is 10000 requests per day. If you happen to hit the limit you'll receive a `429` status (Too Many Requests) on all your requests during a period of 12 hours.

### GraphQL
http://tiny-rick.tk/graphql/   

*Sample query*
```graphql
query {
  characters(page: 2, filter: { name: "rick" }) {
    info {
      count
    }
    results {
      name
    }
  }
  episode(id: 1) {
    id
  }
}
```
Check [here](#filter-characters) to know more about how to filter.   
> *New to GraphQL? check the docs [here](https://graphql.org/learn/)*

### REST
**Base url:** http://tiny-rick.tk/api/

The base url contains information about all available API's resources.
All requests are `GET` requests and go over `https`. All responses will return data in `json`.

*Sample request*
```
http://tiny-rick.tk/api/
```
```js
{
  "characters": "http://tiny-rick.tk/api/character",
  "locations": "http://tiny-rick.tk/api/location",
  "episodes": "http://tiny-rick.tk/api/episode"
}
```

There are currently three available resources:
- [Character](#character): used to get all the characters.
- [Location](#location): used to get all the locations.
- [Episode](#episode): used to get all the episodes.

### Info and Pagination
The API will automatically paginate the responses. You will receive up to 20 documents per page.

Each resource contains an `info` object with information about the response.

|Key|Type|Description|
|---|---|---|
|count|int|The length of the response
|pages|int|The amount of pages
|next|string (url)|Link to the next page (if it exists)
|prev|string (url)|Link to the previous page (if it exists)


*Sample request*
```
http://tiny-rick.tk/api/character/
```
```js
{
  "info": {
    "count": 394,
    "pages": 20,
    "next": "http://tiny-rick.tk/api/character/?page=2",
    "prev": ""
  },
  "results": [
    // ...
  ]
}
```
You can access different pages with the `page` parameter. If you don't specify any page, the first page will be shown. For example, in order to access page 2, add `?page=2` to the end of the URL.

*Sample request*

```
http://tiny-rick.tk/api/character/?page=19
```

```js
{
  "info": {
    "count": 394,
    "pages": 20,
    "next": "http://tiny-rick.tk/api/character/?page=20",
    "prev": "http://tiny-rick.tk/api/character/?page=18"
  },
  "results": [
    {
      "id": 361,
      "name": "Toxic Rick",
      "status": "Dead",
      "species": "Humanoid",
      "type": "Rick's Toxic Side",
      "gender": "Male",
      "origin": {
        "name": "Alien Spa",
        "url": "http://tiny-rick.tk/api/location/64"
      },
      "location": {
        "name": "Earth",
        "url": "http://tiny-rick.tk/api/location/20"
      },
      "image": "http://tiny-rick.tk/api/character/avatar/361.jpeg",
      "episode": [
        "http://tiny-rick.tk/api/episode/27"
      ],
      "url": "http://tiny-rick.tk/api/character/361",
      "created": "2018-01-10T18:20:41.703Z"
    },
    // ...
  ]
}
```

## Character
There is a total of 493 characters sorted by id.

### Character schema
|Key|Type|Description|
|---|---|---|
|id|int|The id of the character.
|name|string|The name of the character.
|status|string|The status of the character ('Alive', 'Dead' or 'unknown').
|species|string|The species of the character.
|type|string|The type or subspecies of the character.
|gender|string|The gender of the character ('Female', 'Male', 'Genderless' or 'unknown').
|origin|object|Name and link to the character's origin location.
|location|object|Name and link to the character's last known location endpoint.
|image|string (url)|Link to the character's image. All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
|episode|array (urls)|List of episodes in which this character appeared.
|url|string (url)|Link to the character's own URL endpoint.
|created|string|Time at which the character was created in the database.

### Get all characters
You can access the list of characters by using the `/character` endpoint.
```
http://tiny-rick.tk/api/character/
```
```js
{
  "info": {
    "count": 394,
    "pages": 20,
    "next": "http://tiny-rick.tk/api/character/?page=2",
    "prev": ""
  },
  "results": [
    {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",
      "type": "",
      "gender": "Male",
      "origin": {
        "name": "Earth",
        "url": "http://tiny-rick.tk/api/location/1"
      },
      "location": {
        "name": "Earth",
        "url": "http://tiny-rick.tk/api/location/20"
      },
      "image": "http://tiny-rick.tk/api/character/avatar/1.jpeg",
      "episode": [
        "http://tiny-rick.tk/api/episode/1",
        "http://tiny-rick.tk/api/episode/2",
        // ...
      ],
      "url": "http://tiny-rick.tk/api/character/1",
      "created": "2017-11-04T18:48:46.250Z"
    },
    // ...
  ]
}
```
### Get a single character
You can get a single character by adding the `id` as a parameter: `/character/2`
```
http://tiny-rick.tk/api/character/2
```
```js
{
  "id": 2,
  "name": "Morty Smith",
  "status": "Alive",
  "species": "Human",
  "type": "",
  "gender": "Male",
  "origin": {
    "name": "Earth",
    "url": "http://tiny-rick.tk/api/location/1"
  },
  "location": {
    "name": "Earth",
    "url": "http://tiny-rick.tk/api/location/20"
  },
  "image": "http://tiny-rick.tk/api/character/avatar/2.jpeg",
  "episode": [
    "http://tiny-rick.tk/api/episode/1",
    "http://tiny-rick.tk/api/episode/2",
    // ...
  ],
  "url": "http://tiny-rick.tk/api/character/2",
  "created": "2017-11-04T18:50:21.651Z"
}
```

### Get multiple characters
You can get multiple characters by adding an array of `ids` as parameter: `/character/[1,2,3]` or `/character/1,2,3`
```
http://tiny-rick.tk/api/character/1,183
```
```js
[
  {
    "id": 1,
    "name": "Rick Sanchez",
    "status": "Alive",
    "species": "Human",
    "type": "",
    "gender": "Male",
    "origin": {
      "name": "Earth (C-137)",
      "url": "http://tiny-rick.tk/api/location/1"
    },
    "location": {
      "name": "Earth (Replacement Dimension)",
      "url": "http://tiny-rick.tk/api/location/20"
    },
    "image": "http://tiny-rick.tk/api/character/avatar/1.jpeg",
    "episode": [
      "http://tiny-rick.tk/api/episode/1",
      "http://tiny-rick.tk/api/episode/2",
      // ...
    ],
    "url": "http://tiny-rick.tk/api/character/1",
    "created": "2017-11-04T18:48:46.250Z"
  },
  {
    "id": 183,
    "name": "Johnny Depp",
    "status": "Alive",
    "species": "Human",
    "type": "",
    "gender": "Male",
    "origin": {
      "name": "Earth (C-500A)",
      "url": "http://tiny-rick.tk/api/location/23"
    },
    "location": {
      "name": "Earth (C-500A)",
      "url": "http://tiny-rick.tk/api/location/23"
    },
    "image": "http://tiny-rick.tk/api/character/avatar/183.jpeg",
    "episode": [
      "http://tiny-rick.tk/api/episode/8"
    ],
    "url": "http://tiny-rick.tk/api/character/183",
    "created": "2017-12-29T18:51:29.693Z"
  }
]
```

### Filter characters
You can also include filters in the URL by including additional query parameters. To start filtering add a `?` followed by the query `<query>=<value>`. If you want to chain several queries in the same call, use `&` followed by the query.

For example, If you want to check how many alive Ricks exist, just add `?name=rick&status=alive` to the URL.

Available parameters:
- `name`: filter by the given name.
- `status`: filter by the given status (`alive`, `dead` or `unknown`).
- `species`: filter by the given species.
- `type`: filter by the given type.
- `gender`: filter by the given gender (`female`, `male`, `genderless` or `unknown`).

*Sample request*
```
http://tiny-rick.tk/api/character/?name=rick&status=alive
```
```js

  "info": {
    "count": 15,
    "pages": 1,
    "next": "",
    "prev": ""
  },
  "results": [
    {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",
      "type": "",
      "gender": "Male",
      "origin": {
        "name": "Earth",
        "url": "http://tiny-rick.tk/api/location/1"
      },
      "location": {
        "name": "Earth",
        "url": "http://tiny-rick.tk/api/location/20"
      },
      "image": "http://tiny-rick.tk/api/character/avatar/1.jpeg",
      "episode": [
        "http://tiny-rick.tk/api/episode/1",
        "http://tiny-rick.tk/api/episode/2",
        //...
      ],
      "url": "http://tiny-rick.tk/api/character/1",
      "created": "2017-11-04T18:48:46.250Z"
    },
    // ...
  ]
}
```

## Location
There is a total of 76 locations sorted by id.

### Location schema
|Key|Type|Description|
|---|---|---|
|id|int|The id of the location.
|name|string|The name of the location.
|type|string|The type of the location.
|dimension|string|The dimension in which the location is located.
|residents|array (urls)|List of character who have been last seen in the location.
|url|string (url)|Link to the location's own endpoint.
|created|string|Time at which the location was created in the database.

### Get all locations
You can access the list of locations by using the `/location` endpoint.
```
http://tiny-rick.tk/api/location/
```
```js

  "info": {
    "count": 67,
    "pages": 4,
    "next": "http://tiny-rick.tk/api/location?page=2",
    "prev": ""
  },
  "results": [
    {
      "id": 1,
      "name": "Earth",
      "type": "Planet",
      "dimension": "Dimension C-137",
      "residents": [
        "http://tiny-rick.tk/api/character/1",
        "http://tiny-rick.tk/api/character/2",
        // ...
      ],
      "url": "http://tiny-rick.tk/api/location/1",
      "created": "2017-11-10T12:42:04.162Z"
    }
    // ...
  ]
}
```
### Get a single location
You can get a single location by adding the `id` as a parameter: `/location/3`
```
http://tiny-rick.tk/api/location/3
```
```js
{
  "id": 3,
  "name": "Citadel of Ricks",
  "type": "Space station",
  "dimension": "unknown",
  "residents": [
    "http://tiny-rick.tk/api/character/8",
    "http://tiny-rick.tk/api/character/14",
    // ...
  ],
  "url": "http://tiny-rick.tk/api/location/3",
  "created": "2017-11-10T13:08:13.191Z"
}
```

### Get multiple locations
You can get multiple locations by adding an array of `ids` as parameter: `/location/[1,2,3]` or `/location/1,2,3`
```
http://tiny-rick.tk/api/location/3,21
```
```js
[
  {
    "id": 3,
    "name": "Citadel of Ricks",
    "type": "Space station",
    "dimension": "unknown",
    "residents": [
      "http://tiny-rick.tk/api/character/8",
      "http://tiny-rick.tk/api/character/14",
      // ...
    ],
    "url": "http://tiny-rick.tk/api/location/3",
    "created": "2017-11-10T13:08:13.191Z"
  },
  {
    "id": 21,
    "name": "Testicle Monster Dimension",
    "type": "Dimension",
    "dimension": "Testicle Monster Dimension",
    "residents": [
      "http://tiny-rick.tk/api/character/7",
      "http://tiny-rick.tk/api/character/436"
    ],
    "url": "http://tiny-rick.tk/api/location/21",
    "created": "2017-11-18T19:41:01.605Z"
  }
]

```

### Filter locations
Available parameters:
- `name`: filter by the given name.
- `type`: filter by the given type.
- `dimension`: filter by the given dimension.

If you want to know how to use queries, check [here](#filter-characters)

*Sample request*
```
http://tiny-rick.tk/api/location/?name=earth
```
```js

  "info": {
    "count": 18,
    "pages": 1,
    "next": "",
    "prev": ""
  },
  "results": [
    {
      "id": 1,
      "name": "Earth",
      "type": "Planet",
      "dimension": "Dimension C-137",
      "residents": [
        "http://tiny-rick.tk/api/character/1",
        "http://tiny-rick.tk/api/character/2",
        // ...
      ],
      "url": "http://tiny-rick.tk/api/location/1",
      "created": "2017-11-10T12:42:04.162Z"
    },
    // ...
  ]
}
```

## Episode
There is a total of 31 episodes sorted by id (which is of course the order of the episodes)

### Episode schema
|Key|Type|Description|
|---|---|---|
|id|int|The id of the episode.
|name|string|The name of the episode.
|air_date|string|The air date of the episode.
|episode|string|The code of the episode.
|characters|array (urls)|List of characters who have been seen in the episode.
|comments|array|List of all comments for the given episode.
|url|string (url)|Link to the episode's own endpoint.
|created|string|Time at which the episode was created in the database.

### Get all episodes
You can access the list of episodes by using the `/episode` endpoint.

```
http://tiny-rick.tk/api/episode/
```
```js
{
  "info": {
    "count": 31,
    "pages": 2,
    "next": "http://tiny-rick.tk/api/episode?page=2",
    "prev": ""
  },
  "results": [
    {
      "id": 1,
      "name": "Pilot",
      "air_date": "December 2, 2013",
      "episode": "S01E01",
      "characters": [
        "http://tiny-rick.tk/api/character/1",
        "http://tiny-rick.tk/api/character/2",
        //...
      ],
      "url": "http://tiny-rick.tk/api/episode/1",
      "created": "2017-11-10T12:56:33.798Z"
    },
    // ...
  ]
}
```

### Get a single episode
You can get a single episode by adding the `id` as a parameter: `/episode/28`
```
http://tiny-rick.tk/api/episode/28
```
```js
{
  "id": 28,
  "name": "The Ricklantis Mixup",
  "air_date": "September 10, 2017",
  "episode": "S03E07",
  "characters": [
    "http://tiny-rick.tk/api/character/1",
    "http://tiny-rick.tk/api/character/2",
    // ...
  ],
  "url": "http://tiny-rick.tk/api/episode/28",
  "created": "2017-11-10T12:56:36.618Z"
}
```

### Get multiple episodes
You can get multiple episodes by adding an array of `ids` as parameter: `/episode/[1,2,3]` or `/episode/1,2,3`
```
http://tiny-rick.tk/api/episode/10,28
```
```js
[
  {
    "id": 10,
    "name": "Close Rick-counters of the Rick Kind",
    "air_date": "April 7, 2014",
    "episode": "S01E10",
    "characters": [
      "http://tiny-rick.tk/api/character/1",
      "http://tiny-rick.tk/api/character/2",
      // ...
    ],
    "url": "http://tiny-rick.tk/api/episode/10",
    "created": "2017-11-10T12:56:34.747Z"
  },
  {
    "id": 28,
    "name": "The Ricklantis Mixup",
    "air_date": "September 10, 2017",
    "episode": "S03E07",
    "characters": [
      "http://tiny-rick.tk/api/character/1",
      "http://tiny-rick.tk/api/character/2",
      // ...
    ],
    "url": "http://tiny-rick.tk/api/episode/28",
    "created": "2017-11-10T12:56:36.618Z"
  }
]
```

### Filter episodes
Available parameters:
- `name`: filter by the given name.
- `episode`: filter by the given episode code.

If you want to know how to use queries, check [here](#filter-characters)

## Comments

### Get all comments for the given episode
You can access the list of episodes by using the `/episode/:id/comments` endpoint.

```
http://tiny-rick.tk/api/episode/1/comments
```
```js
{
  "info": {
    "count": 31,
    "pages": 2,
    "next": "http://tiny-rick.tk/api/episode/1/comments?page=2",
    "prev": ""
  },
  "results": [
    {
      "id": 1,
      "author": "Bob",
      "content": "Awesome!",
      "episode_id": 1,
      "created": "2017-11-10T12:56:33.798Z"
    },
    // ...
  ]
}
```

### Post new comment for the given episode
You can post new comment using `/episode/:id/comments` endpoint.

```
POST http://tiny-rick.tk/api/episode/1/comments
```
Example request payload:
```js
{
  content: 'Awesome!',
  author: 'Bob',
}
```
Example response:
```js
{
  "id": 1,
  "author": "Bob",
  "content": "Awesome!",
  "episode_id": 1,
  "created": "2017-11-10T12:56:33.798Z"
}
```

## Quiz Questions
There is a total of 3 questions for the quiz.

### Episode schema
|Key|Type|Description|
|---|---|---|
|id|int|The id of the question.
|type|string|The type of the question (text / select).
|value|string|The question.
|options|array ({ id, value })|Options for question of `select` type

### Get all questions
You can access the list of all questions by using the `/questions` endpoint.

```
http://tiny-rick.tk/api/questions/
```
```js
[
  {
    id: 1,
    type: 'text',
    value: 'How old are you?',
  },
  {
    id: 2,
    type: 'select',
    value: 'How much commercial experience do you have with programming?',
    options: [
      { id: 1, value: 'not at all' },
      { id: 2, value: 'less than 1 year' },
      { id: 3, value: '1-3 years' },
      { id: 4, value: 'more than 3 years' },
    ],
  },
  {
    id: 3,
    type: 'text',
    value: 'How is your planet called?',
  },
]
```

### Post quiz answers
You can post quiz answers using `POST /quiz` endpoint.

```
POST http://tiny-rick.tk/api/quiz/
```
Example request body:
```js
[
  {
    questionId: 1,
    answer: 20,
  },
  {
    questionId: 2,
    answer: 2,
  },
  {
    questionId: 1,
    answer: 'Earth',
  },
]
```

Example response:
```js
{
  name: 'Rick',
  image: 'avatar.jpg'
}
```


## Libraries
Here you will find a list of helper libraries to use the Rick and Morty API with your preferred language.   

#### Elixir
- [ExShla - The Rick and Morty API Wrapper](https://github.com/l1h3r/ex_shla) by [l1h3r](https://github.com/l1h3r)

#### GraphQL
- [The Rick and Morty GraphQL API](https://github.com/arthurdenner/rick-and-morty-graphql-api) by [Arthur Denner](https://github.com/arthurdenner)

#### JavaScript
- [The Rick and Morty API Node client](https://github.com/afuh/rick-and-morty-api-node) by [Simple Rick](https://github.com/afuh)

#### .NET
- [RickAndMorty.Net.Api](https://github.com/Carlj28/RickAndMorty.Net.Api) by [Carlj28](https://github.com/Carlj28)

#### Python
- [Python implementation for the Rick and Morty API](https://github.com/curiousrohan/ramapi) by [Rohan Hazra](https://github.com/curiousrohan)

#### Ruby
- [The Rick and Morty API Gem](https://github.com/spielhoelle/rick-and-morty-gem) by [Tommy Spielhoelle](https://github.com/spielhoelle)

---

## Run the API locally

Assuming that [MongoDB](https://docs.mongodb.com/manual/tutorial/manage-mongodb-processes/) is running locally.

```
git clone https://github.com/afuh/rick-and-morty-api.git`
cd rick-and-morty-api
npm install
npm run data
npm run dev
```
Use to http://localhost:8080/api to access the API.

---

[go to top](https://github.com/afuh/rick-and-morty-api/tree/develop#the-rick-and-morty-api)
