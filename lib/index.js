'use strict';

// MODULES //

var SMALLEST_FLOAT32 = require( 'const-smallest-float32' ).VALUE;
var pinf = require( 'const-pinf-float32' );
var ninf = require( 'const-ninf-float32' );
var abs = require( 'math-abs' );
var toFloat32 = require( 'float64-to-float32' );


// CONSTANTS //

// (1<<32)
var SCALAR = 8388608;


// NORMALIZE //

/**
* FUNCTION: normalize( x )
*	Returns a normal number `y` and exponent `exp` satisfying `x = y * 2^exp`.
*
* @param {Number} x - single-precision floating-point number
* @returns {Number[]|Null} a two-element array containing `y` and `exp`
*/
function normalize( x ) {
	if (
		x !== x ||
		x === pinf ||
		x === ninf
	) {
		return [ x, 0 ];
	}
	if ( x !== 0 && abs( x ) < SMALLEST_FLOAT32 ) {
		x = toFloat32( x*SCALAR );
		return [ x, -23 ];
	}
	return [ x, 0 ];
} // end FUNCTION normalize()


// EXPORTS //

module.exports = normalize;
