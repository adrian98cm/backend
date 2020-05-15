"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("babel-polyfill");

var _chalk = _interopRequireDefault(require("chalk"));

var _mongodb = require("mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Query = {
  test: function test() {
    console.log(_chalk["default"].blue("------------------------"));
    console.log(_chalk["default"].blue("REQUEST MADE TO 'test'"));
    console.log(_chalk["default"].blue("------------------------"));
    return 'ok';
  },
  getEntradas: function () {
    var _getEntradas = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(parent, args, ctx, info) {
      var client, pubsub, db, usersCollection, entradasCollection, email, token, user, entradas;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              client = ctx.client, pubsub = ctx.pubsub;
              db = client.db("gimnasio");
              usersCollection = db.collection('users');
              entradasCollection = db.collection('entradas');
              email = args.email, token = args.token;
              _context.next = 7;
              return usersCollection.findOne({
                email: email
              });

            case 7:
              user = _context.sent;

              if (!(user && user.token === token)) {
                _context.next = 14;
                break;
              }

              _context.next = 11;
              return entradasCollection.find().toArray();

            case 11:
              entradas = _context.sent;
              _context.next = 15;
              break;

            case 14:
              throw new Error("Not logged");

            case 15:
              return _context.abrupt("return", entradas);

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getEntradas(_x, _x2, _x3, _x4) {
      return _getEntradas.apply(this, arguments);
    }

    return getEntradas;
  }(),
  getEntradasAutor: function () {
    var _getEntradasAutor = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(parent, args, ctx, info) {
      var client, pubsub, db, usersCollection, entradasCollection, email, token, user, entradas;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              client = ctx.client, pubsub = ctx.pubsub;
              db = client.db("gimnasio");
              usersCollection = db.collection('users');
              entradasCollection = db.collection('entradas');
              email = args.email, token = args.token;
              _context2.next = 7;
              return usersCollection.findOne({
                email: email
              });

            case 7:
              user = _context2.sent;

              if (!(user && user.token === token)) {
                _context2.next = 14;
                break;
              }

              _context2.next = 11;
              return entradasCollection.find({
                autor: (0, _mongodb.ObjectID)(user._id)
              }).toArray();

            case 11:
              entradas = _context2.sent;
              _context2.next = 15;
              break;

            case 14:
              throw new Error("Not logged");

            case 15:
              return _context2.abrupt("return", entradas);

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function getEntradasAutor(_x5, _x6, _x7, _x8) {
      return _getEntradasAutor.apply(this, arguments);
    }

    return getEntradasAutor;
  }(),
  getEntradaEspecifica: function () {
    var _getEntradaEspecifica = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(parent, args, ctx, info) {
      var client, pubsub, db, usersCollection, entradasCollection, titulo, email, token, user, entradas;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              client = ctx.client, pubsub = ctx.pubsub;
              db = client.db("gimnasio");
              usersCollection = db.collection('users');
              entradasCollection = db.collection('entradas');
              titulo = args.titulo, email = args.email, token = args.token;
              _context3.next = 7;
              return usersCollection.findOne({
                email: email
              });

            case 7:
              user = _context3.sent;

              if (!(user && user.token === token)) {
                _context3.next = 14;
                break;
              }

              _context3.next = 11;
              return entradasCollection.find({
                titulo: titulo
              }).toArray();

            case 11:
              entradas = _context3.sent;
              _context3.next = 15;
              break;

            case 14:
              throw new Error("Not logged");

            case 15:
              return _context3.abrupt("return", entradas);

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function getEntradaEspecifica(_x9, _x10, _x11, _x12) {
      return _getEntradaEspecifica.apply(this, arguments);
    }

    return getEntradaEspecifica;
  }()
};
exports["default"] = Query;