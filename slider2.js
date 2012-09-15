var Slider = function(options) {
	this.width = options.width;
	this.$el = options.el;
	this.slideCount = this.$el.find('.slide').length;
	this.current = 1;
	this.position = 0;
	this.init();
}

Slider.prototype.init = function() {
    this.$canvas = $('.canvas', this.$el);
    this.$slides = $('.slide', this.$el);
    this.$prev = $('.prev', this.$el);
    this.$next = $('.next', this.$el);
    this.$progress = $('.progress', this.$el);
    this.draw();
    this.bind();
};

Slider.prototype.goto = function(slide, direction) {
	console.log(this.current);
	console.log(direction);
	console.log(slide);
};

Slider.prototype.navigation = function() {
	console.log(this);
	var direction = $(this).data('dir');
	if(direction === 'next') {
		this.goto(this.current + 1, 'right');
	} else {
		this.goto(this.current - 1, 'left');
	}
};

Slider.prototype.bind = function() {
	var that = this;
	$('.controls').on('click', 'button', this.navigation());
};

Slider.prototype.draw = function() {
	this.$el.css({
		'width' : this.width 
	});
	this.$slides.css({
		'width' : this.width
	})
};


$(function() {
	new Slider({
		el: $('#slider'),
		width: 880
	})
})