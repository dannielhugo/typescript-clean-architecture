export default class UtilPlugin {
  constructor(private lodash) { }

  _map(collection, iteratee) {
    return this.lodash.map(collection, iteratee);
  }
}