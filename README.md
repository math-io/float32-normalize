Normalize
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Returns a normal number `y` and exponent `exp` satisfying `x = y * 2^exp`.


## Installation

``` bash
$ npm install math-float32-normalize
```


## Usage

``` javascript
var normalize = require( 'math-float32-normalize' );
```

#### normalize( x )

Returns a normal number `y` and exponent `exp` satisfying `x = y * 2^exp`.

``` javascript
var toFloat32 = require( 'float64-to-float32' );

var out = normalize( toFloat32( 1.401e-45 ) );
// returns [ 1.1754943508222875e-38, -23 ]
```

The first element of the returned `array` corresponds to `y` and the second to `exp`.

``` javascript
var pow = require( 'math-power' );

var y = out[ 0 ];
var exp = out[ 1 ];

var bool = ( y*pow(2,exp) === toFloat32(1.401e-45) );
// returns true
```

The `function` expects a finite, non-zero [single-precision floating-point number][ieee754] `x`. If `x == 0`,

``` javascript
var out = normalize( 0 );
// returns [ 0, 0 ];
```

If `x` is either positive or negative `infinity` or `NaN`,

``` javascript
var pinf = require( 'const-pinf-float32' );
var ninf = require( 'const-ninf-float32' );

var out = normalize( pinf );
// returns [ pinf, 0 ]

out = normalize( ninf );
// returns [ ninf, 0 ]

out = normalize( NaN );
// returns [ NaN, 0 ]
```


## Notes

*	While the `function` accepts higher precision [floating-point numbers][ieee754], beware that providing such numbers can be a source of subtle bugs as the relation `x = y * 2^exp` may __not__ hold.


## Examples

``` javascript
var round = require( 'math-round' );
var pow = require( 'math-power' );
var toFloat32 = require( 'float64-to-float32' );
var normalize = require( 'math-float32-normalize' );

var frac;
var exp;
var x;
var v;
var i;

// Generate denormalized single-precision floating-point numbers and then normalize them...
for ( i = 0; i < 100; i++ ) {
	frac = Math.random() * 10;
	exp = 38 + round( Math.random()*6 );
	x = frac * pow( 10, -exp );
	x = toFloat32( x );
	v = normalize( x );
	console.log( '%d = %d * 2^%d = %d', x, v[0], v[1], v[0]*pow(2,v[1]) );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. The [Compute.io][compute-io] Authors.


[npm-image]: http://img.shields.io/npm/v/math-float32-normalize.svg
[npm-url]: https://npmjs.org/package/math-float32-normalize

[build-image]: http://img.shields.io/travis/math-io/float32-normalize/master.svg
[build-url]: https://travis-ci.org/math-io/float32-normalize

[coverage-image]: https://img.shields.io/codecov/c/github/math-io/float32-normalize/master.svg
[coverage-url]: https://codecov.io/github/math-io/float32-normalize?branch=master

[dependencies-image]: http://img.shields.io/david/math-io/float32-normalize.svg
[dependencies-url]: https://david-dm.org/math-io/float32-normalize

[dev-dependencies-image]: http://img.shields.io/david/dev/math-io/float32-normalize.svg
[dev-dependencies-url]: https://david-dm.org/dev/math-io/float32-normalize

[github-issues-image]: http://img.shields.io/github/issues/math-io/float32-normalize.svg
[github-issues-url]: https://github.com/math-io/float32-normalize/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[compute-io]: https://github.com/compute-io/
[ieee754]: https://en.wikipedia.org/wiki/IEEE_754-1985