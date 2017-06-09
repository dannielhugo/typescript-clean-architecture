"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const awilix_1 = require("awilix");
class DependencyResolver {
    static register() {
        const container = awilix_1.createContainer();
        container.loadModules(['services/**/*.js'], {
            formatName: 'camelCase',
            registrationOptions: {
                lifetime: awilix_1.Lifetime.SCOPED
            }
        });
        return container;
    }
}
exports.DependencyResolver = DependencyResolver;
