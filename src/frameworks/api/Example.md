## Create first user

```
POST http://localhost:3000/user HTTP/1.1
content-type: application/json

{
  "firstname": "Megaman",
  "lastname": "Maverick Hunter B",
  "email": "megaman@mega.com",
  "username": "megamanx",
  "password": "passwd"
}
```

## Create second user

```
POST http://localhost:3000/user HTTP/1.1
content-type: application/json

{
  "firstname": "Zero",
  "lastname": "Maverick Hunter S",
  "email": "zero@mega.com",
  "username": "zero",
  "password": "passwd"
}
```

## First deposit

```
POST http://localhost:3000/deposit HTTP/1.1
content-type: application/json

{
  "userId": 1,
  "value": 100
}
```

## Second deposit

```
POST http://localhost:3000/deposit HTTP/1.1
content-type: application/json

{
  "userId": 2,
  "value": 200
}
```

## Transfer

```
POST http://localhost:3000/transfer HTTP/1.1
content-type: application/json

{
  "from": 1,
  "to": 2,
  "value": 50
}
```
