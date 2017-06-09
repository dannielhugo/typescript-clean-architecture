"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountBusiness {
    constructor(accountService) {
        this.accountService = accountService;
    }
    getAll() {
        return this.accountService.getAll();
    }
}
exports.AccountBusiness = AccountBusiness;
