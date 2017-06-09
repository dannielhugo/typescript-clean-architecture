"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_1 = require("../core/account");
class AccountService {
    constructor() {
        this.accounts = [
            new account_1.Account(1, 1000),
            new account_1.Account(2, 0),
            new account_1.Account(3, 10020)
        ];
    }
    getAll() {
        return this.accounts.slice();
    }
}
exports.AccountService = AccountService;
