(function($) {
    'use strict';

    // Constructor, set some initial values + fallbacks, fire off init, when called needs to be wrapped in $(function(){ //code }) otherwise it won't work
    var Slider = function(options) {
        this.width = options.width || 880;
        this.$el = options.el || $('body');
        this.slideCount = this.$el.find('.slide').length;
        this.autoplay = options.autoPlay || false;
        this.type = options.type || 'hearts';
        this.current = 1;
        this.position = 0;
        this.init();
    };  

    // Creates all the jQuery variables for use throughout the widget, fires off the resize, addEvents, generateNav and update methods
    Slider.prototype.init = function() {
        console.log('slider loaded');
        this.$canvas = $('.canvas', this.$el);
        this.$slides = $('.slide', this.$el);
        this.$prev = $('.prev', this.$el);
        this.$next = $('.next', this.$el);
        this.$progress = $('.progress', this.$el);
        this.resize();
        this.addEvents();
        this.generateNav(this.type);
        this.update();
        if(this.autoplay) {
            this.autoPlay();
        }
    };

    // Adds the event handlers to the controls
    Slider.prototype.addEvents = function() {
        var that = this; // So we can refer to Slider from within the event handler
        this.$prev.on('click', function() {
            that.prev();
        });

        this.$next.on('click', function() {
            that.next();
        });

        this.$progress.on('click', 'em', function() {
            that.goto($(this).attr('data-slide'));
        });
    };

    // Sets the dimensions of the slider + the slides
    Slider.prototype.resize = function() {
        this.$el.css('width', this.width);
        this.$canvas.css('width', this.width * this.slideCount);
        this.$canvas.css('left', '0px');
        this.$slides.css({'width': this.width});
    };

    // Creates the navigation for the slider, uses HTML entities for each step, defaults to hearts
    Slider.prototype.generateNav = function(type) {
        var nav = '';
        for(var i = 1; i <= this.slideCount; i++) {
            nav += '<em data-slide="' + i +'">&' + type + ';</em>';
        }
        this.$progress.html(nav);
    };

    // Helper function to move you to a particular slide. TODO: use this for every slide (on next, prev etc..), as there is quite
    // a bit of repeated code (for the animation)
    Slider.prototype.goto = function(slide) {
        var that = this;
        this.current = slide;
        if(slide === 1) {
            this.position = 0;
        } else {
            this.position = (this.current - 1) * -this.width;
        }
        this.$canvas.animate({'left' : this.position}, 'fast', that.update());
    };

    // Ran when the next button is clicked
    Slider.prototype.next = function() {
        var that = this;
        if(this.current < this.slideCount) {
            this.current++;
            this.position = this.position - this.width;
            this.$canvas.animate({'left': this.position}, 'fast', that.update());
        } else {
            this.goto(1);
        }
    };

    // Ran when the previous button is clicked
    Slider.prototype.prev = function() {
        var that = this;
        if(this.current > 1){
            this.position = this.position + this.width;
            this.current--;
            this.$canvas.animate({'left': this.position}, 'fast', that.update());
        } else {
            that.goto(that.slideCount);
        }
    };

    // This method is called everytime a UI action takes place (prev, next, reset)
    Slider.prototype.update = function() {
        this.$progress.children()
            .removeClass('active')
            .eq(this.current - 1)
            .addClass('active');
    };

    // Auto plays the slider
    Slider.prototype.autoPlay = function() {
        var that = this;
        setInterval(function() {
            if(that.current !== this.slideCount) {
                that.next();
            }
            else {
                that.goto(1);
            }
        }, 5000);
    };

    // Call the slider
    $(function(){
        new Slider({
            el: $('#slider'),
            width: 880,
            autoPlay: false
        });
    });

})(jQuery);
