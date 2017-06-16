## API Delivery

These are the endpoints available for account management so far:

### CREATE A NEW ACCOUNT

```
POST http://localhost:4200/accounts
Content-type: application/json

{
    "owner": "Gorbadock Oldbuck",
    "balance": 100
}
```

---

### LIST ALL ACCOUNTS

```
GET http://localhost:4200/accounts
Content-type: application/json
```
