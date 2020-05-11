var App = {
    isMobile: function() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    },
    init: function() {
        this.addEvents();
        this.instructions();
        Game.init();
    },
    instructions: function() {
        var swiper = new Swiper('.swiper-container', {
            spaceBetween: 30,
            hashNavigation: {
                watchState: true,
            }
        });
        swiper.on('slideChange', function() {
            var index = swiper.activeIndex + 1;
            App.showItems("#slide-" + index + " .item-slide", 0.25);
        });
    },
    addEvents: function() {
	window.onload = function() { 
        document.getElementById("play-btn").addEventListener("click", function(e) {
            e.preventDefault();
            Game.start();
        }, false);
    }},
    showItems: function(el, delay) {
        if (delay === undefined) delay = 0;
        TweenMax.staggerTo(el, 1, {
            ease: Elastic.easeOut.config(1, 0.5),
            delay: delay,
            x: 0,
            y: 0,
            opacity: 1
        }, 0.075);
    },
    hideSlide: function(el, delay) {
        if (delay === undefined) delay = 0;
        TweenMax.to(el, 0.3, {
            ease: Power2.easeOut,
            delay: delay,
            opacity: 0,
            scaleX: 2,
            scaleY: 2,
            display: "none"
        });
    },
    showSlide: function(el, delay) {
        if (delay === undefined) delay = 0;
        TweenMax.set(el, {
            scaleX: 2,
            scaleY: 2,
            x: 0,
            y: 0
        });
        TweenMax.to(el, 0.3, {
            ease: Power2.easeOut,
            delay: delay,
            display: "block",
            opacity: 1,
            scaleX: 1,
            scaleY: 1
        });
    }
}

App.init();