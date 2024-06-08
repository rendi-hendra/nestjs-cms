# Next
# Posts API Spec

## Create Posts

Endpoint : POST /api/posts

Headers :

- Authorization: token

Request Body :

```json
{
  "title": "Rendi Hendra",
  "content": "Syahputra"
}
```

Response Body :

```json
{
  "data": {
    "id": 1,
    "title": "Rendi Hendra",
    "content": "Syahputra",
    "author": "Rendi"
  }
}
```

## Get Posts

Endpoint : GET /api/posts/:postsId

Headers :

- Authorization: token

Response Body :

```json
{
  "data": {
    "id": 1,
    "title": "Rendi Hendra",
    "content": "Syahputra",
    "author": "Rendi"
  }
}
```

## Update Posts

Endpoint : PUT /api/posts/:postsId

Headers :

- Authorization: token

Request Body :

```json
{
  "title": "Rendi Hendra",
  "content": "Syahputra",
  "author": "Rendi"
}
```

Response Body :

```json
{
  "data": {
    "id": 1,
    "title": "Rendi Hendra",
    "content": "Syahputra",
    "author": "Rendi"
  }
}
```

## Remove Posts

Endpoint : DELETE /api/posts/:postsId

Headers :

- Authorization: token

Response Body :

```json
{
  "data": true
}
```

## Search Posts

Endpoint : GET /api/posts

Headers :

- Authorization: token

Query Params :

- title: string, posts title, optional
- author: string, posts author, optional
- page: number, default 1
- size: number, default 10

Response Body :

```json
{
  "data": [
    {
      "id": 1,
      "title": "Rendi Hendra",
      "content": "Syahputra",
      "author": "Rendi"
    },
    {
      "id": 2,
      "title": "Rendi Hendra",
      "content": "Syahputra",
      "author": "Rendi"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```
