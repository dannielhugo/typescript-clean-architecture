export default class UtilPlugin {
  constructor(private lodash) { }

  mapCollection(collection, iteratee) {
    return this.lodash.map(collection, iteratee);
  }
}