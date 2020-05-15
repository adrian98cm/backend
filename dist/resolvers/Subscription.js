"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var Subscription = {
  authorSubscribe: {
    subscribe: function subscribe(parent, args, ctx, info) {
      var id = args.id;
      var pubsub = ctx.pubsub;
      return pubsub.asyncIterator(id);
    }
  }
};
exports["default"] = Subscription;