define( function( require ) {
	'use strict';
	
	// Get module dependencies.
	var Parser = require( 'modules/parsers/base' ),
		PHPCSF = new Parser( 'phpcsfixer', 'PHP Coding Standards Fixer' );
	
	PHPCSF.setCommand( 'php {{path}} fix {{file}} {{type}}{{level}} --verbose' );
	
	PHPCSF.buildCommand = function( file ) {
		var level = this.concatenateArray( this._preferences.get( 'phpcsfixer-level' ) );
		
        if (level.length > 0) {
		return this._command
			.replace( '{{path}}', this._path )
			.replace( '{{file}}', file );
            .replace( '{{type}}', '--rules=')
			.replace( '{{level}}', level );
        } else {
		return this._command
			.replace( '{{path}}', this._path )
			.replace( '{{file}}', file );
            .replace( '{{type}}', '')
			.replace( '{{level}}','');            
        }

    };
	
 
    
	PHPCSF.buildOptions = function() {
		return {
			cwd: this._basePath
		};
	};
	
	PHPCSF.shouldRun = function() {
		return this._preferences.get( 'phpcsfixer-level' ) !== false;
	};
	
	PHPCSF.callback = function( data ) {
		var regularExpression = /(\d+)\s\|\s(.*)\s\|(.*)/g,
			matches,
			type;
		
		// Go through all matching rows in result.
		while ( ( matches = regularExpression.exec( data ) ) !== null ) {
			type = matches[ 2 ].match( 'ERROR' ) ? PHPCSF._codeInspection.Type.ERROR : PHPCSF._codeInspection.Type.WARNING;
			
			// Add each error to array of errors.
			PHPCSF._errors.push( {
				pos: {
					line: parseInt( matches[ 1 ], 10 ) - 1
				},
				message: matches[ 3 ].replace( /\s?\[.?\]\s?/, '' ),
				type: type
			} );
		}
		
		// Run CodeInspection.
		PHPCSF.requestRun();
	};
	
	return PHPCSF;
} );