## API Delivery

These are the endpoints available for account management so far:

### CREATE NEW USER

```
POST http://localhost:4422/users
Content-type: application/json

{
    "first_name": "Gorbadock",
    "last_name": "Oldbuck",
    "document": "00000100"
}
```

### ADD AN ACCOUNT TO USER

```
POST http://localhost:4422/users/1/accounts
Content-type: application/json

{
    "description": "Gorbadock Oldbuck Personal ACC",
    "balance": 100
}
```

---

### LIST ALL ACCOUNTS

```
GET http://localhost:4422/users/1/accounts
Content-type: application/json
```

---

### ADD BALANCE TO ACCOUNT

```
PUT http://localhost:4422/users/1/accounts/1/balance
Content-type: application/json

{
    "amount": 100
}
```


