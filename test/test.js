'use strict';

// MODULES //

var tape = require( 'tape' );
var pow = require( 'math-power' );
var round = require( 'math-round' );
var pinf = require( 'const-pinf-float32' );
var ninf = require( 'const-ninf-float32' );
var smallest = require( 'const-smallest-float32' );
var toFloat32 = require( 'float64-to-float32' );
var normalize = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( typeof normalize === 'function', 'main export is a function' );
	t.end();
});

tape( 'the function normalizes a denormalized number, returning a normal number and an exponent', function test( t ) {
	var frac;
	var exp;
	var x1;
	var x;
	var v;
	var i;

	// Smallest denormalized number:
	v = normalize( smallest.DENORMALIZED );
	t.ok( v[ 0 ] >= smallest.VALUE, 'returns a normal number' );
	t.equal( v[ 0 ]*pow( 2, v[ 1 ] ), smallest.DENORMALIZED, 'x = y * 2^exp' );

	// Other subnormals...
	for ( i = 0; i < 1000; i++ ) {
		frac = 0.26 + Math.random()*10; // 0.26 prevents underflow
		exp = -38 - round( Math.random()*6 );
		x = frac * pow( 10, exp );
		x = toFloat32( x );

		v = normalize( x );
		t.ok( v[ 0 ] >= smallest.VALUE, 'returns a normal number ' + v[0] );

		x1 = v[ 0 ] * pow( 2, v[ 1 ] );
		x1 = toFloat32( x1 );
		t.equal( x1, x, 'y*2^exp=x. y='+v[0]+', exp='+v[1]+', x='+x );
	}
	t.end();
});

tape( 'the function returns `[0,0]` if provided a `0`', function test( t ) {
	var val = normalize( 0 );
	t.deepEqual( val, [0,0], 'returns [0,0]' );
	t.end();
});

tape( 'the function returns `[+inf,0]` if provided a `+infinity`', function test( t ) {
	var val = normalize( pinf );
	t.deepEqual( val, [pinf,0], 'returns [+inf,0]' );
	t.end();
});

tape( 'the function returns `[-inf,0]` if provided a `-infinity`', function test( t ) {
	var val = normalize( ninf );
	t.deepEqual( val, [ninf,0], 'returns [-inf,0]' );
	t.end();
});

tape( 'the function returns `[NaN,0]` if provided a `NaN`', function test( t ) {
	var val = normalize( NaN );
	t.ok( val[0] !== val[0], 'first element is NaN' );
	t.equal( val[1], 0, 'second element is 0' );
	t.end();
});
