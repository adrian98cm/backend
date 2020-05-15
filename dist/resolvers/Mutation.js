"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("babel-polyfill");

var _chalk = _interopRequireDefault(require("chalk"));

var _mongodb = require("mongodb");

var _graphqlYoga = require("graphql-yoga");

var _uuid = _interopRequireDefault(require("uuid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Mutation = {
  addUser: function () {
    var _addUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(parent, args, ctx, info) {
      var client, db, collection, email, password, autor, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              client = ctx.client;
              db = client.db("gimnasio");
              collection = db.collection('users');
              email = args.email, password = args.password, autor = args.autor;
              _context.next = 6;
              return collection.findOne({
                email: email
              });

            case 6:
              if (!_context.sent) {
                _context.next = 8;
                break;
              }

              throw new Error("".concat(email, " already exists"));

            case 8:
              _context.next = 10;
              return collection.insertOne({
                email: email,
                password: password,
                autor: autor //Variable que indica si es autor o no

              });

            case 10:
              result = _context.sent;
              return _context.abrupt("return", result.ops[0]);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function addUser(_x, _x2, _x3, _x4) {
      return _addUser.apply(this, arguments);
    }

    return addUser;
  }(),
  login: function () {
    var _login = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(parent, args, ctx, info) {
      var client, db, collection, email, password, token, user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              client = ctx.client;
              db = client.db("gimnasio");
              collection = db.collection('users');
              email = args.email, password = args.password;
              token = _uuid["default"].v4();
              _context2.next = 7;
              return collection.findOne({
                email: email
              });

            case 7:
              user = _context2.sent;

              if (!(user && user.password === password)) {
                _context2.next = 13;
                break;
              }

              _context2.next = 11;
              return collection.updateOne({
                _id: (0, _mongodb.ObjectID)(user._id)
              }, {
                $set: {
                  token: token
                }
              });

            case 11:
              _context2.next = 14;
              break;

            case 13:
              throw new Error("Email or password incorrect");

            case 14:
              setTimeout(function () {
                collection.findOneAndUpdate({
                  email: email
                }, {
                  $set: {
                    token: null
                  }
                });
              }, 1800000); //Nuestra sesión se termina automáticamente pasados 30 minutos

              return _context2.abrupt("return", token);

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function login(_x5, _x6, _x7, _x8) {
      return _login.apply(this, arguments);
    }

    return login;
  }(),
  logout: function () {
    var _logout = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(parent, args, ctx, info) {
      var client, db, collection, email, token, user;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              client = ctx.client;
              db = client.db("gimnasio");
              collection = db.collection('users');
              email = args.email, token = args.token;
              _context3.next = 6;
              return collection.findOneAndUpdate({
                email: email
              }, {
                $set: {
                  token: null
                }
              });

            case 6:
              user = _context3.sent;

              if (user) {
                _context3.next = 9;
                break;
              }

              throw new Error('Not logout');

            case 9:
              return _context3.abrupt("return", token);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function logout(_x9, _x10, _x11, _x12) {
      return _logout.apply(this, arguments);
    }

    return logout;
  }(),
  addEntrada: function () {
    var _addEntrada = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(parent, args, ctx, info) {
      var client, pubsub, db, usersCollection, entradasCollection, titulo, descripcion, email, token, user, result;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              client = ctx.client, pubsub = ctx.pubsub;
              db = client.db("gimnasio");
              usersCollection = db.collection('users');
              entradasCollection = db.collection('entradas');
              titulo = args.titulo, descripcion = args.descripcion, email = args.email, token = args.token;
              _context4.next = 7;
              return usersCollection.findOne({
                email: email
              });

            case 7:
              user = _context4.sent;

              if (!(user.autor === 1)) {
                _context4.next = 18;
                break;
              }

              if (!(user && user.token === token)) {
                _context4.next = 15;
                break;
              }

              _context4.next = 12;
              return entradasCollection.insertOne({
                titulo: titulo,
                descripcion: descripcion,
                autor: (0, _mongodb.ObjectID)(user._id)
              });

            case 12:
              result = _context4.sent;
              _context4.next = 16;
              break;

            case 15:
              throw new Error("Session caducated, login again");

            case 16:
              _context4.next = 19;
              break;

            case 18:
              throw new Error("This user is not Author");

            case 19:
              pubsub.publish(user._id, {
                authorSubscribe: {
                  _id: result.ops[0]._id,
                  titulo: titulo,
                  descripcion: descripcion,
                  autor: user._id
                }
              });
              return _context4.abrupt("return", {
                _id: result.ops[0]._id,
                titulo: titulo,
                descripcion: descripcion,
                autor: user._id
              });

            case 21:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function addEntrada(_x13, _x14, _x15, _x16) {
      return _addEntrada.apply(this, arguments);
    }

    return addEntrada;
  }(),
  removeUser: function () {
    var _removeUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(parent, args, ctx, info) {
      var client, db, usersCollection, entradasCollection, email, token, user;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              client = ctx.client;
              db = client.db("gimnasio");
              usersCollection = db.collection('users');
              entradasCollection = db.collection('entradas');
              email = args.email, token = args.token;
              _context5.next = 7;
              return usersCollection.findOne({
                email: email
              });

            case 7:
              user = _context5.sent;

              if (!(user && user.token === token)) {
                _context5.next = 15;
                break;
              }

              _context5.next = 11;
              return entradasCollection.deleteMany({
                autor: (0, _mongodb.ObjectID)(user._id)
              });

            case 11:
              _context5.next = 13;
              return usersCollection.deleteOne({
                _id: (0, _mongodb.ObjectID)(user._id)
              });

            case 13:
              _context5.next = 16;
              break;

            case 15:
              throw new Error("User doesn't exists");

            case 16:
              return _context5.abrupt("return", user);

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function removeUser(_x17, _x18, _x19, _x20) {
      return _removeUser.apply(this, arguments);
    }

    return removeUser;
  }(),
  deleteEntrada: function () {
    var _deleteEntrada = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(parent, args, ctx, info) {
      var client, db, usersCollection, entradasCollection, titulo, email, token, user, entrada;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              client = ctx.client;
              db = client.db("gimnasio");
              usersCollection = db.collection('users');
              entradasCollection = db.collection('entradas');
              titulo = args.titulo, email = args.email, token = args.token;
              _context6.next = 7;
              return usersCollection.findOne({
                email: email
              });

            case 7:
              user = _context6.sent;
              _context6.next = 10;
              return entradasCollection.findOne({
                titulo: titulo
              });

            case 10:
              entrada = _context6.sent;

              if (!(user && user.token === token)) {
                _context6.next = 20;
                break;
              }

              if (!(entrada.autor === user._id)) {
                _context6.next = 17;
                break;
              }

              _context6.next = 15;
              return entradasCollection.deleteOne({
                _id: entrada._id
              });

            case 15:
              _context6.next = 18;
              break;

            case 17:
              throw new Error("La entrada no pertenece al usuario");

            case 18:
              _context6.next = 21;
              break;

            case 20:
              throw new Error("Not logged");

            case 21:
              return _context6.abrupt("return", entrada);

            case 22:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function deleteEntrada(_x21, _x22, _x23, _x24) {
      return _deleteEntrada.apply(this, arguments);
    }

    return deleteEntrada;
  }()
};
exports["default"] = Mutation;