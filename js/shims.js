// Basic custom shims. Use this as a last resort only - es6 shim libraries should take care of this.
// The nodelist iterator; so we can for .. of children
if (!NodeList.prototype[Symbol.iterator]) NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
if (!HTMLCollection.prototype[Symbol.iterator]) HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
