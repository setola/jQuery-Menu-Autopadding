(function($){
	/**
	 * this script automatically changes the padding of an element
	 * according to the maximum width of the parent divided by
	 * the number of children. Tipically used to center a
	 * dynamic orizontal menu.
	 */
  $.fn.autopadding = function(options) {
		var settings = {
				/**
				 * jquery selector of the elements to be padded
				 */
			elementsSelector		: '.autopadding'
		};
		if(options) $.extend(settings,options);
		
		return this.each(function(){
			//var elements = $(this).children(settings.firstChild).children(settings.secondChild);
			var elements = $(this).find(settings.elementsSelector);
			var elementsWidth = 0;
			
			elements.each(function(){
				//elementsWidth += $(this).width();
				elementsWidth += $(this).outerWidth();
			});
			var padding = Math.floor(((($(this).outerWidth())-elementsWidth)/elements.size())/2);
			
			elements.each(function(){
				$(this).css({'padding-right': padding, 'padding-left': padding});
			});
		});
	};  
})(jQuery); 