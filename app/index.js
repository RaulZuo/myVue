/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Vue = __webpack_require__(1);

	var _Vue2 = _interopRequireDefault(_Vue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var demo = new _Vue2.default({
	    data: {
	        'a': {
	            'ab': {
	                'c': 'C'
	            }
	        },
	        'b': [{ 'bb': 'BB' }, { 'bbb': 'BBB' }],
	        'c': 'C'
	    }
	});
	demo.$watch('c', function () {
	    return console.log('c is changed');
	});
	// get value
	demo.$watch('a.ab', function () {
	    return console.log('a.ab is changed');
	});
	demo.$watch('b', function () {
	    return console.log('b is changed');
	});
	// get value
	demo.c = 'CCC';
	// new value setted
	// get value
	// c is changed
	demo.a.ab = 'AB';
	// new value setted
	// get value
	demo.b.push({ 'bbbb': 'BBBB' });

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Observer = __webpack_require__(2);

	var _Observer2 = _interopRequireDefault(_Observer);

	var _Watcher = __webpack_require__(4);

	var _Watcher2 = _interopRequireDefault(_Watcher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Vue = function () {
	    function Vue() {
	        var _this = this;

	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, Vue);

	        // 简化了$options的处理
	        this.$options = options;
	        // 简化了对data的处理
	        var data = this._data = this.$options.data;
	        // 将所有data最外层属性代理到Vue实例上
	        Object.keys(data).forEach(function (key) {
	            return _this._proxy(key);
	        });
	        // 监听数据
	        (0, _Observer.observe)(data);
	    }
	    // 对外暴露调用订阅者的接口，内部主要在指令中使用订阅者


	    _createClass(Vue, [{
	        key: '$watch',
	        value: function $watch(expOrFn, cb) {
	            new _Watcher2.default(this, expOrFn, cb);
	        }
	    }, {
	        key: '_proxy',
	        value: function _proxy(key) {
	            var _this2 = this;

	            Object.defineProperty(this, key, {
	                configurable: true,
	                enumerable: true,
	                get: function get() {
	                    return _this2._data[key];
	                },
	                set: function set(val) {
	                    _this2._data[key] = val;
	                }
	            });
	        }
	    }]);

	    return Vue;
	}();

	exports.default = Vue;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Dep用于订阅者的存储和收集，将在下面实现


	exports.defineReactive = defineReactive;
	exports.observe = observe;

	var _Dep = __webpack_require__(3);

	var _Dep2 = _interopRequireDefault(_Dep);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Observer类用于给data属性添加set&get方法
	var Observer = function () {
	    function Observer(value) {
	        _classCallCheck(this, Observer);

	        this.value = value;
	        this.walk(value);
	    }

	    _createClass(Observer, [{
	        key: 'walk',
	        value: function walk(value) {
	            var _this = this;

	            Object.keys(value).forEach(function (key) {
	                return _this.convert(key, value[key]);
	            });
	        }
	    }, {
	        key: 'convert',
	        value: function convert(key, val) {
	            defineReactive(this.value, key, val);
	        }
	    }]);

	    return Observer;
	}();

	exports.default = Observer;
	function defineReactive(obj, key, val) {
	    var dep = new _Dep2.default();
	    // 给当前属性的值添加监听
	    // console.log(key, val);
	    var chlidOb = observe(val);
	    Object.defineProperty(obj, key, {
	        enumerable: true,
	        configurable: true,
	        get: function get() {
	            console.log('get value');
	            // 如果Dep类存在target属性，将其添加到dep实例的subs数组中
	            // target指向一个Watcher实例，每个Watcher都是一个订阅者
	            // Watcher实例在实例化过程中，会读取data中的某个属性，从而触发当前get方法
	            // 此处的问题是：并不是每次Dep.target有值时都需要添加到订阅者管理员中去管理，需要对订阅者去重，不影响整体思路，不去管它
	            if (_Dep2.default.target) {
	                dep.addSub(_Dep2.default.target);
	            }
	            return val;
	        },
	        set: function set(newVal) {
	            console.log('new value seted');
	            if (val === newVal) return;
	            val = newVal;
	            // 对新值进行监听
	            chlidOb = observe(newVal);
	            // 通知所有订阅者，数值被改变了
	            dep.notify();
	        }
	    });
	}
	function observe(value) {
	    // 当值不存在，或者不是复杂数据类型时，不再需要继续深入监听
	    if (!value || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
	        return;
	    }
	    return new Observer(value);
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Dep = function () {
	    function Dep() {
	        _classCallCheck(this, Dep);

	        this.subs = [];
	    }

	    _createClass(Dep, [{
	        key: "addSub",
	        value: function addSub(sub) {
	            this.subs.push(sub);
	        }
	    }, {
	        key: "notify",
	        value: function notify() {
	            // 通知所有的订阅者(Watcher)，触发订阅者的相应逻辑处理
	            this.subs.forEach(function (sub) {
	                return sub.update();
	            });
	        }
	    }]);

	    return Dep;
	}();

	exports.default = Dep;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Dep = __webpack_require__(3);

	var _Dep2 = _interopRequireDefault(_Dep);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Watcher = function () {
	    function Watcher(vm, expOrFn, cb) {
	        _classCallCheck(this, Watcher);

	        this.vm = vm; // 被订阅的数据一定来自于当前Vue实例
	        this.cb = cb; // 当数据更新时想要做的事情
	        this.expOrFn = expOrFn; // 被订阅的数据
	        this.val = this.get(); // 维护更新之前的数据
	    }
	    // 对外暴露的接口，用于在订阅的数据被更新时，由订阅者管理员(Dep)调用


	    _createClass(Watcher, [{
	        key: 'update',
	        value: function update() {
	            this.run();
	        }
	    }, {
	        key: 'run',
	        value: function run() {
	            var val = this.get();
	            if (val !== this.val) {
	                this.val = val;
	                this.cb.call(this.vm);
	            }
	        }
	    }, {
	        key: 'get',
	        value: function get() {
	            // 当前订阅者(Watcher)读取被订阅数据的最新更新后的值时，通知订阅者管理员收集当前订阅者
	            _Dep2.default.target = this;
	            var val = this.vm._data[this.expOrFn];
	            // console.log(this.expOrFn, this.vm._data[this.expOrFn])
	            // 置空，用于下一个Watcher使用
	            _Dep2.default.target = null;
	            return val;
	        }
	    }]);

	    return Watcher;
	}();

	exports.default = Watcher;

/***/ }
/******/ ]);