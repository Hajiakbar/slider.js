(function($) {
    'use strict';

    // Constructor, set some initial values + fallbacks, fire off init, when called needs to be wrapped in $(function(){ //code }) otherwise it won't work
    var Slider = function(options) {
        this.width = options.width || 880;
        this.$el = options.el || $('body');
        this.slideCount = this.$el.find('.slide').length;
        this.autoplay = options.autoPlay || false;
        this.current = 1;
        this.position = 0;
        this.init();
    };  

    // Creates all the jQuery variables for use throughout the widget, fires off the resize, addEvents and update methods
    Slider.prototype.init = function() {
        console.log('slider loaded');
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

    // Adds the event handlers to the controls
    Slider.prototype.addEvents = function() {
        var that = this; // So we can refer to Slider from within the event handler
        this.$prev.on('click', function() {
            that.prev();
        });

        this.$next.on('click', function() {
            if(that.current === that.slideCount) {
                that.goto(1);   
            }
            else {
                that.next();
            }
        });
    };

    // Sets the dimensions of the slider + the slides
    Slider.prototype.resize = function() {
        this.$el.css('width', this.width);
        this.$canvas.css('width', this.width * this.slideCount);
        this.$canvas.css('left', '0px');
        this.$slides.css({'width': this.width});
    };

    // Helper function to move you to a particular slide. TODO: use this for every slide (on next, prev etc..), as there is quite
    // a bit of repeated code (for the animation)
    Slider.prototype.goto = function(slide) {
        var that = this;
        this.current = slide;
        if(slide === 1) {
            this.position = 0;
        } else {
            this.position = this.current * -this.width;
        }
        this.$canvas.animate({'left' : this.position}, 'fast', that.update());
    };

    // Ran when the next button is clicked
    Slider.prototype.next = function() {
        var that = this;
        if(this.current !== this.slideCount) {
            this.position = this.position - this.width;
            this.current++;
            this.$canvas.animate({'left': this.position}, 'fast', that.update());
        }
    };

    // Ran when the previous button is clicked
    Slider.prototype.prev = function() {
        var that = this;
        if(this.current !== 1){
            this.position = this.position + this.width;
            this.current--;
            this.$canvas.animate({'left': this.position}, 'fast', that.update());
        }
    };

    // This method is called everytime a UI action takes place (prev, next, reset)
    Slider.prototype.update = function() {
        var nav = '';
        switch(this.current) {
            case 1:
                nav = '<p>xoooo</p>';
                break;
            case 2:
                nav = 'oxooo';
                break;
            case 3:
                nav = 'ooxoo';
                break;
            case 4:
                nav = 'oooxo';
                break;
            case 5:
                nav = 'oooox';
                break;
        }
        this.$progress.html(nav);
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
