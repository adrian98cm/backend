"use strict";

require("babel-polyfill");

var _chalk = _interopRequireDefault(require("chalk"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _graphqlYoga = require("graphql-yoga");

var _mongodb = require("mongodb");

var _Query = _interopRequireDefault(require("./resolvers/Query"));

var _Mutation = _interopRequireDefault(require("./resolvers/Mutation"));

var _User = _interopRequireDefault(require("./resolvers/User"));

var _Entrada = _interopRequireDefault(require("./resolvers/Entrada"));

var _Subscription = _interopRequireDefault(require("./resolvers/Subscription"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var usr = "adrian";
var pwd = "12345";
var url = "server1-zlr9p.mongodb.net/test?retryWrites=true&w=majority";
/**
 * Connects to MongoDB Server and returns connected client
 * @param {string} usr MongoDB Server user
 * @param {string} pwd MongoDB Server pwd
 * @param {string} url MongoDB Server url
 */

var connectToDb =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(usr, pwd, url) {
    var uri, client;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            uri = "mongodb+srv://".concat(usr, ":").concat(pwd, "@").concat(url);
            client = new _mongodb.MongoClient(uri, {
              useNewUrlParser: true,
              useUnifiedTopology: true
            });
            _context.next = 4;
            return client.connect();

          case 4:
            return _context.abrupt("return", client);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function connectToDb(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Starts GraphQL server, with MongoDB Client in context Object
 * @param {client: MongoClient} context The context for GraphQL Server -> MongoDB Client
 */


var runGraphQLServer = function runGraphQLServer(context, pubsub, a) {
  var resolvers = {
    Query: _Query["default"],
    Mutation: _Mutation["default"],
    User: _User["default"],
    Entrada: _Entrada["default"],
    Subscription: _Subscription["default"]
  };
  var server = new _graphqlYoga.GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: resolvers,
    context: context
  });
  var options = {
    port: 8000
  };

  try {
    server.start(options, function (_ref2) {
      var port = _ref2.port;
      console.log(_chalk["default"].bgGreen.black("\n--------------------------"));
      console.log(_chalk["default"].bgGreen.black("Server started PORT: ".concat(port, ".")));
      console.log(_chalk["default"].bgGreen.black("--------------------------\n"));
    });
  } catch (e) {
    console.info(e);
    server.close();
  }
};

var runApp =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var client, pubsub;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return connectToDb(usr, pwd, url);

          case 2:
            client = _context2.sent;
            pubsub = new _graphqlYoga.PubSub();
            console.log(_chalk["default"].bgYellow.black("\nConnect to Mongo DB"));

            try {
              runGraphQLServer({
                client: client,
                pubsub: pubsub
              });
            } catch (e) {
              console.info(e);
              client.close();
            }

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function runApp() {
    return _ref3.apply(this, arguments);
  };
}();

runApp();