'use strict';

var round = require( 'math-round' );
var pow = require( 'math-power' );
var toFloat32 = require( 'float64-to-float32' );
var normalize = require( './../lib' );

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