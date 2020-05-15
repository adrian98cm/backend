"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("babel-polyfill");

var _chalk = _interopRequireDefault(require("chalk"));

var _mongodb = require("mongodb");

var _graphqlYoga = require("graphql-yoga");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Entrada = {
  autor: function () {
    var _autor = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(parent, args, ctx, info) {
      var client, db, collection, autor;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              client = ctx.client;
              db = client.db("gimnasio");
              collection = db.collection('users');
              _context.next = 5;
              return collection.findOne({
                _id: parent.autor
              });

            case 5:
              autor = _context.sent;
              return _context.abrupt("return", autor);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function autor(_x, _x2, _x3, _x4) {
      return _autor.apply(this, arguments);
    }

    return autor;
  }()
};
exports["default"] = Entrada;