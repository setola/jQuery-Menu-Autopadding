(function($){
	/**
	 * this script automatically changes the spacing of an element
	 * according to the maximum width of the parent divided by
	 * the number of children. Tipically used to dynamically
	 * center an orizontal menu.
	 * @version 1.0_r9
	 */
  $.fn.autopadding = function(options) {
		var settings = {
			/**
			 * jquery selector of the elements to be padded
			 */
			elementsSelector		: '.autopadding',
			/**
			 * the way the menu is builded:
			 * padding = applyes a padding-right:x and padding-left:x to every element
			 * width left = apply a dynamic width to every element
			 */
			type					:	'padding',
			/**
			 * if you need some king of graphic separator between every element
			 * you have to insert his width here
			 */
			separatorWidth			:	0,
			/**
			 * space of the container wich will not be calculated as free space
			 */
			containerBorder			:	0
		};
		if(options) $.extend(settings,options);
		return this.each(function(){
			var elements = $(this).find(settings.elementsSelector);
			var elementsWidth = 0;
			
			elements.each(function(){
				elementsWidth += $(this).outerWidth();//outerWidth(true); doesn't work good on ie9 :|
			});
			
			var css = {};
			
			function gcd(x, y) {
				while (y != 0) {
					var z = x % y;
					x = y;
					y = z;
				}
				return x;
			}
			
			switch(settings.type) {
				case 'padding': 
					var container_space = $(this).outerWidth();
					var free_space = container_space-settings.containerBorder-elementsWidth;
					var padding = Math.floor((free_space/elements.size())/2.0);
					var total_padding = padding*2*elements.size();
					var delta = free_space-total_padding;

					elements.each(function(key, value){
						var paddingLeft		= padding+(((--delta)>1)?1:0);
						var paddingRight	= padding;
						$(this).css({
							'padding-right'		:		paddingLeft, 
							'padding-left'		:		paddingRight
						});
						console.log(delta);
					});
				break;
				
				//TODO: need some test here
				case 'left':
					var delta = Math.floor(((($(this).outerWidth(true)-settings.containerBorder)-elementsWidth)/elements.size()));
					var pointer = 0;
					elements.each(function(index){
						$(this).css({
							'left'		:		pointer
						});
						pointer = pointer+delta+$(this).outerWidth(true);
					});
				break;
					
				case 'width left':
					var delta = Math.floor(((($(this).outerWidth(true)-settings.containerBorder)-elementsWidth)/elements.size()))-Math.floor(settings.separatorWidth/elements.size());
					var pointer = 0;
					elements.each(function(index){
						pointer = pointer+$(this).outerWidth(true);
						$(this).css({
							'width'		:		pointer
						});
						pointer = pointer+delta;
					});
				break;
			}
			
			
		});
	};  
})(jQuery); 