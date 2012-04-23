(function($){
	/**
	 * this script automatically changes the spacing of an element
	 * according to the maximum width of the parent divided by
	 * the number of children. Tipically used to dynamically
	 * center an orizontal menu.
	 * @version 1.1
	 */
  $.fn.autopadding = function(options) {
		this.settings = {
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
			 * Set to true if you want to align first element to the container
			 */
			alignFirst				:	false,
			/**
			 * Set to true if you want to align last element to the container
			 */
			alignLast				:	false,
			/**
			 * if you need some king of graphic separator between every element
			 * you have to insert his width here
			 */
			separatorWidth			:	0,
			/**
			 * space of the container wich will not be calculated as free space
			 */
			containerBorder			:	0,
			/**
			 * this is called on every element when all the math stuff is done 
			 * and we know how many padding add to every element.
			 * Usefull if you want to animate every element of the menu with some eye-candy effect.
			 * @param data a json where the padding data is stored accordin to 'type' of the config
			 * @param element the element which data refers to
			 */
			onSingleElement			:	function(data, element){
				switch(this.settings.type) {
					case 'padding': 
						$(element).css({
							'padding-right'		:		data.paddingLeft, 
							'padding-left'		:		data.paddingRight
						});
						break;
					case 'left':
						$(element).css({
							'left'				:		data.pointer
						});
						break;
					case 'width left':
						$(element).css({
							'width'				:		data.pointer
						});
						break;
				}
			},
			/**
			 * This is called when everything is done for the current istance.
			 * Usefull if you want to animate the whole menu with an effect like fade-in
			 */
			onReady					:	function(){return true;}
		};
		if(options) $.extend(this.settings,options);
		var me = this;
		return this.each(function(){
			var that = $(this);
			var elements = that.find(me.settings.elementsSelector);
			var elementsWidth = 0;
			
			elements.each(function(){
				elementsWidth += $(this).outerWidth();//outerWidth(true); doesn't work good on ie9 :|
			});
			
			switch(me.settings.type) {
				case 'padding': 
					var container_space = $(this).outerWidth();
					var free_space = container_space-me.settings.containerBorder-elementsWidth;
					var tmp_padding =(free_space/elements.size())/2.0;
					
					if(me.settings.alignFirst){
						free_space += tmp_padding;
					}
					if(me.settings.alignLast){
						free_space += tmp_padding;
					}
					
					padding = Math.floor((free_space/elements.size())/2.0);
					
					var total_padding = padding*2*elements.size();
					var delta = free_space-total_padding;
					

					elements.each(function(key, value){
						var data = {
							paddingRight	:	(key==0 && me.settings.alignFirst) ? 0 : padding+(((--delta)>1)?1:0),
							paddingLeft		:	(key==elements.size()-1 && me.settings.alignLast) ? 0 : padding
						};
						if(jQuery.isFunction(me.settings.onSingleElement)){
							me.settings.onSingleElement.call(me,data,value);
						}
					});
				break;
				
				//TODO: need some test here
				case 'left':
					var delta = Math.floor(((($(this).outerWidth(true)-me.settings.containerBorder)-elementsWidth)/elements.size()));
					var pointer = 0;
					elements.each(function(key, value){
						if(jQuery.isFunction(me.settings.onSingleElement)){
							me.settings.onSingleElement.call(me,{left:pointer},value);
						}
						pointer = pointer+delta+$(this).outerWidth(true);
					});
				break;
					
				case 'width left':
					var delta = Math.floor(((($(this).outerWidth(true)-me.settings.containerBorder)-elementsWidth)/elements.size()))-Math.floor(me.settings.separatorWidth/elements.size());
					var pointer = 0;
					elements.each(function(key, value){
						pointer = pointer+$(this).outerWidth(true);
						if(jQuery.isFunction(me.settings.onSingleElement)){
							me.settings.onSingleElement.call(me,{left:pointer},value);
						}
						pointer = pointer+delta;
					});
				break;
			}
			if(jQuery.isFunction(me.settings.onReady)){
				me.settings.onReady.call(that);
			}
			
			
		});
	};  
})(jQuery); 