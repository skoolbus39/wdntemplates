/*
 *
 * Function to create a carousel. See http://www1.unl.edu/wdn/wiki/Carousel for more details
 *
 */
define(['wdn', 'require'], function(WDN, require) {
	var defaultSel = '#wdn_Carousel',
	pluginPath = './plugins/flexslider/',
	initd = false;
	
	return {
		

		initialize : function(callback) {
			var min = '', body = document.getElementsByTagName('body');
			if (!body.length || !body[0].className.match(/(^|\s)debug(\s|$)/)) {
				min = '-min';
			}
			
			var done = function() {
				if (callback) {
					callback();
				}
			};
			
			if (!initd) {
				WDN.loadCSS(require.toUrl(pluginPath + 'css/flexslider.css'));
				
				WDN.loadJQuery(function(){
					require([pluginPath + 'jquery.flexslider' + min], function() {
						WDN.jQuery(defaultSel).addClass('flexslider').flexslider();
						initd = true;
						done();
					});
				});
			} else {
				done();
			}
		}
	};
});
