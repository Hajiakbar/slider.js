// Constructor, set some initial values + fallbacks, fire off init, when called needs to be wrapped in $(function(){ //code }) otherwise it won't work
var Slider = function(options) {
    this.width = options.width || 880;
    this.$el = options.el || $('body');
    this.slideCount = options.slideCount || 4;
    this.autoplay = options.autoPlay || false;
    this.padding = options.padding || 50
    this.totalWidth = (this.padding * 2) + this.width;
    this.current = 1;
    this.position = 0;
    this.init();
};  

// Adds the event handlers to the controls
Slider.prototype.addEvents = function() {
    var that = this; // So we can refer to Slider from within the event handler
    this.$prev.bind('click', function() {
        that.prev();
    });

    this.$next.bind('click', function() {
        if(that.current === 4) {
            that.goto(1);   
        }
        else {
            that.next();     
        }
    });
};

// Creates all the jQuery variables for use throughout the widget, fires off the resize, addEvents and update methods
Slider.prototype.init = function() {
    this.$canvas = $('.canvas', this.$el);
    this.$slides = $('.slide', this.$el);
    this.$prev = $('.prev', this.$el);
    this.$next = $('.next', this.$el);
    this.$progress = $('.progress', this.$el);
    this.resize();
    this.addEvents();
    this.update();
    if(this.autoplay) {
        this.autoPlay();
    }
};

Slider.prototype.goto = function(slide) {
    slide - 1;
    var that = this;
    this.current = slide;
    this.position = this.current * -this.totalWidth;
    this.$canvas.animate({
        'left' : this.position
    }, 
    'fast',
    function() {
        that.update();
    });
}

// Ran when the next button is clicked
Slider.prototype.next = function() {
    var that = this;
    if(this.current !== this.slideCount) {
        this.position = this.position - this.totalWidth;
        this.current++;
        this.$canvas.animate({'left': this.position}, 'fast', function() {
            that.update();
        });
    }
};

// Ran when the previous button is clicked
Slider.prototype.prev = function() {
    var that = this;
    if(this.current !== 1){
        this.position = this.position + this.totalWidth;
        this.current--;
        this.$canvas.animate({'left': this.position}, 'fast', function() {
            that.update();
        });
    }
};

// Sets the dimensions of the slider, based on options passed to the constructor, this allows it to fit multiple widths rather than be a fixed width,
// all you need to change are the dimensions you pass to new Slider()
Slider.prototype.resize = function() {
    this.$el.css('width', this.width + (this.padding * 2));
    this.$canvas.css('width', this.totalWidth * this.slideCount)
    this.$canvas.css('left', '0px');
    this.$slides.css({
        'padding': '0px ' + this.padding + 'px',
        'width': this.width
    });
    this.$progress.css('left', (this.totalWidth - this.$progress.css('width').split('px').join('')) / 2);
};

// This method is called everytime a UI action takes place (prev, next, reset)
Slider.prototype.update = function() {
    console.log(this.current);
    var nav = '';
    switch(this.current) {
        case 1:
            nav = 'xooo'
            break;
        case 2:
            nav = 'oxoo'
            break;
        case 3:
            nav = 'ooxo'
            break;
        case 4:
            nav = 'ooox'
            break;
        default:
            nav = 'xooo'
    };

    this.$progress.html(nav);
};

// Auto plays the slider
Slider.prototype.autoPlay = function() {
    var that = this;
    var play = setInterval(function() {
        if(that.current !== 4) {
            that.next();
        }
        else {
            that.reset();
        }
    }, 5000);
};

// Call the slider
$(function(){
    new Slider({
        el: $('#slider'),
        width: 800,
        slideCount: 4,
        padding: 40,
        autoPlay: false
    });
});
