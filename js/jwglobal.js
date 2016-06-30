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

	__webpack_require__(1);
	__webpack_require__(292);
	__webpack_require__(293);
	__webpack_require__(298);
	module.exports = __webpack_require__(299);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/* eslint max-len: 0 */

	"use strict";

	__webpack_require__(2);

	__webpack_require__(287);

	// Should be removed in the next major release:

	__webpack_require__(289);

	if (global._babelPolyfill) {
	  throw new Error("only one instance of babel-polyfill is allowed");
	}
	global._babelPolyfill = true;

	var DEFINE_PROPERTY = "defineProperty";
	function define(O, key, value) {
	  O[key] || Object[DEFINE_PROPERTY](O, key, {
	    writable: true,
	    configurable: true,
	    value: value
	  });
	}

	define(String.prototype, "padLeft", "".padStart);
	define(String.prototype, "padRight", "".padEnd);

	"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
	  [][key] && define(Array, key, Function.call.bind([][key]));
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	__webpack_require__(50);
	__webpack_require__(51);
	__webpack_require__(52);
	__webpack_require__(53);
	__webpack_require__(55);
	__webpack_require__(58);
	__webpack_require__(59);
	__webpack_require__(60);
	__webpack_require__(61);
	__webpack_require__(62);
	__webpack_require__(63);
	__webpack_require__(64);
	__webpack_require__(65);
	__webpack_require__(66);
	__webpack_require__(68);
	__webpack_require__(70);
	__webpack_require__(72);
	__webpack_require__(74);
	__webpack_require__(77);
	__webpack_require__(78);
	__webpack_require__(79);
	__webpack_require__(83);
	__webpack_require__(85);
	__webpack_require__(87);
	__webpack_require__(91);
	__webpack_require__(92);
	__webpack_require__(93);
	__webpack_require__(94);
	__webpack_require__(96);
	__webpack_require__(97);
	__webpack_require__(98);
	__webpack_require__(99);
	__webpack_require__(100);
	__webpack_require__(101);
	__webpack_require__(102);
	__webpack_require__(104);
	__webpack_require__(105);
	__webpack_require__(106);
	__webpack_require__(108);
	__webpack_require__(109);
	__webpack_require__(110);
	__webpack_require__(112);
	__webpack_require__(113);
	__webpack_require__(114);
	__webpack_require__(115);
	__webpack_require__(116);
	__webpack_require__(117);
	__webpack_require__(118);
	__webpack_require__(119);
	__webpack_require__(120);
	__webpack_require__(121);
	__webpack_require__(122);
	__webpack_require__(123);
	__webpack_require__(124);
	__webpack_require__(125);
	__webpack_require__(130);
	__webpack_require__(131);
	__webpack_require__(135);
	__webpack_require__(136);
	__webpack_require__(137);
	__webpack_require__(138);
	__webpack_require__(140);
	__webpack_require__(141);
	__webpack_require__(142);
	__webpack_require__(143);
	__webpack_require__(144);
	__webpack_require__(145);
	__webpack_require__(146);
	__webpack_require__(147);
	__webpack_require__(148);
	__webpack_require__(149);
	__webpack_require__(150);
	__webpack_require__(151);
	__webpack_require__(152);
	__webpack_require__(153);
	__webpack_require__(154);
	__webpack_require__(155);
	__webpack_require__(156);
	__webpack_require__(158);
	__webpack_require__(159);
	__webpack_require__(165);
	__webpack_require__(166);
	__webpack_require__(168);
	__webpack_require__(169);
	__webpack_require__(170);
	__webpack_require__(173);
	__webpack_require__(174);
	__webpack_require__(175);
	__webpack_require__(176);
	__webpack_require__(177);
	__webpack_require__(179);
	__webpack_require__(180);
	__webpack_require__(181);
	__webpack_require__(182);
	__webpack_require__(185);
	__webpack_require__(187);
	__webpack_require__(188);
	__webpack_require__(189);
	__webpack_require__(191);
	__webpack_require__(193);
	__webpack_require__(195);
	__webpack_require__(196);
	__webpack_require__(197);
	__webpack_require__(199);
	__webpack_require__(200);
	__webpack_require__(201);
	__webpack_require__(202);
	__webpack_require__(208);
	__webpack_require__(211);
	__webpack_require__(212);
	__webpack_require__(214);
	__webpack_require__(215);
	__webpack_require__(218);
	__webpack_require__(219);
	__webpack_require__(222);
	__webpack_require__(223);
	__webpack_require__(224);
	__webpack_require__(225);
	__webpack_require__(226);
	__webpack_require__(227);
	__webpack_require__(228);
	__webpack_require__(229);
	__webpack_require__(230);
	__webpack_require__(231);
	__webpack_require__(232);
	__webpack_require__(233);
	__webpack_require__(234);
	__webpack_require__(235);
	__webpack_require__(236);
	__webpack_require__(237);
	__webpack_require__(238);
	__webpack_require__(239);
	__webpack_require__(240);
	__webpack_require__(242);
	__webpack_require__(243);
	__webpack_require__(244);
	__webpack_require__(245);
	__webpack_require__(246);
	__webpack_require__(247);
	__webpack_require__(249);
	__webpack_require__(250);
	__webpack_require__(251);
	__webpack_require__(252);
	__webpack_require__(253);
	__webpack_require__(254);
	__webpack_require__(256);
	__webpack_require__(257);
	__webpack_require__(259);
	__webpack_require__(260);
	__webpack_require__(261);
	__webpack_require__(262);
	__webpack_require__(265);
	__webpack_require__(266);
	__webpack_require__(267);
	__webpack_require__(268);
	__webpack_require__(269);
	__webpack_require__(270);
	__webpack_require__(271);
	__webpack_require__(272);
	__webpack_require__(274);
	__webpack_require__(275);
	__webpack_require__(276);
	__webpack_require__(277);
	__webpack_require__(278);
	__webpack_require__(279);
	__webpack_require__(280);
	__webpack_require__(281);
	__webpack_require__(282);
	__webpack_require__(285);
	__webpack_require__(286);
	module.exports = __webpack_require__(5);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(4)
	  , core           = __webpack_require__(5)
	  , has            = __webpack_require__(6)
	  , DESCRIPTORS    = __webpack_require__(7)
	  , $export        = __webpack_require__(9)
	  , redefine       = __webpack_require__(18)
	  , META           = __webpack_require__(22).KEY
	  , $fails         = __webpack_require__(8)
	  , shared         = __webpack_require__(23)
	  , setToStringTag = __webpack_require__(24)
	  , uid            = __webpack_require__(19)
	  , wks            = __webpack_require__(25)
	  , keyOf          = __webpack_require__(26)
	  , enumKeys       = __webpack_require__(39)
	  , isArray        = __webpack_require__(42)
	  , anObject       = __webpack_require__(12)
	  , toIObject      = __webpack_require__(29)
	  , toPrimitive    = __webpack_require__(16)
	  , createDesc     = __webpack_require__(17)
	  , _create        = __webpack_require__(43)
	  , gOPNExt        = __webpack_require__(46)
	  , $GOPD          = __webpack_require__(48)
	  , $DP            = __webpack_require__(11)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = gOPD(it = toIObject(it), key = toPrimitive(key, true));
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , replacer, $replacer;
	  while(arguments.length > i)args.push(arguments[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var BUGGY_JSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(47).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(41).f  = $propertyIsEnumerable
	  __webpack_require__(40).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(49)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	for(var symbols = (
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; ){
	  var key     = symbols[i++]
	    , Wrapper = core.Symbol
	    , sym     = wks(key);
	  if(!(key in Wrapper))dP(Wrapper, key, {value: USE_NATIVE ? sym : wrap(sym)});
	};

	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	if(!QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild)setter = true;

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || BUGGY_JSON), 'JSON', {stringify: $stringify});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 4 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 5 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.2.2'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 6 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(8)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(4)
	  , core      = __webpack_require__(5)
	  , hide      = __webpack_require__(10)
	  , redefine  = __webpack_require__(18)
	  , ctx       = __webpack_require__(20)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target)redefine(target, key, out, type & $export.U);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(11)
	  , createDesc = __webpack_require__(17);
	module.exports = __webpack_require__(7) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(12)
	  , IE8_DOM_DEFINE = __webpack_require__(14)
	  , toPrimitive    = __webpack_require__(16)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(7) && !__webpack_require__(8)(function(){
	  return Object.defineProperty(__webpack_require__(15)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13)
	  , document = __webpack_require__(4).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(13);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(4)
	  , hide      = __webpack_require__(10)
	  , has       = __webpack_require__(6)
	  , SRC       = __webpack_require__(19)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);

	__webpack_require__(5).inspectSource = function(it){
	  return $toString.call(it);
	};

	(module.exports = function(O, key, val, safe){
	  var isFunction = typeof val == 'function';
	  if(isFunction)has(val, 'name') || hide(val, 'name', key);
	  if(O[key] === val)return;
	  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe){
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if(O[key])O[key] = val;
	      else hide(O, key, val);
	    }
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 19 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(21);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(19)('meta')
	  , isObject = __webpack_require__(13)
	  , has      = __webpack_require__(6)
	  , setDesc  = __webpack_require__(11).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(8)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(4)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(11).f
	  , has = __webpack_require__(6)
	  , TAG = __webpack_require__(25)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(23)('wks')
	  , uid        = __webpack_require__(19)
	  , Symbol     = __webpack_require__(4).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(27)
	  , toIObject = __webpack_require__(29);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(28)
	  , enumBugKeys = __webpack_require__(38);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(6)
	  , toIObject    = __webpack_require__(29)
	  , arrayIndexOf = __webpack_require__(33)(false)
	  , IE_PROTO     = __webpack_require__(37)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(30)
	  , defined = __webpack_require__(32);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(31);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(29)
	  , toLength  = __webpack_require__(34)
	  , toIndex   = __webpack_require__(36);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(35)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(35)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(23)('keys')
	  , uid    = __webpack_require__(19);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(27)
	  , gOPS    = __webpack_require__(40)
	  , pIE     = __webpack_require__(41);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 41 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(31);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(12)
	  , dPs         = __webpack_require__(44)
	  , enumBugKeys = __webpack_require__(38)
	  , IE_PROTO    = __webpack_require__(37)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(15)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(45).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(11)
	  , anObject = __webpack_require__(12)
	  , getKeys  = __webpack_require__(27);

	module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4).document && document.documentElement;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(29)
	  , gOPN      = __webpack_require__(47).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(28)
	  , hiddenKeys = __webpack_require__(38).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(41)
	  , createDesc     = __webpack_require__(17)
	  , toIObject      = __webpack_require__(29)
	  , toPrimitive    = __webpack_require__(16)
	  , has            = __webpack_require__(6)
	  , IE8_DOM_DEFINE = __webpack_require__(14)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(9)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(43)});

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(9);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(7), 'Object', {defineProperty: __webpack_require__(11).f});

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(9);
	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	$export($export.S + $export.F * !__webpack_require__(7), 'Object', {defineProperties: __webpack_require__(44)});

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject                 = __webpack_require__(29)
	  , $getOwnPropertyDescriptor = __webpack_require__(48).f;

	__webpack_require__(54)('getOwnPropertyDescriptor', function(){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(9)
	  , core    = __webpack_require__(5)
	  , fails   = __webpack_require__(8);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(56)
	  , $getPrototypeOf = __webpack_require__(57);

	__webpack_require__(54)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(32);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(6)
	  , toObject    = __webpack_require__(56)
	  , IE_PROTO    = __webpack_require__(37)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(56)
	  , $keys    = __webpack_require__(27);

	__webpack_require__(54)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(54)('getOwnPropertyNames', function(){
	  return __webpack_require__(46).f;
	});

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(13)
	  , meta     = __webpack_require__(22).onFreeze;

	__webpack_require__(54)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.17 Object.seal(O)
	var isObject = __webpack_require__(13)
	  , meta     = __webpack_require__(22).onFreeze;

	__webpack_require__(54)('seal', function($seal){
	  return function seal(it){
	    return $seal && isObject(it) ? $seal(meta(it)) : it;
	  };
	});

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.15 Object.preventExtensions(O)
	var isObject = __webpack_require__(13)
	  , meta     = __webpack_require__(22).onFreeze;

	__webpack_require__(54)('preventExtensions', function($preventExtensions){
	  return function preventExtensions(it){
	    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
	  };
	});

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.12 Object.isFrozen(O)
	var isObject = __webpack_require__(13);

	__webpack_require__(54)('isFrozen', function($isFrozen){
	  return function isFrozen(it){
	    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.13 Object.isSealed(O)
	var isObject = __webpack_require__(13);

	__webpack_require__(54)('isSealed', function($isSealed){
	  return function isSealed(it){
	    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.11 Object.isExtensible(O)
	var isObject = __webpack_require__(13);

	__webpack_require__(54)('isExtensible', function($isExtensible){
	  return function isExtensible(it){
	    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(9);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(67)});

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(27)
	  , gOPS     = __webpack_require__(40)
	  , pIE      = __webpack_require__(41)
	  , toObject = __webpack_require__(56)
	  , IObject  = __webpack_require__(30)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(8)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	var $export = __webpack_require__(9);
	$export($export.S, 'Object', {is: __webpack_require__(69)});

/***/ },
/* 69 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(9);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(71).set});

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(13)
	  , anObject = __webpack_require__(12);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(20)(Function.call, __webpack_require__(48).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var classof = __webpack_require__(73)
	  , test    = {};
	test[__webpack_require__(25)('toStringTag')] = 'z';
	if(test + '' != '[object z]'){
	  __webpack_require__(18)(Object.prototype, 'toString', function toString(){
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(31)
	  , TAG = __webpack_require__(25)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	var $export = __webpack_require__(9);

	$export($export.P, 'Function', {bind: __webpack_require__(75)});

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var aFunction  = __webpack_require__(21)
	  , isObject   = __webpack_require__(13)
	  , invoke     = __webpack_require__(76)
	  , arraySlice = [].slice
	  , factories  = {};

	var construct = function(F, len, args){
	  if(!(len in factories)){
	    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  } return factories[len](F, args);
	};

	module.exports = Function.bind || function bind(that /*, args... */){
	  var fn       = aFunction(this)
	    , partArgs = arraySlice.call(arguments, 1);
	  var bound = function(/* args... */){
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	  };
	  if(isObject(fn.prototype))bound.prototype = fn.prototype;
	  return bound;
	};

/***/ },
/* 76 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(11).f
	  , createDesc = __webpack_require__(17)
	  , has        = __webpack_require__(6)
	  , FProto     = Function.prototype
	  , nameRE     = /^\s*function ([^ (]*)/
	  , NAME       = 'name';
	// 19.2.4.2 name
	NAME in FProto || __webpack_require__(7) && dP(FProto, NAME, {
	  configurable: true,
	  get: function(){
	    var match = ('' + this).match(nameRE)
	      , name  = match ? match[1] : '';
	    has(this, NAME) || dP(this, NAME, createDesc(5, name));
	    return name;
	  }
	});

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var isObject       = __webpack_require__(13)
	  , getPrototypeOf = __webpack_require__(57)
	  , HAS_INSTANCE   = __webpack_require__(25)('hasInstance')
	  , FunctionProto  = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if(!(HAS_INSTANCE in FunctionProto))__webpack_require__(11).f(FunctionProto, HAS_INSTANCE, {value: function(O){
	  if(typeof this != 'function' || !isObject(O))return false;
	  if(!isObject(this.prototype))return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
	  return false;
	}});

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(9)
	  , $parseInt = __webpack_require__(80);
	// 18.2.5 parseInt(string, radix)
	$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var $parseInt = __webpack_require__(4).parseInt
	  , $trim     = __webpack_require__(81).trim
	  , ws        = __webpack_require__(82)
	  , hex       = /^[\-+]?0[xX]/;

	module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
	  var string = $trim(String(str), 3);
	  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
	} : $parseInt;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(9)
	  , defined = __webpack_require__(32)
	  , fails   = __webpack_require__(8)
	  , spaces  = __webpack_require__(82)
	  , space   = '[' + spaces + ']'
	  , non     = '\u200b\u0085'
	  , ltrim   = RegExp('^' + space + space + '*')
	  , rtrim   = RegExp(space + space + '*$');

	var exporter = function(KEY, exec, ALIAS){
	  var exp   = {};
	  var FORCE = fails(function(){
	    return !!spaces[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
	  if(ALIAS)exp[ALIAS] = fn;
	  $export($export.P + $export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function(string, TYPE){
	  string = String(defined(string));
	  if(TYPE & 1)string = string.replace(ltrim, '');
	  if(TYPE & 2)string = string.replace(rtrim, '');
	  return string;
	};

	module.exports = exporter;

/***/ },
/* 82 */
/***/ function(module, exports) {

	module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var $export     = __webpack_require__(9)
	  , $parseFloat = __webpack_require__(84);
	// 18.2.4 parseFloat(string)
	$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var $parseFloat = __webpack_require__(4).parseFloat
	  , $trim       = __webpack_require__(81).trim;

	module.exports = 1 / $parseFloat(__webpack_require__(82) + '-0') !== -Infinity ? function parseFloat(str){
	  var string = $trim(String(str), 3)
	    , result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global            = __webpack_require__(4)
	  , has               = __webpack_require__(6)
	  , cof               = __webpack_require__(31)
	  , inheritIfRequired = __webpack_require__(86)
	  , toPrimitive       = __webpack_require__(16)
	  , fails             = __webpack_require__(8)
	  , gOPN              = __webpack_require__(47).f
	  , gOPD              = __webpack_require__(48).f
	  , dP                = __webpack_require__(11).f
	  , $trim             = __webpack_require__(81).trim
	  , NUMBER            = 'Number'
	  , $Number           = global[NUMBER]
	  , Base              = $Number
	  , proto             = $Number.prototype
	  // Opera ~12 has broken Object#toString
	  , BROKEN_COF        = cof(__webpack_require__(43)(proto)) == NUMBER
	  , TRIM              = 'trim' in String.prototype;

	// 7.1.3 ToNumber(argument)
	var toNumber = function(argument){
	  var it = toPrimitive(argument, false);
	  if(typeof it == 'string' && it.length > 2){
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0)
	      , third, radix, maxCode;
	    if(first === 43 || first === 45){
	      third = it.charCodeAt(2);
	      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if(first === 48){
	      switch(it.charCodeAt(1)){
	        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default : return +it;
	      }
	      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if(code < 48 || code > maxCode)return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
	  $Number = function Number(value){
	    var it = arguments.length < 1 ? 0 : value
	      , that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
	        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for(var keys = __webpack_require__(7) ? gOPN(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j = 0, key; keys.length > j; j++){
	    if(has(Base, key = keys[j]) && !has($Number, key)){
	      dP($Number, key, gOPD(Base, key));
	    }
	  }
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  __webpack_require__(18)(global, NUMBER, $Number);
	}

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var isObject       = __webpack_require__(13)
	  , setPrototypeOf = __webpack_require__(71).set;
	module.exports = function(that, target, C){
	  var P, S = target.constructor;
	  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
	    setPrototypeOf(that, P);
	  } return that;
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export      = __webpack_require__(9)
	  , anInstance   = __webpack_require__(88)
	  , toInteger    = __webpack_require__(35)
	  , aNumberValue = __webpack_require__(89)
	  , repeat       = __webpack_require__(90)
	  , $toFixed     = 1..toFixed
	  , floor        = Math.floor
	  , data         = [0, 0, 0, 0, 0, 0]
	  , ERROR        = 'Number.toFixed: incorrect invocation!'
	  , ZERO         = '0';

	var multiply = function(n, c){
	  var i  = -1
	    , c2 = c;
	  while(++i < 6){
	    c2 += n * data[i];
	    data[i] = c2 % 1e7;
	    c2 = floor(c2 / 1e7);
	  }
	};
	var divide = function(n){
	  var i = 6
	    , c = 0;
	  while(--i >= 0){
	    c += data[i];
	    data[i] = floor(c / n);
	    c = (c % n) * 1e7;
	  }
	};
	var numToString = function(){
	  var i = 6
	    , s = '';
	  while(--i >= 0){
	    if(s !== '' || i === 0 || data[i] !== 0){
	      var t = String(data[i]);
	      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
	    }
	  } return s;
	};
	var pow = function(x, n, acc){
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};
	var log = function(x){
	  var n  = 0
	    , x2 = x;
	  while(x2 >= 4096){
	    n += 12;
	    x2 /= 4096;
	  }
	  while(x2 >= 2){
	    n  += 1;
	    x2 /= 2;
	  } return n;
	};

	$export($export.P + $export.F * (!!$toFixed && (
	  0.00008.toFixed(3) !== '0.000' ||
	  0.9.toFixed(0) !== '1' ||
	  1.255.toFixed(2) !== '1.25' ||
	  1000000000000000128..toFixed(0) !== '1000000000000000128'
	) || !__webpack_require__(8)(function(){
	  // V8 ~ Android 4.3-
	  $toFixed.call({});
	})), 'Number', {
	  toFixed: function toFixed(fractionDigits){
	    var x = aNumberValue(this, ERROR)
	      , f = toInteger(fractionDigits)
	      , s = ''
	      , m = ZERO
	      , e, z, j, k;
	    if(f < 0 || f > 20)throw RangeError(ERROR);
	    if(x != x)return 'NaN';
	    if(x <= -1e21 || x >= 1e21)return String(x);
	    if(x < 0){
	      s = '-';
	      x = -x;
	    }
	    if(x > 1e-21){
	      e = log(x * pow(2, 69, 1)) - 69;
	      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if(e > 0){
	        multiply(0, z);
	        j = f;
	        while(j >= 7){
	          multiply(1e7, 0);
	          j -= 7;
	        }
	        multiply(pow(10, j, 1), 0);
	        j = e - 1;
	        while(j >= 23){
	          divide(1 << 23);
	          j -= 23;
	        }
	        divide(1 << j);
	        multiply(1, 1);
	        divide(2);
	        m = numToString();
	      } else {
	        multiply(0, z);
	        multiply(1 << -e, 0);
	        m = numToString() + repeat.call(ZERO, f);
	      }
	    }
	    if(f > 0){
	      k = m.length;
	      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
	    } else {
	      m = s + m;
	    } return m;
	  }
	});

/***/ },
/* 88 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var cof = __webpack_require__(31);
	module.exports = function(it, msg){
	  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
	  return +it;
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var toInteger = __webpack_require__(35)
	  , defined   = __webpack_require__(32);

	module.exports = function repeat(count){
	  var str = String(defined(this))
	    , res = ''
	    , n   = toInteger(count);
	  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
	  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	  return res;
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export      = __webpack_require__(9)
	  , $fails       = __webpack_require__(8)
	  , aNumberValue = __webpack_require__(89)
	  , $toPrecision = 1..toPrecision;

	$export($export.P + $export.F * ($fails(function(){
	  // IE7-
	  return $toPrecision.call(1, undefined) !== '1';
	}) || !$fails(function(){
	  // V8 ~ Android 4.3-
	  $toPrecision.call({});
	})), 'Number', {
	  toPrecision: function toPrecision(precision){
	    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
	    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
	  }
	});

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.1 Number.EPSILON
	var $export = __webpack_require__(9);

	$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.2 Number.isFinite(number)
	var $export   = __webpack_require__(9)
	  , _isFinite = __webpack_require__(4).isFinite;

	$export($export.S, 'Number', {
	  isFinite: function isFinite(it){
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(9);

	$export($export.S, 'Number', {isInteger: __webpack_require__(95)});

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(13)
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.4 Number.isNaN(number)
	var $export = __webpack_require__(9);

	$export($export.S, 'Number', {
	  isNaN: function isNaN(number){
	    return number != number;
	  }
	});

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.5 Number.isSafeInteger(number)
	var $export   = __webpack_require__(9)
	  , isInteger = __webpack_require__(95)
	  , abs       = Math.abs;

	$export($export.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number){
	    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $export = __webpack_require__(9);

	$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.10 Number.MIN_SAFE_INTEGER
	var $export = __webpack_require__(9);

	$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var $export     = __webpack_require__(9)
	  , $parseFloat = __webpack_require__(84);
	// 20.1.2.12 Number.parseFloat(string)
	$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(9)
	  , $parseInt = __webpack_require__(80);
	// 20.1.2.13 Number.parseInt(string, radix)
	$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.3 Math.acosh(x)
	var $export = __webpack_require__(9)
	  , log1p   = __webpack_require__(103)
	  , sqrt    = Math.sqrt
	  , $acosh  = Math.acosh;

	$export($export.S + $export.F * !($acosh
	  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	  && Math.floor($acosh(Number.MAX_VALUE)) == 710
	  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
	  && $acosh(Infinity) == Infinity
	), 'Math', {
	  acosh: function acosh(x){
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? Math.log(x) + Math.LN2
	      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

/***/ },
/* 103 */
/***/ function(module, exports) {

	// 20.2.2.20 Math.log1p(x)
	module.exports = Math.log1p || function log1p(x){
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.5 Math.asinh(x)
	var $export = __webpack_require__(9)
	  , $asinh  = Math.asinh;

	function asinh(x){
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}

	// Tor Browser bug: Math.asinh(0) -> -0 
	$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.7 Math.atanh(x)
	var $export = __webpack_require__(9)
	  , $atanh  = Math.atanh;

	// Tor Browser bug: Math.atanh(-0) -> 0 
	$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
	  atanh: function atanh(x){
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.9 Math.cbrt(x)
	var $export = __webpack_require__(9)
	  , sign    = __webpack_require__(107);

	$export($export.S, 'Math', {
	  cbrt: function cbrt(x){
	    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

/***/ },
/* 107 */
/***/ function(module, exports) {

	// 20.2.2.28 Math.sign(x)
	module.exports = Math.sign || function sign(x){
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.11 Math.clz32(x)
	var $export = __webpack_require__(9);

	$export($export.S, 'Math', {
	  clz32: function clz32(x){
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.12 Math.cosh(x)
	var $export = __webpack_require__(9)
	  , exp     = Math.exp;

	$export($export.S, 'Math', {
	  cosh: function cosh(x){
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.14 Math.expm1(x)
	var $export = __webpack_require__(9)
	  , $expm1  = __webpack_require__(111);

	$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});

/***/ },
/* 111 */
/***/ function(module, exports) {

	// 20.2.2.14 Math.expm1(x)
	var $expm1 = Math.expm1;
	module.exports = (!$expm1
	  // Old FF bug
	  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
	  // Tor Browser bug
	  || $expm1(-2e-17) != -2e-17
	) ? function expm1(x){
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	} : $expm1;

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.16 Math.fround(x)
	var $export   = __webpack_require__(9)
	  , sign      = __webpack_require__(107)
	  , pow       = Math.pow
	  , EPSILON   = pow(2, -52)
	  , EPSILON32 = pow(2, -23)
	  , MAX32     = pow(2, 127) * (2 - EPSILON32)
	  , MIN32     = pow(2, -126);

	var roundTiesToEven = function(n){
	  return n + 1 / EPSILON - 1 / EPSILON;
	};


	$export($export.S, 'Math', {
	  fround: function fround(x){
	    var $abs  = Math.abs(x)
	      , $sign = sign(x)
	      , a, result;
	    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	    a = (1 + EPSILON32 / EPSILON) * $abs;
	    result = a - (a - $abs);
	    if(result > MAX32 || result != result)return $sign * Infinity;
	    return $sign * result;
	  }
	});

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	var $export = __webpack_require__(9)
	  , abs     = Math.abs;

	$export($export.S, 'Math', {
	  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
	    var sum  = 0
	      , i    = 0
	      , aLen = arguments.length
	      , larg = 0
	      , arg, div;
	    while(i < aLen){
	      arg = abs(arguments[i++]);
	      if(larg < arg){
	        div  = larg / arg;
	        sum  = sum * div * div + 1;
	        larg = arg;
	      } else if(arg > 0){
	        div  = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.18 Math.imul(x, y)
	var $export = __webpack_require__(9)
	  , $imul   = Math.imul;

	// some WebKit versions fails with big numbers, some has wrong arity
	$export($export.S + $export.F * __webpack_require__(8)(function(){
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y){
	    var UINT16 = 0xffff
	      , xn = +x
	      , yn = +y
	      , xl = UINT16 & xn
	      , yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.21 Math.log10(x)
	var $export = __webpack_require__(9);

	$export($export.S, 'Math', {
	  log10: function log10(x){
	    return Math.log(x) / Math.LN10;
	  }
	});

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.20 Math.log1p(x)
	var $export = __webpack_require__(9);

	$export($export.S, 'Math', {log1p: __webpack_require__(103)});

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.22 Math.log2(x)
	var $export = __webpack_require__(9);

	$export($export.S, 'Math', {
	  log2: function log2(x){
	    return Math.log(x) / Math.LN2;
	  }
	});

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.28 Math.sign(x)
	var $export = __webpack_require__(9);

	$export($export.S, 'Math', {sign: __webpack_require__(107)});

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.30 Math.sinh(x)
	var $export = __webpack_require__(9)
	  , expm1   = __webpack_require__(111)
	  , exp     = Math.exp;

	// V8 near Chromium 38 has a problem with very small numbers
	$export($export.S + $export.F * __webpack_require__(8)(function(){
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x){
	    return Math.abs(x = +x) < 1
	      ? (expm1(x) - expm1(-x)) / 2
	      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
	  }
	});

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.33 Math.tanh(x)
	var $export = __webpack_require__(9)
	  , expm1   = __webpack_require__(111)
	  , exp     = Math.exp;

	$export($export.S, 'Math', {
	  tanh: function tanh(x){
	    var a = expm1(x = +x)
	      , b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  }
	});

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.34 Math.trunc(x)
	var $export = __webpack_require__(9);

	$export($export.S, 'Math', {
	  trunc: function trunc(it){
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var $export        = __webpack_require__(9)
	  , toIndex        = __webpack_require__(36)
	  , fromCharCode   = String.fromCharCode
	  , $fromCodePoint = String.fromCodePoint;

	// length should be 1, old FF problem
	$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
	    var res  = []
	      , aLen = arguments.length
	      , i    = 0
	      , code;
	    while(aLen > i){
	      code = +arguments[i++];
	      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(9)
	  , toIObject = __webpack_require__(29)
	  , toLength  = __webpack_require__(34);

	$export($export.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite){
	    var tpl  = toIObject(callSite.raw)
	      , len  = toLength(tpl.length)
	      , aLen = arguments.length
	      , res  = []
	      , i    = 0;
	    while(len > i){
	      res.push(String(tpl[i++]));
	      if(i < aLen)res.push(String(arguments[i]));
	    } return res.join('');
	  }
	});

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.1.3.25 String.prototype.trim()
	__webpack_require__(81)('trim', function($trim){
	  return function trim(){
	    return $trim(this, 3);
	  };
	});

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(126)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(127)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(35)
	  , defined   = __webpack_require__(32);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(49)
	  , $export        = __webpack_require__(9)
	  , redefine       = __webpack_require__(18)
	  , hide           = __webpack_require__(10)
	  , has            = __webpack_require__(6)
	  , Iterators      = __webpack_require__(128)
	  , $iterCreate    = __webpack_require__(129)
	  , setToStringTag = __webpack_require__(24)
	  , getPrototypeOf = __webpack_require__(57)
	  , ITERATOR       = __webpack_require__(25)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 128 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(43)
	  , descriptor     = __webpack_require__(17)
	  , setToStringTag = __webpack_require__(24)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(10)(IteratorPrototype, __webpack_require__(25)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(9)
	  , $at     = __webpack_require__(126)(false);
	$export($export.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	'use strict';
	var $export   = __webpack_require__(9)
	  , toLength  = __webpack_require__(34)
	  , context   = __webpack_require__(132)
	  , ENDS_WITH = 'endsWith'
	  , $endsWith = ''[ENDS_WITH];

	$export($export.P + $export.F * __webpack_require__(134)(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /*, endPosition = @length */){
	    var that = context(this, searchString, ENDS_WITH)
	      , endPosition = arguments.length > 1 ? arguments[1] : undefined
	      , len    = toLength(that.length)
	      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
	      , search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	// helper for String#{startsWith, endsWith, includes}
	var isRegExp = __webpack_require__(133)
	  , defined  = __webpack_require__(32);

	module.exports = function(that, searchString, NAME){
	  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(defined(that));
	};

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.8 IsRegExp(argument)
	var isObject = __webpack_require__(13)
	  , cof      = __webpack_require__(31)
	  , MATCH    = __webpack_require__(25)('match');
	module.exports = function(it){
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
	};

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var MATCH = __webpack_require__(25)('match');
	module.exports = function(KEY){
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch(e){
	    try {
	      re[MATCH] = false;
	      return !'/./'[KEY](re);
	    } catch(f){ /* empty */ }
	  } return true;
	};

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.7 String.prototype.includes(searchString, position = 0)
	'use strict';
	var $export  = __webpack_require__(9)
	  , context  = __webpack_require__(132)
	  , INCLUDES = 'includes';

	$export($export.P + $export.F * __webpack_require__(134)(INCLUDES), 'String', {
	  includes: function includes(searchString /*, position = 0 */){
	    return !!~context(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(9);

	$export($export.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: __webpack_require__(90)
	});

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	'use strict';
	var $export     = __webpack_require__(9)
	  , toLength    = __webpack_require__(34)
	  , context     = __webpack_require__(132)
	  , STARTS_WITH = 'startsWith'
	  , $startsWith = ''[STARTS_WITH];

	$export($export.P + $export.F * __webpack_require__(134)(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /*, position = 0 */){
	    var that   = context(this, searchString, STARTS_WITH)
	      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
	      , search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.2 String.prototype.anchor(name)
	__webpack_require__(139)('anchor', function(createHTML){
	  return function anchor(name){
	    return createHTML(this, 'a', 'name', name);
	  }
	});

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(9)
	  , fails   = __webpack_require__(8)
	  , defined = __webpack_require__(32)
	  , quot    = /"/g;
	// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	var createHTML = function(string, tag, attribute, value) {
	  var S  = String(defined(string))
	    , p1 = '<' + tag;
	  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};
	module.exports = function(NAME, exec){
	  var O = {};
	  O[NAME] = exec(createHTML);
	  $export($export.P + $export.F * fails(function(){
	    var test = ''[NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  }), 'String', O);
	};

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.3 String.prototype.big()
	__webpack_require__(139)('big', function(createHTML){
	  return function big(){
	    return createHTML(this, 'big', '', '');
	  }
	});

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.4 String.prototype.blink()
	__webpack_require__(139)('blink', function(createHTML){
	  return function blink(){
	    return createHTML(this, 'blink', '', '');
	  }
	});

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.5 String.prototype.bold()
	__webpack_require__(139)('bold', function(createHTML){
	  return function bold(){
	    return createHTML(this, 'b', '', '');
	  }
	});

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.6 String.prototype.fixed()
	__webpack_require__(139)('fixed', function(createHTML){
	  return function fixed(){
	    return createHTML(this, 'tt', '', '');
	  }
	});

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.7 String.prototype.fontcolor(color)
	__webpack_require__(139)('fontcolor', function(createHTML){
	  return function fontcolor(color){
	    return createHTML(this, 'font', 'color', color);
	  }
	});

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.8 String.prototype.fontsize(size)
	__webpack_require__(139)('fontsize', function(createHTML){
	  return function fontsize(size){
	    return createHTML(this, 'font', 'size', size);
	  }
	});

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.9 String.prototype.italics()
	__webpack_require__(139)('italics', function(createHTML){
	  return function italics(){
	    return createHTML(this, 'i', '', '');
	  }
	});

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.10 String.prototype.link(url)
	__webpack_require__(139)('link', function(createHTML){
	  return function link(url){
	    return createHTML(this, 'a', 'href', url);
	  }
	});

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.11 String.prototype.small()
	__webpack_require__(139)('small', function(createHTML){
	  return function small(){
	    return createHTML(this, 'small', '', '');
	  }
	});

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.12 String.prototype.strike()
	__webpack_require__(139)('strike', function(createHTML){
	  return function strike(){
	    return createHTML(this, 'strike', '', '');
	  }
	});

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.13 String.prototype.sub()
	__webpack_require__(139)('sub', function(createHTML){
	  return function sub(){
	    return createHTML(this, 'sub', '', '');
	  }
	});

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.14 String.prototype.sup()
	__webpack_require__(139)('sup', function(createHTML){
	  return function sup(){
	    return createHTML(this, 'sup', '', '');
	  }
	});

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	// 20.3.3.1 / 15.9.4.4 Date.now()
	var $export = __webpack_require__(9);

	$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export     = __webpack_require__(9)
	  , toObject    = __webpack_require__(56)
	  , toPrimitive = __webpack_require__(16);

	$export($export.P + $export.F * __webpack_require__(8)(function(){
	  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
	}), 'Date', {
	  toJSON: function toJSON(key){
	    var O  = toObject(this)
	      , pv = toPrimitive(O);
	    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	  }
	});

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	var $export = __webpack_require__(9)
	  , fails   = __webpack_require__(8)
	  , getTime = Date.prototype.getTime;

	var lz = function(num){
	  return num > 9 ? num : '0' + num;
	};

	// PhantomJS / old WebKit has a broken implementations
	$export($export.P + $export.F * (fails(function(){
	  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
	}) || !fails(function(){
	  new Date(NaN).toISOString();
	})), 'Date', {
	  toISOString: function toISOString(){
	    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
	    var d = this
	      , y = d.getUTCFullYear()
	      , m = d.getUTCMilliseconds()
	      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
	    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	  }
	});

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var DateProto    = Date.prototype
	  , INVALID_DATE = 'Invalid Date'
	  , TO_STRING    = 'toString'
	  , $toString    = DateProto[TO_STRING]
	  , getTime      = DateProto.getTime;
	if(new Date(NaN) + '' != INVALID_DATE){
	  __webpack_require__(18)(DateProto, TO_STRING, function toString(){
	    var value = getTime.call(this);
	    return value === value ? $toString.call(this) : INVALID_DATE;
	  });
	}

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var TO_PRIMITIVE = __webpack_require__(25)('toPrimitive')
	  , proto        = Date.prototype;

	if(!(TO_PRIMITIVE in proto))__webpack_require__(10)(proto, TO_PRIMITIVE, __webpack_require__(157));

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var anObject    = __webpack_require__(12)
	  , toPrimitive = __webpack_require__(16)
	  , NUMBER      = 'number';

	module.exports = function(hint){
	  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
	  return toPrimitive(anObject(this), hint != NUMBER);
	};

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	var $export = __webpack_require__(9);

	$export($export.S, 'Array', {isArray: __webpack_require__(42)});

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(20)
	  , $export        = __webpack_require__(9)
	  , toObject       = __webpack_require__(56)
	  , call           = __webpack_require__(160)
	  , isArrayIter    = __webpack_require__(161)
	  , toLength       = __webpack_require__(34)
	  , createProperty = __webpack_require__(162)
	  , getIterFn      = __webpack_require__(163);

	$export($export.S + $export.F * !__webpack_require__(164)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(12);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(128)
	  , ITERATOR   = __webpack_require__(25)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(11)
	  , createDesc      = __webpack_require__(17);

	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(73)
	  , ITERATOR  = __webpack_require__(25)('iterator')
	  , Iterators = __webpack_require__(128);
	module.exports = __webpack_require__(5).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(25)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export        = __webpack_require__(9)
	  , createProperty = __webpack_require__(162);

	// WebKit Array.of isn't generic
	$export($export.S + $export.F * __webpack_require__(8)(function(){
	  function F(){}
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */){
	    var index  = 0
	      , aLen   = arguments.length
	      , result = new (typeof this == 'function' ? this : Array)(aLen);
	    while(aLen > index)createProperty(result, index, arguments[index++]);
	    result.length = aLen;
	    return result;
	  }
	});

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.13 Array.prototype.join(separator)
	var $export   = __webpack_require__(9)
	  , toIObject = __webpack_require__(29)
	  , arrayJoin = [].join;

	// fallback for not array-like strings
	$export($export.P + $export.F * (__webpack_require__(30) != Object || !__webpack_require__(167)(arrayJoin)), 'Array', {
	  join: function join(separator){
	    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
	  }
	});

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var fails = __webpack_require__(8);

	module.exports = function(method, arg){
	  return !!method && fails(function(){
	    arg ? method.call(null, function(){}, 1) : method.call(null);
	  });
	};

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export    = __webpack_require__(9)
	  , html       = __webpack_require__(45)
	  , cof        = __webpack_require__(31)
	  , toIndex    = __webpack_require__(36)
	  , toLength   = __webpack_require__(34)
	  , arraySlice = [].slice;

	// fallback for not array-like ES3 strings and DOM objects
	$export($export.P + $export.F * __webpack_require__(8)(function(){
	  if(html)arraySlice.call(html);
	}), 'Array', {
	  slice: function slice(begin, end){
	    var len   = toLength(this.length)
	      , klass = cof(this);
	    end = end === undefined ? len : end;
	    if(klass == 'Array')return arraySlice.call(this, begin, end);
	    var start  = toIndex(begin, len)
	      , upTo   = toIndex(end, len)
	      , size   = toLength(upTo - start)
	      , cloned = Array(size)
	      , i      = 0;
	    for(; i < size; i++)cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i];
	    return cloned;
	  }
	});

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export   = __webpack_require__(9)
	  , aFunction = __webpack_require__(21)
	  , toObject  = __webpack_require__(56)
	  , fails     = __webpack_require__(8)
	  , $sort     = [].sort
	  , test      = [1, 2, 3];

	$export($export.P + $export.F * (fails(function(){
	  // IE8-
	  test.sort(undefined);
	}) || !fails(function(){
	  // V8 bug
	  test.sort(null);
	  // Old WebKit
	}) || !__webpack_require__(167)($sort)), 'Array', {
	  // 22.1.3.25 Array.prototype.sort(comparefn)
	  sort: function sort(comparefn){
	    return comparefn === undefined
	      ? $sort.call(toObject(this))
	      : $sort.call(toObject(this), aFunction(comparefn));
	  }
	});

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export  = __webpack_require__(9)
	  , $forEach = __webpack_require__(171)(0)
	  , STRICT   = __webpack_require__(167)([].forEach, true);

	$export($export.P + $export.F * !STRICT, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: function forEach(callbackfn /* , thisArg */){
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(20)
	  , IObject  = __webpack_require__(30)
	  , toObject = __webpack_require__(56)
	  , toLength = __webpack_require__(34)
	  , asc      = __webpack_require__(172);
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var isObject = __webpack_require__(13)
	  , isArray  = __webpack_require__(42)
	  , SPECIES  = __webpack_require__(25)('species');
	module.exports = function(original, length){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length);
	};

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(9)
	  , $map    = __webpack_require__(171)(1);

	$export($export.P + $export.F * !__webpack_require__(167)([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */){
	    return $map(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(9)
	  , $filter = __webpack_require__(171)(2);

	$export($export.P + $export.F * !__webpack_require__(167)([].filter, true), 'Array', {
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn /* , thisArg */){
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(9)
	  , $some   = __webpack_require__(171)(3);

	$export($export.P + $export.F * !__webpack_require__(167)([].some, true), 'Array', {
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn /* , thisArg */){
	    return $some(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(9)
	  , $every  = __webpack_require__(171)(4);

	$export($export.P + $export.F * !__webpack_require__(167)([].every, true), 'Array', {
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn /* , thisArg */){
	    return $every(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(9)
	  , $reduce = __webpack_require__(178);

	$export($export.P + $export.F * !__webpack_require__(167)([].reduce, true), 'Array', {
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: function reduce(callbackfn /* , initialValue */){
	    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
	  }
	});

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var aFunction = __webpack_require__(21)
	  , toObject  = __webpack_require__(56)
	  , IObject   = __webpack_require__(30)
	  , toLength  = __webpack_require__(34);

	module.exports = function(that, callbackfn, aLen, memo, isRight){
	  aFunction(callbackfn);
	  var O      = toObject(that)
	    , self   = IObject(O)
	    , length = toLength(O.length)
	    , index  = isRight ? length - 1 : 0
	    , i      = isRight ? -1 : 1;
	  if(aLen < 2)for(;;){
	    if(index in self){
	      memo = self[index];
	      index += i;
	      break;
	    }
	    index += i;
	    if(isRight ? index < 0 : length <= index){
	      throw TypeError('Reduce of empty array with no initial value');
	    }
	  }
	  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
	    memo = callbackfn(memo, self[index], index, O);
	  }
	  return memo;
	};

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(9)
	  , $reduce = __webpack_require__(178);

	$export($export.P + $export.F * !__webpack_require__(167)([].reduceRight, true), 'Array', {
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: function reduceRight(callbackfn /* , initialValue */){
	    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
	  }
	});

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export       = __webpack_require__(9)
	  , $indexOf      = __webpack_require__(33)(false)
	  , $native       = [].indexOf
	  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

	$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(167)($native)), 'Array', {
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? $native.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments[1]);
	  }
	});

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export       = __webpack_require__(9)
	  , toIObject     = __webpack_require__(29)
	  , toInteger     = __webpack_require__(35)
	  , toLength      = __webpack_require__(34)
	  , $native       = [].lastIndexOf
	  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

	$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(167)($native)), 'Array', {
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
	    // convert -0 to +0
	    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
	    var O      = toIObject(this)
	      , length = toLength(O.length)
	      , index  = length - 1;
	    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
	    if(index < 0)index = length + index;
	    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
	    return -1;
	  }
	});

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export = __webpack_require__(9);

	$export($export.P, 'Array', {copyWithin: __webpack_require__(183)});

	__webpack_require__(184)('copyWithin');

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	'use strict';
	var toObject = __webpack_require__(56)
	  , toIndex  = __webpack_require__(36)
	  , toLength = __webpack_require__(34);

	module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
	  var O     = toObject(this)
	    , len   = toLength(O.length)
	    , to    = toIndex(target, len)
	    , from  = toIndex(start, len)
	    , end   = arguments.length > 2 ? arguments[2] : undefined
	    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
	    , inc   = 1;
	  if(from < to && to < from + count){
	    inc  = -1;
	    from += count - 1;
	    to   += count - 1;
	  }
	  while(count-- > 0){
	    if(from in O)O[to] = O[from];
	    else delete O[to];
	    to   += inc;
	    from += inc;
	  } return O;
	};

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(25)('unscopables')
	  , ArrayProto  = Array.prototype;
	if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(10)(ArrayProto, UNSCOPABLES, {});
	module.exports = function(key){
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export = __webpack_require__(9);

	$export($export.P, 'Array', {fill: __webpack_require__(186)});

	__webpack_require__(184)('fill');

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	'use strict';
	var toObject = __webpack_require__(56)
	  , toIndex  = __webpack_require__(36)
	  , toLength = __webpack_require__(34);
	module.exports = function fill(value /*, start = 0, end = @length */){
	  var O      = toObject(this)
	    , length = toLength(O.length)
	    , aLen   = arguments.length
	    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
	    , end    = aLen > 2 ? arguments[2] : undefined
	    , endPos = end === undefined ? length : toIndex(end, length);
	  while(endPos > index)O[index++] = value;
	  return O;
	};

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var $export = __webpack_require__(9)
	  , $find   = __webpack_require__(171)(5)
	  , KEY     = 'find'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  find: function find(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(184)(KEY);

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var $export = __webpack_require__(9)
	  , $find   = __webpack_require__(171)(6)
	  , KEY     = 'findIndex'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(184)(KEY);

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(190)('Array');

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(4)
	  , dP          = __webpack_require__(11)
	  , DESCRIPTORS = __webpack_require__(7)
	  , SPECIES     = __webpack_require__(25)('species');

	module.exports = function(KEY){
	  var C = global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(184)
	  , step             = __webpack_require__(192)
	  , Iterators        = __webpack_require__(128)
	  , toIObject        = __webpack_require__(29);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(127)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 192 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	var global            = __webpack_require__(4)
	  , inheritIfRequired = __webpack_require__(86)
	  , dP                = __webpack_require__(11).f
	  , gOPN              = __webpack_require__(47).f
	  , isRegExp          = __webpack_require__(133)
	  , $flags            = __webpack_require__(194)
	  , $RegExp           = global.RegExp
	  , Base              = $RegExp
	  , proto             = $RegExp.prototype
	  , re1               = /a/g
	  , re2               = /a/g
	  // "new" creates a new object, old webkit buggy here
	  , CORRECT_NEW       = new $RegExp(re1) !== re1;

	if(__webpack_require__(7) && (!CORRECT_NEW || __webpack_require__(8)(function(){
	  re2[__webpack_require__(25)('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))){
	  $RegExp = function RegExp(p, f){
	    var tiRE = this instanceof $RegExp
	      , piRE = isRegExp(p)
	      , fiU  = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
	      : inheritIfRequired(CORRECT_NEW
	        ? new Base(piRE && !fiU ? p.source : p, f)
	        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
	      , tiRE ? this : proto, $RegExp);
	  };
	  var proxy = function(key){
	    key in $RegExp || dP($RegExp, key, {
	      configurable: true,
	      get: function(){ return Base[key]; },
	      set: function(it){ Base[key] = it; }
	    });
	  };
	  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
	  proto.constructor = $RegExp;
	  $RegExp.prototype = proto;
	  __webpack_require__(18)(global, 'RegExp', $RegExp);
	}

	__webpack_require__(190)('RegExp');

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.2.5.3 get RegExp.prototype.flags
	var anObject = __webpack_require__(12);
	module.exports = function(){
	  var that   = anObject(this)
	    , result = '';
	  if(that.global)     result += 'g';
	  if(that.ignoreCase) result += 'i';
	  if(that.multiline)  result += 'm';
	  if(that.unicode)    result += 'u';
	  if(that.sticky)     result += 'y';
	  return result;
	};

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	__webpack_require__(196);
	var anObject    = __webpack_require__(12)
	  , $flags      = __webpack_require__(194)
	  , DESCRIPTORS = __webpack_require__(7)
	  , TO_STRING   = 'toString'
	  , $toString   = /./[TO_STRING];

	var define = function(fn){
	  __webpack_require__(18)(RegExp.prototype, TO_STRING, fn, true);
	};

	// 21.2.5.14 RegExp.prototype.toString()
	if(__webpack_require__(8)(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
	  define(function toString(){
	    var R = anObject(this);
	    return '/'.concat(R.source, '/',
	      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
	  });
	// FF44- RegExp#toString has a wrong name
	} else if($toString.name != TO_STRING){
	  define(function toString(){
	    return $toString.call(this);
	  });
	}

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	// 21.2.5.3 get RegExp.prototype.flags()
	if(__webpack_require__(7) && /./g.flags != 'g')__webpack_require__(11).f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: __webpack_require__(194)
	});

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	// @@match logic
	__webpack_require__(198)('match', 1, function(defined, MATCH, $match){
	  // 21.1.3.11 String.prototype.match(regexp)
	  return [function match(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  }, $match];
	});

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var hide     = __webpack_require__(10)
	  , redefine = __webpack_require__(18)
	  , fails    = __webpack_require__(8)
	  , defined  = __webpack_require__(32)
	  , wks      = __webpack_require__(25);

	module.exports = function(KEY, length, exec){
	  var SYMBOL   = wks(KEY)
	    , fns      = exec(defined, SYMBOL, ''[KEY])
	    , strfn    = fns[0]
	    , rxfn     = fns[1];
	  if(fails(function(){
	    var O = {};
	    O[SYMBOL] = function(){ return 7; };
	    return ''[KEY](O) != 7;
	  })){
	    redefine(String.prototype, KEY, strfn);
	    hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function(string, arg){ return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function(string){ return rxfn.call(string, this); }
	    );
	  }
	};

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	// @@replace logic
	__webpack_require__(198)('replace', 2, function(defined, REPLACE, $replace){
	  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	  return [function replace(searchValue, replaceValue){
	    'use strict';
	    var O  = defined(this)
	      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined
	      ? fn.call(searchValue, O, replaceValue)
	      : $replace.call(String(O), searchValue, replaceValue);
	  }, $replace];
	});

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	// @@search logic
	__webpack_require__(198)('search', 1, function(defined, SEARCH, $search){
	  // 21.1.3.15 String.prototype.search(regexp)
	  return [function search(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[SEARCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	  }, $search];
	});

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	// @@split logic
	__webpack_require__(198)('split', 2, function(defined, SPLIT, $split){
	  'use strict';
	  var isRegExp   = __webpack_require__(133)
	    , _split     = $split
	    , $push      = [].push
	    , $SPLIT     = 'split'
	    , LENGTH     = 'length'
	    , LAST_INDEX = 'lastIndex';
	  if(
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ){
	    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
	    // based on es5-shim implementation, need to rework it
	    $split = function(separator, limit){
	      var string = String(this);
	      if(separator === undefined && limit === 0)return [];
	      // If `separator` is not a regex, use native split
	      if(!isRegExp(separator))return _split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var separator2, match, lastIndex, lastLength, i;
	      // Doesn't need flags gy, but they don't hurt
	      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
	      while(match = separatorCopy.exec(string)){
	        // `separatorCopy.lastIndex` is not reliable cross-browser
	        lastIndex = match.index + match[0][LENGTH];
	        if(lastIndex > lastLastIndex){
	          output.push(string.slice(lastLastIndex, match.index));
	          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
	          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
	            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
	          });
	          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if(output[LENGTH] >= splitLimit)break;
	        }
	        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
	      }
	      if(lastLastIndex === string[LENGTH]){
	        if(lastLength || !separatorCopy.test(''))output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  // Chakra, V8
	  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
	    $split = function(separator, limit){
	      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
	    };
	  }
	  // 21.1.3.17 String.prototype.split(separator, limit)
	  return [function split(separator, limit){
	    var O  = defined(this)
	      , fn = separator == undefined ? undefined : separator[SPLIT];
	    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
	  }, $split];
	});

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(49)
	  , global             = __webpack_require__(4)
	  , ctx                = __webpack_require__(20)
	  , classof            = __webpack_require__(73)
	  , $export            = __webpack_require__(9)
	  , isObject           = __webpack_require__(13)
	  , anObject           = __webpack_require__(12)
	  , aFunction          = __webpack_require__(21)
	  , anInstance         = __webpack_require__(88)
	  , forOf              = __webpack_require__(203)
	  , setProto           = __webpack_require__(71).set
	  , speciesConstructor = __webpack_require__(204)
	  , task               = __webpack_require__(205).set
	  , microtask          = __webpack_require__(206)
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;

	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(25)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(207)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(24)($Promise, PROMISE);
	__webpack_require__(190)(PROMISE);
	Wrapper = __webpack_require__(5)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(164)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(20)
	  , call        = __webpack_require__(160)
	  , isArrayIter = __webpack_require__(161)
	  , anObject    = __webpack_require__(12)
	  , toLength    = __webpack_require__(34)
	  , getIterFn   = __webpack_require__(163);
	module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(12)
	  , aFunction = __webpack_require__(21)
	  , SPECIES   = __webpack_require__(25)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(20)
	  , invoke             = __webpack_require__(76)
	  , html               = __webpack_require__(45)
	  , cel                = __webpack_require__(15)
	  , global             = __webpack_require__(4)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(31)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(4)
	  , macrotask = __webpack_require__(205).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(31)(process) == 'process'
	  , head, last, notify;

	var flush = function(){
	  var parent, fn;
	  if(isNode && (parent = process.domain))parent.exit();
	  while(head){
	    fn = head.fn;
	    fn(); // <- currently we use it only for Promise - try / catch not required
	    head = head.next;
	  } last = undefined;
	  if(parent)parent.enter();
	};

	// Node.js
	if(isNode){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = true
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = !toggle;
	  };
	// environments with maybe non-completely correct, but existent Promise
	} else if(Promise && Promise.resolve){
	  notify = function(){
	    Promise.resolve().then(flush);
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}

	module.exports = function(fn){
	  var task = {fn: fn, next: undefined};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(18);
	module.exports = function(target, src, safe){
	  for(var key in src)redefine(target, key, src[key], safe);
	  return target;
	};

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(209);

	// 23.1 Map Objects
	module.exports = __webpack_require__(210)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(11).f
	  , create      = __webpack_require__(43)
	  , hide        = __webpack_require__(10)
	  , redefineAll = __webpack_require__(207)
	  , ctx         = __webpack_require__(20)
	  , anInstance  = __webpack_require__(88)
	  , defined     = __webpack_require__(32)
	  , forOf       = __webpack_require__(203)
	  , $iterDefine = __webpack_require__(127)
	  , step        = __webpack_require__(192)
	  , setSpecies  = __webpack_require__(190)
	  , DESCRIPTORS = __webpack_require__(7)
	  , fastKey     = __webpack_require__(22).fastKey
	  , SIZE        = DESCRIPTORS ? '_s' : 'size';

	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)dP(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global            = __webpack_require__(4)
	  , $export           = __webpack_require__(9)
	  , redefine          = __webpack_require__(18)
	  , redefineAll       = __webpack_require__(207)
	  , meta              = __webpack_require__(22)
	  , forOf             = __webpack_require__(203)
	  , anInstance        = __webpack_require__(88)
	  , isObject          = __webpack_require__(13)
	  , fails             = __webpack_require__(8)
	  , $iterDetect       = __webpack_require__(164)
	  , setToStringTag    = __webpack_require__(24)
	  , inheritIfRequired = __webpack_require__(86);

	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  var fixMethod = function(KEY){
	    var fn = proto[KEY];
	    redefine(proto, KEY,
	      KEY == 'delete' ? function(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a){
	        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    var instance             = new C
	      // early implementations not supports chaining
	      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
	      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
	      // most early implementations doesn't supports iterables, most modern - not close it correctly
	      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
	      // for early implementations -0 and +0 not the same
	      , BUGGY_ZERO = !IS_WEAK && fails(function(){
	        // V8 ~ Chromium 42- fails only with 5+ elements
	        var $instance = new C()
	          , index     = 5;
	        while(index--)$instance[ADDER](index, index);
	        return !$instance.has(-0);
	      });
	    if(!ACCEPT_ITERABLES){ 
	      C = wrapper(function(target, iterable){
	        anInstance(target, C, NAME);
	        var that = inheritIfRequired(new Base, target, C);
	        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if(IS_WEAK && proto.clear)delete proto.clear;
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F * (C != Base), O);

	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(209);

	// 23.2 Set Objects
	module.exports = __webpack_require__(210)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var each         = __webpack_require__(171)(0)
	  , redefine     = __webpack_require__(18)
	  , meta         = __webpack_require__(22)
	  , assign       = __webpack_require__(67)
	  , weak         = __webpack_require__(213)
	  , isObject     = __webpack_require__(13)
	  , has          = __webpack_require__(6)
	  , getWeak      = meta.getWeak
	  , isExtensible = Object.isExtensible
	  , uncaughtFrozenStore = weak.ufstore
	  , tmp          = {}
	  , InternalMap;

	var wrapper = function(get){
	  return function WeakMap(){
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};

	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      var data = getWeak(key);
	      if(data === true)return uncaughtFrozenStore(this).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	};

	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = __webpack_require__(210)('WeakMap', wrapper, methods, weak, true, true);

	// IE11 WeakMap frozen keys fix
	if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  InternalMap = weak.getConstructor(wrapper);
	  assign(InternalMap.prototype, methods);
	  meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function(key){
	    var proto  = $WeakMap.prototype
	      , method = proto[key];
	    redefine(proto, key, function(a, b){
	      // store frozen objects on internal weakmap shim
	      if(isObject(a) && !isExtensible(a)){
	        if(!this._f)this._f = new InternalMap;
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var redefineAll       = __webpack_require__(207)
	  , getWeak           = __webpack_require__(22).getWeak
	  , anObject          = __webpack_require__(12)
	  , isObject          = __webpack_require__(13)
	  , anInstance        = __webpack_require__(88)
	  , forOf             = __webpack_require__(203)
	  , createArrayMethod = __webpack_require__(171)
	  , $has              = __webpack_require__(6)
	  , arrayFind         = createArrayMethod(5)
	  , arrayFindIndex    = createArrayMethod(6)
	  , id                = 0;

	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function(that){
	  return that._l || (that._l = new UncaughtFrozenStore);
	};
	var UncaughtFrozenStore = function(){
	  this.a = [];
	};
	var findUncaughtFrozen = function(store, key){
	  return arrayFind(store.a, function(it){
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function(key){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)return entry[1];
	  },
	  has: function(key){
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function(key, value){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function(key){
	    var index = arrayFindIndex(this.a, function(it){
	      return it[0] === key;
	    });
	    if(~index)this.a.splice(index, 1);
	    return !!~index;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = id++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
	        return data && $has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this).has(key);
	        return data && $has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var data = getWeak(anObject(key), true);
	    if(data === true)uncaughtFrozenStore(that).set(key, value);
	    else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var weak = __webpack_require__(213);

	// 23.4 WeakSet Objects
	__webpack_require__(210)('WeakSet', function(get){
	  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value){
	    return weak.def(this, value, true);
	  }
	}, weak, false, true);

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export      = __webpack_require__(9)
	  , $typed       = __webpack_require__(216)
	  , buffer       = __webpack_require__(217)
	  , anObject     = __webpack_require__(12)
	  , toIndex      = __webpack_require__(36)
	  , toLength     = __webpack_require__(34)
	  , isObject     = __webpack_require__(13)
	  , TYPED_ARRAY  = __webpack_require__(25)('typed_array')
	  , ArrayBuffer  = __webpack_require__(4).ArrayBuffer
	  , speciesConstructor = __webpack_require__(204)
	  , $ArrayBuffer = buffer.ArrayBuffer
	  , $DataView    = buffer.DataView
	  , $isView      = $typed.ABV && ArrayBuffer.isView
	  , $slice       = $ArrayBuffer.prototype.slice
	  , VIEW         = $typed.VIEW
	  , ARRAY_BUFFER = 'ArrayBuffer';

	$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

	$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
	  // 24.1.3.1 ArrayBuffer.isView(arg)
	  isView: function isView(it){
	    return $isView && $isView(it) || isObject(it) && VIEW in it;
	  }
	});

	$export($export.P + $export.U + $export.F * __webpack_require__(8)(function(){
	  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
	}), ARRAY_BUFFER, {
	  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
	  slice: function slice(start, end){
	    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
	    var len    = anObject(this).byteLength
	      , first  = toIndex(start, len)
	      , final  = toIndex(end === undefined ? len : end, len)
	      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
	      , viewS  = new $DataView(this)
	      , viewT  = new $DataView(result)
	      , index  = 0;
	    while(first < final){
	      viewT.setUint8(index++, viewS.getUint8(first++));
	    } return result;
	  }
	});

	__webpack_require__(190)(ARRAY_BUFFER);

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(4)
	  , hide   = __webpack_require__(10)
	  , uid    = __webpack_require__(19)
	  , TYPED  = uid('typed_array')
	  , VIEW   = uid('view')
	  , ABV    = !!(global.ArrayBuffer && global.DataView)
	  , CONSTR = ABV
	  , i = 0, l = 9, Typed;

	var TypedArrayConstructors = (
	  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
	).split(',');

	while(i < l){
	  if(Typed = global[TypedArrayConstructors[i++]]){
	    hide(Typed.prototype, TYPED, true);
	    hide(Typed.prototype, VIEW, true);
	  } else CONSTR = false;
	}

	module.exports = {
	  ABV:    ABV,
	  CONSTR: CONSTR,
	  TYPED:  TYPED,
	  VIEW:   VIEW
	};

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(4)
	  , DESCRIPTORS    = __webpack_require__(7)
	  , LIBRARY        = __webpack_require__(49)
	  , $typed         = __webpack_require__(216)
	  , hide           = __webpack_require__(10)
	  , redefineAll    = __webpack_require__(207)
	  , fails          = __webpack_require__(8)
	  , anInstance     = __webpack_require__(88)
	  , toInteger      = __webpack_require__(35)
	  , toLength       = __webpack_require__(34)
	  , gOPN           = __webpack_require__(47).f
	  , dP             = __webpack_require__(11).f
	  , arrayFill      = __webpack_require__(186)
	  , setToStringTag = __webpack_require__(24)
	  , ARRAY_BUFFER   = 'ArrayBuffer'
	  , DATA_VIEW      = 'DataView'
	  , PROTOTYPE      = 'prototype'
	  , WRONG_LENGTH   = 'Wrong length!'
	  , WRONG_INDEX    = 'Wrong index!'
	  , $ArrayBuffer   = global[ARRAY_BUFFER]
	  , $DataView      = global[DATA_VIEW]
	  , Math           = global.Math
	  , parseInt       = global.parseInt
	  , RangeError     = global.RangeError
	  , Infinity       = global.Infinity
	  , BaseBuffer     = $ArrayBuffer
	  , abs            = Math.abs
	  , pow            = Math.pow
	  , min            = Math.min
	  , floor          = Math.floor
	  , log            = Math.log
	  , LN2            = Math.LN2
	  , BUFFER         = 'buffer'
	  , BYTE_LENGTH    = 'byteLength'
	  , BYTE_OFFSET    = 'byteOffset'
	  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
	  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
	  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

	// IEEE754 conversions based on https://github.com/feross/ieee754
	var packIEEE754 = function(value, mLen, nBytes){
	  var buffer = Array(nBytes)
	    , eLen   = nBytes * 8 - mLen - 1
	    , eMax   = (1 << eLen) - 1
	    , eBias  = eMax >> 1
	    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
	    , i      = 0
	    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
	    , e, m, c;
	  value = abs(value)
	  if(value != value || value === Infinity){
	    m = value != value ? 1 : 0;
	    e = eMax;
	  } else {
	    e = floor(log(value) / LN2);
	    if(value * (c = pow(2, -e)) < 1){
	      e--;
	      c *= 2;
	    }
	    if(e + eBias >= 1){
	      value += rt / c;
	    } else {
	      value += rt * pow(2, 1 - eBias);
	    }
	    if(value * c >= 2){
	      e++;
	      c /= 2;
	    }
	    if(e + eBias >= eMax){
	      m = 0;
	      e = eMax;
	    } else if(e + eBias >= 1){
	      m = (value * c - 1) * pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * pow(2, eBias - 1) * pow(2, mLen);
	      e = 0;
	    }
	  }
	  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
	  e = e << mLen | m;
	  eLen += mLen;
	  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
	  buffer[--i] |= s * 128;
	  return buffer;
	};
	var unpackIEEE754 = function(buffer, mLen, nBytes){
	  var eLen  = nBytes * 8 - mLen - 1
	    , eMax  = (1 << eLen) - 1
	    , eBias = eMax >> 1
	    , nBits = eLen - 7
	    , i     = nBytes - 1
	    , s     = buffer[i--]
	    , e     = s & 127
	    , m;
	  s >>= 7;
	  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
	  if(e === 0){
	    e = 1 - eBias;
	  } else if(e === eMax){
	    return m ? NaN : s ? -Infinity : Infinity;
	  } else {
	    m = m + pow(2, mLen);
	    e = e - eBias;
	  } return (s ? -1 : 1) * m * pow(2, e - mLen);
	};

	var unpackI32 = function(bytes){
	  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
	};
	var packI8 = function(it){
	  return [it & 0xff];
	};
	var packI16 = function(it){
	  return [it & 0xff, it >> 8 & 0xff];
	};
	var packI32 = function(it){
	  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
	};
	var packF64 = function(it){
	  return packIEEE754(it, 52, 8);
	};
	var packF32 = function(it){
	  return packIEEE754(it, 23, 4);
	};

	var addGetter = function(C, key, internal){
	  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
	};

	var get = function(view, bytes, index, isLittleEndian){
	  var numIndex = +index
	    , intIndex = toInteger(numIndex);
	  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b
	    , start = intIndex + view[$OFFSET]
	    , pack  = store.slice(start, start + bytes);
	  return isLittleEndian ? pack : pack.reverse();
	};
	var set = function(view, bytes, index, conversion, value, isLittleEndian){
	  var numIndex = +index
	    , intIndex = toInteger(numIndex);
	  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b
	    , start = intIndex + view[$OFFSET]
	    , pack  = conversion(+value);
	  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
	};

	var validateArrayBufferArguments = function(that, length){
	  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
	  var numberLength = +length
	    , byteLength   = toLength(numberLength);
	  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
	  return byteLength;
	};

	if(!$typed.ABV){
	  $ArrayBuffer = function ArrayBuffer(length){
	    var byteLength = validateArrayBufferArguments(this, length);
	    this._b       = arrayFill.call(Array(byteLength), 0);
	    this[$LENGTH] = byteLength;
	  };

	  $DataView = function DataView(buffer, byteOffset, byteLength){
	    anInstance(this, $DataView, DATA_VIEW);
	    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = buffer[$LENGTH]
	      , offset       = toInteger(byteOffset);
	    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
	    this[$BUFFER] = buffer;
	    this[$OFFSET] = offset;
	    this[$LENGTH] = byteLength;
	  };

	  if(DESCRIPTORS){
	    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
	    addGetter($DataView, BUFFER, '_b');
	    addGetter($DataView, BYTE_LENGTH, '_l');
	    addGetter($DataView, BYTE_OFFSET, '_o');
	  }

	  redefineAll($DataView[PROTOTYPE], {
	    getInt8: function getInt8(byteOffset){
	      return get(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset){
	      return get(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /*, littleEndian */){
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /*, littleEndian */){
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /*, littleEndian */){
	      return unpackI32(get(this, 4, byteOffset, arguments[1]));
	    },
	    getUint32: function getUint32(byteOffset /*, littleEndian */){
	      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
	      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
	    },
	    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
	      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
	    },
	    setInt8: function setInt8(byteOffset, value){
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setUint8: function setUint8(byteOffset, value){
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packF32, value, arguments[2]);
	    },
	    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
	      set(this, 8, byteOffset, packF64, value, arguments[2]);
	    }
	  });
	} else {
	  if(!fails(function(){
	    new $ArrayBuffer;     // eslint-disable-line no-new
	  }) || !fails(function(){
	    new $ArrayBuffer(.5); // eslint-disable-line no-new
	  })){
	    $ArrayBuffer = function ArrayBuffer(length){
	      return new BaseBuffer(validateArrayBufferArguments(this, length));
	    };
	    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
	    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
	      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
	    };
	    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
	  }
	  // iOS Safari 7.x bug
	  var view = new $DataView(new $ArrayBuffer(2))
	    , $setInt8 = $DataView[PROTOTYPE].setInt8;
	  view.setInt8(0, 2147483648);
	  view.setInt8(1, 2147483649);
	  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
	    setInt8: function setInt8(byteOffset, value){
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value){
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, true);
	}
	setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag($DataView, DATA_VIEW);
	hide($DataView[PROTOTYPE], $typed.VIEW, true);
	exports[ARRAY_BUFFER] = $ArrayBuffer;
	exports[DATA_VIEW] = $DataView;

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(9);
	$export($export.G + $export.W + $export.F * !__webpack_require__(216).ABV, {
	  DataView: __webpack_require__(217).DataView
	});

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(220)('Int8', 1, function(init){
	  return function Int8Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	if(__webpack_require__(7)){
	  var LIBRARY             = __webpack_require__(49)
	    , global              = __webpack_require__(4)
	    , fails               = __webpack_require__(8)
	    , $export             = __webpack_require__(9)
	    , $typed              = __webpack_require__(216)
	    , $buffer             = __webpack_require__(217)
	    , ctx                 = __webpack_require__(20)
	    , anInstance          = __webpack_require__(88)
	    , propertyDesc        = __webpack_require__(17)
	    , hide                = __webpack_require__(10)
	    , redefineAll         = __webpack_require__(207)
	    , isInteger           = __webpack_require__(95)
	    , toInteger           = __webpack_require__(35)
	    , toLength            = __webpack_require__(34)
	    , toIndex             = __webpack_require__(36)
	    , toPrimitive         = __webpack_require__(16)
	    , has                 = __webpack_require__(6)
	    , same                = __webpack_require__(69)
	    , classof             = __webpack_require__(73)
	    , isObject            = __webpack_require__(13)
	    , toObject            = __webpack_require__(56)
	    , isArrayIter         = __webpack_require__(161)
	    , create              = __webpack_require__(43)
	    , getPrototypeOf      = __webpack_require__(57)
	    , gOPN                = __webpack_require__(47).f
	    , isIterable          = __webpack_require__(221)
	    , getIterFn           = __webpack_require__(163)
	    , uid                 = __webpack_require__(19)
	    , wks                 = __webpack_require__(25)
	    , createArrayMethod   = __webpack_require__(171)
	    , createArrayIncludes = __webpack_require__(33)
	    , speciesConstructor  = __webpack_require__(204)
	    , ArrayIterators      = __webpack_require__(191)
	    , Iterators           = __webpack_require__(128)
	    , $iterDetect         = __webpack_require__(164)
	    , setSpecies          = __webpack_require__(190)
	    , arrayFill           = __webpack_require__(186)
	    , arrayCopyWithin     = __webpack_require__(183)
	    , $DP                 = __webpack_require__(11)
	    , $GOPD               = __webpack_require__(48)
	    , dP                  = $DP.f
	    , gOPD                = $GOPD.f
	    , RangeError          = global.RangeError
	    , TypeError           = global.TypeError
	    , Uint8Array          = global.Uint8Array
	    , ARRAY_BUFFER        = 'ArrayBuffer'
	    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
	    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
	    , PROTOTYPE           = 'prototype'
	    , ArrayProto          = Array[PROTOTYPE]
	    , $ArrayBuffer        = $buffer.ArrayBuffer
	    , $DataView           = $buffer.DataView
	    , arrayForEach        = createArrayMethod(0)
	    , arrayFilter         = createArrayMethod(2)
	    , arraySome           = createArrayMethod(3)
	    , arrayEvery          = createArrayMethod(4)
	    , arrayFind           = createArrayMethod(5)
	    , arrayFindIndex      = createArrayMethod(6)
	    , arrayIncludes       = createArrayIncludes(true)
	    , arrayIndexOf        = createArrayIncludes(false)
	    , arrayValues         = ArrayIterators.values
	    , arrayKeys           = ArrayIterators.keys
	    , arrayEntries        = ArrayIterators.entries
	    , arrayLastIndexOf    = ArrayProto.lastIndexOf
	    , arrayReduce         = ArrayProto.reduce
	    , arrayReduceRight    = ArrayProto.reduceRight
	    , arrayJoin           = ArrayProto.join
	    , arraySort           = ArrayProto.sort
	    , arraySlice          = ArrayProto.slice
	    , arrayToString       = ArrayProto.toString
	    , arrayToLocaleString = ArrayProto.toLocaleString
	    , ITERATOR            = wks('iterator')
	    , TAG                 = wks('toStringTag')
	    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
	    , DEF_CONSTRUCTOR     = uid('def_constructor')
	    , ALL_CONSTRUCTORS    = $typed.CONSTR
	    , TYPED_ARRAY         = $typed.TYPED
	    , VIEW                = $typed.VIEW
	    , WRONG_LENGTH        = 'Wrong length!';

	  var $map = createArrayMethod(1, function(O, length){
	    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
	  });

	  var LITTLE_ENDIAN = fails(function(){
	    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
	  });

	  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
	    new Uint8Array(1).set({});
	  });

	  var strictToLength = function(it, SAME){
	    if(it === undefined)throw TypeError(WRONG_LENGTH);
	    var number = +it
	      , length = toLength(it);
	    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
	    return length;
	  };

	  var toOffset = function(it, BYTES){
	    var offset = toInteger(it);
	    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
	    return offset;
	  };

	  var validate = function(it){
	    if(isObject(it) && TYPED_ARRAY in it)return it;
	    throw TypeError(it + ' is not a typed array!');
	  };

	  var allocate = function(C, length){
	    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
	      throw TypeError('It is not a typed array constructor!');
	    } return new C(length);
	  };

	  var speciesFromList = function(O, list){
	    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
	  };

	  var fromList = function(C, list){
	    var index  = 0
	      , length = list.length
	      , result = allocate(C, length);
	    while(length > index)result[index] = list[index++];
	    return result;
	  };

	  var addGetter = function(it, key, internal){
	    dP(it, key, {get: function(){ return this._d[internal]; }});
	  };

	  var $from = function from(source /*, mapfn, thisArg */){
	    var O       = toObject(source)
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , iterFn  = getIterFn(O)
	      , i, length, values, result, step, iterator;
	    if(iterFn != undefined && !isArrayIter(iterFn)){
	      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
	        values.push(step.value);
	      } O = values;
	    }
	    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
	    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
	      result[i] = mapping ? mapfn(O[i], i) : O[i];
	    }
	    return result;
	  };

	  var $of = function of(/*...items*/){
	    var index  = 0
	      , length = arguments.length
	      , result = allocate(this, length);
	    while(length > index)result[index] = arguments[index++];
	    return result;
	  };

	  // iOS Safari 6.x fails here
	  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

	  var $toLocaleString = function toLocaleString(){
	    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	  };

	  var proto = {
	    copyWithin: function copyWithin(target, start /*, end */){
	      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    every: function every(callbackfn /*, thisArg */){
	      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
	      return arrayFill.apply(validate(this), arguments);
	    },
	    filter: function filter(callbackfn /*, thisArg */){
	      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
	        arguments.length > 1 ? arguments[1] : undefined));
	    },
	    find: function find(predicate /*, thisArg */){
	      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    findIndex: function findIndex(predicate /*, thisArg */){
	      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    forEach: function forEach(callbackfn /*, thisArg */){
	      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    indexOf: function indexOf(searchElement /*, fromIndex */){
	      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    includes: function includes(searchElement /*, fromIndex */){
	      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    join: function join(separator){ // eslint-disable-line no-unused-vars
	      return arrayJoin.apply(validate(this), arguments);
	    },
	    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
	      return arrayLastIndexOf.apply(validate(this), arguments);
	    },
	    map: function map(mapfn /*, thisArg */){
	      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
	      return arrayReduce.apply(validate(this), arguments);
	    },
	    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
	      return arrayReduceRight.apply(validate(this), arguments);
	    },
	    reverse: function reverse(){
	      var that   = this
	        , length = validate(that).length
	        , middle = Math.floor(length / 2)
	        , index  = 0
	        , value;
	      while(index < middle){
	        value         = that[index];
	        that[index++] = that[--length];
	        that[length]  = value;
	      } return that;
	    },
	    some: function some(callbackfn /*, thisArg */){
	      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    sort: function sort(comparefn){
	      return arraySort.call(validate(this), comparefn);
	    },
	    subarray: function subarray(begin, end){
	      var O      = validate(this)
	        , length = O.length
	        , $begin = toIndex(begin, length);
	      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
	        O.buffer,
	        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
	        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
	      );
	    }
	  };

	  var $slice = function slice(start, end){
	    return speciesFromList(this, arraySlice.call(validate(this), start, end));
	  };

	  var $set = function set(arrayLike /*, offset */){
	    validate(this);
	    var offset = toOffset(arguments[1], 1)
	      , length = this.length
	      , src    = toObject(arrayLike)
	      , len    = toLength(src.length)
	      , index  = 0;
	    if(len + offset > length)throw RangeError(WRONG_LENGTH);
	    while(index < len)this[offset + index] = src[index++];
	  };

	  var $iterators = {
	    entries: function entries(){
	      return arrayEntries.call(validate(this));
	    },
	    keys: function keys(){
	      return arrayKeys.call(validate(this));
	    },
	    values: function values(){
	      return arrayValues.call(validate(this));
	    }
	  };

	  var isTAIndex = function(target, key){
	    return isObject(target)
	      && target[TYPED_ARRAY]
	      && typeof key != 'symbol'
	      && key in target
	      && String(+key) == String(key);
	  };
	  var $getDesc = function getOwnPropertyDescriptor(target, key){
	    return isTAIndex(target, key = toPrimitive(key, true))
	      ? propertyDesc(2, target[key])
	      : gOPD(target, key);
	  };
	  var $setDesc = function defineProperty(target, key, desc){
	    if(isTAIndex(target, key = toPrimitive(key, true))
	      && isObject(desc)
	      && has(desc, 'value')
	      && !has(desc, 'get')
	      && !has(desc, 'set')
	      // TODO: add validation descriptor w/o calling accessors
	      && !desc.configurable
	      && (!has(desc, 'writable') || desc.writable)
	      && (!has(desc, 'enumerable') || desc.enumerable)
	    ){
	      target[key] = desc.value;
	      return target;
	    } else return dP(target, key, desc);
	  };

	  if(!ALL_CONSTRUCTORS){
	    $GOPD.f = $getDesc;
	    $DP.f   = $setDesc;
	  }

	  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
	    getOwnPropertyDescriptor: $getDesc,
	    defineProperty:           $setDesc
	  });

	  if(fails(function(){ arrayToString.call({}); })){
	    arrayToString = arrayToLocaleString = function toString(){
	      return arrayJoin.call(this);
	    }
	  }

	  var $TypedArrayPrototype$ = redefineAll({}, proto);
	  redefineAll($TypedArrayPrototype$, $iterators);
	  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
	  redefineAll($TypedArrayPrototype$, {
	    slice:          $slice,
	    set:            $set,
	    constructor:    function(){ /* noop */ },
	    toString:       arrayToString,
	    toLocaleString: $toLocaleString
	  });
	  addGetter($TypedArrayPrototype$, 'buffer', 'b');
	  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	  addGetter($TypedArrayPrototype$, 'length', 'e');
	  dP($TypedArrayPrototype$, TAG, {
	    get: function(){ return this[TYPED_ARRAY]; }
	  });

	  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
	    CLAMPED = !!CLAMPED;
	    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
	      , ISNT_UINT8 = NAME != 'Uint8Array'
	      , GETTER     = 'get' + KEY
	      , SETTER     = 'set' + KEY
	      , TypedArray = global[NAME]
	      , Base       = TypedArray || {}
	      , TAC        = TypedArray && getPrototypeOf(TypedArray)
	      , FORCED     = !TypedArray || !$typed.ABV
	      , O          = {}
	      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
	    var getter = function(that, index){
	      var data = that._d;
	      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	    };
	    var setter = function(that, index, value){
	      var data = that._d;
	      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	    };
	    var addElement = function(that, index){
	      dP(that, index, {
	        get: function(){
	          return getter(this, index);
	        },
	        set: function(value){
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };
	    if(FORCED){
	      TypedArray = wrapper(function(that, data, $offset, $length){
	        anInstance(that, TypedArray, NAME, '_d');
	        var index  = 0
	          , offset = 0
	          , buffer, byteLength, length, klass;
	        if(!isObject(data)){
	          length     = strictToLength(data, true)
	          byteLength = length * BYTES;
	          buffer     = new $ArrayBuffer(byteLength);
	        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
	          buffer = data;
	          offset = toOffset($offset, BYTES);
	          var $len = data.byteLength;
	          if($length === undefined){
	            if($len % BYTES)throw RangeError(WRONG_LENGTH);
	            byteLength = $len - offset;
	            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength($length) * BYTES;
	            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if(TYPED_ARRAY in data){
	          return fromList(TypedArray, data);
	        } else {
	          return $from.call(TypedArray, data);
	        }
	        hide(that, '_d', {
	          b: buffer,
	          o: offset,
	          l: byteLength,
	          e: length,
	          v: new $DataView(buffer)
	        });
	        while(index < length)addElement(that, index++);
	      });
	      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
	      hide(TypedArrayPrototype, 'constructor', TypedArray);
	    } else if(!$iterDetect(function(iter){
	      // V8 works with iterators, but fails in many other cases
	      // https://code.google.com/p/v8/issues/detail?id=4552
	      new TypedArray(null); // eslint-disable-line no-new
	      new TypedArray(iter); // eslint-disable-line no-new
	    }, true)){
	      TypedArray = wrapper(function(that, data, $offset, $length){
	        anInstance(that, TypedArray, NAME);
	        var klass;
	        // `ws` module bug, temporarily remove validation length for Uint8Array
	        // https://github.com/websockets/ws/pull/645
	        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
	        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
	          return $length !== undefined
	            ? new Base(data, toOffset($offset, BYTES), $length)
	            : $offset !== undefined
	              ? new Base(data, toOffset($offset, BYTES))
	              : new Base(data);
	        }
	        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
	        return $from.call(TypedArray, data);
	      });
	      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
	        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
	      });
	      TypedArray[PROTOTYPE] = TypedArrayPrototype;
	      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
	    }
	    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
	      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
	      , $iterator         = $iterators.values;
	    hide(TypedArray, TYPED_CONSTRUCTOR, true);
	    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
	    hide(TypedArrayPrototype, VIEW, true);
	    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

	    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
	      dP(TypedArrayPrototype, TAG, {
	        get: function(){ return NAME; }
	      });
	    }

	    O[NAME] = TypedArray;

	    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

	    $export($export.S, NAME, {
	      BYTES_PER_ELEMENT: BYTES,
	      from: $from,
	      of: $of
	    });

	    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

	    $export($export.P, NAME, proto);

	    setSpecies(NAME);

	    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

	    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

	    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

	    $export($export.P + $export.F * fails(function(){
	      new TypedArray(1).slice();
	    }), NAME, {slice: $slice});

	    $export($export.P + $export.F * (fails(function(){
	      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
	    }) || !fails(function(){
	      TypedArrayPrototype.toLocaleString.call([1, 2]);
	    })), NAME, {toLocaleString: $toLocaleString});

	    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
	  };
	} else module.exports = function(){ /* empty */ };

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(73)
	  , ITERATOR  = __webpack_require__(25)('iterator')
	  , Iterators = __webpack_require__(128);
	module.exports = __webpack_require__(5).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(220)('Uint8', 1, function(init){
	  return function Uint8Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(220)('Uint8', 1, function(init){
	  return function Uint8ClampedArray(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	}, true);

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(220)('Int16', 2, function(init){
	  return function Int16Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(220)('Uint16', 2, function(init){
	  return function Uint16Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(220)('Int32', 4, function(init){
	  return function Int32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(220)('Uint32', 4, function(init){
	  return function Uint32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(220)('Float32', 4, function(init){
	  return function Float32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(220)('Float64', 8, function(init){
	  return function Float64Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export = __webpack_require__(9)
	  , _apply  = Function.apply;

	$export($export.S, 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList){
	    return _apply.call(target, thisArgument, argumentsList);
	  }
	});

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $export   = __webpack_require__(9)
	  , create    = __webpack_require__(43)
	  , aFunction = __webpack_require__(21)
	  , anObject  = __webpack_require__(12)
	  , isObject  = __webpack_require__(13)
	  , bind      = __webpack_require__(75);

	// MS Edge supports only 2 arguments
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	$export($export.S + $export.F * __webpack_require__(8)(function(){
	  function F(){}
	  return !(Reflect.construct(function(){}, [], F) instanceof F);
	}), 'Reflect', {
	  construct: function construct(Target, args /*, newTarget*/){
	    aFunction(Target);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if(Target == newTarget){
	      // w/o altered newTarget, optimization for 0-4 arguments
	      if(args != undefined)switch(anObject(args).length){
	        case 0: return new Target;
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args));
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto    = newTarget.prototype
	      , instance = create(isObject(proto) ? proto : Object.prototype)
	      , result   = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var dP          = __webpack_require__(11)
	  , $export     = __webpack_require__(9)
	  , anObject    = __webpack_require__(12)
	  , toPrimitive = __webpack_require__(16);

	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export($export.S + $export.F * __webpack_require__(8)(function(){
	  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes){
	    anObject(target);
	    propertyKey = toPrimitive(propertyKey, true);
	    anObject(attributes);
	    try {
	      dP.f(target, propertyKey, attributes);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export  = __webpack_require__(9)
	  , gOPD     = __webpack_require__(48).f
	  , anObject = __webpack_require__(12);

	$export($export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey){
	    var desc = gOPD(anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 26.1.5 Reflect.enumerate(target)
	var $export  = __webpack_require__(9)
	  , anObject = __webpack_require__(12);
	var Enumerate = function(iterated){
	  this._t = anObject(iterated); // target
	  this._i = 0;                  // next index
	  var keys = this._k = []       // keys
	    , key;
	  for(key in iterated)keys.push(key);
	};
	__webpack_require__(129)(Enumerate, 'Object', function(){
	  var that = this
	    , keys = that._k
	    , key;
	  do {
	    if(that._i >= keys.length)return {value: undefined, done: true};
	  } while(!((key = keys[that._i++]) in that._t));
	  return {value: key, done: false};
	});

	$export($export.S, 'Reflect', {
	  enumerate: function enumerate(target){
	    return new Enumerate(target);
	  }
	});

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var gOPD           = __webpack_require__(48)
	  , getPrototypeOf = __webpack_require__(57)
	  , has            = __webpack_require__(6)
	  , $export        = __webpack_require__(9)
	  , isObject       = __webpack_require__(13)
	  , anObject       = __webpack_require__(12);

	function get(target, propertyKey/*, receiver*/){
	  var receiver = arguments.length < 3 ? target : arguments[2]
	    , desc, proto;
	  if(anObject(target) === receiver)return target[propertyKey];
	  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
	}

	$export($export.S, 'Reflect', {get: get});

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var gOPD     = __webpack_require__(48)
	  , $export  = __webpack_require__(9)
	  , anObject = __webpack_require__(12);

	$export($export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
	    return gOPD.f(anObject(target), propertyKey);
	  }
	});

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export  = __webpack_require__(9)
	  , getProto = __webpack_require__(57)
	  , anObject = __webpack_require__(12);

	$export($export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target){
	    return getProto(anObject(target));
	  }
	});

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.9 Reflect.has(target, propertyKey)
	var $export = __webpack_require__(9);

	$export($export.S, 'Reflect', {
	  has: function has(target, propertyKey){
	    return propertyKey in target;
	  }
	});

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.10 Reflect.isExtensible(target)
	var $export       = __webpack_require__(9)
	  , anObject      = __webpack_require__(12)
	  , $isExtensible = Object.isExtensible;

	$export($export.S, 'Reflect', {
	  isExtensible: function isExtensible(target){
	    anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.11 Reflect.ownKeys(target)
	var $export = __webpack_require__(9);

	$export($export.S, 'Reflect', {ownKeys: __webpack_require__(241)});

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	// all object keys, includes non-enumerable and symbols
	var gOPN     = __webpack_require__(47)
	  , gOPS     = __webpack_require__(40)
	  , anObject = __webpack_require__(12)
	  , Reflect  = __webpack_require__(4).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
	  var keys       = gOPN.f(anObject(it))
	    , getSymbols = gOPS.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.12 Reflect.preventExtensions(target)
	var $export            = __webpack_require__(9)
	  , anObject           = __webpack_require__(12)
	  , $preventExtensions = Object.preventExtensions;

	$export($export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target){
	    anObject(target);
	    try {
	      if($preventExtensions)$preventExtensions(target);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var dP             = __webpack_require__(11)
	  , gOPD           = __webpack_require__(48)
	  , getPrototypeOf = __webpack_require__(57)
	  , has            = __webpack_require__(6)
	  , $export        = __webpack_require__(9)
	  , createDesc     = __webpack_require__(17)
	  , anObject       = __webpack_require__(12)
	  , isObject       = __webpack_require__(13);

	function set(target, propertyKey, V/*, receiver*/){
	  var receiver = arguments.length < 4 ? target : arguments[3]
	    , ownDesc  = gOPD.f(anObject(target), propertyKey)
	    , existingDescriptor, proto;
	  if(!ownDesc){
	    if(isObject(proto = getPrototypeOf(target))){
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc(0);
	  }
	  if(has(ownDesc, 'value')){
	    if(ownDesc.writable === false || !isObject(receiver))return false;
	    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
	    existingDescriptor.value = V;
	    dP.f(receiver, propertyKey, existingDescriptor);
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}

	$export($export.S, 'Reflect', {set: set});

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export  = __webpack_require__(9)
	  , setProto = __webpack_require__(71);

	if(setProto)$export($export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto){
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/Array.prototype.includes
	var $export   = __webpack_require__(9)
	  , $includes = __webpack_require__(33)(true);

	$export($export.P, 'Array', {
	  includes: function includes(el /*, fromIndex = 0 */){
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	__webpack_require__(184)('includes');

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/mathiasbynens/String.prototype.at
	var $export = __webpack_require__(9)
	  , $at     = __webpack_require__(126)(true);

	$export($export.P, 'String', {
	  at: function at(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-string-pad-start-end
	var $export = __webpack_require__(9)
	  , $pad    = __webpack_require__(248);

	$export($export.P, 'String', {
	  padStart: function padStart(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-string-pad-start-end
	var toLength = __webpack_require__(34)
	  , repeat   = __webpack_require__(90)
	  , defined  = __webpack_require__(32);

	module.exports = function(that, maxLength, fillString, left){
	  var S            = String(defined(that))
	    , stringLength = S.length
	    , fillStr      = fillString === undefined ? ' ' : String(fillString)
	    , intMaxLength = toLength(maxLength);
	  if(intMaxLength <= stringLength)return S;
	  if(fillStr == '')fillStr = ' ';
	  var fillLen = intMaxLength - stringLength
	    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};


/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-string-pad-start-end
	var $export = __webpack_require__(9)
	  , $pad    = __webpack_require__(248);

	$export($export.P, 'String', {
	  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(81)('trimLeft', function($trim){
	  return function trimLeft(){
	    return $trim(this, 1);
	  };
	}, 'trimStart');

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(81)('trimRight', function($trim){
	  return function trimRight(){
	    return $trim(this, 2);
	  };
	}, 'trimEnd');

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://tc39.github.io/String.prototype.matchAll/
	var $export     = __webpack_require__(9)
	  , defined     = __webpack_require__(32)
	  , toLength    = __webpack_require__(34)
	  , isRegExp    = __webpack_require__(133)
	  , getFlags    = __webpack_require__(194)
	  , RegExpProto = RegExp.prototype;

	var $RegExpStringIterator = function(regexp, string){
	  this._r = regexp;
	  this._s = string;
	};

	__webpack_require__(129)($RegExpStringIterator, 'RegExp String', function next(){
	  var match = this._r.exec(this._s);
	  return {value: match, done: match === null};
	});

	$export($export.P, 'String', {
	  matchAll: function matchAll(regexp){
	    defined(this);
	    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
	    var S     = String(this)
	      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
	      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
	    rx.lastIndex = toLength(regexp.lastIndex);
	    return new $RegExpStringIterator(rx, S);
	  }
	});

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-getownpropertydescriptors
	var $export        = __webpack_require__(9)
	  , ownKeys        = __webpack_require__(241)
	  , toIObject      = __webpack_require__(29)
	  , gOPD           = __webpack_require__(48)
	  , createProperty = __webpack_require__(162);

	$export($export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
	    var O       = toIObject(object)
	      , getDesc = gOPD.f
	      , keys    = ownKeys(O)
	      , result  = {}
	      , i       = 0
	      , key, D;
	    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
	    return result;
	  }
	});

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(9)
	  , $values = __webpack_require__(255)(false);

	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(27)
	  , toIObject = __webpack_require__(29)
	  , isEnum    = __webpack_require__(41).f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export  = __webpack_require__(9)
	  , $entries = __webpack_require__(255)(true);

	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export         = __webpack_require__(9)
	  , toObject        = __webpack_require__(56)
	  , aFunction       = __webpack_require__(21)
	  , $defineProperty = __webpack_require__(11);

	// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
	__webpack_require__(7) && $export($export.P + __webpack_require__(258), 'Object', {
	  __defineGetter__: function __defineGetter__(P, getter){
	    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
	  }
	});

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	// Forced replacement prototype accessors methods
	module.exports = __webpack_require__(49)|| !__webpack_require__(8)(function(){
	  var K = Math.random();
	  // In FF throws only define methods
	  __defineSetter__.call(null, K, function(){ /* empty */});
	  delete __webpack_require__(4)[K];
	});

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export         = __webpack_require__(9)
	  , toObject        = __webpack_require__(56)
	  , aFunction       = __webpack_require__(21)
	  , $defineProperty = __webpack_require__(11);

	// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
	__webpack_require__(7) && $export($export.P + __webpack_require__(258), 'Object', {
	  __defineSetter__: function __defineSetter__(P, setter){
	    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
	  }
	});

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export                  = __webpack_require__(9)
	  , toObject                 = __webpack_require__(56)
	  , toPrimitive              = __webpack_require__(16)
	  , getPrototypeOf           = __webpack_require__(57)
	  , getOwnPropertyDescriptor = __webpack_require__(48).f;

	// B.2.2.4 Object.prototype.__lookupGetter__(P)
	__webpack_require__(7) && $export($export.P + __webpack_require__(258), 'Object', {
	  __lookupGetter__: function __lookupGetter__(P){
	    var O = toObject(this)
	      , K = toPrimitive(P, true)
	      , D;
	    do {
	      if(D = getOwnPropertyDescriptor(O, K))return D.get;
	    } while(O = getPrototypeOf(O));
	  }
	});

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export                  = __webpack_require__(9)
	  , toObject                 = __webpack_require__(56)
	  , toPrimitive              = __webpack_require__(16)
	  , getPrototypeOf           = __webpack_require__(57)
	  , getOwnPropertyDescriptor = __webpack_require__(48).f;

	// B.2.2.5 Object.prototype.__lookupSetter__(P)
	__webpack_require__(7) && $export($export.P + __webpack_require__(258), 'Object', {
	  __lookupSetter__: function __lookupSetter__(P){
	    var O = toObject(this)
	      , K = toPrimitive(P, true)
	      , D;
	    do {
	      if(D = getOwnPropertyDescriptor(O, K))return D.set;
	    } while(O = getPrototypeOf(O));
	  }
	});

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(9);

	$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(263)('Map')});

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(73)
	  , from    = __webpack_require__(264);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(203);

	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(9);

	$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(263)('Set')});

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/ljharb/proposal-global
	var $export = __webpack_require__(9);

	$export($export.S, 'System', {global: __webpack_require__(4)});

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/ljharb/proposal-is-error
	var $export = __webpack_require__(9)
	  , cof     = __webpack_require__(31);

	$export($export.S, 'Error', {
	  isError: function isError(it){
	    return cof(it) === 'Error';
	  }
	});

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(9);

	$export($export.S, 'Math', {
	  iaddh: function iaddh(x0, x1, y0, y1){
	    var $x0 = x0 >>> 0
	      , $x1 = x1 >>> 0
	      , $y0 = y0 >>> 0;
	    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
	  }
	});

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(9);

	$export($export.S, 'Math', {
	  isubh: function isubh(x0, x1, y0, y1){
	    var $x0 = x0 >>> 0
	      , $x1 = x1 >>> 0
	      , $y0 = y0 >>> 0;
	    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
	  }
	});

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(9);

	$export($export.S, 'Math', {
	  imulh: function imulh(u, v){
	    var UINT16 = 0xffff
	      , $u = +u
	      , $v = +v
	      , u0 = $u & UINT16
	      , v0 = $v & UINT16
	      , u1 = $u >> 16
	      , v1 = $v >> 16
	      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
	  }
	});

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(9);

	$export($export.S, 'Math', {
	  umulh: function umulh(u, v){
	    var UINT16 = 0xffff
	      , $u = +u
	      , $v = +v
	      , u0 = $u & UINT16
	      , v0 = $v & UINT16
	      , u1 = $u >>> 16
	      , v1 = $v >>> 16
	      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
	  }
	});

/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	var metadata                  = __webpack_require__(273)
	  , anObject                  = __webpack_require__(12)
	  , toMetaKey                 = metadata.key
	  , ordinaryDefineOwnMetadata = metadata.set;

	metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
	  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
	}});

/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	var Map     = __webpack_require__(208)
	  , $export = __webpack_require__(9)
	  , shared  = __webpack_require__(23)('metadata')
	  , store   = shared.store || (shared.store = new (__webpack_require__(212)));

	var getOrCreateMetadataMap = function(target, targetKey, create){
	  var targetMetadata = store.get(target);
	  if(!targetMetadata){
	    if(!create)return undefined;
	    store.set(target, targetMetadata = new Map);
	  }
	  var keyMetadata = targetMetadata.get(targetKey);
	  if(!keyMetadata){
	    if(!create)return undefined;
	    targetMetadata.set(targetKey, keyMetadata = new Map);
	  } return keyMetadata;
	};
	var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
	};
	var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
	};
	var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
	  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
	};
	var ordinaryOwnMetadataKeys = function(target, targetKey){
	  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
	    , keys        = [];
	  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
	  return keys;
	};
	var toMetaKey = function(it){
	  return it === undefined || typeof it == 'symbol' ? it : String(it);
	};
	var exp = function(O){
	  $export($export.S, 'Reflect', O);
	};

	module.exports = {
	  store: store,
	  map: getOrCreateMetadataMap,
	  has: ordinaryHasOwnMetadata,
	  get: ordinaryGetOwnMetadata,
	  set: ordinaryDefineOwnMetadata,
	  keys: ordinaryOwnMetadataKeys,
	  key: toMetaKey,
	  exp: exp
	};

/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(273)
	  , anObject               = __webpack_require__(12)
	  , toMetaKey              = metadata.key
	  , getOrCreateMetadataMap = metadata.map
	  , store                  = metadata.store;

	metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
	  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
	    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
	  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
	  if(metadataMap.size)return true;
	  var targetMetadata = store.get(target);
	  targetMetadata['delete'](targetKey);
	  return !!targetMetadata.size || store['delete'](target);
	}});

/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(273)
	  , anObject               = __webpack_require__(12)
	  , getPrototypeOf         = __webpack_require__(57)
	  , ordinaryHasOwnMetadata = metadata.has
	  , ordinaryGetOwnMetadata = metadata.get
	  , toMetaKey              = metadata.key;

	var ordinaryGetMetadata = function(MetadataKey, O, P){
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
	};

	metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	var Set                     = __webpack_require__(211)
	  , from                    = __webpack_require__(264)
	  , metadata                = __webpack_require__(273)
	  , anObject                = __webpack_require__(12)
	  , getPrototypeOf          = __webpack_require__(57)
	  , ordinaryOwnMetadataKeys = metadata.keys
	  , toMetaKey               = metadata.key;

	var ordinaryMetadataKeys = function(O, P){
	  var oKeys  = ordinaryOwnMetadataKeys(O, P)
	    , parent = getPrototypeOf(O);
	  if(parent === null)return oKeys;
	  var pKeys  = ordinaryMetadataKeys(parent, P);
	  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
	};

	metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
	  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	}});

/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(273)
	  , anObject               = __webpack_require__(12)
	  , ordinaryGetOwnMetadata = metadata.get
	  , toMetaKey              = metadata.key;

	metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
	    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	var metadata                = __webpack_require__(273)
	  , anObject                = __webpack_require__(12)
	  , ordinaryOwnMetadataKeys = metadata.keys
	  , toMetaKey               = metadata.key;

	metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
	  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	}});

/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(273)
	  , anObject               = __webpack_require__(12)
	  , getPrototypeOf         = __webpack_require__(57)
	  , ordinaryHasOwnMetadata = metadata.has
	  , toMetaKey              = metadata.key;

	var ordinaryHasMetadata = function(MetadataKey, O, P){
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if(hasOwn)return true;
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
	};

	metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(273)
	  , anObject               = __webpack_require__(12)
	  , ordinaryHasOwnMetadata = metadata.has
	  , toMetaKey              = metadata.key;

	metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
	    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	var metadata                  = __webpack_require__(273)
	  , anObject                  = __webpack_require__(12)
	  , aFunction                 = __webpack_require__(21)
	  , toMetaKey                 = metadata.key
	  , ordinaryDefineOwnMetadata = metadata.set;

	metadata.exp({metadata: function metadata(metadataKey, metadataValue){
	  return function decorator(target, targetKey){
	    ordinaryDefineOwnMetadata(
	      metadataKey, metadataValue,
	      (targetKey !== undefined ? anObject : aFunction)(target),
	      toMetaKey(targetKey)
	    );
	  };
	}});

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	// ie9- setTimeout & setInterval additional parameters fix
	var global     = __webpack_require__(4)
	  , $export    = __webpack_require__(9)
	  , invoke     = __webpack_require__(76)
	  , partial    = __webpack_require__(283)
	  , navigator  = global.navigator
	  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
	var wrap = function(set){
	  return MSIE ? function(fn, time /*, ...args */){
	    return set(invoke(
	      partial,
	      [].slice.call(arguments, 2),
	      typeof fn == 'function' ? fn : Function(fn)
	    ), time);
	  } : set;
	};
	$export($export.G + $export.B + $export.F * MSIE, {
	  setTimeout:  wrap(global.setTimeout),
	  setInterval: wrap(global.setInterval)
	});

/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var path      = __webpack_require__(284)
	  , invoke    = __webpack_require__(76)
	  , aFunction = __webpack_require__(21);
	module.exports = function(/* ...pargs */){
	  var fn     = aFunction(this)
	    , length = arguments.length
	    , pargs  = Array(length)
	    , i      = 0
	    , _      = path._
	    , holder = false;
	  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
	  return function(/* ...args */){
	    var that = this
	      , aLen = arguments.length
	      , j = 0, k = 0, args;
	    if(!holder && !aLen)return invoke(fn, pargs, that);
	    args = pargs.slice();
	    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
	    while(aLen > k)args.push(arguments[k++]);
	    return invoke(fn, args, that);
	  };
	};

/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);

/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(9)
	  , $task   = __webpack_require__(205);
	$export($export.G + $export.B, {
	  setImmediate:   $task.set,
	  clearImmediate: $task.clear
	});

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	var $iterators    = __webpack_require__(191)
	  , redefine      = __webpack_require__(18)
	  , global        = __webpack_require__(4)
	  , hide          = __webpack_require__(10)
	  , Iterators     = __webpack_require__(128)
	  , wks           = __webpack_require__(25)
	  , ITERATOR      = wks('iterator')
	  , TO_STRING_TAG = wks('toStringTag')
	  , ArrayValues   = Iterators.Array;

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype
	    , key;
	  if(proto){
	    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
	    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	    Iterators[NAME] = ArrayValues;
	    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
	  }
	}

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */

	!(function(global) {
	  "use strict";

	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var iteratorSymbol =
	    typeof Symbol === "function" && Symbol.iterator || "@@iterator";

	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };

	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }

	  function AsyncIterator(generator) {
	    // This invoke function is written in a style that assumes some
	    // calling function (or Promise) will handle exceptions.
	    function invoke(method, arg) {
	      var result = generator[method](arg);
	      var value = result.value;
	      return value instanceof AwaitArgument
	        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
	        : Promise.resolve(value).then(function(unwrapped) {
	            // When a yielded Promise is resolved, its final value becomes
	            // the .value of the Promise<{value,done}> result for the
	            // current iteration. If the Promise is rejected, however, the
	            // result for this iteration will be rejected with the same
	            // reason. Note that rejections of yielded Promises are not
	            // thrown back into the generator function, as is the case
	            // when an awaited Promise is rejected. This difference in
	            // behavior between yield and await is important, because it
	            // allows the consumer to decide what to do with the yielded
	            // rejection (swallow it and continue, manually .throw it back
	            // into the generator, abandon iteration, whatever). With
	            // await, by contrast, there is no opportunity to examine the
	            // rejection reason outside the generator function, so the
	            // only option is to throw it from the await expression, and
	            // let the generator function handle the exception.
	            result.value = unwrapped;
	            return result;
	          });
	    }

	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }

	    var invokeNext = invoke.bind(generator, "next");
	    var invokeThrow = invoke.bind(generator, "throw");
	    var invokeReturn = invoke.bind(generator, "return");
	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return invoke(method, arg);
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : new Promise(function (resolve) {
	          resolve(callInvokeWithMethodAndArg());
	        });
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;

	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }

	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }

	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );

	          if (record.type === "throw") {
	            context.delegate = null;

	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }

	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;

	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }

	          context.delegate = null;
	        }

	        if (method === "next") {
	          context._sent = arg;

	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            context.sent = undefined;
	          }
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }

	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }

	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          var info = {
	            value: record.arg,
	            done: context.done
	          };

	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }

	      return ContinueSentinel;
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(288)))

/***/ },
/* 288 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(290);
	module.exports = __webpack_require__(5).RegExp.escape;

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/benjamingr/RexExp.escape
	var $export = __webpack_require__(9)
	  , $re     = __webpack_require__(291)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

	$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ },
/* 291 */
/***/ function(module, exports) {

	module.exports = function(regExp, replace){
	  var replacer = replace === Object(replace) ? function(part){
	    return replace[part];
	  } : replace;
	  return function(it){
	    return String(it).replace(regExp, replacer);
	  };
	};

/***/ },
/* 292 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';

	  if (self.fetch) {
	    return
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)

	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }

	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }

	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob();
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }

	  function Body() {
	    this.bodyUsed = false


	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        }
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }

	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }

	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }

	  Request.prototype.clone = function() {
	    return new Request(this)
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }

	  Body.call(Response.prototype)

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }

	  var redirectStatuses = [301, 302, 303, 307, 308]

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  }

	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;

	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }

	      var xhr = new XMLHttpRequest()

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }

	        return;
	      }

	      xhr.onload = function() {
	        var status = (xhr.status === 1223) ? 204 : xhr.status
	        if (status < 100 || status > 599) {
	          reject(new TypeError('Network request failed'))
	          return
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var m = __webpack_require__(294),
	    IntlPolyfill = m['default'];

	// Expose `IntlPolyfill` as global to add locale data into runtime later on.
	global.IntlPolyfill = IntlPolyfill;

	// Require all locale data for `Intl`. This module will be
	// ignored when bundling for the browser with Browserify/Webpack.
	__webpack_require__(297);

	// hack to export the polyfill as global Intl if needed
	if (!global.Intl) {
	    global.Intl = IntlPolyfill;
	    IntlPolyfill.__applyLocaleSensitivePrototypes();
	}

	// providing an idiomatic api for the nodejs version of this module
	module.exports = exports = IntlPolyfill;
	// preserving the original api in case another module is relying on that
	exports['default'] = IntlPolyfill;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @license Copyright 2013 Andy Earnshaw, MIT License
	 *
	 * Implements the ECMAScript Internationalization API in ES5-compatible environments,
	 * following the ECMA-402 specification as closely as possible
	 *
	 * ECMA-402: http://ecma-international.org/ecma-402/1.0/
	 *
	 * CLDR format locale data should be provided using IntlPolyfill.__addLocaleData().
	 */
	/*jshint esnext: true, proto:true, eqnull:true, boss:true, laxbreak:true, newcap:false, shadow:true, funcscope:true */

	"use strict";
	var src$exp$$ = __webpack_require__(295), src$cldr$$ = __webpack_require__(296);

	var Intl = {},

	    realDefineProp = (function () {
	        var sentinel = {};
	        try {
	            Object.defineProperty(sentinel, 'a', {});
	            return 'a' in sentinel;
	        } catch (e) {
	            return false;
	        }
	    })(),

	    // Need a workaround for getters in ES3
	    es3  = !realDefineProp && !Object.prototype.__defineGetter__,

	    // We use this a lot (and need it for proto-less objects)
	    hop = Object.prototype.hasOwnProperty,

	    // Naive defineProperty for compatibility
	    defineProperty = realDefineProp ? Object.defineProperty : function (obj, name, desc) {
	        if ('get' in desc && obj.__defineGetter__)
	            obj.__defineGetter__(name, desc.get);

	        else if (!hop.call(obj, name) || 'value' in desc)
	            obj[name] = desc.value;
	    },

	    // Array.prototype.indexOf, as good as we need it to be
	    arrIndexOf = Array.prototype.indexOf || function (search) {
	        /*jshint validthis:true */
	        var t = this;
	        if (!t.length)
	            return -1;

	        for (var i = arguments[1] || 0, max = t.length; i < max; i++) {
	            if (t[i] === search)
	                return i;
	        }

	        return -1;
	    },

	    // Create an object with the specified prototype (2nd arg required for Record)
	    objCreate = Object.create || function (proto, props) {
	        var obj;

	        function F() {}
	        F.prototype = proto;
	        obj = new F();

	        for (var k in props) {
	            if (hop.call(props, k))
	                defineProperty(obj, k, props[k]);
	        }

	        return obj;
	    },

	    // Snapshot some (hopefully still) native built-ins
	    arrSlice  = Array.prototype.slice,
	    arrConcat = Array.prototype.concat,
	    arrPush   = Array.prototype.push,
	    arrJoin   = Array.prototype.join,
	    arrShift  = Array.prototype.shift,
	    arrUnshift= Array.prototype.unshift,

	    // Naive Function.prototype.bind for compatibility
	    fnBind = Function.prototype.bind || function (thisObj) {
	        var fn = this,
	            args = arrSlice.call(arguments, 1);

	        // All our (presently) bound functions have either 1 or 0 arguments. By returning
	        // different function signatures, we can pass some tests in ES3 environments
	        if (fn.length === 1) {
	            return function (a) {
	                return fn.apply(thisObj, arrConcat.call(args, arrSlice.call(arguments)));
	            };
	        }
	        else {
	            return function () {
	                return fn.apply(thisObj, arrConcat.call(args, arrSlice.call(arguments)));
	            };
	        }
	    },

	    // Default locale is the first-added locale data for us
	    defaultLocale,

	    // Object housing internal properties for constructors
	    internals = objCreate(null),

	    // Keep internal properties internal
	    secret = Math.random(),

	    // An object map of date component keys, saves using a regex later
	    dateWidths = objCreate(null, { narrow:{}, short:{}, long:{} }),

	    // Each constructor prototype should be an instance of the constructor itself, but we
	    // can't initialise them as such until some locale data has been added, so this is how
	    // we keep track
	    numberFormatProtoInitialised = false,
	    dateTimeFormatProtoInitialised = false,

	    // Some regular expressions we're using
	    expCurrencyCode = /^[A-Z]{3}$/,
	    expUnicodeExSeq = /-u(?:-[0-9a-z]{2,8})+/gi, // See `extension` below

	    // IANA Subtag Registry redundant tag and subtag maps
	    redundantTags = {
	        tags: {
	            "art-lojban":   "jbo",       "i-ami":        "ami",       "i-bnn":       "bnn",  "i-hak":      "hak",
	            "i-klingon":    "tlh",       "i-lux":        "lb",        "i-navajo":    "nv",   "i-pwn":      "pwn",
	            "i-tao":        "tao",       "i-tay":        "tay",       "i-tsu":       "tsu",  "no-bok":     "nb",
	            "no-nyn":       "nn",        "sgn-BE-FR":    "sfb",       "sgn-BE-NL":   "vgt",  "sgn-CH-DE":  "sgg",
	            "zh-guoyu":     "cmn",       "zh-hakka":     "hak",       "zh-min-nan":  "nan",  "zh-xiang":   "hsn",
	            "sgn-BR":       "bzs",       "sgn-CO":       "csn",       "sgn-DE":      "gsg",  "sgn-DK":     "dsl",
	            "sgn-ES":       "ssp",       "sgn-FR":       "fsl",       "sgn-GB":      "bfi",  "sgn-GR":     "gss",
	            "sgn-IE":       "isg",       "sgn-IT":       "ise",       "sgn-JP":      "jsl",  "sgn-MX":     "mfs",
	            "sgn-NI":       "ncs",       "sgn-NL":       "dse",       "sgn-NO":      "nsl",  "sgn-PT":     "psr",
	            "sgn-SE":       "swl",       "sgn-US":       "ase",       "sgn-ZA":      "sfs",  "zh-cmn":     "cmn",
	            "zh-cmn-Hans":  "cmn-Hans",  "zh-cmn-Hant":  "cmn-Hant",  "zh-gan":      "gan",  "zh-wuu":     "wuu",
	            "zh-yue":       "yue"
	        },
	        subtags: {
	              BU: "MM",   DD: "DE",   FX: "FR",   TP: "TL",   YD: "YE",   ZR: "CD",  heploc: "alalc97",
	            'in': "id",   iw: "he",   ji:  "yi",  jw: "jv",   mo: "ro",  ayx: "nun", bjd: "drl",
	             ccq: "rki", cjr: "mom", cka: "cmr", cmk: "xch", drh: "khk", drw: "prs", gav: "dev",
	             hrr: "jal", ibi: "opa", kgh: "kml", lcq: "ppr", mst: "mry", myt: "mry", sca: "hle",
	             tie: "ras", tkk: "twm", tlw: "weo", tnf: "prs", ybd: "rki", yma: "lrr"
	        },
	        extLang: {
	            aao: [ "aao", "ar"  ], abh: [ "abh", "ar"  ], abv: [ "abv", "ar"  ], acm: [ "acm", "ar"  ],
	            acq: [ "acq", "ar"  ], acw: [ "acw", "ar"  ], acx: [ "acx", "ar"  ], acy: [ "acy", "ar"  ],
	            adf: [ "adf", "ar"  ], ads: [ "ads", "sgn" ], aeb: [ "aeb", "ar"  ], aec: [ "aec", "ar"  ],
	            aed: [ "aed", "sgn" ], aen: [ "aen", "sgn" ], afb: [ "afb", "ar"  ], afg: [ "afg", "sgn" ],
	            ajp: [ "ajp", "ar"  ], apc: [ "apc", "ar"  ], apd: [ "apd", "ar"  ], arb: [ "arb", "ar"  ],
	            arq: [ "arq", "ar"  ], ars: [ "ars", "ar"  ], ary: [ "ary", "ar"  ], arz: [ "arz", "ar"  ],
	            ase: [ "ase", "sgn" ], asf: [ "asf", "sgn" ], asp: [ "asp", "sgn" ], asq: [ "asq", "sgn" ],
	            asw: [ "asw", "sgn" ], auz: [ "auz", "ar"  ], avl: [ "avl", "ar"  ], ayh: [ "ayh", "ar"  ],
	            ayl: [ "ayl", "ar"  ], ayn: [ "ayn", "ar"  ], ayp: [ "ayp", "ar"  ], bbz: [ "bbz", "ar"  ],
	            bfi: [ "bfi", "sgn" ], bfk: [ "bfk", "sgn" ], bjn: [ "bjn", "ms"  ], bog: [ "bog", "sgn" ],
	            bqn: [ "bqn", "sgn" ], bqy: [ "bqy", "sgn" ], btj: [ "btj", "ms"  ], bve: [ "bve", "ms"  ],
	            bvl: [ "bvl", "sgn" ], bvu: [ "bvu", "ms"  ], bzs: [ "bzs", "sgn" ], cdo: [ "cdo", "zh"  ],
	            cds: [ "cds", "sgn" ], cjy: [ "cjy", "zh"  ], cmn: [ "cmn", "zh"  ], coa: [ "coa", "ms"  ],
	            cpx: [ "cpx", "zh"  ], csc: [ "csc", "sgn" ], csd: [ "csd", "sgn" ], cse: [ "cse", "sgn" ],
	            csf: [ "csf", "sgn" ], csg: [ "csg", "sgn" ], csl: [ "csl", "sgn" ], csn: [ "csn", "sgn" ],
	            csq: [ "csq", "sgn" ], csr: [ "csr", "sgn" ], czh: [ "czh", "zh"  ], czo: [ "czo", "zh"  ],
	            doq: [ "doq", "sgn" ], dse: [ "dse", "sgn" ], dsl: [ "dsl", "sgn" ], dup: [ "dup", "ms"  ],
	            ecs: [ "ecs", "sgn" ], esl: [ "esl", "sgn" ], esn: [ "esn", "sgn" ], eso: [ "eso", "sgn" ],
	            eth: [ "eth", "sgn" ], fcs: [ "fcs", "sgn" ], fse: [ "fse", "sgn" ], fsl: [ "fsl", "sgn" ],
	            fss: [ "fss", "sgn" ], gan: [ "gan", "zh"  ], gds: [ "gds", "sgn" ], gom: [ "gom", "kok" ],
	            gse: [ "gse", "sgn" ], gsg: [ "gsg", "sgn" ], gsm: [ "gsm", "sgn" ], gss: [ "gss", "sgn" ],
	            gus: [ "gus", "sgn" ], hab: [ "hab", "sgn" ], haf: [ "haf", "sgn" ], hak: [ "hak", "zh"  ],
	            hds: [ "hds", "sgn" ], hji: [ "hji", "ms"  ], hks: [ "hks", "sgn" ], hos: [ "hos", "sgn" ],
	            hps: [ "hps", "sgn" ], hsh: [ "hsh", "sgn" ], hsl: [ "hsl", "sgn" ], hsn: [ "hsn", "zh"  ],
	            icl: [ "icl", "sgn" ], ils: [ "ils", "sgn" ], inl: [ "inl", "sgn" ], ins: [ "ins", "sgn" ],
	            ise: [ "ise", "sgn" ], isg: [ "isg", "sgn" ], isr: [ "isr", "sgn" ], jak: [ "jak", "ms"  ],
	            jax: [ "jax", "ms"  ], jcs: [ "jcs", "sgn" ], jhs: [ "jhs", "sgn" ], jls: [ "jls", "sgn" ],
	            jos: [ "jos", "sgn" ], jsl: [ "jsl", "sgn" ], jus: [ "jus", "sgn" ], kgi: [ "kgi", "sgn" ],
	            knn: [ "knn", "kok" ], kvb: [ "kvb", "ms"  ], kvk: [ "kvk", "sgn" ], kvr: [ "kvr", "ms"  ],
	            kxd: [ "kxd", "ms"  ], lbs: [ "lbs", "sgn" ], lce: [ "lce", "ms"  ], lcf: [ "lcf", "ms"  ],
	            liw: [ "liw", "ms"  ], lls: [ "lls", "sgn" ], lsg: [ "lsg", "sgn" ], lsl: [ "lsl", "sgn" ],
	            lso: [ "lso", "sgn" ], lsp: [ "lsp", "sgn" ], lst: [ "lst", "sgn" ], lsy: [ "lsy", "sgn" ],
	            ltg: [ "ltg", "lv"  ], lvs: [ "lvs", "lv"  ], lzh: [ "lzh", "zh"  ], max: [ "max", "ms"  ],
	            mdl: [ "mdl", "sgn" ], meo: [ "meo", "ms"  ], mfa: [ "mfa", "ms"  ], mfb: [ "mfb", "ms"  ],
	            mfs: [ "mfs", "sgn" ], min: [ "min", "ms"  ], mnp: [ "mnp", "zh"  ], mqg: [ "mqg", "ms"  ],
	            mre: [ "mre", "sgn" ], msd: [ "msd", "sgn" ], msi: [ "msi", "ms"  ], msr: [ "msr", "sgn" ],
	            mui: [ "mui", "ms"  ], mzc: [ "mzc", "sgn" ], mzg: [ "mzg", "sgn" ], mzy: [ "mzy", "sgn" ],
	            nan: [ "nan", "zh"  ], nbs: [ "nbs", "sgn" ], ncs: [ "ncs", "sgn" ], nsi: [ "nsi", "sgn" ],
	            nsl: [ "nsl", "sgn" ], nsp: [ "nsp", "sgn" ], nsr: [ "nsr", "sgn" ], nzs: [ "nzs", "sgn" ],
	            okl: [ "okl", "sgn" ], orn: [ "orn", "ms"  ], ors: [ "ors", "ms"  ], pel: [ "pel", "ms"  ],
	            pga: [ "pga", "ar"  ], pks: [ "pks", "sgn" ], prl: [ "prl", "sgn" ], prz: [ "prz", "sgn" ],
	            psc: [ "psc", "sgn" ], psd: [ "psd", "sgn" ], pse: [ "pse", "ms"  ], psg: [ "psg", "sgn" ],
	            psl: [ "psl", "sgn" ], pso: [ "pso", "sgn" ], psp: [ "psp", "sgn" ], psr: [ "psr", "sgn" ],
	            pys: [ "pys", "sgn" ], rms: [ "rms", "sgn" ], rsi: [ "rsi", "sgn" ], rsl: [ "rsl", "sgn" ],
	            sdl: [ "sdl", "sgn" ], sfb: [ "sfb", "sgn" ], sfs: [ "sfs", "sgn" ], sgg: [ "sgg", "sgn" ],
	            sgx: [ "sgx", "sgn" ], shu: [ "shu", "ar"  ], slf: [ "slf", "sgn" ], sls: [ "sls", "sgn" ],
	            sqk: [ "sqk", "sgn" ], sqs: [ "sqs", "sgn" ], ssh: [ "ssh", "ar"  ], ssp: [ "ssp", "sgn" ],
	            ssr: [ "ssr", "sgn" ], svk: [ "svk", "sgn" ], swc: [ "swc", "sw"  ], swh: [ "swh", "sw"  ],
	            swl: [ "swl", "sgn" ], syy: [ "syy", "sgn" ], tmw: [ "tmw", "ms"  ], tse: [ "tse", "sgn" ],
	            tsm: [ "tsm", "sgn" ], tsq: [ "tsq", "sgn" ], tss: [ "tss", "sgn" ], tsy: [ "tsy", "sgn" ],
	            tza: [ "tza", "sgn" ], ugn: [ "ugn", "sgn" ], ugy: [ "ugy", "sgn" ], ukl: [ "ukl", "sgn" ],
	            uks: [ "uks", "sgn" ], urk: [ "urk", "ms"  ], uzn: [ "uzn", "uz"  ], uzs: [ "uzs", "uz"  ],
	            vgt: [ "vgt", "sgn" ], vkk: [ "vkk", "ms"  ], vkt: [ "vkt", "ms"  ], vsi: [ "vsi", "sgn" ],
	            vsl: [ "vsl", "sgn" ], vsv: [ "vsv", "sgn" ], wuu: [ "wuu", "zh"  ], xki: [ "xki", "sgn" ],
	            xml: [ "xml", "sgn" ], xmm: [ "xmm", "ms"  ], xms: [ "xms", "sgn" ], yds: [ "yds", "sgn" ],
	            ysl: [ "ysl", "sgn" ], yue: [ "yue", "zh"  ], zib: [ "zib", "sgn" ], zlm: [ "zlm", "ms"  ],
	            zmi: [ "zmi", "ms"  ], zsl: [ "zsl", "sgn" ], zsm: [ "zsm", "ms"  ]
	        }
	    },

	    // Currency minor units output from get-4217 grunt task, formatted
	    currencyMinorUnits = {
	        BHD: 3, BYR: 0, XOF: 0, BIF: 0, XAF: 0, CLF: 4, CLP: 0, KMF: 0, DJF: 0,
	        XPF: 0, GNF: 0, ISK: 0, IQD: 3, JPY: 0, JOD: 3, KRW: 0, KWD: 3, LYD: 3,
	        OMR: 3, PYG: 0, RWF: 0, TND: 3, UGX: 0, UYI: 0, VUV: 0, VND: 0
	    };

	// Sect 6.2 Language Tags
	// ======================

	/**
	 * The IsStructurallyValidLanguageTag abstract operation verifies that the locale
	 * argument (which must be a String value)
	 *
	 * - represents a well-formed BCP 47 language tag as specified in RFC 5646 section
	 *   2.1, or successor,
	 * - does not include duplicate variant subtags, and
	 * - does not include duplicate singleton subtags.
	 *
	 * The abstract operation returns true if locale can be generated from the ABNF
	 * grammar in section 2.1 of the RFC, starting with Language-Tag, and does not
	 * contain duplicate variant or singleton subtags (other than as a private use
	 * subtag). It returns false otherwise. Terminal value characters in the grammar are
	 * interpreted as the Unicode equivalents of the ASCII octet values given.
	 */
	function /* 6.2.2 */IsStructurallyValidLanguageTag(locale) {
	    // represents a well-formed BCP 47 language tag as specified in RFC 5646
	    if (!src$exp$$.expBCP47Syntax.test(locale))
	        return false;

	    // does not include duplicate variant subtags, and
	    if (src$exp$$.expVariantDupes.test(locale))
	        return false;

	    // does not include duplicate singleton subtags.
	    if (src$exp$$.expSingletonDupes.test(locale))
	        return false;

	    return true;
	}

	/**
	 * The CanonicalizeLanguageTag abstract operation returns the canonical and case-
	 * regularized form of the locale argument (which must be a String value that is
	 * a structurally valid BCP 47 language tag as verified by the
	 * IsStructurallyValidLanguageTag abstract operation). It takes the steps
	 * specified in RFC 5646 section 4.5, or successor, to bring the language tag
	 * into canonical form, and to regularize the case of the subtags, but does not
	 * take the steps to bring a language tag into “extlang form” and to reorder
	 * variant subtags.

	 * The specifications for extensions to BCP 47 language tags, such as RFC 6067,
	 * may include canonicalization rules for the extension subtag sequences they
	 * define that go beyond the canonicalization rules of RFC 5646 section 4.5.
	 * Implementations are allowed, but not required, to apply these additional rules.
	 */
	function /* 6.2.3 */CanonicalizeLanguageTag (locale) {
	    var match, parts;

	    // A language tag is in 'canonical form' when the tag is well-formed
	    // according to the rules in Sections 2.1 and 2.2

	    // Section 2.1 says all subtags use lowercase...
	    locale = locale.toLowerCase();

	    // ...with 2 exceptions: 'two-letter and four-letter subtags that neither
	    // appear at the start of the tag nor occur after singletons.  Such two-letter
	    // subtags are all uppercase (as in the tags "en-CA-x-ca" or "sgn-BE-FR") and
	    // four-letter subtags are titlecase (as in the tag "az-Latn-x-latn").
	    parts = locale.split('-');
	    for (var i = 1, max = parts.length; i < max; i++) {
	        // Two-letter subtags are all uppercase
	        if (parts[i].length === 2)
	            parts[i] = parts[i].toUpperCase();

	        // Four-letter subtags are titlecase
	        else if (parts[i].length === 4)
	            parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);

	        // Is it a singleton?
	        else if (parts[i].length === 1 && parts[i] !== 'x')
	            break;
	    }
	    locale = arrJoin.call(parts, '-');

	    // The steps laid out in RFC 5646 section 4.5 are as follows:

	    // 1.  Extension sequences are ordered into case-insensitive ASCII order
	    //     by singleton subtag.
	    if ((match = locale.match(src$exp$$.expExtSequences)) && match.length > 1) {
	        // The built-in sort() sorts by ASCII order, so use that
	        match.sort();

	        // Replace all extensions with the joined, sorted array
	        locale = locale.replace(
	            RegExp('(?:' + src$exp$$.expExtSequences.source + ')+', 'i'),
	            arrJoin.call(match, '')
	        );
	    }

	    // 2.  Redundant or grandfathered tags are replaced by their 'Preferred-
	    //     Value', if there is one.
	    if (hop.call(redundantTags.tags, locale))
	        locale = redundantTags.tags[locale];

	    // 3.  Subtags are replaced by their 'Preferred-Value', if there is one.
	    //     For extlangs, the original primary language subtag is also
	    //     replaced if there is a primary language subtag in the 'Preferred-
	    //     Value'.
	    parts = locale.split('-');

	    for (var i = 1, max = parts.length; i < max; i++) {
	        if (hop.call(redundantTags.subtags, parts[i]))
	            parts[i] = redundantTags.subtags[parts[i]];

	        else if (hop.call(redundantTags.extLang, parts[i])) {
	            parts[i] = redundantTags.extLang[parts[i]][0];

	            // For extlang tags, the prefix needs to be removed if it is redundant
	            if (i === 1 && redundantTags.extLang[parts[1]][1] === parts[0]) {
	                parts = arrSlice.call(parts, i++);
	                max -= 1;
	            }
	        }
	    }

	    return arrJoin.call(parts, '-');
	}

	/**
	 * The DefaultLocale abstract operation returns a String value representing the
	 * structurally valid (6.2.2) and canonicalized (6.2.3) BCP 47 language tag for the
	 * host environment’s current locale.
	 */
	function /* 6.2.4 */DefaultLocale () {
	    return defaultLocale;
	}

	// Sect 6.3 Currency Codes
	// =======================

	/**
	 * The IsWellFormedCurrencyCode abstract operation verifies that the currency argument
	 * (after conversion to a String value) represents a well-formed 3-letter ISO currency
	 * code. The following steps are taken:
	 */
	function /* 6.3.1 */IsWellFormedCurrencyCode(currency) {
	    var
	        // 1. Let `c` be ToString(currency)
	        c = String(currency),

	        // 2. Let `normalized` be the result of mapping c to upper case as described
	        //    in 6.1.
	        normalized = toLatinUpperCase(c);

	    // 3. If the string length of normalized is not 3, return false.
	    // 4. If normalized contains any character that is not in the range "A" to "Z"
	    //    (U+0041 to U+005A), return false.
	    if (expCurrencyCode.test(normalized) === false)
	        return false;

	    // 5. Return true
	    return true;
	}

	// Sect 9.2 Abstract Operations
	// ============================
	function /* 9.2.1 */CanonicalizeLocaleList (locales) {
	// The abstract operation CanonicalizeLocaleList takes the following steps:

	    // 1. If locales is undefined, then a. Return a new empty List
	    if (locales === undefined)
	        return new List();

	    var
	        // 2. Let seen be a new empty List.
	        seen = new List(),

	        // 3. If locales is a String value, then
	        //    a. Let locales be a new array created as if by the expression new
	        //    Array(locales) where Array is the standard built-in constructor with
	        //    that name and locales is the value of locales.
	        locales = typeof locales === 'string' ? [ locales ] : locales,

	        // 4. Let O be ToObject(locales).
	        O = toObject(locales),

	        // 5. Let lenValue be the result of calling the [[Get]] internal method of
	        //    O with the argument "length".
	        // 6. Let len be ToUint32(lenValue).
	        len = O.length,

	        // 7. Let k be 0.
	        k = 0;

	    // 8. Repeat, while k < len
	    while (k < len) {
	        var
	            // a. Let Pk be ToString(k).
	            Pk = String(k),

	            // b. Let kPresent be the result of calling the [[HasProperty]] internal
	            //    method of O with argument Pk.
	            kPresent = Pk in O;

	        // c. If kPresent is true, then
	        if (kPresent) {
	            var
	                // i. Let kValue be the result of calling the [[Get]] internal
	                //     method of O with argument Pk.
	                kValue = O[Pk];

	            // ii. If the type of kValue is not String or Object, then throw a
	            //     TypeError exception.
	            if (kValue == null || (typeof kValue !== 'string' && typeof kValue !== 'object'))
	                throw new TypeError('String or Object type expected');

	            var
	                // iii. Let tag be ToString(kValue).
	                tag = String(kValue);

	            // iv. If the result of calling the abstract operation
	            //     IsStructurallyValidLanguageTag (defined in 6.2.2), passing tag as
	            //     the argument, is false, then throw a RangeError exception.
	            if (!IsStructurallyValidLanguageTag(tag))
	                throw new RangeError("'" + tag + "' is not a structurally valid language tag");

	            // v. Let tag be the result of calling the abstract operation
	            //    CanonicalizeLanguageTag (defined in 6.2.3), passing tag as the
	            //    argument.
	            tag = CanonicalizeLanguageTag(tag);

	            // vi. If tag is not an element of seen, then append tag as the last
	            //     element of seen.
	            if (arrIndexOf.call(seen, tag) === -1)
	                arrPush.call(seen, tag);
	        }

	        // d. Increase k by 1.
	        k++;
	    }

	    // 9. Return seen.
	    return seen;
	}

	/**
	 * The BestAvailableLocale abstract operation compares the provided argument
	 * locale, which must be a String value with a structurally valid and
	 * canonicalized BCP 47 language tag, against the locales in availableLocales and
	 * returns either the longest non-empty prefix of locale that is an element of
	 * availableLocales, or undefined if there is no such element. It uses the
	 * fallback mechanism of RFC 4647, section 3.4. The following steps are taken:
	 */
	function /* 9.2.2 */BestAvailableLocale (availableLocales, locale) {
	    var
	       // 1. Let candidate be locale
	       candidate = locale;

	    // 2. Repeat
	    while (true) {
	        // a. If availableLocales contains an element equal to candidate, then return
	        // candidate.
	        if (arrIndexOf.call(availableLocales, candidate) > -1)
	            return candidate;

	        var
	            // b. Let pos be the character index of the last occurrence of "-"
	            // (U+002D) within candidate. If that character does not occur, return
	            // undefined.
	            pos = candidate.lastIndexOf('-');

	        if (pos < 0)
	            return;

	        // c. If pos ≥ 2 and the character "-" occurs at index pos-2 of candidate,
	        //    then decrease pos by 2.
	        if (pos >= 2 && candidate.charAt(pos - 2) === '-')
	            pos -= 2;

	        // d. Let candidate be the substring of candidate from position 0, inclusive,
	        //    to position pos, exclusive.
	        candidate = candidate.substring(0, pos);
	    }
	}

	/**
	 * The LookupMatcher abstract operation compares requestedLocales, which must be
	 * a List as returned by CanonicalizeLocaleList, against the locales in
	 * availableLocales and determines the best available language to meet the
	 * request. The following steps are taken:
	 */
	function /* 9.2.3 */LookupMatcher (availableLocales, requestedLocales) {
	    var
	        // 1. Let i be 0.
	        i = 0,

	        // 2. Let len be the number of elements in requestedLocales.
	        len = requestedLocales.length,

	        // 3. Let availableLocale be undefined.
	        availableLocale;

	    // 4. Repeat while i < len and availableLocale is undefined:
	    while (i < len && !availableLocale) {
	        var
	            // a. Let locale be the element of requestedLocales at 0-origined list
	            //    position i.
	            locale = requestedLocales[i],

	            // b. Let noExtensionsLocale be the String value that is locale with all
	            //    Unicode locale extension sequences removed.
	            noExtensionsLocale = String(locale).replace(expUnicodeExSeq, ''),

	            // c. Let availableLocale be the result of calling the
	            //    BestAvailableLocale abstract operation (defined in 9.2.2) with
	            //    arguments availableLocales and noExtensionsLocale.
	            availableLocale = BestAvailableLocale(availableLocales, noExtensionsLocale);

	        // d. Increase i by 1.
	        i++;
	    }

	    var
	        // 5. Let result be a new Record.
	        result = new Record();

	    // 6. If availableLocale is not undefined, then
	    if (availableLocale !== undefined) {
	        // a. Set result.[[locale]] to availableLocale.
	        result['[[locale]]'] = availableLocale;

	        // b. If locale and noExtensionsLocale are not the same String value, then
	        if (String(locale) !== String(noExtensionsLocale)) {
	            var
	                // i. Let extension be the String value consisting of the first
	                //    substring of locale that is a Unicode locale extension sequence.
	                extension = locale.match(expUnicodeExSeq)[0],

	                // ii. Let extensionIndex be the character position of the initial
	                //     "-" of the first Unicode locale extension sequence within locale.
	                extensionIndex = locale.indexOf('-u-');

	            // iii. Set result.[[extension]] to extension.
	            result['[[extension]]'] = extension;

	            // iv. Set result.[[extensionIndex]] to extensionIndex.
	            result['[[extensionIndex]]'] = extensionIndex;
	        }
	    }
	    // 7. Else
	    else
	        // a. Set result.[[locale]] to the value returned by the DefaultLocale abstract
	        //    operation (defined in 6.2.4).
	        result['[[locale]]'] = DefaultLocale();

	    // 8. Return result
	    return result;
	}

	/**
	 * The BestFitMatcher abstract operation compares requestedLocales, which must be
	 * a List as returned by CanonicalizeLocaleList, against the locales in
	 * availableLocales and determines the best available language to meet the
	 * request. The algorithm is implementation dependent, but should produce results
	 * that a typical user of the requested locales would perceive as at least as
	 * good as those produced by the LookupMatcher abstract operation. Options
	 * specified through Unicode locale extension sequences must be ignored by the
	 * algorithm. Information about such subsequences is returned separately.
	 * The abstract operation returns a record with a [[locale]] field, whose value
	 * is the language tag of the selected locale, which must be an element of
	 * availableLocales. If the language tag of the request locale that led to the
	 * selected locale contained a Unicode locale extension sequence, then the
	 * returned record also contains an [[extension]] field whose value is the first
	 * Unicode locale extension sequence, and an [[extensionIndex]] field whose value
	 * is the index of the first Unicode locale extension sequence within the request
	 * locale language tag.
	 */
	function /* 9.2.4 */BestFitMatcher (availableLocales, requestedLocales) {
	    return LookupMatcher(availableLocales, requestedLocales);
	}

	/**
	 * The ResolveLocale abstract operation compares a BCP 47 language priority list
	 * requestedLocales against the locales in availableLocales and determines the
	 * best available language to meet the request. availableLocales and
	 * requestedLocales must be provided as List values, options as a Record.
	 */
	function /* 9.2.5 */ResolveLocale (availableLocales, requestedLocales, options, relevantExtensionKeys, localeData) {
	    if (availableLocales.length === 0) {
	        throw new ReferenceError('No locale data has been provided for this object yet.');
	    }

	    // The following steps are taken:
	    var
	        // 1. Let matcher be the value of options.[[localeMatcher]].
	        matcher = options['[[localeMatcher]]'];

	    // 2. If matcher is "lookup", then
	    if (matcher === 'lookup')
	        var
	            // a. Let r be the result of calling the LookupMatcher abstract operation
	            //    (defined in 9.2.3) with arguments availableLocales and
	            //    requestedLocales.
	            r = LookupMatcher(availableLocales, requestedLocales);

	    // 3. Else
	    else
	        var
	            // a. Let r be the result of calling the BestFitMatcher abstract
	            //    operation (defined in 9.2.4) with arguments availableLocales and
	            //    requestedLocales.
	            r = BestFitMatcher(availableLocales, requestedLocales);

	    var
	        // 4. Let foundLocale be the value of r.[[locale]].
	        foundLocale = r['[[locale]]'];

	    // 5. If r has an [[extension]] field, then
	    if (hop.call(r, '[[extension]]'))
	        var
	            // a. Let extension be the value of r.[[extension]].
	            extension = r['[[extension]]'],
	            // b. Let extensionIndex be the value of r.[[extensionIndex]].
	            extensionIndex = r['[[extensionIndex]]'],
	            // c. Let split be the standard built-in function object defined in ES5,
	            //    15.5.4.14.
	            split = String.prototype.split,
	            // d. Let extensionSubtags be the result of calling the [[Call]] internal
	            //    method of split with extension as the this value and an argument
	            //    list containing the single item "-".
	            extensionSubtags = split.call(extension, '-'),
	            // e. Let extensionSubtagsLength be the result of calling the [[Get]]
	            //    internal method of extensionSubtags with argument "length".
	            extensionSubtagsLength = extensionSubtags.length;

	    var
	        // 6. Let result be a new Record.
	        result = new Record();

	    // 7. Set result.[[dataLocale]] to foundLocale.
	    result['[[dataLocale]]'] = foundLocale;

	    var
	        // 8. Let supportedExtension be "-u".
	        supportedExtension = '-u',
	        // 9. Let i be 0.
	        i = 0,
	        // 10. Let len be the result of calling the [[Get]] internal method of
	        //     relevantExtensionKeys with argument "length".
	        len = relevantExtensionKeys.length;

	    // 11 Repeat while i < len:
	    while (i < len) {
	        var
	            // a. Let key be the result of calling the [[Get]] internal method of
	            //    relevantExtensionKeys with argument ToString(i).
	            key = relevantExtensionKeys[i],
	            // b. Let foundLocaleData be the result of calling the [[Get]] internal
	            //    method of localeData with the argument foundLocale.
	            foundLocaleData = localeData[foundLocale],
	            // c. Let keyLocaleData be the result of calling the [[Get]] internal
	            //    method of foundLocaleData with the argument key.
	            keyLocaleData = foundLocaleData[key],
	            // d. Let value be the result of calling the [[Get]] internal method of
	            //    keyLocaleData with argument "0".
	            value = keyLocaleData['0'],
	            // e. Let supportedExtensionAddition be "".
	            supportedExtensionAddition = '',
	            // f. Let indexOf be the standard built-in function object defined in
	            //    ES5, 15.4.4.14.
	            indexOf = arrIndexOf;

	        // g. If extensionSubtags is not undefined, then
	        if (extensionSubtags !== undefined) {
	            var
	                // i. Let keyPos be the result of calling the [[Call]] internal
	                //    method of indexOf with extensionSubtags as the this value and
	                // an argument list containing the single item key.
	                keyPos = indexOf.call(extensionSubtags, key);

	            // ii. If keyPos ≠ -1, then
	            if (keyPos !== -1) {
	                // 1. If keyPos + 1 < extensionSubtagsLength and the length of the
	                //    result of calling the [[Get]] internal method of
	                //    extensionSubtags with argument ToString(keyPos +1) is greater
	                //    than 2, then
	                if (keyPos + 1 < extensionSubtagsLength
	                        && extensionSubtags[keyPos + 1].length > 2) {
	                    var
	                        // a. Let requestedValue be the result of calling the [[Get]]
	                        //    internal method of extensionSubtags with argument
	                        //    ToString(keyPos + 1).
	                        requestedValue = extensionSubtags[keyPos + 1],
	                        // b. Let valuePos be the result of calling the [[Call]]
	                        //    internal method of indexOf with keyLocaleData as the
	                        //    this value and an argument list containing the single
	                        //    item requestedValue.
	                        valuePos = indexOf.call(keyLocaleData, requestedValue);

	                    // c. If valuePos ≠ -1, then
	                    if (valuePos !== -1)
	                        var
	                            // i. Let value be requestedValue.
	                            value = requestedValue,
	                            // ii. Let supportedExtensionAddition be the
	                            //     concatenation of "-", key, "-", and value.
	                            supportedExtensionAddition = '-' + key + '-' + value;
	                }
	                // 2. Else
	                else {
	                    var
	                        // a. Let valuePos be the result of calling the [[Call]]
	                        // internal method of indexOf with keyLocaleData as the this
	                        // value and an argument list containing the single item
	                        // "true".
	                        valuePos = indexOf(keyLocaleData, 'true');

	                    // b. If valuePos ≠ -1, then
	                    if (valuePos !== -1)
	                        var
	                            // i. Let value be "true".
	                            value = 'true';
	                }
	            }
	        }
	        // h. If options has a field [[<key>]], then
	        if (hop.call(options, '[[' + key + ']]')) {
	            var
	                // i. Let optionsValue be the value of options.[[<key>]].
	                optionsValue = options['[[' + key + ']]'];

	            // ii. If the result of calling the [[Call]] internal method of indexOf
	            //     with keyLocaleData as the this value and an argument list
	            //     containing the single item optionsValue is not -1, then
	            if (indexOf.call(keyLocaleData, optionsValue) !== -1) {
	                // 1. If optionsValue is not equal to value, then
	                if (optionsValue !== value) {
	                    // a. Let value be optionsValue.
	                    value = optionsValue;
	                    // b. Let supportedExtensionAddition be "".
	                    supportedExtensionAddition = '';
	                }
	            }
	        }
	        // i. Set result.[[<key>]] to value.
	        result['[[' + key + ']]'] = value;

	        // j. Append supportedExtensionAddition to supportedExtension.
	        supportedExtension += supportedExtensionAddition;

	        // k. Increase i by 1.
	        i++;
	    }
	    // 12. If the length of supportedExtension is greater than 2, then
	    if (supportedExtension.length > 2) {
	        var
	            // a. Let preExtension be the substring of foundLocale from position 0,
	            //    inclusive, to position extensionIndex, exclusive.
	            preExtension = foundLocale.substring(0, extensionIndex),
	            // b. Let postExtension be the substring of foundLocale from position
	            //    extensionIndex to the end of the string.
	            postExtension = foundLocale.substring(extensionIndex),
	            // c. Let foundLocale be the concatenation of preExtension,
	            //    supportedExtension, and postExtension.
	            foundLocale = preExtension + supportedExtension + postExtension;
	    }
	    // 13. Set result.[[locale]] to foundLocale.
	    result['[[locale]]'] = foundLocale;

	    // 14. Return result.
	    return result;
	}

	/**
	 * The LookupSupportedLocales abstract operation returns the subset of the
	 * provided BCP 47 language priority list requestedLocales for which
	 * availableLocales has a matching locale when using the BCP 47 Lookup algorithm.
	 * Locales appear in the same order in the returned list as in requestedLocales.
	 * The following steps are taken:
	 */
	function /* 9.2.6 */LookupSupportedLocales (availableLocales, requestedLocales) {
	    var
	        // 1. Let len be the number of elements in requestedLocales.
	        len = requestedLocales.length,
	        // 2. Let subset be a new empty List.
	        subset = new List(),
	        // 3. Let k be 0.
	        k = 0;

	    // 4. Repeat while k < len
	    while (k < len) {
	        var
	            // a. Let locale be the element of requestedLocales at 0-origined list
	            //    position k.
	            locale = requestedLocales[k],
	            // b. Let noExtensionsLocale be the String value that is locale with all
	            //    Unicode locale extension sequences removed.
	            noExtensionsLocale = String(locale).replace(expUnicodeExSeq, ''),
	            // c. Let availableLocale be the result of calling the
	            //    BestAvailableLocale abstract operation (defined in 9.2.2) with
	            //    arguments availableLocales and noExtensionsLocale.
	            availableLocale = BestAvailableLocale(availableLocales, noExtensionsLocale);

	        // d. If availableLocale is not undefined, then append locale to the end of
	        //    subset.
	        if (availableLocale !== undefined)
	            arrPush.call(subset, locale);

	        // e. Increment k by 1.
	        k++;
	    }

	    var
	        // 5. Let subsetArray be a new Array object whose elements are the same
	        //    values in the same order as the elements of subset.
	        subsetArray = arrSlice.call(subset);

	    // 6. Return subsetArray.
	    return subsetArray;
	}

	/**
	 * The BestFitSupportedLocales abstract operation returns the subset of the
	 * provided BCP 47 language priority list requestedLocales for which
	 * availableLocales has a matching locale when using the Best Fit Matcher
	 * algorithm. Locales appear in the same order in the returned list as in
	 * requestedLocales. The steps taken are implementation dependent.
	 */
	function /*9.2.7 */BestFitSupportedLocales (availableLocales, requestedLocales) {
	    // ###TODO: implement this function as described by the specification###
	    return LookupSupportedLocales(availableLocales, requestedLocales);
	}

	/**
	 * The SupportedLocales abstract operation returns the subset of the provided BCP
	 * 47 language priority list requestedLocales for which availableLocales has a
	 * matching locale. Two algorithms are available to match the locales: the Lookup
	 * algorithm described in RFC 4647 section 3.4, and an implementation dependent
	 * best-fit algorithm. Locales appear in the same order in the returned list as
	 * in requestedLocales. The following steps are taken:
	 */
	function /*9.2.8 */SupportedLocales (availableLocales, requestedLocales, options) {
	    // 1. If options is not undefined, then
	    if (options !== undefined) {
	        var
	            // a. Let options be ToObject(options).
	            options = new Record(toObject(options)),
	            // b. Let matcher be the result of calling the [[Get]] internal method of
	            //    options with argument "localeMatcher".
	            matcher = options.localeMatcher;

	        // c. If matcher is not undefined, then
	        if (matcher !== undefined) {
	            // i. Let matcher be ToString(matcher).
	            matcher = String(matcher);

	            // ii. If matcher is not "lookup" or "best fit", then throw a RangeError
	            //     exception.
	            if (matcher !== 'lookup' && matcher !== 'best fit')
	                throw new RangeError('matcher should be "lookup" or "best fit"');
	        }
	    }
	    // 2. If matcher is undefined or "best fit", then
	    if (matcher === undefined || matcher === 'best fit')
	        var
	            // a. Let subset be the result of calling the BestFitSupportedLocales
	            //    abstract operation (defined in 9.2.7) with arguments
	            //    availableLocales and requestedLocales.
	            subset = BestFitSupportedLocales(availableLocales, requestedLocales);
	    // 3. Else
	    else
	        var
	            // a. Let subset be the result of calling the LookupSupportedLocales
	            //    abstract operation (defined in 9.2.6) with arguments
	            //    availableLocales and requestedLocales.
	            subset = LookupSupportedLocales(availableLocales, requestedLocales);

	    // 4. For each named own property name P of subset,
	    for (var P in subset) {
	        if (!hop.call(subset, P))
	            continue;

	        // a. Let desc be the result of calling the [[GetOwnProperty]] internal
	        //    method of subset with P.
	        // b. Set desc.[[Writable]] to false.
	        // c. Set desc.[[Configurable]] to false.
	        // d. Call the [[DefineOwnProperty]] internal method of subset with P, desc,
	        //    and true as arguments.
	        defineProperty(subset, P, {
	            writable: false, configurable: false, value: subset[P]
	        });
	    }
	    // "Freeze" the array so no new elements can be added
	    defineProperty(subset, 'length', { writable: false });

	    // 5. Return subset
	    return subset;
	}

	/**
	 * The GetOption abstract operation extracts the value of the property named
	 * property from the provided options object, converts it to the required type,
	 * checks whether it is one of a List of allowed values, and fills in a fallback
	 * value if necessary.
	 */
	function /*9.2.9 */GetOption (options, property, type, values, fallback) {
	    var
	        // 1. Let value be the result of calling the [[Get]] internal method of
	        //    options with argument property.
	        value = options[property];

	    // 2. If value is not undefined, then
	    if (value !== undefined) {
	        // a. Assert: type is "boolean" or "string".
	        // b. If type is "boolean", then let value be ToBoolean(value).
	        // c. If type is "string", then let value be ToString(value).
	        value = type === 'boolean' ? Boolean(value)
	                  : (type === 'string' ? String(value) : value);

	        // d. If values is not undefined, then
	        if (values !== undefined) {
	            // i. If values does not contain an element equal to value, then throw a
	            //    RangeError exception.
	            if (arrIndexOf.call(values, value) === -1)
	                throw new RangeError("'" + value + "' is not an allowed value for `" + property +'`');
	        }

	        // e. Return value.
	        return value;
	    }
	    // Else return fallback.
	    return fallback;
	}

	/**
	 * The GetNumberOption abstract operation extracts a property value from the
	 * provided options object, converts it to a Number value, checks whether it is
	 * in the allowed range, and fills in a fallback value if necessary.
	 */
	function /* 9.2.10 */GetNumberOption (options, property, minimum, maximum, fallback) {
	    var
	        // 1. Let value be the result of calling the [[Get]] internal method of
	        //    options with argument property.
	        value = options[property];

	    // 2. If value is not undefined, then
	    if (value !== undefined) {
	        // a. Let value be ToNumber(value).
	        value = Number(value);

	        // b. If value is NaN or less than minimum or greater than maximum, throw a
	        //    RangeError exception.
	        if (isNaN(value) || value < minimum || value > maximum)
	            throw new RangeError('Value is not a number or outside accepted range');

	        // c. Return floor(value).
	        return Math.floor(value);
	    }
	    // 3. Else return fallback.
	    return fallback;
	}

	// 11.1 The Intl.NumberFormat constructor
	// ======================================

	// Define the NumberFormat constructor internally so it cannot be tainted
	function NumberFormatConstructor () {
	    var locales = arguments[0];
	    var options = arguments[1];

	    if (!this || this === Intl) {
	        return new Intl.NumberFormat(locales, options);
	    }

	    return InitializeNumberFormat(toObject(this), locales, options);
	}

	defineProperty(Intl, 'NumberFormat', {
	    configurable: true,
	    writable: true,
	    value: NumberFormatConstructor
	});

	// Must explicitly set prototypes as unwritable
	defineProperty(Intl.NumberFormat, 'prototype', {
	    writable: false
	});

	/**
	 * The abstract operation InitializeNumberFormat accepts the arguments
	 * numberFormat (which must be an object), locales, and options. It initializes
	 * numberFormat as a NumberFormat object.
	 */
	function /*11.1.1.1 */InitializeNumberFormat (numberFormat, locales, options) {
	    var
	    // This will be a internal properties object if we're not already initialized
	        internal = getInternalProperties(numberFormat),

	    // Create an object whose props can be used to restore the values of RegExp props
	        regexpState = createRegExpRestore();

	    // 1. If numberFormat has an [[initializedIntlObject]] internal property with
	    // value true, throw a TypeError exception.
	    if (internal['[[initializedIntlObject]]'] === true)
	        throw new TypeError('`this` object has already been initialized as an Intl object');

	    // Need this to access the `internal` object
	    defineProperty(numberFormat, '__getInternalProperties', {
	        value: function () {
	            // NOTE: Non-standard, for internal use only
	            if (arguments[0] === secret)
	                return internal;
	        }
	    });

	    // 2. Set the [[initializedIntlObject]] internal property of numberFormat to true.
	    internal['[[initializedIntlObject]]'] = true;

	    var
	    // 3. Let requestedLocales be the result of calling the CanonicalizeLocaleList
	    //    abstract operation (defined in 9.2.1) with argument locales.
	        requestedLocales = CanonicalizeLocaleList(locales);

	    // 4. If options is undefined, then
	    if (options === undefined)
	        // a. Let options be the result of creating a new object as if by the
	        // expression new Object() where Object is the standard built-in constructor
	        // with that name.
	        options = {};

	    // 5. Else
	    else
	        // a. Let options be ToObject(options).
	        options = toObject(options);

	    var
	    // 6. Let opt be a new Record.
	        opt = new Record(),

	    // 7. Let matcher be the result of calling the GetOption abstract operation
	    //    (defined in 9.2.9) with the arguments options, "localeMatcher", "string",
	    //    a List containing the two String values "lookup" and "best fit", and
	    //    "best fit".
	        matcher =  GetOption(options, 'localeMatcher', 'string', new List('lookup', 'best fit'), 'best fit');

	    // 8. Set opt.[[localeMatcher]] to matcher.
	    opt['[[localeMatcher]]'] = matcher;

	    var
	    // 9. Let NumberFormat be the standard built-in object that is the initial value
	    //    of Intl.NumberFormat.
	    // 10. Let localeData be the value of the [[localeData]] internal property of
	    //     NumberFormat.
	        localeData = internals.NumberFormat['[[localeData]]'],

	    // 11. Let r be the result of calling the ResolveLocale abstract operation
	    //     (defined in 9.2.5) with the [[availableLocales]] internal property of
	    //     NumberFormat, requestedLocales, opt, the [[relevantExtensionKeys]]
	    //     internal property of NumberFormat, and localeData.
	        r = ResolveLocale(
	                internals.NumberFormat['[[availableLocales]]'], requestedLocales,
	                opt, internals.NumberFormat['[[relevantExtensionKeys]]'], localeData
	            );

	    // 12. Set the [[locale]] internal property of numberFormat to the value of
	    //     r.[[locale]].
	    internal['[[locale]]'] = r['[[locale]]'];

	    // 13. Set the [[numberingSystem]] internal property of numberFormat to the value
	    //     of r.[[nu]].
	    internal['[[numberingSystem]]'] = r['[[nu]]'];

	    // The specification doesn't tell us to do this, but it's helpful later on
	    internal['[[dataLocale]]'] = r['[[dataLocale]]'];

	    var
	    // 14. Let dataLocale be the value of r.[[dataLocale]].
	        dataLocale = r['[[dataLocale]]'],

	    // 15. Let s be the result of calling the GetOption abstract operation with the
	    //     arguments options, "style", "string", a List containing the three String
	    //     values "decimal", "percent", and "currency", and "decimal".
	        s = GetOption(options, 'style', 'string', new List('decimal', 'percent', 'currency'), 'decimal');

	    // 16. Set the [[style]] internal property of numberFormat to s.
	    internal['[[style]]'] = s;

	    var
	    // 17. Let c be the result of calling the GetOption abstract operation with the
	    //     arguments options, "currency", "string", undefined, and undefined.
	        c = GetOption(options, 'currency', 'string');

	    // 18. If c is not undefined and the result of calling the
	    //     IsWellFormedCurrencyCode abstract operation (defined in 6.3.1) with
	    //     argument c is false, then throw a RangeError exception.
	    if (c !== undefined && !IsWellFormedCurrencyCode(c))
	        throw new RangeError("'" + c + "' is not a valid currency code");

	    // 19. If s is "currency" and c is undefined, throw a TypeError exception.
	    if (s === 'currency' && c === undefined)
	        throw new TypeError('Currency code is required when style is currency');

	    // 20. If s is "currency", then
	    if (s === 'currency') {
	        // a. Let c be the result of converting c to upper case as specified in 6.1.
	        c = c.toUpperCase();

	        // b. Set the [[currency]] internal property of numberFormat to c.
	        internal['[[currency]]'] = c;

	        var
	        // c. Let cDigits be the result of calling the CurrencyDigits abstract
	        //    operation (defined below) with argument c.
	            cDigits = CurrencyDigits(c);
	    }

	    var
	    // 21. Let cd be the result of calling the GetOption abstract operation with the
	    //     arguments options, "currencyDisplay", "string", a List containing the
	    //     three String values "code", "symbol", and "name", and "symbol".
	        cd = GetOption(options, 'currencyDisplay', 'string', new List('code', 'symbol', 'name'), 'symbol');

	    // 22. If s is "currency", then set the [[currencyDisplay]] internal property of
	    //     numberFormat to cd.
	    if (s === 'currency')
	        internal['[[currencyDisplay]]'] = cd;

	    var
	    // 23. Let mnid be the result of calling the GetNumberOption abstract operation
	    //     (defined in 9.2.10) with arguments options, "minimumIntegerDigits", 1, 21,
	    //     and 1.
	        mnid = GetNumberOption(options, 'minimumIntegerDigits', 1, 21, 1);

	    // 24. Set the [[minimumIntegerDigits]] internal property of numberFormat to mnid.
	    internal['[[minimumIntegerDigits]]'] = mnid;

	    var
	    // 25. If s is "currency", then let mnfdDefault be cDigits; else let mnfdDefault
	    //     be 0.
	        mnfdDefault = s === 'currency' ? cDigits : 0,

	    // 26. Let mnfd be the result of calling the GetNumberOption abstract operation
	    //     with arguments options, "minimumFractionDigits", 0, 20, and mnfdDefault.
	        mnfd = GetNumberOption(options, 'minimumFractionDigits', 0, 20, mnfdDefault);

	    // 27. Set the [[minimumFractionDigits]] internal property of numberFormat to mnfd.
	    internal['[[minimumFractionDigits]]'] = mnfd;

	    var
	    // 28. If s is "currency", then let mxfdDefault be max(mnfd, cDigits); else if s
	    //     is "percent", then let mxfdDefault be max(mnfd, 0); else let mxfdDefault
	    //     be max(mnfd, 3).
	        mxfdDefault = s === 'currency' ? Math.max(mnfd, cDigits)
	                    : (s === 'percent' ? Math.max(mnfd, 0) : Math.max(mnfd, 3)),

	    // 29. Let mxfd be the result of calling the GetNumberOption abstract operation
	    //     with arguments options, "maximumFractionDigits", mnfd, 20, and mxfdDefault.
	        mxfd = GetNumberOption(options, 'maximumFractionDigits', mnfd, 20, mxfdDefault);

	    // 30. Set the [[maximumFractionDigits]] internal property of numberFormat to mxfd.
	    internal['[[maximumFractionDigits]]'] = mxfd;

	    var
	    // 31. Let mnsd be the result of calling the [[Get]] internal method of options
	    //     with argument "minimumSignificantDigits".
	        mnsd = options.minimumSignificantDigits,

	    // 32. Let mxsd be the result of calling the [[Get]] internal method of options
	    //     with argument "maximumSignificantDigits".
	        mxsd = options.maximumSignificantDigits;

	    // 33. If mnsd is not undefined or mxsd is not undefined, then:
	    if (mnsd !== undefined || mxsd !== undefined) {
	        // a. Let mnsd be the result of calling the GetNumberOption abstract
	        //    operation with arguments options, "minimumSignificantDigits", 1, 21,
	        //    and 1.
	        mnsd = GetNumberOption(options, 'minimumSignificantDigits', 1, 21, 1);

	        // b. Let mxsd be the result of calling the GetNumberOption abstract
	        //     operation with arguments options, "maximumSignificantDigits", mnsd,
	        //     21, and 21.
	        mxsd = GetNumberOption(options, 'maximumSignificantDigits', mnsd, 21, 21);

	        // c. Set the [[minimumSignificantDigits]] internal property of numberFormat
	        //    to mnsd, and the [[maximumSignificantDigits]] internal property of
	        //    numberFormat to mxsd.
	        internal['[[minimumSignificantDigits]]'] = mnsd;
	        internal['[[maximumSignificantDigits]]'] = mxsd;
	    }
	    var
	    // 34. Let g be the result of calling the GetOption abstract operation with the
	    //     arguments options, "useGrouping", "boolean", undefined, and true.
	        g = GetOption(options, 'useGrouping', 'boolean', undefined, true);

	    // 35. Set the [[useGrouping]] internal property of numberFormat to g.
	    internal['[[useGrouping]]'] = g;

	    var
	    // 36. Let dataLocaleData be the result of calling the [[Get]] internal method of
	    //     localeData with argument dataLocale.
	        dataLocaleData = localeData[dataLocale],

	    // 37. Let patterns be the result of calling the [[Get]] internal method of
	    //     dataLocaleData with argument "patterns".
	        patterns = dataLocaleData.patterns;

	    // 38. Assert: patterns is an object (see 11.2.3)

	    var
	    // 39. Let stylePatterns be the result of calling the [[Get]] internal method of
	    //     patterns with argument s.
	        stylePatterns = patterns[s];

	    // 40. Set the [[positivePattern]] internal property of numberFormat to the
	    //     result of calling the [[Get]] internal method of stylePatterns with the
	    //     argument "positivePattern".
	    internal['[[positivePattern]]'] = stylePatterns.positivePattern;

	    // 41. Set the [[negativePattern]] internal property of numberFormat to the
	    //     result of calling the [[Get]] internal method of stylePatterns with the
	    //     argument "negativePattern".
	    internal['[[negativePattern]]'] = stylePatterns.negativePattern;

	    // 42. Set the [[boundFormat]] internal property of numberFormat to undefined.
	    internal['[[boundFormat]]'] = undefined;

	    // 43. Set the [[initializedNumberFormat]] internal property of numberFormat to
	    //     true.
	    internal['[[initializedNumberFormat]]'] = true;

	    // In ES3, we need to pre-bind the format() function
	    if (es3)
	        numberFormat.format = GetFormatNumber.call(numberFormat);

	    // Restore the RegExp properties
	    regexpState.exp.test(regexpState.input);

	    // Return the newly initialised object
	    return numberFormat;
	}

	function CurrencyDigits(currency) {
	    // When the CurrencyDigits abstract operation is called with an argument currency
	    // (which must be an upper case String value), the following steps are taken:

	    // 1. If the ISO 4217 currency and funds code list contains currency as an
	    // alphabetic code, then return the minor unit value corresponding to the
	    // currency from the list; else return 2.
	    return currencyMinorUnits[currency] !== undefined
	                ? currencyMinorUnits[currency]
	                : 2;
	}

	/* 11.2.3 */internals.NumberFormat = {
	    '[[availableLocales]]': [],
	    '[[relevantExtensionKeys]]': ['nu'],
	    '[[localeData]]': {}
	};

	/**
	 * When the supportedLocalesOf method of Intl.NumberFormat is called, the
	 * following steps are taken:
	 */
	/* 11.2.2 */defineProperty(Intl.NumberFormat, 'supportedLocalesOf', {
	    configurable: true,
	    writable: true,
	    value: fnBind.call(supportedLocalesOf, internals.NumberFormat)
	});

	/**
	 * This named accessor property returns a function that formats a number
	 * according to the effective locale and the formatting options of this
	 * NumberFormat object.
	 */
	/* 11.3.2 */defineProperty(Intl.NumberFormat.prototype, 'format', {
	    configurable: true,
	    get: GetFormatNumber
	});

	function GetFormatNumber() {
	        var internal = this != null && typeof this === 'object' && getInternalProperties(this);

	        // Satisfy test 11.3_b
	        if (!internal || !internal['[[initializedNumberFormat]]'])
	            throw new TypeError('`this` value for format() is not an initialized Intl.NumberFormat object.');

	        // The value of the [[Get]] attribute is a function that takes the following
	        // steps:

	        // 1. If the [[boundFormat]] internal property of this NumberFormat object
	        //    is undefined, then:
	        if (internal['[[boundFormat]]'] === undefined) {
	            var
	            // a. Let F be a Function object, with internal properties set as
	            //    specified for built-in functions in ES5, 15, or successor, and the
	            //    length property set to 1, that takes the argument value and
	            //    performs the following steps:
	                F = function (value) {
	                    // i. If value is not provided, then let value be undefined.
	                    // ii. Let x be ToNumber(value).
	                    // iii. Return the result of calling the FormatNumber abstract
	                    //      operation (defined below) with arguments this and x.
	                    return FormatNumber(this, /* x = */Number(value));
	                },

	            // b. Let bind be the standard built-in function object defined in ES5,
	            //    15.3.4.5.
	            // c. Let bf be the result of calling the [[Call]] internal method of
	            //    bind with F as the this value and an argument list containing
	            //    the single item this.
	                bf = fnBind.call(F, this);

	            // d. Set the [[boundFormat]] internal property of this NumberFormat
	            //    object to bf.
	            internal['[[boundFormat]]'] = bf;
	        }
	        // Return the value of the [[boundFormat]] internal property of this
	        // NumberFormat object.
	        return internal['[[boundFormat]]'];
	    }

	/**
	 * When the FormatNumber abstract operation is called with arguments numberFormat
	 * (which must be an object initialized as a NumberFormat) and x (which must be a
	 * Number value), it returns a String value representing x according to the
	 * effective locale and the formatting options of numberFormat.
	 */
	function FormatNumber (numberFormat, x) {
	    var n,

	    // Create an object whose props can be used to restore the values of RegExp props
	        regexpState = createRegExpRestore(),

	        internal = getInternalProperties(numberFormat),
	        locale = internal['[[dataLocale]]'],
	        nums   = internal['[[numberingSystem]]'],
	        data   = internals.NumberFormat['[[localeData]]'][locale],
	        ild    = data.symbols[nums] || data.symbols.latn,

	    // 1. Let negative be false.
	        negative = false;

	    // 2. If the result of isFinite(x) is false, then
	    if (isFinite(x) === false) {
	        // a. If x is NaN, then let n be an ILD String value indicating the NaN value.
	        if (isNaN(x))
	            n = ild.nan;

	        // b. Else
	        else {
	            // a. Let n be an ILD String value indicating infinity.
	            n = ild.infinity;
	            // b. If x < 0, then let negative be true.
	            if (x < 0)
	                negative = true;
	        }
	    }
	    // 3. Else
	    else {
	        // a. If x < 0, then
	        if (x < 0) {
	            // i. Let negative be true.
	            negative = true;
	            // ii. Let x be -x.
	            x = -x;
	        }

	        // b. If the value of the [[style]] internal property of numberFormat is
	        //    "percent", let x be 100 × x.
	        if (internal['[[style]]'] === 'percent')
	            x *= 100;

	        // c. If the [[minimumSignificantDigits]] and [[maximumSignificantDigits]]
	        //    internal properties of numberFormat are present, then
	        if (hop.call(internal, '[[minimumSignificantDigits]]') &&
	                hop.call(internal, '[[maximumSignificantDigits]]'))
	            // i. Let n be the result of calling the ToRawPrecision abstract operation
	            //    (defined below), passing as arguments x and the values of the
	            //    [[minimumSignificantDigits]] and [[maximumSignificantDigits]]
	            //    internal properties of numberFormat.
	            n = ToRawPrecision(x,
	                  internal['[[minimumSignificantDigits]]'],
	                  internal['[[maximumSignificantDigits]]']);
	        // d. Else
	        else
	            // i. Let n be the result of calling the ToRawFixed abstract operation
	            //    (defined below), passing as arguments x and the values of the
	            //    [[minimumIntegerDigits]], [[minimumFractionDigits]], and
	            //    [[maximumFractionDigits]] internal properties of numberFormat.
	            n = ToRawFixed(x,
	                  internal['[[minimumIntegerDigits]]'],
	                  internal['[[minimumFractionDigits]]'],
	                  internal['[[maximumFractionDigits]]']);

	        // e. If the value of the [[numberingSystem]] internal property of
	        //    numberFormat matches one of the values in the “Numbering System” column
	        //    of Table 2 below, then
	        if (numSys[nums]) {
	            // i. Let digits be an array whose 10 String valued elements are the
	            //    UTF-16 string representations of the 10 digits specified in the
	            //    “Digits” column of Table 2 in the row containing the value of the
	            //    [[numberingSystem]] internal property.
	            var digits = numSys[internal['[[numberingSystem]]']];
	            // ii. Replace each digit in n with the value of digits[digit].
	            n = String(n).replace(/\d/g, function (digit) {
	                return digits[digit];
	            });
	        }
	        // f. Else use an implementation dependent algorithm to map n to the
	        //    appropriate representation of n in the given numbering system.
	        else
	            n = String(n); // ###TODO###

	        // g. If n contains the character ".", then replace it with an ILND String
	        //    representing the decimal separator.
	        n = n.replace(/\./g, ild.decimal);

	        // h. If the value of the [[useGrouping]] internal property of numberFormat
	        //    is true, then insert an ILND String representing a grouping separator
	        //    into an ILND set of locations within the integer part of n.
	        if (internal['[[useGrouping]]'] === true) {
	            var
	                parts  = n.split(ild.decimal),
	                igr    = parts[0],

	                // Primary group represents the group closest to the decimal
	                pgSize = data.patterns.primaryGroupSize || 3,

	                // Secondary group is every other group
	                sgSize = data.patterns.secondaryGroupSize || pgSize;

	            // Group only if necessary
	            if (igr.length > pgSize) {
	                var
	                    groups = new List(),

	                    // Index of the primary grouping separator
	                    end    = igr.length - pgSize,

	                    // Starting index for our loop
	                    idx    = end % sgSize,

	                    start  = igr.slice(0, idx);

	                if (start.length)
	                    arrPush.call(groups, start);

	                // Loop to separate into secondary grouping digits
	                while (idx < end) {
	                    arrPush.call(groups, igr.slice(idx, idx + sgSize));
	                    idx += sgSize;
	                }

	                // Add the primary grouping digits
	                arrPush.call(groups, igr.slice(end));

	                parts[0] = arrJoin.call(groups, ild.group);
	            }

	            n = arrJoin.call(parts, ild.decimal);
	        }
	    }

	    var
	    // 4. If negative is true, then let result be the value of the [[negativePattern]]
	    //    internal property of numberFormat; else let result be the value of the
	    //    [[positivePattern]] internal property of numberFormat.
	        result = internal[negative === true ? '[[negativePattern]]' : '[[positivePattern]]'];

	    // 5. Replace the substring "{number}" within result with n.
	    result = result.replace('{number}', n);

	    // 6. If the value of the [[style]] internal property of numberFormat is
	    //    "currency", then:
	    if (internal['[[style]]'] === 'currency') {
	        var cd,
	        // a. Let currency be the value of the [[currency]] internal property of
	        //    numberFormat.
	            currency = internal['[[currency]]'],

	        // Shorthand for the currency data
	            cData = data.currencies[currency];

	        // b. If the value of the [[currencyDisplay]] internal property of
	        //    numberFormat is "code", then let cd be currency.
	        // c. Else if the value of the [[currencyDisplay]] internal property of
	        //    numberFormat is "symbol", then let cd be an ILD string representing
	        //    currency in short form. If the implementation does not have such a
	        //    representation of currency, then use currency itself.
	        // d. Else if the value of the [[currencyDisplay]] internal property of
	        //    numberFormat is "name", then let cd be an ILD string representing
	        //    currency in long form. If the implementation does not have such a
	        //    representation of currency, then use currency itself.
	        switch (internal['[[currencyDisplay]]']) {
	            case 'symbol':
	                cd = cData || currency;
	                break;

	            default:
	            case 'code':
	            case 'name':
	                cd = currency;
	        }

	        // e. Replace the substring "{currency}" within result with cd.
	        result = result.replace('{currency}', cd);
	    }

	    // Restore the RegExp properties
	    regexpState.exp.test(regexpState.input);

	    // 7. Return result.
	    return result;
	}

	/**
	 * When the ToRawPrecision abstract operation is called with arguments x (which
	 * must be a finite non-negative number), minPrecision, and maxPrecision (both
	 * must be integers between 1 and 21) the following steps are taken:
	 */
	function ToRawPrecision (x, minPrecision, maxPrecision) {
	    var
	    // 1. Let p be maxPrecision.
	        p = maxPrecision;

	    // 2. If x = 0, then
	    if (x === 0) {
	        var
	        // a. Let m be the String consisting of p occurrences of the character "0".
	            m = arrJoin.call(Array (p + 1), '0'),
	        // b. Let e be 0.
	            e = 0;
	    }
	    // 3. Else
	    else {
	        // a. Let e and n be integers such that 10ᵖ⁻¹ ≤ n < 10ᵖ and for which the
	        //    exact mathematical value of n × 10ᵉ⁻ᵖ⁺¹ – x is as close to zero as
	        //    possible. If there are two such sets of e and n, pick the e and n for
	        //    which n × 10ᵉ⁻ᵖ⁺¹ is larger.
	        var
	            e = log10Floor(Math.abs(x)),

	            // Easier to get to m from here
	            f = Math.round(Math.exp((Math.abs(e - p + 1)) * Math.LN10)),

	        // b. Let m be the String consisting of the digits of the decimal
	        //    representation of n (in order, with no leading zeroes)
	            m = String(Math.round(e - p + 1 < 0 ? x * f : x / f));
	    }

	    // 4. If e ≥ p, then
	    if (e >= p)
	        // a. Return the concatenation of m and e-p+1 occurrences of the character "0".
	        return m + arrJoin.call(Array(e-p+1 + 1), '0');

	    // 5. If e = p-1, then
	    else if (e === p - 1)
	        // a. Return m.
	        return m;

	    // 6. If e ≥ 0, then
	    else if (e >= 0)
	        // a. Let m be the concatenation of the first e+1 characters of m, the character
	        //    ".", and the remaining p–(e+1) characters of m.
	        m = m.slice(0, e + 1) + '.' + m.slice(e + 1);

	    // 7. If e < 0, then
	    else if (e < 0)
	        // a. Let m be the concatenation of the String "0.", –(e+1) occurrences of the
	        //    character "0", and the string m.
	        m = '0.' + arrJoin.call(Array (-(e+1) + 1), '0') + m;

	    // 8. If m contains the character ".", and maxPrecision > minPrecision, then
	    if (m.indexOf(".") >= 0 && maxPrecision > minPrecision) {
	        var
	        // a. Let cut be maxPrecision – minPrecision.
	            cut = maxPrecision - minPrecision;

	        // b. Repeat while cut > 0 and the last character of m is "0":
	        while (cut > 0 && m.charAt(m.length-1) === '0') {
	            //  i. Remove the last character from m.
	            m = m.slice(0, -1);

	            //  ii. Decrease cut by 1.
	            cut--;
	        }

	        // c. If the last character of m is ".", then
	        if (m.charAt(m.length-1) === '.')
	            //    i. Remove the last character from m.
	            m = m.slice(0, -1);
	    }
	    // 9. Return m.
	    return m;
	}

	/**
	 * When the ToRawFixed abstract operation is called with arguments x (which must
	 * be a finite non-negative number), minInteger (which must be an integer between
	 * 1 and 21), minFraction, and maxFraction (which must be integers between 0 and
	 * 20) the following steps are taken:
	 */
	function ToRawFixed (x, minInteger, minFraction, maxFraction) {
	    // (or not because Number.toPrototype.toFixed does a lot of it for us)
	    var idx,

	        // We can pick up after the fixed formatted string (m) is created
	        m   = Number.prototype.toFixed.call(x, maxFraction),

	        // 4. If [maxFraction] ≠ 0, then
	        //    ...
	        //    e. Let int be the number of characters in a.
	        //
	        // 5. Else let int be the number of characters in m.
	        igr = m.split(".")[0].length,  // int is a reserved word

	        // 6. Let cut be maxFraction – minFraction.
	        cut = maxFraction - minFraction,

	        exp = (idx = m.indexOf('e')) > -1 ? m.slice(idx + 1) : 0;

	    if (exp) {
	        m = m.slice(0, idx).replace('.', '');
	        m += arrJoin.call(Array(exp - (m.length - 1) + 1), '0')
	          + '.' + arrJoin.call(Array(maxFraction + 1), '0');

	        igr = m.length;
	    }

	    // 7. Repeat while cut > 0 and the last character of m is "0":
	    while (cut > 0 && m.slice(-1) === "0") {
	        // a. Remove the last character from m.
	        m = m.slice(0, -1);

	        // b. Decrease cut by 1.
	        cut--;
	    }

	    // 8. If the last character of m is ".", then
	    if (m.slice(-1) === ".")
	        // a. Remove the last character from m.
	        m = m.slice(0, -1);

	    // 9. If int < minInteger, then
	    if (igr < minInteger)
	        // a. Let z be the String consisting of minInteger–int occurrences of the
	        //    character "0".
	        var z = arrJoin.call(Array(minInteger - igr + 1), '0');

	    // 10. Let m be the concatenation of Strings z and m.
	    // 11. Return m.
	    return (z ? z : '') + m;
	}

	// Sect 11.3.2 Table 2, Numbering systems
	// ======================================
	var numSys = {
	    arab:    [ '\u0660', '\u0661', '\u0662', '\u0663', '\u0664', '\u0665', '\u0666', '\u0667', '\u0668', '\u0669' ],
	    arabext: [ '\u06F0', '\u06F1', '\u06F2', '\u06F3', '\u06F4', '\u06F5', '\u06F6', '\u06F7', '\u06F8', '\u06F9' ],
	    bali:    [ '\u1B50', '\u1B51', '\u1B52', '\u1B53', '\u1B54', '\u1B55', '\u1B56', '\u1B57', '\u1B58', '\u1B59' ],
	    beng:    [ '\u09E6', '\u09E7', '\u09E8', '\u09E9', '\u09EA', '\u09EB', '\u09EC', '\u09ED', '\u09EE', '\u09EF' ],
	    deva:    [ '\u0966', '\u0967', '\u0968', '\u0969', '\u096A', '\u096B', '\u096C', '\u096D', '\u096E', '\u096F' ],
	    fullwide:[ '\uFF10', '\uFF11', '\uFF12', '\uFF13', '\uFF14', '\uFF15', '\uFF16', '\uFF17', '\uFF18', '\uFF19' ],
	    gujr:    [ '\u0AE6', '\u0AE7', '\u0AE8', '\u0AE9', '\u0AEA', '\u0AEB', '\u0AEC', '\u0AED', '\u0AEE', '\u0AEF' ],
	    guru:    [ '\u0A66', '\u0A67', '\u0A68', '\u0A69', '\u0A6A', '\u0A6B', '\u0A6C', '\u0A6D', '\u0A6E', '\u0A6F' ],
	    hanidec: [ '\u3007', '\u4E00', '\u4E8C', '\u4E09', '\u56DB', '\u4E94', '\u516D', '\u4E03', '\u516B', '\u4E5D' ],
	    khmr:    [ '\u17E0', '\u17E1', '\u17E2', '\u17E3', '\u17E4', '\u17E5', '\u17E6', '\u17E7', '\u17E8', '\u17E9' ],
	    knda:    [ '\u0CE6', '\u0CE7', '\u0CE8', '\u0CE9', '\u0CEA', '\u0CEB', '\u0CEC', '\u0CED', '\u0CEE', '\u0CEF' ],
	    laoo:    [ '\u0ED0', '\u0ED1', '\u0ED2', '\u0ED3', '\u0ED4', '\u0ED5', '\u0ED6', '\u0ED7', '\u0ED8', '\u0ED9' ],
	    latn:    [ '\u0030', '\u0031', '\u0032', '\u0033', '\u0034', '\u0035', '\u0036', '\u0037', '\u0038', '\u0039' ],
	    limb:    [ '\u1946', '\u1947', '\u1948', '\u1949', '\u194A', '\u194B', '\u194C', '\u194D', '\u194E', '\u194F' ],
	    mlym:    [ '\u0D66', '\u0D67', '\u0D68', '\u0D69', '\u0D6A', '\u0D6B', '\u0D6C', '\u0D6D', '\u0D6E', '\u0D6F' ],
	    mong:    [ '\u1810', '\u1811', '\u1812', '\u1813', '\u1814', '\u1815', '\u1816', '\u1817', '\u1818', '\u1819' ],
	    mymr:    [ '\u1040', '\u1041', '\u1042', '\u1043', '\u1044', '\u1045', '\u1046', '\u1047', '\u1048', '\u1049' ],
	    orya:    [ '\u0B66', '\u0B67', '\u0B68', '\u0B69', '\u0B6A', '\u0B6B', '\u0B6C', '\u0B6D', '\u0B6E', '\u0B6F' ],
	    tamldec: [ '\u0BE6', '\u0BE7', '\u0BE8', '\u0BE9', '\u0BEA', '\u0BEB', '\u0BEC', '\u0BED', '\u0BEE', '\u0BEF' ],
	    telu:    [ '\u0C66', '\u0C67', '\u0C68', '\u0C69', '\u0C6A', '\u0C6B', '\u0C6C', '\u0C6D', '\u0C6E', '\u0C6F' ],
	    thai:    [ '\u0E50', '\u0E51', '\u0E52', '\u0E53', '\u0E54', '\u0E55', '\u0E56', '\u0E57', '\u0E58', '\u0E59' ],
	    tibt:    [ '\u0F20', '\u0F21', '\u0F22', '\u0F23', '\u0F24', '\u0F25', '\u0F26', '\u0F27', '\u0F28', '\u0F29' ]
	};

	/**
	 * This function provides access to the locale and formatting options computed
	 * during initialization of the object.
	 *
	 * The function returns a new object whose properties and attributes are set as
	 * if constructed by an object literal assigning to each of the following
	 * properties the value of the corresponding internal property of this
	 * NumberFormat object (see 11.4): locale, numberingSystem, style, currency,
	 * currencyDisplay, minimumIntegerDigits, minimumFractionDigits,
	 * maximumFractionDigits, minimumSignificantDigits, maximumSignificantDigits, and
	 * useGrouping. Properties whose corresponding internal properties are not present
	 * are not assigned.
	 */
	/* 11.3.3 */defineProperty(Intl.NumberFormat.prototype, 'resolvedOptions', {
	    configurable: true,
	    writable: true,
	    value: function () {
	        var prop,
	            descs = new Record(),
	            props = [
	                'locale', 'numberingSystem', 'style', 'currency', 'currencyDisplay',
	                'minimumIntegerDigits', 'minimumFractionDigits', 'maximumFractionDigits',
	                'minimumSignificantDigits', 'maximumSignificantDigits', 'useGrouping'
	            ],
	            internal = this != null && typeof this === 'object' && getInternalProperties(this);

	        // Satisfy test 11.3_b
	        if (!internal || !internal['[[initializedNumberFormat]]'])
	            throw new TypeError('`this` value for resolvedOptions() is not an initialized Intl.NumberFormat object.');

	        for (var i = 0, max = props.length; i < max; i++) {
	            if (hop.call(internal, prop = '[['+ props[i] +']]'))
	                descs[props[i]] = { value: internal[prop], writable: true, configurable: true, enumerable: true };
	        }

	        return objCreate({}, descs);
	    }
	});

	// 12.1 The Intl.DateTimeFormat constructor
	// ==================================

	// Define the DateTimeFormat constructor internally so it cannot be tainted
	function DateTimeFormatConstructor () {
	    var locales = arguments[0];
	    var options = arguments[1];

	    if (!this || this === Intl) {
	        return new Intl.DateTimeFormat(locales, options);
	    }
	    return InitializeDateTimeFormat(toObject(this), locales, options);
	}

	defineProperty(Intl, 'DateTimeFormat', {
	    configurable: true,
	    writable: true,
	    value: DateTimeFormatConstructor
	});

	// Must explicitly set prototypes as unwritable
	defineProperty(DateTimeFormatConstructor, 'prototype', {
	    writable: false
	});

	/**
	 * The abstract operation InitializeDateTimeFormat accepts the arguments dateTimeFormat
	 * (which must be an object), locales, and options. It initializes dateTimeFormat as a
	 * DateTimeFormat object.
	 */
	function/* 12.1.1.1 */InitializeDateTimeFormat (dateTimeFormat, locales, options) {
	    var
	    // This will be a internal properties object if we're not already initialized
	        internal = getInternalProperties(dateTimeFormat),

	    // Create an object whose props can be used to restore the values of RegExp props
	        regexpState = createRegExpRestore();

	    // 1. If dateTimeFormat has an [[initializedIntlObject]] internal property with
	    //    value true, throw a TypeError exception.
	    if (internal['[[initializedIntlObject]]'] === true)
	        throw new TypeError('`this` object has already been initialized as an Intl object');

	    // Need this to access the `internal` object
	    defineProperty(dateTimeFormat, '__getInternalProperties', {
	        value: function () {
	            // NOTE: Non-standard, for internal use only
	            if (arguments[0] === secret)
	                return internal;
	        }
	    });

	    // 2. Set the [[initializedIntlObject]] internal property of numberFormat to true.
	    internal['[[initializedIntlObject]]'] = true;

	    var
	    // 3. Let requestedLocales be the result of calling the CanonicalizeLocaleList
	    //    abstract operation (defined in 9.2.1) with argument locales.
	        requestedLocales = CanonicalizeLocaleList(locales),

	    // 4. Let options be the result of calling the ToDateTimeOptions abstract
	    //    operation (defined below) with arguments options, "any", and "date".
	        options = ToDateTimeOptions(options, 'any', 'date'),

	    // 5. Let opt be a new Record.
	        opt = new Record();

	    // 6. Let matcher be the result of calling the GetOption abstract operation
	    //    (defined in 9.2.9) with arguments options, "localeMatcher", "string", a List
	    //    containing the two String values "lookup" and "best fit", and "best fit".
	        matcher = GetOption(options, 'localeMatcher', 'string', new List('lookup', 'best fit'), 'best fit');

	    // 7. Set opt.[[localeMatcher]] to matcher.
	    opt['[[localeMatcher]]'] = matcher;

	    var
	    // 8. Let DateTimeFormat be the standard built-in object that is the initial
	    //    value of Intl.DateTimeFormat.
	        DateTimeFormat = internals.DateTimeFormat, // This is what we *really* need

	    // 9. Let localeData be the value of the [[localeData]] internal property of
	    //    DateTimeFormat.
	        localeData = DateTimeFormat['[[localeData]]'],

	    // 10. Let r be the result of calling the ResolveLocale abstract operation
	    //     (defined in 9.2.5) with the [[availableLocales]] internal property of
	    //      DateTimeFormat, requestedLocales, opt, the [[relevantExtensionKeys]]
	    //      internal property of DateTimeFormat, and localeData.
	        r = ResolveLocale(DateTimeFormat['[[availableLocales]]'], requestedLocales,
	                opt, DateTimeFormat['[[relevantExtensionKeys]]'], localeData);

	    // 11. Set the [[locale]] internal property of dateTimeFormat to the value of
	    //     r.[[locale]].
	    internal['[[locale]]'] = r['[[locale]]'];

	    // 12. Set the [[calendar]] internal property of dateTimeFormat to the value of
	    //     r.[[ca]].
	    internal['[[calendar]]'] = r['[[ca]]'];

	    // 13. Set the [[numberingSystem]] internal property of dateTimeFormat to the value of
	    //     r.[[nu]].
	    internal['[[numberingSystem]]'] = r['[[nu]]'];

	    // The specification doesn't tell us to do this, but it's helpful later on
	    internal['[[dataLocale]]'] = r['[[dataLocale]]'];

	    var
	    // 14. Let dataLocale be the value of r.[[dataLocale]].
	        dataLocale = r['[[dataLocale]]'],

	    // 15. Let tz be the result of calling the [[Get]] internal method of options with
	    //     argument "timeZone".
	        tz = options.timeZone;

	    // 16. If tz is not undefined, then
	    if (tz !== undefined) {
	        // a. Let tz be ToString(tz).
	        // b. Convert tz to upper case as described in 6.1.
	        //    NOTE: If an implementation accepts additional time zone values, as permitted
	        //          under certain conditions by the Conformance clause, different casing
	        //          rules apply.
	        tz = toLatinUpperCase(tz);

	        // c. If tz is not "UTC", then throw a RangeError exception.
	        // ###TODO: accept more time zones###
	        if (tz !== 'UTC')
	            throw new RangeError('timeZone is not supported.');
	    }

	    // 17. Set the [[timeZone]] internal property of dateTimeFormat to tz.
	    internal['[[timeZone]]'] = tz;

	    // 18. Let opt be a new Record.
	    opt = new Record();

	    // 19. For each row of Table 3, except the header row, do:
	    for (var prop in dateTimeComponents) {
	        if (!hop.call(dateTimeComponents, prop))
	            continue;

	        var
	        // 20. Let prop be the name given in the Property column of the row.
	        // 21. Let value be the result of calling the GetOption abstract operation,
	        //     passing as argument options, the name given in the Property column of the
	        //     row, "string", a List containing the strings given in the Values column of
	        //     the row, and undefined.
	            value = GetOption(options, prop, 'string', dateTimeComponents[prop]);

	        // 22. Set opt.[[<prop>]] to value.
	        opt['[['+prop+']]'] = value;
	    }

	    var
	        // Assigned a value below
	        bestFormat,

	        // 23. Let dataLocaleData be the result of calling the [[Get]] internal method of
	        //     localeData with argument dataLocale.
	        dataLocaleData = localeData[dataLocale],

	        // 24. Let formats be the result of calling the [[Get]] internal method of
	        //     dataLocaleData with argument "formats".
	        //     Note: we process the CLDR formats into the spec'd structure
	        formats = ToDateTimeFormats(dataLocaleData.formats),

	        // 25. Let matcher be the result of calling the GetOption abstract operation with
	        //     arguments options, "formatMatcher", "string", a List containing the two String
	        //     values "basic" and "best fit", and "best fit".
	        matcher = GetOption(options, 'formatMatcher', 'string', new List('basic', 'best fit'), 'best fit');

	    // Optimization: caching the processed formats as a one time operation by
	    // replacing the initial structure from localeData
	    dataLocaleData.formats = formats;

	    // 26. If matcher is "basic", then
	    if (matcher === 'basic')
	        // 27. Let bestFormat be the result of calling the BasicFormatMatcher abstract
	        //     operation (defined below) with opt and formats.
	        bestFormat = BasicFormatMatcher(opt, formats);

	    // 28. Else
	    else
	        // 29. Let bestFormat be the result of calling the BestFitFormatMatcher
	        //     abstract operation (defined below) with opt and formats.
	        bestFormat = BestFitFormatMatcher(opt, formats);

	    // 30. For each row in Table 3, except the header row, do
	    for (var prop in dateTimeComponents) {
	        if (!hop.call(dateTimeComponents, prop))
	            continue;

	        // a. Let prop be the name given in the Property column of the row.
	        // b. Let pDesc be the result of calling the [[GetOwnProperty]] internal method of
	        //    bestFormat with argument prop.
	        // c. If pDesc is not undefined, then
	        if (hop.call(bestFormat, prop)) {
	            var
	            // i. Let p be the result of calling the [[Get]] internal method of bestFormat
	            //    with argument prop.
	                p = bestFormat[prop];

	            // ii. Set the [[<prop>]] internal property of dateTimeFormat to p.
	            // Diverging from spec becuase of bug #58
	            // https://github.com/tc39/ecma402/issues/58
	            internal['[['+prop+']]'] = opt['[['+prop+']]'] || p;
	        }
	    }

	    var
	        // Assigned a value below
	        pattern,

	    // 31. Let hr12 be the result of calling the GetOption abstract operation with
	    //     arguments options, "hour12", "boolean", undefined, and undefined.
	        hr12 = GetOption(options, 'hour12', 'boolean'/*, undefined, undefined*/);

	    // 32. If dateTimeFormat has an internal property [[hour]], then
	    if (internal['[[hour]]']) {
	        // a. If hr12 is undefined, then let hr12 be the result of calling the [[Get]]
	        //    internal method of dataLocaleData with argument "hour12".
	        hr12 = hr12 === undefined ? dataLocaleData.hour12 : hr12;

	        // b. Set the [[hour12]] internal property of dateTimeFormat to hr12.
	        internal['[[hour12]]'] = hr12;

	        // c. If hr12 is true, then
	        if (hr12 === true) {
	            var
	            // i. Let hourNo0 be the result of calling the [[Get]] internal method of
	            //    dataLocaleData with argument "hourNo0".
	                hourNo0 = dataLocaleData.hourNo0;

	            // ii. Set the [[hourNo0]] internal property of dateTimeFormat to hourNo0.
	            internal['[[hourNo0]]'] = hourNo0;

	            // iii. Let pattern be the result of calling the [[Get]] internal method of
	            //      bestFormat with argument "pattern12".
	            pattern = bestFormat.pattern12;
	        }

	        // d. Else
	        else
	            // i. Let pattern be the result of calling the [[Get]] internal method of
	            //    bestFormat with argument "pattern".
	            pattern = bestFormat.pattern;
	    }

	    // 33. Else
	    else
	        // a. Let pattern be the result of calling the [[Get]] internal method of
	        //    bestFormat with argument "pattern".
	        pattern = bestFormat.pattern;

	    // 34. Set the [[pattern]] internal property of dateTimeFormat to pattern.
	    internal['[[pattern]]'] = pattern;

	    // 35. Set the [[boundFormat]] internal property of dateTimeFormat to undefined.
	    internal['[[boundFormat]]'] = undefined;

	    // 36. Set the [[initializedDateTimeFormat]] internal property of dateTimeFormat to
	    //     true.
	    internal['[[initializedDateTimeFormat]]'] = true;

	    // In ES3, we need to pre-bind the format() function
	    if (es3)
	        dateTimeFormat.format = GetFormatDateTime.call(dateTimeFormat);

	    // Restore the RegExp properties
	    regexpState.exp.test(regexpState.input);

	    // Return the newly initialised object
	    return dateTimeFormat;
	}

	/**
	 * Several DateTimeFormat algorithms use values from the following table, which provides
	 * property names and allowable values for the components of date and time formats:
	 */
	var dateTimeComponents = {
	         weekday: [ "narrow", "short", "long" ],
	             era: [ "narrow", "short", "long" ],
	            year: [ "2-digit", "numeric" ],
	           month: [ "2-digit", "numeric", "narrow", "short", "long" ],
	             day: [ "2-digit", "numeric" ],
	            hour: [ "2-digit", "numeric" ],
	          minute: [ "2-digit", "numeric" ],
	          second: [ "2-digit", "numeric" ],
	    timeZoneName: [ "short", "long" ]
	};

	/**
	 * When the ToDateTimeOptions abstract operation is called with arguments options,
	 * required, and defaults, the following steps are taken:
	 */
	function ToDateTimeFormats(formats) {
	    if (Object.prototype.toString.call(formats) === '[object Array]') {
	        return formats;
	    }
	    return src$cldr$$.createDateTimeFormats(formats);
	}

	/**
	 * When the ToDateTimeOptions abstract operation is called with arguments options,
	 * required, and defaults, the following steps are taken:
	 */
	function ToDateTimeOptions (options, required, defaults) {
	    // 1. If options is undefined, then let options be null, else let options be
	    //    ToObject(options).
	    if (options === undefined)
	        options = null;

	    else {
	        // (#12) options needs to be a Record, but it also needs to inherit properties
	        var opt2 = toObject(options);
	        options = new Record();

	        for (var k in opt2)
	            options[k] = opt2[k];
	    }

	    var
	    // 2. Let create be the standard built-in function object defined in ES5, 15.2.3.5.
	        create = objCreate,

	    // 3. Let options be the result of calling the [[Call]] internal method of create with
	    //    undefined as the this value and an argument list containing the single item
	    //    options.
	        options = create(options),

	    // 4. Let needDefaults be true.
	        needDefaults = true;

	    // 5. If required is "date" or "any", then
	    if (required === 'date' || required === 'any') {
	        // a. For each of the property names "weekday", "year", "month", "day":
	            // i. If the result of calling the [[Get]] internal method of options with the
	            //    property name is not undefined, then let needDefaults be false.
	        if (options.weekday !== undefined || options.year !== undefined
	                || options.month !== undefined || options.day !== undefined)
	            needDefaults = false;
	    }

	    // 6. If required is "time" or "any", then
	    if (required === 'time' || required === 'any') {
	        // a. For each of the property names "hour", "minute", "second":
	            // i. If the result of calling the [[Get]] internal method of options with the
	            //    property name is not undefined, then let needDefaults be false.
	        if (options.hour !== undefined || options.minute !== undefined || options.second !== undefined)
	                needDefaults = false;
	    }

	    // 7. If needDefaults is true and defaults is either "date" or "all", then
	    if (needDefaults && (defaults === 'date' || defaults === 'all'))
	        // a. For each of the property names "year", "month", "day":
	            // i. Call the [[DefineOwnProperty]] internal method of options with the
	            //    property name, Property Descriptor {[[Value]]: "numeric", [[Writable]]:
	            //    true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
	        options.year = options.month = options.day = 'numeric';

	    // 8. If needDefaults is true and defaults is either "time" or "all", then
	    if (needDefaults && (defaults === 'time' || defaults === 'all'))
	        // a. For each of the property names "hour", "minute", "second":
	            // i. Call the [[DefineOwnProperty]] internal method of options with the
	            //    property name, Property Descriptor {[[Value]]: "numeric", [[Writable]]:
	            //    true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
	        options.hour = options.minute = options.second = 'numeric';

	    // 9. Return options.
	    return options;
	}

	/**
	 * When the BasicFormatMatcher abstract operation is called with two arguments options and
	 * formats, the following steps are taken:
	 */
	function BasicFormatMatcher (options, formats) {
	    return calculateScore(options, formats);
	}

	/**
	 * Calculates score for BestFitFormatMatcher and BasicFormatMatcher.
	 * Abstracted from BasicFormatMatcher section.
	 */
	function calculateScore (options, formats, bestFit) {
	    var
	    // Additional penalty type when bestFit === true
	       diffDataTypePenalty = 8,

	    // 1. Let removalPenalty be 120.
	        removalPenalty = 120,

	    // 2. Let additionPenalty be 20.
	        additionPenalty = 20,

	    // 3. Let longLessPenalty be 8.
	        longLessPenalty = 8,

	    // 4. Let longMorePenalty be 6.
	        longMorePenalty = 6,

	    // 5. Let shortLessPenalty be 6.
	        shortLessPenalty = 6,

	    // 6. Let shortMorePenalty be 3.
	        shortMorePenalty = 3,

	    // 7. Let bestScore be -Infinity.
	        bestScore = -Infinity,

	    // 8. Let bestFormat be undefined.
	        bestFormat,

	    // 9. Let i be 0.
	        i = 0,

	    // 10. Let len be the result of calling the [[Get]] internal method of formats with argument "length".
	        len = formats.length;

	    // 11. Repeat while i < len:
	    while (i < len) {
	        var
	        // a. Let format be the result of calling the [[Get]] internal method of formats with argument ToString(i).
	            format = formats[i],

	        // b. Let score be 0.
	            score = 0;

	        // c. For each property shown in Table 3:
	        for (var property in dateTimeComponents) {
	            if (!hop.call(dateTimeComponents, property))
	                continue;

	            var
	            // i. Let optionsProp be options.[[<property>]].
	                optionsProp = options['[['+ property +']]'],

	            // ii. Let formatPropDesc be the result of calling the [[GetOwnProperty]] internal method of format
	            //     with argument property.
	            // iii. If formatPropDesc is not undefined, then
	            //     1. Let formatProp be the result of calling the [[Get]] internal method of format with argument property.
	                formatProp = hop.call(format, property) ? format[property] : undefined;

	            // iv. If optionsProp is undefined and formatProp is not undefined, then decrease score by
	            //     additionPenalty.
	            if (optionsProp === undefined && formatProp !== undefined)
	                score -= additionPenalty;

	            // v. Else if optionsProp is not undefined and formatProp is undefined, then decrease score by
	            //    removalPenalty.
	            else if (optionsProp !== undefined && formatProp === undefined)
	                score -= removalPenalty;

	            // vi. Else
	            else {
	                var
	                // 1. Let values be the array ["2-digit", "numeric", "narrow", "short",
	                //    "long"].
	                    values = [ '2-digit', 'numeric', 'narrow', 'short', 'long' ],

	                // 2. Let optionsPropIndex be the index of optionsProp within values.
	                    optionsPropIndex = arrIndexOf.call(values, optionsProp),

	                // 3. Let formatPropIndex be the index of formatProp within values.
	                    formatPropIndex = arrIndexOf.call(values, formatProp),

	                // 4. Let delta be max(min(formatPropIndex - optionsPropIndex, 2), -2).
	                    delta = Math.max(Math.min(formatPropIndex - optionsPropIndex, 2), -2);

	                // When the bestFit argument is true, subtract additional penalty where data types are not the same
	                if (bestFit && (
	                    ((optionsProp === 'numeric' || optionsProp === '2-digit') && (formatProp !== 'numeric' && formatProp !== '2-digit') || (optionsProp !== 'numeric' && optionsProp !== '2-digit') && (formatProp === '2-digit' || formatProp === 'numeric'))
	                ))
	                    score -= diffDataTypePenalty;

	                // 5. If delta = 2, decrease score by longMorePenalty.
	                if (delta === 2)
	                    score -= longMorePenalty;

	                // 6. Else if delta = 1, decrease score by shortMorePenalty.
	                else if (delta === 1)
	                    score -= shortMorePenalty;

	                // 7. Else if delta = -1, decrease score by shortLessPenalty.
	                else if (delta === -1)
	                    score -= shortLessPenalty;

	                // 8. Else if delta = -2, decrease score by longLessPenalty.
	                else if (delta === -2)
	                    score -= longLessPenalty;
	            }
	        }

	        // d. If score > bestScore, then
	        if (score > bestScore) {
	            // i. Let bestScore be score.
	            bestScore = score;

	            // ii. Let bestFormat be format.
	            bestFormat = format;
	        }

	        // e. Increase i by 1.
	        i++;
	    }

	    // 12. Return bestFormat.
	    return bestFormat;
	}

	/**
	 * When the BestFitFormatMatcher abstract operation is called with two arguments options
	 * and formats, it performs implementation dependent steps, which should return a set of
	 * component representations that a typical user of the selected locale would perceive as
	 * at least as good as the one returned by BasicFormatMatcher.
	 *
	 * This polyfill defines the algorithm to be the same as BasicFormatMatcher,
	 * with the addition of bonus points awarded where the requested format is of
	 * the same data type as the potentially matching format.
	 *
	 * For example,
	 *
	 *     { month: 'numeric', day: 'numeric' }
	 *
	 * should match
	 *
	 *     { month: '2-digit', day: '2-digit' }
	 *
	 * rather than
	 *
	 *     { month: 'short', day: 'numeric' }
	 *
	 * This makes sense because a user requesting a formatted date with numeric parts would
	 * not expect to see the returned format containing narrow, short or long part names
	 */
	function BestFitFormatMatcher (options, formats) {
	    return calculateScore(options, formats, true);
	}

	/* 12.2.3 */internals.DateTimeFormat = {
	    '[[availableLocales]]': [],
	    '[[relevantExtensionKeys]]': ['ca', 'nu'],
	    '[[localeData]]': {}
	};

	/**
	 * When the supportedLocalesOf method of Intl.DateTimeFormat is called, the
	 * following steps are taken:
	 */
	/* 12.2.2 */defineProperty(Intl.DateTimeFormat, 'supportedLocalesOf', {
	    configurable: true,
	    writable: true,
	    value: fnBind.call(supportedLocalesOf, internals.DateTimeFormat)
	});

	/**
	 * This named accessor property returns a function that formats a number
	 * according to the effective locale and the formatting options of this
	 * DateTimeFormat object.
	 */
	/* 12.3.2 */defineProperty(Intl.DateTimeFormat.prototype, 'format', {
	    configurable: true,
	    get: GetFormatDateTime
	});

	function GetFormatDateTime() {
	    var internal = this != null && typeof this === 'object' && getInternalProperties(this);

	    // Satisfy test 12.3_b
	    if (!internal || !internal['[[initializedDateTimeFormat]]'])
	        throw new TypeError('`this` value for format() is not an initialized Intl.DateTimeFormat object.');

	    // The value of the [[Get]] attribute is a function that takes the following
	    // steps:

	    // 1. If the [[boundFormat]] internal property of this DateTimeFormat object
	    //    is undefined, then:
	    if (internal['[[boundFormat]]'] === undefined) {
	        var
	        // a. Let F be a Function object, with internal properties set as
	        //    specified for built-in functions in ES5, 15, or successor, and the
	        //    length property set to 0, that takes the argument date and
	        //    performs the following steps:
	            F = function () {
	                //   i. If date is not provided or is undefined, then let x be the
	                //      result as if by the expression Date.now() where Date.now is
	                //      the standard built-in function defined in ES5, 15.9.4.4.
	                //  ii. Else let x be ToNumber(date).
	                // iii. Return the result of calling the FormatDateTime abstract
	                //      operation (defined below) with arguments this and x.
	                var x = Number(arguments.length === 0 ? Date.now() : arguments[0]);
	                return FormatDateTime(this, x);
	            },
	        // b. Let bind be the standard built-in function object defined in ES5,
	        //    15.3.4.5.
	        // c. Let bf be the result of calling the [[Call]] internal method of
	        //    bind with F as the this value and an argument list containing
	        //    the single item this.
	            bf = fnBind.call(F, this);
	        // d. Set the [[boundFormat]] internal property of this NumberFormat
	        //    object to bf.
	        internal['[[boundFormat]]'] = bf;
	    }
	    // Return the value of the [[boundFormat]] internal property of this
	    // NumberFormat object.
	    return internal['[[boundFormat]]'];
	}

	/**
	 * When the FormatDateTime abstract operation is called with arguments dateTimeFormat
	 * (which must be an object initialized as a DateTimeFormat) and x (which must be a Number
	 * value), it returns a String value representing x (interpreted as a time value as
	 * specified in ES5, 15.9.1.1) according to the effective locale and the formatting
	 * options of dateTimeFormat.
	 */
	function FormatDateTime(dateTimeFormat, x) {
	    // 1. If x is not a finite Number, then throw a RangeError exception.
	    if (!isFinite(x))
	        throw new RangeError('Invalid valid date passed to format');

	    var
	        internal = dateTimeFormat.__getInternalProperties(secret),

	    // Creating restore point for properties on the RegExp object... please wait
	        regexpState = createRegExpRestore(),

	    // 2. Let locale be the value of the [[locale]] internal property of dateTimeFormat.
	        locale = internal['[[locale]]'],

	    // 3. Let nf be the result of creating a new NumberFormat object as if by the
	    // expression new Intl.NumberFormat([locale], {useGrouping: false}) where
	    // Intl.NumberFormat is the standard built-in constructor defined in 11.1.3.
	        nf = new Intl.NumberFormat([locale], {useGrouping: false}),

	    // 4. Let nf2 be the result of creating a new NumberFormat object as if by the
	    // expression new Intl.NumberFormat([locale], {minimumIntegerDigits: 2, useGrouping:
	    // false}) where Intl.NumberFormat is the standard built-in constructor defined in
	    // 11.1.3.
	        nf2 = new Intl.NumberFormat([locale], {minimumIntegerDigits: 2, useGrouping: false}),

	    // 5. Let tm be the result of calling the ToLocalTime abstract operation (defined
	    // below) with x, the value of the [[calendar]] internal property of dateTimeFormat,
	    // and the value of the [[timeZone]] internal property of dateTimeFormat.
	        tm = ToLocalTime(x, internal['[[calendar]]'], internal['[[timeZone]]']),

	    // 6. Let result be the value of the [[pattern]] internal property of dateTimeFormat.
	        result = internal['[[pattern]]'],

	    // Need the locale minus any extensions
	        dataLocale = internal['[[dataLocale]]'],

	    // Need the calendar data from CLDR
	        localeData = internals.DateTimeFormat['[[localeData]]'][dataLocale].calendars,
	        ca = internal['[[calendar]]'];

	    // 7. For each row of Table 3, except the header row, do:
	    for (var p in dateTimeComponents) {
	        // a. If dateTimeFormat has an internal property with the name given in the
	        //    Property column of the row, then:
	        if (hop.call(internal, '[['+ p +']]')) {
	            var
	            // Assigned values below
	                pm, fv,

	            //   i. Let p be the name given in the Property column of the row.
	            //  ii. Let f be the value of the [[<p>]] internal property of dateTimeFormat.
	                f = internal['[['+ p +']]'],

	            // iii. Let v be the value of tm.[[<p>]].
	                v = tm['[['+ p +']]'];

	            //  iv. If p is "year" and v ≤ 0, then let v be 1 - v.
	            if (p === 'year' && v <= 0)
	                v = 1 - v;

	            //   v. If p is "month", then increase v by 1.
	            else if (p === 'month')
	                v++;

	            //  vi. If p is "hour" and the value of the [[hour12]] internal property of
	            //      dateTimeFormat is true, then
	            else if (p === 'hour' && internal['[[hour12]]'] === true) {
	                // 1. Let v be v modulo 12.
	                v = v % 12;

	                // 2. If v is equal to the value of tm.[[<p>]], then let pm be false; else
	                //    let pm be true.
	                pm = v !== tm['[['+ p +']]'];

	                // 3. If v is 0 and the value of the [[hourNo0]] internal property of
	                //    dateTimeFormat is true, then let v be 12.
	                if (v === 0 && internal['[[hourNo0]]'] === true)
	                    v = 12;
	            }

	            // vii. If f is "numeric", then
	            if (f === 'numeric')
	                // 1. Let fv be the result of calling the FormatNumber abstract operation
	                //    (defined in 11.3.2) with arguments nf and v.
	                fv = FormatNumber(nf, v);

	            // viii. Else if f is "2-digit", then
	            else if (f === '2-digit') {
	                // 1. Let fv be the result of calling the FormatNumber abstract operation
	                //    with arguments nf2 and v.
	                fv = FormatNumber(nf2, v);

	                // 2. If the length of fv is greater than 2, let fv be the substring of fv
	                //    containing the last two characters.
	                if (fv.length > 2)
	                    fv = fv.slice(-2);
	            }

	            // ix. Else if f is "narrow", "short", or "long", then let fv be a String
	            //     value representing f in the desired form; the String value depends upon
	            //     the implementation and the effective locale and calendar of
	            //     dateTimeFormat. If p is "month", then the String value may also depend
	            //     on whether dateTimeFormat has a [[day]] internal property. If p is
	            //     "timeZoneName", then the String value may also depend on the value of
	            //     the [[inDST]] field of tm.
	            else if (f in dateWidths) {
	                switch (p) {
	                    case 'month':
	                        fv = resolveDateString(localeData, ca, 'months', f, tm['[['+ p +']]']);
	                        break;

	                    case 'weekday':
	                        try {
	                            fv = resolveDateString(localeData, ca, 'days', f, tm['[['+ p +']]']);
	                            // fv = resolveDateString(ca.days, f)[tm['[['+ p +']]']];
	                        } catch (e) {
	                            throw new Error('Could not find weekday data for locale '+locale);
	                        }
	                        break;

	                    case 'timeZoneName':
	                        fv = ''; // TODO
	                        break;

	                    // TODO: Era
	                    default:
	                        fv = tm['[['+ p +']]'];
	                }
	            }

	            // x. Replace the substring of result that consists of "{", p, and "}", with
	            //    fv.
	            result = result.replace('{'+ p +'}', fv);
	        }
	    }
	    // 8. If dateTimeFormat has an internal property [[hour12]] whose value is true, then
	    if (internal['[[hour12]]'] === true) {
	        // a. If pm is true, then let fv be an implementation and locale dependent String
	        //    value representing “post meridiem”; else let fv be an implementation and
	        //    locale dependent String value representing “ante meridiem”.
	        fv = resolveDateString(localeData, ca, 'dayPeriods', pm ? 'pm' : 'am');

	        // b. Replace the substring of result that consists of "{ampm}", with fv.
	        result = result.replace('{ampm}', fv);
	    }

	    // Restore properties of the RegExp object
	    regexpState.exp.test(regexpState.input);

	    // 9. Return result.
	    return result;
	}

	/**
	 * When the ToLocalTime abstract operation is called with arguments date, calendar, and
	 * timeZone, the following steps are taken:
	 */
	function ToLocalTime(date, calendar, timeZone) {
	    // 1. Apply calendrical calculations on date for the given calendar and time zone to
	    //    produce weekday, era, year, month, day, hour, minute, second, and inDST values.
	    //    The calculations should use best available information about the specified
	    //    calendar and time zone. If the calendar is "gregory", then the calculations must
	    //    match the algorithms specified in ES5, 15.9.1, except that calculations are not
	    //    bound by the restrictions on the use of best available information on time zones
	    //    for local time zone adjustment and daylight saving time adjustment imposed by
	    //    ES5, 15.9.1.7 and 15.9.1.8.
	    // ###TODO###
	    var d = new Date(date),
	        m = 'get' + (timeZone || '');

	    // 2. Return a Record with fields [[weekday]], [[era]], [[year]], [[month]], [[day]],
	    //    [[hour]], [[minute]], [[second]], and [[inDST]], each with the corresponding
	    //    calculated value.
	    return new Record({
	        '[[weekday]]': d[m + 'Day'](),
	        '[[era]]'    : +(d[m + 'FullYear']() >= 0),
	        '[[year]]'   : d[m + 'FullYear'](),
	        '[[month]]'  : d[m + 'Month'](),
	        '[[day]]'    : d[m + 'Date'](),
	        '[[hour]]'   : d[m + 'Hours'](),
	        '[[minute]]' : d[m + 'Minutes'](),
	        '[[second]]' : d[m + 'Seconds'](),
	        '[[inDST]]'  : false // ###TODO###
	    });
	}

	/**
	 * The function returns a new object whose properties and attributes are set as if
	 * constructed by an object literal assigning to each of the following properties the
	 * value of the corresponding internal property of this DateTimeFormat object (see 12.4):
	 * locale, calendar, numberingSystem, timeZone, hour12, weekday, era, year, month, day,
	 * hour, minute, second, and timeZoneName. Properties whose corresponding internal
	 * properties are not present are not assigned.
	 */
	/* 12.3.3 */defineProperty(Intl.DateTimeFormat.prototype, 'resolvedOptions', {
	    writable: true,
	    configurable: true,
	    value: function () {
	        var prop,
	            descs = new Record(),
	            props = [
	                'locale', 'calendar', 'numberingSystem', 'timeZone', 'hour12', 'weekday',
	                'era', 'year', 'month', 'day', 'hour', 'minute', 'second', 'timeZoneName'
	            ],
	            internal = this != null && typeof this === 'object' && getInternalProperties(this);

	        // Satisfy test 12.3_b
	        if (!internal || !internal['[[initializedDateTimeFormat]]'])
	            throw new TypeError('`this` value for resolvedOptions() is not an initialized Intl.DateTimeFormat object.');

	        for (var i = 0, max = props.length; i < max; i++) {
	            if (hop.call(internal, prop = '[[' + props[i] + ']]'))
	                descs[props[i]] = { value: internal[prop], writable: true, configurable: true, enumerable: true };
	        }

	        return objCreate({}, descs);
	    }
	});

	// Sect 13 Locale Sensitive Functions of the ECMAScript Language Specification
	// ===========================================================================

	var ls = Intl.__localeSensitiveProtos = {
	    Number: {},
	    Date:   {}
	};

	/**
	 * When the toLocaleString method is called with optional arguments locales and options,
	 * the following steps are taken:
	 */
	/* 13.2.1 */ls.Number.toLocaleString = function () {
	    // Satisfy test 13.2.1_1
	    if (Object.prototype.toString.call(this) !== '[object Number]')
	        throw new TypeError('`this` value must be a number for Number.prototype.toLocaleString()');

	    // 1. Let x be this Number value (as defined in ES5, 15.7.4).
	    // 2. If locales is not provided, then let locales be undefined.
	    // 3. If options is not provided, then let options be undefined.
	    // 4. Let numberFormat be the result of creating a new object as if by the
	    //    expression new Intl.NumberFormat(locales, options) where
	    //    Intl.NumberFormat is the standard built-in constructor defined in 11.1.3.
	    // 5. Return the result of calling the FormatNumber abstract operation
	    //    (defined in 11.3.2) with arguments numberFormat and x.
	    return FormatNumber(new NumberFormatConstructor(arguments[0], arguments[1]), this);
	};

	/**
	 * When the toLocaleString method is called with optional arguments locales and options,
	 * the following steps are taken:
	 */
	/* 13.3.1 */ls.Date.toLocaleString = function () {
	    // Satisfy test 13.3.0_1
	    if (Object.prototype.toString.call(this) !== '[object Date]')
	        throw new TypeError('`this` value must be a Date instance for Date.prototype.toLocaleString()');

	    var
	    // 1. Let x be this time value (as defined in ES5, 15.9.5).
	        x = +this;

	    // 2. If x is NaN, then return "Invalid Date".
	    if (isNaN(x))
	        return 'Invalid Date';

	    var
	    // 3. If locales is not provided, then let locales be undefined.
	        locales = arguments[0],

	    // 4. If options is not provided, then let options be undefined.
	        options = arguments[1],

	    // 5. Let options be the result of calling the ToDateTimeOptions abstract
	    //    operation (defined in 12.1.1) with arguments options, "any", and "all".
	        options = ToDateTimeOptions(options, 'any', 'all'),

	    // 6. Let dateTimeFormat be the result of creating a new object as if by the
	    //    expression new Intl.DateTimeFormat(locales, options) where
	    //    Intl.DateTimeFormat is the standard built-in constructor defined in 12.1.3.
	        dateTimeFormat = new DateTimeFormatConstructor(locales, options);

	    // 7. Return the result of calling the FormatDateTime abstract operation (defined
	    //    in 12.3.2) with arguments dateTimeFormat and x.
	    return FormatDateTime(dateTimeFormat, x);
	};

	/**
	 * When the toLocaleDateString method is called with optional arguments locales and
	 * options, the following steps are taken:
	 */
	/* 13.3.2 */ls.Date.toLocaleDateString = function () {
	    // Satisfy test 13.3.0_1
	    if (Object.prototype.toString.call(this) !== '[object Date]')
	        throw new TypeError('`this` value must be a Date instance for Date.prototype.toLocaleDateString()');

	    var
	    // 1. Let x be this time value (as defined in ES5, 15.9.5).
	        x = +this;

	    // 2. If x is NaN, then return "Invalid Date".
	    if (isNaN(x))
	        return 'Invalid Date';

	    var
	    // 3. If locales is not provided, then let locales be undefined.
	        locales = arguments[0],

	    // 4. If options is not provided, then let options be undefined.
	        options = arguments[1],

	    // 5. Let options be the result of calling the ToDateTimeOptions abstract
	    //    operation (defined in 12.1.1) with arguments options, "date", and "date".
	        options = ToDateTimeOptions(options, 'date', 'date'),

	    // 6. Let dateTimeFormat be the result of creating a new object as if by the
	    //    expression new Intl.DateTimeFormat(locales, options) where
	    //    Intl.DateTimeFormat is the standard built-in constructor defined in 12.1.3.
	        dateTimeFormat = new DateTimeFormatConstructor(locales, options);

	    // 7. Return the result of calling the FormatDateTime abstract operation (defined
	    //    in 12.3.2) with arguments dateTimeFormat and x.
	    return FormatDateTime(dateTimeFormat, x);
	};

	/**
	 * When the toLocaleTimeString method is called with optional arguments locales and
	 * options, the following steps are taken:
	 */
	/* 13.3.3 */ls.Date.toLocaleTimeString = function () {
	    // Satisfy test 13.3.0_1
	    if (Object.prototype.toString.call(this) !== '[object Date]')
	        throw new TypeError('`this` value must be a Date instance for Date.prototype.toLocaleTimeString()');

	    var
	    // 1. Let x be this time value (as defined in ES5, 15.9.5).
	        x = +this;

	    // 2. If x is NaN, then return "Invalid Date".
	    if (isNaN(x))
	        return 'Invalid Date';

	    var
	    // 3. If locales is not provided, then let locales be undefined.
	        locales = arguments[0],

	    // 4. If options is not provided, then let options be undefined.
	        options = arguments[1],

	    // 5. Let options be the result of calling the ToDateTimeOptions abstract
	    //    operation (defined in 12.1.1) with arguments options, "time", and "time".
	        options = ToDateTimeOptions(options, 'time', 'time'),

	    // 6. Let dateTimeFormat be the result of creating a new object as if by the
	    //    expression new Intl.DateTimeFormat(locales, options) where
	    //    Intl.DateTimeFormat is the standard built-in constructor defined in 12.1.3.
	        dateTimeFormat = new DateTimeFormatConstructor(locales, options);

	    // 7. Return the result of calling the FormatDateTime abstract operation (defined
	    //    in 12.3.2) with arguments dateTimeFormat and x.
	    return FormatDateTime(dateTimeFormat, x);
	};

	defineProperty(Intl, '__applyLocaleSensitivePrototypes', {
	    writable: true,
	    configurable: true,
	    value: function () {
	        defineProperty(Number.prototype, 'toLocaleString', { writable: true, configurable: true, value: ls.Number.toLocaleString });
	        // Need this here for IE 8, to avoid the _DontEnum_ bug
	        defineProperty(Date.prototype, 'toLocaleString', { writable: true, configurable: true, value: ls.Date.toLocaleString });

	        for (var k in ls.Date) {
	            if (hop.call(ls.Date, k))
	                defineProperty(Date.prototype, k, { writable: true, configurable: true, value: ls.Date[k] });
	        }
	    }
	});

	/**
	 * Can't really ship a single script with data for hundreds of locales, so we provide
	 * this __addLocaleData method as a means for the developer to add the data on an
	 * as-needed basis
	 */
	defineProperty(Intl, '__addLocaleData', {
	    value: function (data) {
	        if (!IsStructurallyValidLanguageTag(data.locale))
	            throw new Error("Object passed doesn't identify itself with a valid language tag");

	        addLocaleData(data, data.locale);
	    }
	});

	function addLocaleData (data, tag) {
	    // Both NumberFormat and DateTimeFormat require number data, so throw if it isn't present
	    if (!data.number)
	        throw new Error("Object passed doesn't contain locale data for Intl.NumberFormat");

	    var locale,
	        locales = [ tag ],
	        parts   = tag.split('-');

	    // Create fallbacks for locale data with scripts, e.g. Latn, Hans, Vaii, etc
	    if (parts.length > 2 && parts[1].length === 4)
	        arrPush.call(locales, parts[0] + '-' + parts[2]);

	    while (locale = arrShift.call(locales)) {
	        // Add to NumberFormat internal properties as per 11.2.3
	        arrPush.call(internals.NumberFormat['[[availableLocales]]'], locale);
	        internals.NumberFormat['[[localeData]]'][locale] = data.number;

	        // ...and DateTimeFormat internal properties as per 12.2.3
	        if (data.date) {
	            data.date.nu = data.number.nu;
	            arrPush.call(internals.DateTimeFormat['[[availableLocales]]'], locale);
	            internals.DateTimeFormat['[[localeData]]'][locale] = data.date;
	        }
	    }

	    // If this is the first set of locale data added, make it the default
	    if (defaultLocale === undefined)
	        defaultLocale = tag;

	    // 11.3 (the NumberFormat prototype object is an Intl.NumberFormat instance)
	    if (!numberFormatProtoInitialised) {
	        InitializeNumberFormat(Intl.NumberFormat.prototype);
	        numberFormatProtoInitialised = true;
	    }

	    // 11.3 (the NumberFormat prototype object is an Intl.NumberFormat instance)
	    if (data.date && !dateTimeFormatProtoInitialised) {
	        InitializeDateTimeFormat(Intl.DateTimeFormat.prototype);
	        dateTimeFormatProtoInitialised = true;
	    }
	}

	// Helper functions
	// ================

	/**
	 * A function to deal with the inaccuracy of calculating log10 in pre-ES6
	 * JavaScript environments. Math.log(num) / Math.LN10 was responsible for
	 * causing issue #62.
	 */
	function log10Floor (n) {
	    // ES6 provides the more accurate Math.log10
	    if (typeof Math.log10 === 'function')
	        return Math.floor(Math.log10(n));

	    var x = Math.round(Math.log(n) * Math.LOG10E);
	    return x - (Number('1e' + x) > n);
	}

	/**
	 * A merge of the Intl.{Constructor}.supportedLocalesOf functions
	 * To make life easier, the function should be bound to the constructor's internal
	 * properties object.
	 */
	function supportedLocalesOf(locales) {
	    /*jshint validthis:true */

	    // Bound functions only have the `this` value altered if being used as a constructor,
	    // this lets us imitate a native function that has no constructor
	    if (!hop.call(this, '[[availableLocales]]'))
	        throw new TypeError('supportedLocalesOf() is not a constructor');

	    var
	    // Create an object whose props can be used to restore the values of RegExp props
	        regexpState = createRegExpRestore(),

	    // 1. If options is not provided, then let options be undefined.
	        options = arguments[1],

	    // 2. Let availableLocales be the value of the [[availableLocales]] internal
	    //    property of the standard built-in object that is the initial value of
	    //    Intl.NumberFormat.

	        availableLocales = this['[[availableLocales]]'],

	    // 3. Let requestedLocales be the result of calling the CanonicalizeLocaleList
	    //    abstract operation (defined in 9.2.1) with argument locales.
	        requestedLocales = CanonicalizeLocaleList(locales);

	    // Restore the RegExp properties
	    regexpState.exp.test(regexpState.input);

	    // 4. Return the result of calling the SupportedLocales abstract operation
	    //    (defined in 9.2.8) with arguments availableLocales, requestedLocales,
	    //    and options.
	    return SupportedLocales(availableLocales, requestedLocales, options);
	}

	/**
	 * Returns a string for a date component, resolved using multiple inheritance as specified
	 * as specified in the Unicode Technical Standard 35.
	 */
	function resolveDateString(data, ca, component, width, key) {
	    // From http://www.unicode.org/reports/tr35/tr35.html#Multiple_Inheritance:
	    // 'In clearly specified instances, resources may inherit from within the same locale.
	    //  For example, ... the Buddhist calendar inherits from the Gregorian calendar.'
	    var obj = data[ca] && data[ca][component]
	                ? data[ca][component]
	                : data.gregory[component],

	        // "sideways" inheritance resolves strings when a key doesn't exist
	        alts = {
	            narrow: ['short', 'long'],
	            short:  ['long', 'narrow'],
	            long:   ['short', 'narrow']
	        },

	        //
	        resolved = hop.call(obj, width)
	                  ? obj[width]
	                  : hop.call(obj, alts[width][0])
	                      ? obj[alts[width][0]]
	                      : obj[alts[width][1]];

	    // `key` wouldn't be specified for components 'dayPeriods'
	    return key != null ? resolved[key] : resolved;
	}

	/**
	 * A map that doesn't contain Object in its prototype chain
	 */
	Record.prototype = objCreate(null);
	function Record (obj) {
	    // Copy only own properties over unless this object is already a Record instance
	    for (var k in obj) {
	        if (obj instanceof Record || hop.call(obj, k))
	            defineProperty(this, k, { value: obj[k], enumerable: true, writable: true, configurable: true });
	    }
	}

	/**
	 * An ordered list
	 */
	List.prototype = objCreate(null);
	function List() {
	    defineProperty(this, 'length', { writable:true, value: 0 });

	    if (arguments.length)
	        arrPush.apply(this, arrSlice.call(arguments));
	}

	/**
	 * Constructs a regular expression to restore tainted RegExp properties
	 */
	function createRegExpRestore () {
	    var esc = /[.?*+^$[\]\\(){}|-]/g,
	        lm  = RegExp.lastMatch || '',
	        ml  = RegExp.multiline ? 'm' : '',
	        ret = { input: RegExp.input },
	        reg = new List(),
	        has = false,
	        cap = {};

	    // Create a snapshot of all the 'captured' properties
	    for (var i = 1; i <= 9; i++)
	        has = (cap['$'+i] = RegExp['$'+i]) || has;

	    // Now we've snapshotted some properties, escape the lastMatch string
	    lm = lm.replace(esc, '\\$&');

	    // If any of the captured strings were non-empty, iterate over them all
	    if (has) {
	        for (var i = 1; i <= 9; i++) {
	            var m = cap['$'+i];

	            // If it's empty, add an empty capturing group
	            if (!m)
	                lm = '()' + lm;

	            // Else find the string in lm and escape & wrap it to capture it
	            else {
	                m = m.replace(esc, '\\$&');
	                lm = lm.replace(m, '(' + m + ')');
	            }

	            // Push it to the reg and chop lm to make sure further groups come after
	            arrPush.call(reg, lm.slice(0, lm.indexOf('(') + 1));
	            lm = lm.slice(lm.indexOf('(') + 1);
	        }
	    }

	    // Create the regular expression that will reconstruct the RegExp properties
	    ret.exp = new RegExp(arrJoin.call(reg, '') + lm, ml);

	    return ret;
	}

	/**
	 * Convert only a-z to uppercase as per section 6.1 of the spec
	 */
	function toLatinUpperCase (str) {
	    var i = str.length;

	    while (i--) {
	        var ch = str.charAt(i);

	        if (ch >= "a" && ch <= "z")
	            str = str.slice(0, i) + ch.toUpperCase() + str.slice(i+1);
	    }

	    return str;
	}

	/**
	 * Mimics ES5's abstract ToObject() function
	 */
	function toObject (arg) {
	    if (arg == null)
	        throw new TypeError('Cannot convert null or undefined to object');

	    return Object(arg);
	}

	/**
	 * Returns "internal" properties for an object
	 */
	function getInternalProperties (obj) {
	    if (hop.call(obj, '__getInternalProperties'))
	        return obj.__getInternalProperties(secret);
	    else
	        return objCreate(null);
	}

	exports["default"] = Intl;

	//# sourceMappingURL=core.js.map

/***/ },
/* 295 */
/***/ function(module, exports) {

	/* jshint esnext: true, laxbreak:true */

	/**
	* Defines regular expressions for various operations related to the BCP 47 syntax,
	* as defined at http://tools.ietf.org/html/bcp47#section-2.1
	*/

	"use strict";

	var
	    // extlang       = 3ALPHA              ; selected ISO 639 codes
	    //                 *2("-" 3ALPHA)      ; permanently reserved
	    extlang = '[a-z]{3}(?:-[a-z]{3}){0,2}',

	    // language      = 2*3ALPHA            ; shortest ISO 639 code
	    //                 ["-" extlang]       ; sometimes followed by
	    //                                     ; extended language subtags
	    //               / 4ALPHA              ; or reserved for future use
	    //               / 5*8ALPHA            ; or registered language subtag
	    language = '(?:[a-z]{2,3}(?:-' + extlang + ')?|[a-z]{4}|[a-z]{5,8})',

	    // script        = 4ALPHA              ; ISO 15924 code
	    script = '[a-z]{4}',

	    // region        = 2ALPHA              ; ISO 3166-1 code
	    //               / 3DIGIT              ; UN M.49 code
	    region = '(?:[a-z]{2}|\\d{3})',

	    // variant       = 5*8alphanum         ; registered variants
	    //               / (DIGIT 3alphanum)
	    variant = '(?:[a-z0-9]{5,8}|\\d[a-z0-9]{3})',

	    //                                     ; Single alphanumerics
	    //                                     ; "x" reserved for private use
	    // singleton     = DIGIT               ; 0 - 9
	    //               / %x41-57             ; A - W
	    //               / %x59-5A             ; Y - Z
	    //               / %x61-77             ; a - w
	    //               / %x79-7A             ; y - z
	    singleton = '[0-9a-wy-z]',

	    // extension     = singleton 1*("-" (2*8alphanum))
	    extension = singleton + '(?:-[a-z0-9]{2,8})+',

	    // privateuse    = "x" 1*("-" (1*8alphanum))
	    privateuse = 'x(?:-[a-z0-9]{1,8})+',

	    // irregular     = "en-GB-oed"         ; irregular tags do not match
	    //               / "i-ami"             ; the 'langtag' production and
	    //               / "i-bnn"             ; would not otherwise be
	    //               / "i-default"         ; considered 'well-formed'
	    //               / "i-enochian"        ; These tags are all valid,
	    //               / "i-hak"             ; but most are deprecated
	    //               / "i-klingon"         ; in favor of more modern
	    //               / "i-lux"             ; subtags or subtag
	    //               / "i-mingo"           ; combination
	    //               / "i-navajo"
	    //               / "i-pwn"
	    //               / "i-tao"
	    //               / "i-tay"
	    //               / "i-tsu"
	    //               / "sgn-BE-FR"
	    //               / "sgn-BE-NL"
	    //               / "sgn-CH-DE"
	    irregular = '(?:en-GB-oed'
	              + '|i-(?:ami|bnn|default|enochian|hak|klingon|lux|mingo|navajo|pwn|tao|tay|tsu)'
	              + '|sgn-(?:BE-FR|BE-NL|CH-DE))',

	    // regular       = "art-lojban"        ; these tags match the 'langtag'
	    //               / "cel-gaulish"       ; production, but their subtags
	    //               / "no-bok"            ; are not extended language
	    //               / "no-nyn"            ; or variant subtags: their meaning
	    //               / "zh-guoyu"          ; is defined by their registration
	    //               / "zh-hakka"          ; and all of these are deprecated
	    //               / "zh-min"            ; in favor of a more modern
	    //               / "zh-min-nan"        ; subtag or sequence of subtags
	    //               / "zh-xiang"
	    regular = '(?:art-lojban|cel-gaulish|no-bok|no-nyn'
	            + '|zh-(?:guoyu|hakka|min|min-nan|xiang))',

	    // grandfathered = irregular           ; non-redundant tags registered
	    //               / regular             ; during the RFC 3066 era
	    grandfathered = '(?:' + irregular + '|' + regular + ')',

	    // langtag       = language
	    //                 ["-" script]
	    //                 ["-" region]
	    //                 *("-" variant)
	    //                 *("-" extension)
	    //                 ["-" privateuse]
	    langtag = language + '(?:-' + script + ')?(?:-' + region + ')?(?:-'
	            + variant + ')*(?:-' + extension + ')*(?:-' + privateuse + ')?';

	var expBCP47Syntax = RegExp('^(?:'+langtag+'|'+privateuse+'|'+grandfathered+')$', 'i');

	var expVariantDupes = RegExp('^(?!x).*?-('+variant+')-(?:\\w{4,8}-(?!x-))*\\1\\b', 'i');

	var expSingletonDupes = RegExp('^(?!x).*?-('+singleton+')-(?:\\w+-(?!x-))*\\1\\b', 'i');

	var expExtSequences = RegExp('-'+extension, 'ig');
	exports.expBCP47Syntax = expBCP47Syntax, exports.expVariantDupes = expVariantDupes, exports.expSingletonDupes = expSingletonDupes, exports.expExtSequences = expExtSequences;

	//# sourceMappingURL=exp.js.map

/***/ },
/* 296 */
/***/ function(module, exports) {

	/* jslint esnext: true */

	// Match these datetime components in a CLDR pattern, except those in single quotes
	"use strict";
	exports.createDateTimeFormat = createDateTimeFormat, exports.createDateTimeFormats = createDateTimeFormats;
	var expDTComponents = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
	// trim patterns after transformations
	var expPatternTrimmer = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
	// Skip over patterns with these datetime components because we don't have data
	// to back them up:
	// timezone, weekday, amoung others
	var unwantedDTCs = /[rqQxXVOvZASjJgwWIQq]/;

	var dtKeys = ["weekday", "era", "year", "month", "day", "weekday", "quarter"];
	var tmKeys = ["hour", "minute", "second", "hour12", "timeZoneName"];

	function isDateFormatOnly(obj) {
	    for (var i = 0; i < tmKeys.length; i += 1) {
	        if (obj.hasOwnProperty(tmKeys[i])) {
	            return false;
	        }
	    }
	    return true;
	}

	function isTimeFormatOnly(obj) {
	    for (var i = 0; i < dtKeys.length; i += 1) {
	        if (obj.hasOwnProperty(dtKeys[i])) {
	            return false;
	        }
	    }
	    return true;
	}

	function joinDateAndTimeFormats(dateFormatObj, timeFormatObj) {
	    var o = {};
	    for (var i = 0; i < dtKeys.length; i += 1) {
	        if (dateFormatObj[dtKeys[i]]) {
	            o[dtKeys[i]] = dateFormatObj[dtKeys[i]];
	        }
	    }
	    for (var j = 0; j < tmKeys.length; j += 1) {
	        if (timeFormatObj[tmKeys[j]]) {
	            o[tmKeys[j]] = timeFormatObj[tmKeys[j]];
	        }
	    }
	    return o;
	}

	function computeFinalPatterns(formatObj) {
	    // From http://www.unicode.org/reports/tr35/tr35-dates.html#Date_Format_Patterns:
	    //  'In patterns, two single quotes represents a literal single quote, either
	    //   inside or outside single quotes. Text within single quotes is not
	    //   interpreted in any way (except for two adjacent single quotes).'
	    formatObj.pattern12 = formatObj.extendedPattern.replace(/'([^']*)'/g, function ($0, literal) {
	        return literal ? literal : "'";
	    });

	    // pattern 12 is always the default. we can produce the 24 by removing {ampm}
	    formatObj.pattern = formatObj.pattern12.replace('{ampm}', '').replace(expPatternTrimmer, '');
	    return formatObj;
	}

	function createDateTimeFormat(skeleton, pattern) {
	    // we ignore certain patterns that are unsupported to avoid this expensive op.
	    if (unwantedDTCs.test(pattern))
	        return undefined;

	    var formatObj = {
	        originalPattern: pattern
	    };

	    // Replace the pattern string with the one required by the specification, whilst
	    // at the same time evaluating it for the subsets and formats
	    formatObj.extendedPattern = pattern.replace(expDTComponents, function ($0) {
	        // See which symbol we're dealing with
	        switch ($0.charAt(0)) {

	            // --- Era
	            case 'G':
	                return '{era}';

	            // --- Year
	            case 'y':
	            case 'Y':
	            case 'u':
	            case 'U':
	            case 'r':
	                return '{year}';

	            // --- Quarter (not supported in this polyfill)
	            case 'Q':
	            case 'q':
	                return '{quarter}';

	            // --- Month
	            case 'M':
	            case 'L':
	                return '{month}';

	            // --- Week (not supported in this polyfill)
	            case 'w':
	            case 'W':
	                return '{weekday}';

	            // --- Day
	            case 'd':
	            case 'D':
	            case 'F':
	            case 'g':
	                return '{day}';

	            // --- Week Day
	            case 'E':
	            case 'e':
	            case 'c':
	                return '{weekday}';

	            // --- Period
	            case 'a':
	            case 'b':
	            case 'B':
	                return '{ampm}';

	            // --- Hour
	            case 'h':
	            case 'H':
	            case 'k':
	            case 'K':
	                return '{hour}';

	            // --- Minute
	            case 'm':
	                return '{minute}';

	            // --- Second
	            case 's':
	            case 'S':
	            case 'A':
	                return '{second}';

	            // --- Timezone
	            case 'z':
	            case 'Z':
	            case 'O':
	            case 'v':
	            case 'V':
	            case 'X':
	            case 'x':
	                return '{timeZoneName}';

	        }
	    });

	    // Match the skeleton string with the one required by the specification
	    // this implementation is based on the Date Field Symbol Table:
	    // http://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
	    // Note: we are adding extra data to the formatObject even though this polyfill
	    //       might not support it.
	    skeleton.replace(expDTComponents, function ($0) {
	        // See which symbol we're dealing with
	        switch ($0.charAt(0)) {

	            // --- Era
	            case 'G':
	                formatObj.era = [ 'short', 'short', 'short', 'long', 'narrow' ][$0.length-1];
	                break;

	            // --- Year
	            case 'y':
	            case 'Y':
	            case 'u':
	            case 'U':
	                formatObj.year = $0.length === 2 ? '2-digit' : 'numeric';
	                break;
	            // case 'r':
	                // r: 1..n - For the Gregorian calendar, the 'r' year is the same as the 'u' year.
	                // break;

	            // --- Quarter (not supported in this polyfill)
	            case 'Q':
	            case 'q':
	                formatObj.quarter = [ 'numeric', '2-digit', 'short', 'long', 'narrow' ][$0.length-1];
	                break;

	            // --- Month
	            case 'M':
	            case 'L':
	                formatObj.month = [ 'numeric', '2-digit', 'short', 'long', 'narrow' ][$0.length-1];
	                break;

	            // --- Week (not supported in this polyfill)
	            case 'w':
	                // week of the year
	                formatObj.week = $0.length === 2 ? '2-digit' : 'numeric';
	                break;
	            case 'W':
	                // week of the month
	                formatObj.week = 'numeric';
	                break;

	            // --- Day
	            case 'd':
	                // day of the month
	                formatObj.day = $0.length === 2 ? '2-digit' : 'numeric';
	                break;
	            case 'D':
	                // day of the year
	                formatObj.day = 'numeric';
	                break;
	            case 'F':
	                // day of the week
	                formatObj.day = 'numeric';
	                break;
	            // case 'g':
	                // 1..n: Modified Julian day
	                // break;

	            // --- Week Day
	            case 'E':
	                // day of the week
	                formatObj.weekday = [ 'short', 'short', 'short', 'long', 'narrow', 'short' ][$0.length-1];
	                break;
	            case 'e':
	                // local day of the week
	                formatObj.weekday = [ 'numeric', '2-digit', 'short', 'long', 'narrow', 'short' ][$0.length-1];
	                break;
	            case 'c':
	                // stand alone local day of the week
	                formatObj.weekday = [ 'numeric', undefined, 'short', 'long', 'narrow', 'short' ][$0.length-1];
	                break;

	            // --- Period
	            case 'a': // AM, PM
	            case 'b': // am, pm, noon, midnight
	            case 'B': // flexible day periods
	                formatObj.hour12 = true;
	                break;

	            // --- Hour
	            case 'H':
	            case 'k':
	                formatObj.hour = $0.length === 2 ? '2-digit' : 'numeric';
	                break;
	            case 'h':
	            case 'K':
	                formatObj.hour12 = true; // 12-hour-cycle time formats (using h or K)
	                formatObj.hour = $0.length === 2 ? '2-digit' : 'numeric';
	                break;

	            // --- Minute
	            case 'm':
	                formatObj.minute = $0.length === 2 ? '2-digit' : 'numeric';
	                break;

	            // --- Second
	            case 's':
	                formatObj.second = $0.length === 2 ? '2-digit' : 'numeric';
	                break;
	            // case 'S': // 1..n: factional seconds
	            // case 'A': // 1..n: miliseconds in day

	            // --- Timezone
	            case 'z': // 1..3, 4: specific non-location format
	            case 'Z': // 1..3, 4, 5: The ISO8601 varios formats
	            case 'O': // 1, 4: miliseconds in day short, long
	            case 'v': // 1, 4: generic non-location format
	            case 'V': // 1, 2, 3, 4: time zone ID or city
	            case 'X': // 1, 2, 3, 4: The ISO8601 varios formats
	            case 'x': // 1, 2, 3, 4: The ISO8601 varios formats
	                // this polyfill only supports much, for now, we are just doing something dummy
	                formatObj.timeZoneName = $0.length < 4 ? 'short' : 'long';
	                break;

	        }
	    });

	    return computeFinalPatterns(formatObj);
	}

	function createDateTimeFormats(formats) {
	    var availableFormats = formats.availableFormats;
	    var timeFormats = formats.timeFormats;
	    var dateFormats = formats.dateFormats;
	    var result = [];
	    var skeleton, pattern, computed, i, j;
	    var timeRelatedFormats = [];
	    var dateRelatedFormats = [];

	    // Map available (custom) formats into a pattern for createDateTimeFormats
	    for (skeleton in availableFormats) {
	        if (availableFormats.hasOwnProperty(skeleton)) {
	            pattern = availableFormats[skeleton];
	            computed = createDateTimeFormat(skeleton, pattern);
	            if (computed) {
	                result.push(computed);
	                // in some cases, the format is only displaying date specific props
	                // or time specific props, in which case we need to also produce the
	                // combined formats.
	                if (isDateFormatOnly(computed)) {
	                    dateRelatedFormats.push(computed);
	                } else if (isTimeFormatOnly(computed)) {
	                    timeRelatedFormats.push(computed);
	                }
	            }
	        }
	    }

	    // Map time formats into a pattern for createDateTimeFormats
	    for (skeleton in timeFormats) {
	        if (timeFormats.hasOwnProperty(skeleton)) {
	            pattern = timeFormats[skeleton];
	            computed = createDateTimeFormat(skeleton, pattern);
	            if (computed) {
	                result.push(computed);
	                timeRelatedFormats.push(computed);
	            }
	        }
	    }

	    // Map date formats into a pattern for createDateTimeFormats
	    for (skeleton in dateFormats) {
	        if (dateFormats.hasOwnProperty(skeleton)) {
	            pattern = dateFormats[skeleton];
	            computed = createDateTimeFormat(skeleton, pattern);
	            if (computed) {
	                result.push(computed);
	                dateRelatedFormats.push(computed);
	            }
	        }
	    }

	    // combine custom time and custom date formats when they are orthogonals to complete the
	    // formats supported by CLDR.
	    // This Algo is based on section "Missing Skeleton Fields" from:
	    // http://unicode.org/reports/tr35/tr35-dates.html#availableFormats_appendItems
	    for (i = 0; i < timeRelatedFormats.length; i += 1) {
	        for (j = 0; j < dateRelatedFormats.length; j += 1) {
	            if (dateRelatedFormats[j].month === 'long') {
	                pattern = dateRelatedFormats[j].weekday ? formats.full : formats.long;
	            } else if (dateRelatedFormats[j].month === 'short') {
	                pattern = formats.medium;
	            } else {
	                pattern = formats.short;
	            }
	            computed = joinDateAndTimeFormats(dateRelatedFormats[j], timeRelatedFormats[i]);
	            computed.originalPattern = pattern;
	            computed.extendedPattern = pattern
	                .replace('{0}', timeRelatedFormats[i].extendedPattern)
	                .replace('{1}', dateRelatedFormats[j].extendedPattern)
	                .replace(/^[,\s]+|[,\s]+$/gi, '');
	            result.push(computeFinalPatterns(computed));
	        }
	    }

	    return result;
	}

	//# sourceMappingURL=cldr.js.map

/***/ },
/* 297 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 298 */
/***/ function(module, exports) {

	IntlPolyfill.__addLocaleData({locale:"en",date:{ca:["gregory","buddhist","chinese","coptic","dangi","ethioaa","ethiopic","generic","hebrew","indian","islamic","islamicc","japanese","persian","roc"],hourNo0:true,hour12:true,formats:{short:"{1}, {0}",medium:"{1}, {0}",full:"{1} 'at' {0}",long:"{1} 'at' {0}",availableFormats:{"d":"d","E":"ccc",Ed:"d E",Ehm:"E h:mm a",EHm:"E HH:mm",Ehms:"E h:mm:ss a",EHms:"E HH:mm:ss",Gy:"y G",GyMMM:"MMM y G",GyMMMd:"MMM d, y G",GyMMMEd:"E, MMM d, y G","h":"h a","H":"HH",hm:"h:mm a",Hm:"HH:mm",hms:"h:mm:ss a",Hms:"HH:mm:ss",hmsv:"h:mm:ss a v",Hmsv:"HH:mm:ss v",hmv:"h:mm a v",Hmv:"HH:mm v","M":"L",Md:"M/d",MEd:"E, M/d",MMM:"LLL",MMMd:"MMM d",MMMEd:"E, MMM d",MMMMd:"MMMM d",ms:"mm:ss","y":"y",yM:"M/y",yMd:"M/d/y",yMEd:"E, M/d/y",yMMM:"MMM y",yMMMd:"MMM d, y",yMMMEd:"E, MMM d, y",yMMMM:"MMMM y",yQQQ:"QQQ y",yQQQQ:"QQQQ y"},dateFormats:{yMMMMEEEEd:"EEEE, MMMM d, y",yMMMMd:"MMMM d, y",yMMMd:"MMM d, y",yMd:"M/d/yy"},timeFormats:{hmmsszzzz:"h:mm:ss a zzzz",hmsz:"h:mm:ss a z",hms:"h:mm:ss a",hm:"h:mm a"}},calendars:{buddhist:{months:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],short:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],long:["January","February","March","April","May","June","July","August","September","October","November","December"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["BE"],short:["BE"],long:["BE"]},dayPeriods:{am:"AM",pm:"PM"}},chinese:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Mo1","Mo2","Mo3","Mo4","Mo5","Mo6","Mo7","Mo8","Mo9","Mo10","Mo11","Mo12"],long:["Month1","Month2","Month3","Month4","Month5","Month6","Month7","Month8","Month9","Month10","Month11","Month12"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},dayPeriods:{am:"AM",pm:"PM"}},coptic:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12","13"],short:["Tout","Baba","Hator","Kiahk","Toba","Amshir","Baramhat","Baramouda","Bashans","Paona","Epep","Mesra","Nasie"],long:["Tout","Baba","Hator","Kiahk","Toba","Amshir","Baramhat","Baramouda","Bashans","Paona","Epep","Mesra","Nasie"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["ERA0","ERA1"],short:["ERA0","ERA1"],long:["ERA0","ERA1"]},dayPeriods:{am:"AM",pm:"PM"}},dangi:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Mo1","Mo2","Mo3","Mo4","Mo5","Mo6","Mo7","Mo8","Mo9","Mo10","Mo11","Mo12"],long:["Month1","Month2","Month3","Month4","Month5","Month6","Month7","Month8","Month9","Month10","Month11","Month12"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},dayPeriods:{am:"AM",pm:"PM"}},ethiopic:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12","13"],short:["Meskerem","Tekemt","Hedar","Tahsas","Ter","Yekatit","Megabit","Miazia","Genbot","Sene","Hamle","Nehasse","Pagumen"],long:["Meskerem","Tekemt","Hedar","Tahsas","Ter","Yekatit","Megabit","Miazia","Genbot","Sene","Hamle","Nehasse","Pagumen"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["ERA0","ERA1"],short:["ERA0","ERA1"],long:["ERA0","ERA1"]},dayPeriods:{am:"AM",pm:"PM"}},ethioaa:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12","13"],short:["Meskerem","Tekemt","Hedar","Tahsas","Ter","Yekatit","Megabit","Miazia","Genbot","Sene","Hamle","Nehasse","Pagumen"],long:["Meskerem","Tekemt","Hedar","Tahsas","Ter","Yekatit","Megabit","Miazia","Genbot","Sene","Hamle","Nehasse","Pagumen"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["ERA0"],short:["ERA0"],long:["ERA0"]},dayPeriods:{am:"AM",pm:"PM"}},generic:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["M01","M02","M03","M04","M05","M06","M07","M08","M09","M10","M11","M12"],long:["M01","M02","M03","M04","M05","M06","M07","M08","M09","M10","M11","M12"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["ERA0","ERA1"],short:["ERA0","ERA1"],long:["ERA0","ERA1"]},dayPeriods:{am:"AM",pm:"PM"}},gregory:{months:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],short:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],long:["January","February","March","April","May","June","July","August","September","October","November","December"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["B","A","BCE","CE"],short:["BC","AD","BCE","CE"],long:["Before Christ","Anno Domini","Before Common Era","Common Era"]},dayPeriods:{am:"AM",pm:"PM"}},hebrew:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12","13","7"],short:["Tishri","Heshvan","Kislev","Tevet","Shevat","Adar I","Adar","Nisan","Iyar","Sivan","Tamuz","Av","Elul","Adar II"],long:["Tishri","Heshvan","Kislev","Tevet","Shevat","Adar I","Adar","Nisan","Iyar","Sivan","Tamuz","Av","Elul","Adar II"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["AM"],short:["AM"],long:["AM"]},dayPeriods:{am:"AM",pm:"PM"}},indian:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Chaitra","Vaisakha","Jyaistha","Asadha","Sravana","Bhadra","Asvina","Kartika","Agrahayana","Pausa","Magha","Phalguna"],long:["Chaitra","Vaisakha","Jyaistha","Asadha","Sravana","Bhadra","Asvina","Kartika","Agrahayana","Pausa","Magha","Phalguna"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["Saka"],short:["Saka"],long:["Saka"]},dayPeriods:{am:"AM",pm:"PM"}},islamic:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Muh.","Saf.","Rab. I","Rab. II","Jum. I","Jum. II","Raj.","Sha.","Ram.","Shaw.","Dhuʻl-Q.","Dhuʻl-H."],long:["Muharram","Safar","Rabiʻ I","Rabiʻ II","Jumada I","Jumada II","Rajab","Shaʻban","Ramadan","Shawwal","Dhuʻl-Qiʻdah","Dhuʻl-Hijjah"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["AH"],short:["AH"],long:["AH"]},dayPeriods:{am:"AM",pm:"PM"}},islamicc:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Muh.","Saf.","Rab. I","Rab. II","Jum. I","Jum. II","Raj.","Sha.","Ram.","Shaw.","Dhuʻl-Q.","Dhuʻl-H."],long:["Muharram","Safar","Rabiʻ I","Rabiʻ II","Jumada I","Jumada II","Rajab","Shaʻban","Ramadan","Shawwal","Dhuʻl-Qiʻdah","Dhuʻl-Hijjah"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["AH"],short:["AH"],long:["AH"]},dayPeriods:{am:"AM",pm:"PM"}},japanese:{months:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],short:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],long:["January","February","March","April","May","June","July","August","September","October","November","December"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["Taika (645–650)","Hakuchi (650–671)","Hakuhō (672–686)","Shuchō (686–701)","Taihō (701–704)","Keiun (704–708)","Wadō (708–715)","Reiki (715–717)","Yōrō (717–724)","Jinki (724–729)","Tenpyō (729–749)","Tenpyō-kampō (749-749)","Tenpyō-shōhō (749-757)","Tenpyō-hōji (757-765)","Tenpyō-jingo (765-767)","Jingo-keiun (767-770)","Hōki (770–780)","Ten-ō (781-782)","Enryaku (782–806)","Daidō (806–810)","Kōnin (810–824)","Tenchō (824–834)","Jōwa (834–848)","Kajō (848–851)","Ninju (851–854)","Saikō (854–857)","Ten-an (857-859)","Jōgan (859–877)","Gangyō (877–885)","Ninna (885–889)","Kanpyō (889–898)","Shōtai (898–901)","Engi (901–923)","Enchō (923–931)","Jōhei (931–938)","Tengyō (938–947)","Tenryaku (947–957)","Tentoku (957–961)","Ōwa (961–964)","Kōhō (964–968)","Anna (968–970)","Tenroku (970–973)","Ten’en (973–976)","Jōgen (976–978)","Tengen (978–983)","Eikan (983–985)","Kanna (985–987)","Eien (987–989)","Eiso (989–990)","Shōryaku (990–995)","Chōtoku (995–999)","Chōhō (999–1004)","Kankō (1004–1012)","Chōwa (1012–1017)","Kannin (1017–1021)","Jian (1021–1024)","Manju (1024–1028)","Chōgen (1028–1037)","Chōryaku (1037–1040)","Chōkyū (1040–1044)","Kantoku (1044–1046)","Eishō (1046–1053)","Tengi (1053–1058)","Kōhei (1058–1065)","Jiryaku (1065–1069)","Enkyū (1069–1074)","Shōho (1074–1077)","Shōryaku (1077–1081)","Eihō (1081–1084)","Ōtoku (1084–1087)","Kanji (1087–1094)","Kahō (1094–1096)","Eichō (1096–1097)","Jōtoku (1097–1099)","Kōwa (1099–1104)","Chōji (1104–1106)","Kashō (1106–1108)","Tennin (1108–1110)","Ten-ei (1110-1113)","Eikyū (1113–1118)","Gen’ei (1118–1120)","Hōan (1120–1124)","Tenji (1124–1126)","Daiji (1126–1131)","Tenshō (1131–1132)","Chōshō (1132–1135)","Hōen (1135–1141)","Eiji (1141–1142)","Kōji (1142–1144)","Ten’yō (1144–1145)","Kyūan (1145–1151)","Ninpei (1151–1154)","Kyūju (1154–1156)","Hōgen (1156–1159)","Heiji (1159–1160)","Eiryaku (1160–1161)","Ōho (1161–1163)","Chōkan (1163–1165)","Eiman (1165–1166)","Nin’an (1166–1169)","Kaō (1169–1171)","Shōan (1171–1175)","Angen (1175–1177)","Jishō (1177–1181)","Yōwa (1181–1182)","Juei (1182–1184)","Genryaku (1184–1185)","Bunji (1185–1190)","Kenkyū (1190–1199)","Shōji (1199–1201)","Kennin (1201–1204)","Genkyū (1204–1206)","Ken’ei (1206–1207)","Jōgen (1207–1211)","Kenryaku (1211–1213)","Kenpō (1213–1219)","Jōkyū (1219–1222)","Jōō (1222–1224)","Gennin (1224–1225)","Karoku (1225–1227)","Antei (1227–1229)","Kanki (1229–1232)","Jōei (1232–1233)","Tenpuku (1233–1234)","Bunryaku (1234–1235)","Katei (1235–1238)","Ryakunin (1238–1239)","En’ō (1239–1240)","Ninji (1240–1243)","Kangen (1243–1247)","Hōji (1247–1249)","Kenchō (1249–1256)","Kōgen (1256–1257)","Shōka (1257–1259)","Shōgen (1259–1260)","Bun’ō (1260–1261)","Kōchō (1261–1264)","Bun’ei (1264–1275)","Kenji (1275–1278)","Kōan (1278–1288)","Shōō (1288–1293)","Einin (1293–1299)","Shōan (1299–1302)","Kengen (1302–1303)","Kagen (1303–1306)","Tokuji (1306–1308)","Enkyō (1308–1311)","Ōchō (1311–1312)","Shōwa (1312–1317)","Bunpō (1317–1319)","Genō (1319–1321)","Genkō (1321–1324)","Shōchū (1324–1326)","Karyaku (1326–1329)","Gentoku (1329–1331)","Genkō (1331–1334)","Kenmu (1334–1336)","Engen (1336–1340)","Kōkoku (1340–1346)","Shōhei (1346–1370)","Kentoku (1370–1372)","Bunchū (1372–1375)","Tenju (1375–1379)","Kōryaku (1379–1381)","Kōwa (1381–1384)","Genchū (1384–1392)","Meitoku (1384–1387)","Kakei (1387–1389)","Kōō (1389–1390)","Meitoku (1390–1394)","Ōei (1394–1428)","Shōchō (1428–1429)","Eikyō (1429–1441)","Kakitsu (1441–1444)","Bun’an (1444–1449)","Hōtoku (1449–1452)","Kyōtoku (1452–1455)","Kōshō (1455–1457)","Chōroku (1457–1460)","Kanshō (1460–1466)","Bunshō (1466–1467)","Ōnin (1467–1469)","Bunmei (1469–1487)","Chōkyō (1487–1489)","Entoku (1489–1492)","Meiō (1492–1501)","Bunki (1501–1504)","Eishō (1504–1521)","Taiei (1521–1528)","Kyōroku (1528–1532)","Tenbun (1532–1555)","Kōji (1555–1558)","Eiroku (1558–1570)","Genki (1570–1573)","Tenshō (1573–1592)","Bunroku (1592–1596)","Keichō (1596–1615)","Genna (1615–1624)","Kan’ei (1624–1644)","Shōho (1644–1648)","Keian (1648–1652)","Jōō (1652–1655)","Meireki (1655–1658)","Manji (1658–1661)","Kanbun (1661–1673)","Enpō (1673–1681)","Tenna (1681–1684)","Jōkyō (1684–1688)","Genroku (1688–1704)","Hōei (1704–1711)","Shōtoku (1711–1716)","Kyōhō (1716–1736)","Genbun (1736–1741)","Kanpō (1741–1744)","Enkyō (1744–1748)","Kan’en (1748–1751)","Hōreki (1751–1764)","Meiwa (1764–1772)","An’ei (1772–1781)","Tenmei (1781–1789)","Kansei (1789–1801)","Kyōwa (1801–1804)","Bunka (1804–1818)","Bunsei (1818–1830)","Tenpō (1830–1844)","Kōka (1844–1848)","Kaei (1848–1854)","Ansei (1854–1860)","Man’en (1860–1861)","Bunkyū (1861–1864)","Genji (1864–1865)","Keiō (1865–1868)","M","T","S","H"],short:["Taika (645–650)","Hakuchi (650–671)","Hakuhō (672–686)","Shuchō (686–701)","Taihō (701–704)","Keiun (704–708)","Wadō (708–715)","Reiki (715–717)","Yōrō (717–724)","Jinki (724–729)","Tenpyō (729–749)","Tenpyō-kampō (749-749)","Tenpyō-shōhō (749-757)","Tenpyō-hōji (757-765)","Tenpyō-jingo (765-767)","Jingo-keiun (767-770)","Hōki (770–780)","Ten-ō (781-782)","Enryaku (782–806)","Daidō (806–810)","Kōnin (810–824)","Tenchō (824–834)","Jōwa (834–848)","Kajō (848–851)","Ninju (851–854)","Saikō (854–857)","Ten-an (857-859)","Jōgan (859–877)","Gangyō (877–885)","Ninna (885–889)","Kanpyō (889–898)","Shōtai (898–901)","Engi (901–923)","Enchō (923–931)","Jōhei (931–938)","Tengyō (938–947)","Tenryaku (947–957)","Tentoku (957–961)","Ōwa (961–964)","Kōhō (964–968)","Anna (968–970)","Tenroku (970–973)","Ten’en (973–976)","Jōgen (976–978)","Tengen (978–983)","Eikan (983–985)","Kanna (985–987)","Eien (987–989)","Eiso (989–990)","Shōryaku (990–995)","Chōtoku (995–999)","Chōhō (999–1004)","Kankō (1004–1012)","Chōwa (1012–1017)","Kannin (1017–1021)","Jian (1021–1024)","Manju (1024–1028)","Chōgen (1028–1037)","Chōryaku (1037–1040)","Chōkyū (1040–1044)","Kantoku (1044–1046)","Eishō (1046–1053)","Tengi (1053–1058)","Kōhei (1058–1065)","Jiryaku (1065–1069)","Enkyū (1069–1074)","Shōho (1074–1077)","Shōryaku (1077–1081)","Eihō (1081–1084)","Ōtoku (1084–1087)","Kanji (1087–1094)","Kahō (1094–1096)","Eichō (1096–1097)","Jōtoku (1097–1099)","Kōwa (1099–1104)","Chōji (1104–1106)","Kashō (1106–1108)","Tennin (1108–1110)","Ten-ei (1110-1113)","Eikyū (1113–1118)","Gen’ei (1118–1120)","Hōan (1120–1124)","Tenji (1124–1126)","Daiji (1126–1131)","Tenshō (1131–1132)","Chōshō (1132–1135)","Hōen (1135–1141)","Eiji (1141–1142)","Kōji (1142–1144)","Ten’yō (1144–1145)","Kyūan (1145–1151)","Ninpei (1151–1154)","Kyūju (1154–1156)","Hōgen (1156–1159)","Heiji (1159–1160)","Eiryaku (1160–1161)","Ōho (1161–1163)","Chōkan (1163–1165)","Eiman (1165–1166)","Nin’an (1166–1169)","Kaō (1169–1171)","Shōan (1171–1175)","Angen (1175–1177)","Jishō (1177–1181)","Yōwa (1181–1182)","Juei (1182–1184)","Genryaku (1184–1185)","Bunji (1185–1190)","Kenkyū (1190–1199)","Shōji (1199–1201)","Kennin (1201–1204)","Genkyū (1204–1206)","Ken’ei (1206–1207)","Jōgen (1207–1211)","Kenryaku (1211–1213)","Kenpō (1213–1219)","Jōkyū (1219–1222)","Jōō (1222–1224)","Gennin (1224–1225)","Karoku (1225–1227)","Antei (1227–1229)","Kanki (1229–1232)","Jōei (1232–1233)","Tenpuku (1233–1234)","Bunryaku (1234–1235)","Katei (1235–1238)","Ryakunin (1238–1239)","En’ō (1239–1240)","Ninji (1240–1243)","Kangen (1243–1247)","Hōji (1247–1249)","Kenchō (1249–1256)","Kōgen (1256–1257)","Shōka (1257–1259)","Shōgen (1259–1260)","Bun’ō (1260–1261)","Kōchō (1261–1264)","Bun’ei (1264–1275)","Kenji (1275–1278)","Kōan (1278–1288)","Shōō (1288–1293)","Einin (1293–1299)","Shōan (1299–1302)","Kengen (1302–1303)","Kagen (1303–1306)","Tokuji (1306–1308)","Enkyō (1308–1311)","Ōchō (1311–1312)","Shōwa (1312–1317)","Bunpō (1317–1319)","Genō (1319–1321)","Genkō (1321–1324)","Shōchū (1324–1326)","Karyaku (1326–1329)","Gentoku (1329–1331)","Genkō (1331–1334)","Kenmu (1334–1336)","Engen (1336–1340)","Kōkoku (1340–1346)","Shōhei (1346–1370)","Kentoku (1370–1372)","Bunchū (1372–1375)","Tenju (1375–1379)","Kōryaku (1379–1381)","Kōwa (1381–1384)","Genchū (1384–1392)","Meitoku (1384–1387)","Kakei (1387–1389)","Kōō (1389–1390)","Meitoku (1390–1394)","Ōei (1394–1428)","Shōchō (1428–1429)","Eikyō (1429–1441)","Kakitsu (1441–1444)","Bun’an (1444–1449)","Hōtoku (1449–1452)","Kyōtoku (1452–1455)","Kōshō (1455–1457)","Chōroku (1457–1460)","Kanshō (1460–1466)","Bunshō (1466–1467)","Ōnin (1467–1469)","Bunmei (1469–1487)","Chōkyō (1487–1489)","Entoku (1489–1492)","Meiō (1492–1501)","Bunki (1501–1504)","Eishō (1504–1521)","Taiei (1521–1528)","Kyōroku (1528–1532)","Tenbun (1532–1555)","Kōji (1555–1558)","Eiroku (1558–1570)","Genki (1570–1573)","Tenshō (1573–1592)","Bunroku (1592–1596)","Keichō (1596–1615)","Genna (1615–1624)","Kan’ei (1624–1644)","Shōho (1644–1648)","Keian (1648–1652)","Jōō (1652–1655)","Meireki (1655–1658)","Manji (1658–1661)","Kanbun (1661–1673)","Enpō (1673–1681)","Tenna (1681–1684)","Jōkyō (1684–1688)","Genroku (1688–1704)","Hōei (1704–1711)","Shōtoku (1711–1716)","Kyōhō (1716–1736)","Genbun (1736–1741)","Kanpō (1741–1744)","Enkyō (1744–1748)","Kan’en (1748–1751)","Hōreki (1751–1764)","Meiwa (1764–1772)","An’ei (1772–1781)","Tenmei (1781–1789)","Kansei (1789–1801)","Kyōwa (1801–1804)","Bunka (1804–1818)","Bunsei (1818–1830)","Tenpō (1830–1844)","Kōka (1844–1848)","Kaei (1848–1854)","Ansei (1854–1860)","Man’en (1860–1861)","Bunkyū (1861–1864)","Genji (1864–1865)","Keiō (1865–1868)","Meiji","Taishō","Shōwa","Heisei"],long:["Taika (645–650)","Hakuchi (650–671)","Hakuhō (672–686)","Shuchō (686–701)","Taihō (701–704)","Keiun (704–708)","Wadō (708–715)","Reiki (715–717)","Yōrō (717–724)","Jinki (724–729)","Tenpyō (729–749)","Tenpyō-kampō (749-749)","Tenpyō-shōhō (749-757)","Tenpyō-hōji (757-765)","Tenpyō-jingo (765-767)","Jingo-keiun (767-770)","Hōki (770–780)","Ten-ō (781-782)","Enryaku (782–806)","Daidō (806–810)","Kōnin (810–824)","Tenchō (824–834)","Jōwa (834–848)","Kajō (848–851)","Ninju (851–854)","Saikō (854–857)","Ten-an (857-859)","Jōgan (859–877)","Gangyō (877–885)","Ninna (885–889)","Kanpyō (889–898)","Shōtai (898–901)","Engi (901–923)","Enchō (923–931)","Jōhei (931–938)","Tengyō (938–947)","Tenryaku (947–957)","Tentoku (957–961)","Ōwa (961–964)","Kōhō (964–968)","Anna (968–970)","Tenroku (970–973)","Ten’en (973–976)","Jōgen (976–978)","Tengen (978–983)","Eikan (983–985)","Kanna (985–987)","Eien (987–989)","Eiso (989–990)","Shōryaku (990–995)","Chōtoku (995–999)","Chōhō (999–1004)","Kankō (1004–1012)","Chōwa (1012–1017)","Kannin (1017–1021)","Jian (1021–1024)","Manju (1024–1028)","Chōgen (1028–1037)","Chōryaku (1037–1040)","Chōkyū (1040–1044)","Kantoku (1044–1046)","Eishō (1046–1053)","Tengi (1053–1058)","Kōhei (1058–1065)","Jiryaku (1065–1069)","Enkyū (1069–1074)","Shōho (1074–1077)","Shōryaku (1077–1081)","Eihō (1081–1084)","Ōtoku (1084–1087)","Kanji (1087–1094)","Kahō (1094–1096)","Eichō (1096–1097)","Jōtoku (1097–1099)","Kōwa (1099–1104)","Chōji (1104–1106)","Kashō (1106–1108)","Tennin (1108–1110)","Ten-ei (1110-1113)","Eikyū (1113–1118)","Gen’ei (1118–1120)","Hōan (1120–1124)","Tenji (1124–1126)","Daiji (1126–1131)","Tenshō (1131–1132)","Chōshō (1132–1135)","Hōen (1135–1141)","Eiji (1141–1142)","Kōji (1142–1144)","Ten’yō (1144–1145)","Kyūan (1145–1151)","Ninpei (1151–1154)","Kyūju (1154–1156)","Hōgen (1156–1159)","Heiji (1159–1160)","Eiryaku (1160–1161)","Ōho (1161–1163)","Chōkan (1163–1165)","Eiman (1165–1166)","Nin’an (1166–1169)","Kaō (1169–1171)","Shōan (1171–1175)","Angen (1175–1177)","Jishō (1177–1181)","Yōwa (1181–1182)","Juei (1182–1184)","Genryaku (1184–1185)","Bunji (1185–1190)","Kenkyū (1190–1199)","Shōji (1199–1201)","Kennin (1201–1204)","Genkyū (1204–1206)","Ken’ei (1206–1207)","Jōgen (1207–1211)","Kenryaku (1211–1213)","Kenpō (1213–1219)","Jōkyū (1219–1222)","Jōō (1222–1224)","Gennin (1224–1225)","Karoku (1225–1227)","Antei (1227–1229)","Kanki (1229–1232)","Jōei (1232–1233)","Tenpuku (1233–1234)","Bunryaku (1234–1235)","Katei (1235–1238)","Ryakunin (1238–1239)","En’ō (1239–1240)","Ninji (1240–1243)","Kangen (1243–1247)","Hōji (1247–1249)","Kenchō (1249–1256)","Kōgen (1256–1257)","Shōka (1257–1259)","Shōgen (1259–1260)","Bun’ō (1260–1261)","Kōchō (1261–1264)","Bun’ei (1264–1275)","Kenji (1275–1278)","Kōan (1278–1288)","Shōō (1288–1293)","Einin (1293–1299)","Shōan (1299–1302)","Kengen (1302–1303)","Kagen (1303–1306)","Tokuji (1306–1308)","Enkyō (1308–1311)","Ōchō (1311–1312)","Shōwa (1312–1317)","Bunpō (1317–1319)","Genō (1319–1321)","Genkō (1321–1324)","Shōchū (1324–1326)","Karyaku (1326–1329)","Gentoku (1329–1331)","Genkō (1331–1334)","Kenmu (1334–1336)","Engen (1336–1340)","Kōkoku (1340–1346)","Shōhei (1346–1370)","Kentoku (1370–1372)","Bunchū (1372–1375)","Tenju (1375–1379)","Kōryaku (1379–1381)","Kōwa (1381–1384)","Genchū (1384–1392)","Meitoku (1384–1387)","Kakei (1387–1389)","Kōō (1389–1390)","Meitoku (1390–1394)","Ōei (1394–1428)","Shōchō (1428–1429)","Eikyō (1429–1441)","Kakitsu (1441–1444)","Bun’an (1444–1449)","Hōtoku (1449–1452)","Kyōtoku (1452–1455)","Kōshō (1455–1457)","Chōroku (1457–1460)","Kanshō (1460–1466)","Bunshō (1466–1467)","Ōnin (1467–1469)","Bunmei (1469–1487)","Chōkyō (1487–1489)","Entoku (1489–1492)","Meiō (1492–1501)","Bunki (1501–1504)","Eishō (1504–1521)","Taiei (1521–1528)","Kyōroku (1528–1532)","Tenbun (1532–1555)","Kōji (1555–1558)","Eiroku (1558–1570)","Genki (1570–1573)","Tenshō (1573–1592)","Bunroku (1592–1596)","Keichō (1596–1615)","Genna (1615–1624)","Kan’ei (1624–1644)","Shōho (1644–1648)","Keian (1648–1652)","Jōō (1652–1655)","Meireki (1655–1658)","Manji (1658–1661)","Kanbun (1661–1673)","Enpō (1673–1681)","Tenna (1681–1684)","Jōkyō (1684–1688)","Genroku (1688–1704)","Hōei (1704–1711)","Shōtoku (1711–1716)","Kyōhō (1716–1736)","Genbun (1736–1741)","Kanpō (1741–1744)","Enkyō (1744–1748)","Kan’en (1748–1751)","Hōreki (1751–1764)","Meiwa (1764–1772)","An’ei (1772–1781)","Tenmei (1781–1789)","Kansei (1789–1801)","Kyōwa (1801–1804)","Bunka (1804–1818)","Bunsei (1818–1830)","Tenpō (1830–1844)","Kōka (1844–1848)","Kaei (1848–1854)","Ansei (1854–1860)","Man’en (1860–1861)","Bunkyū (1861–1864)","Genji (1864–1865)","Keiō (1865–1868)","Meiji","Taishō","Shōwa","Heisei"]},dayPeriods:{am:"AM",pm:"PM"}},persian:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Farvardin","Ordibehesht","Khordad","Tir","Mordad","Shahrivar","Mehr","Aban","Azar","Dey","Bahman","Esfand"],long:["Farvardin","Ordibehesht","Khordad","Tir","Mordad","Shahrivar","Mehr","Aban","Azar","Dey","Bahman","Esfand"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["AP"],short:["AP"],long:["AP"]},dayPeriods:{am:"AM",pm:"PM"}},roc:{months:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],short:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],long:["January","February","March","April","May","June","July","August","September","October","November","December"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["Before R.O.C.","Minguo"],short:["Before R.O.C.","Minguo"],long:["Before R.O.C.","Minguo"]},dayPeriods:{am:"AM",pm:"PM"}}}},number:{nu:["latn"],patterns:{decimal:{positivePattern:"{number}",negativePattern:"-{number}"},currency:{positivePattern:"{currency}{number}",negativePattern:"-{currency}{number}"},percent:{positivePattern:"{number}%",negativePattern:"-{number}%"}},symbols:{latn:{decimal:".",group:",",nan:"NaN",percent:"%",infinity:"∞"}},currencies:{AUD:"A$",BRL:"R$",CAD:"CA$",CNY:"CN¥",EUR:"€",GBP:"£",HKD:"HK$",ILS:"₪",INR:"₹",JPY:"¥",KRW:"₩",MXN:"MX$",NZD:"NZ$",TWD:"NT$",USD:"$",VND:"₫",XAF:"FCFA",XCD:"EC$",XOF:"CFA",XPF:"CFPF"}}});

/***/ },
/* 299 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _events = __webpack_require__(300);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Setup the JanesWalk namespace
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	/**
	 * A deferred event emitter, so events can be queued up
	 */

	var DeferredEventEmitter = function (_EventEmitter) {
	  _inherits(DeferredEventEmitter, _EventEmitter);

	  function DeferredEventEmitter() {
	    _classCallCheck(this, DeferredEventEmitter);

	    // Is our emitter currently broadcasting events

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DeferredEventEmitter).call(this));

	    _this.active = false;
	    // If we're not emitting, queue them up here
	    _this.emits = [];
	    return _this;
	  }

	  /**
	   * Emit an event if we're active, or queue it up if we're not
	   */


	  _createClass(DeferredEventEmitter, [{
	    key: 'emit',
	    value: function emit() {
	      if (this.active) {
	        _get(Object.getPrototypeOf(DeferredEventEmitter.prototype), 'emit', this).apply(this, arguments);
	      } else {
	        this.emits.push(arguments);
	      }
	    }

	    /**
	     * Activate, and process our queued up events
	     */

	  }, {
	    key: 'activate',
	    value: function activate() {
	      var event = void 0;
	      this.active = true;

	      while (event = this.emits.shift()) {
	        _get(Object.getPrototypeOf(DeferredEventEmitter.prototype), 'emit', this).apply(this, event);
	      }
	    }

	    /**
	     * Deactivate
	     */

	  }, {
	    key: 'deactivate',
	    value: function deactivate() {
	      this.active = false;
	    }
	  }]);

	  return DeferredEventEmitter;
	}(_events2.default);

	window.JanesWalk = Object.assign({}, window.JanesWalk, { event: new DeferredEventEmitter() });

/***/ },
/* 300 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ }
/******/ ]);