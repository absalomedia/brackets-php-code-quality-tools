define( function() {
	'use strict';
	
	return {
		enabledTools: [ 'phpcs', 'phpcpd', 'phpl', 'phpmd','phpcsfixer','phpsa' ],
		phpcsStandards: [ 'PSR1', 'PSR2' ],
		phpcsfixerLevel: [ 'all' ],
		php7ccOpts: ['error'],
		phpmdRulesets: [ 'codesize', 'unusedcode', 'naming' ],
	};
} );