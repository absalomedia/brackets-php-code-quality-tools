define( function() {
	'use strict';
	
	return {
		enabledTools: [ 'phpcs', 'phpcpd', 'phpl', 'phpmd','phpcsfixer','phpsa' ],
		phpcsStandards: [ 'PSR1', 'PSR2' ],
		phpcsfixerLevel: [ '' ],
		phpmdRulesets: [ 'codesize', 'unusedcode', 'naming' ],
	};
} );