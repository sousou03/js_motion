// ------------------------------------------------------------
//
//  DomMotion
//
// ------------------------------------------------------------
(function(){

  function DomMotion(src) {

    this.src = src;

    this.first = true;

  }

  DomMotion.prototype = {
    
    blur: function(opt){ 

      var def = {
              $target: null,
              dur: 1,
              delay: 0,
              blur: 0,blurTarget: 100,
              ease: Power3.easeIn
            };
      var param = $.extend(def,opt);
      var tl = new TimelineMax();      

      tl
        .to(param, param.dur, {
          blur: param.blurTarget,
          ease: param.ease,
          delay: param.delay,
          onUpdate: function(p) {
            var b = p.target.blur;
            TweenMax.set(param.$target, {
              '-webkit-filter': 'blur(' + b + 'px)',
              'filter': 'blur(' + b + 'px)',
            });
          },
          onUpdateParams: ["{self}"]
        })
      
    },

    bright: function(opt){

      var def = {
              $target: null,
              dur: 1,
              delay: 0,
              grayscale: 0,grayscaleTarget: 100,
              brightness: 100,brightnessTarget: 1000,
              ease: Power3.easeIn,
            };
      var param = $.extend(def,opt);
      var tl = new TimelineMax();      

      TweenMax
        .to(param, param.dur, {
          grayscale: param.grayscaleTarget,
          brightness: param.brightnessTarget,
          ease: param.ease,
          delay: param.delay,
          onUpdate: function(p) {
            var g = p.target.grayscale;
            var b = p.target.brightness;
            TweenMax.set(param.$target, {
              '-webkit-filter': 'brightness(' + b + '%) grayscale(' + g + '%)',
              'filter': 'brightness(' + b + '%) grayscale(' + g + '%)',
            });
          },
          onUpdateParams: ["{self}"]
        });


    },

    shake: function(opt){

      var def = {
              $target: null,
              dur: 1,
              delay: 0,
              mag: 10,
              ease: Power3.easeIn,
            };
      var param = $.extend(def,opt);
      var tl = new TimelineMax();      

      tl
        .to({}, param.dur, {
          delay: param.delay,
          ease: param.ease,
          onUpdate: function(){

            var x = (Math.random()*2-1) * param.mag;
            var y = (Math.random()*2-1) * param.mag;

            TweenMax.set(param.$target, {x:x,y:y});

          },
          onComplete: function(){

            TweenMax.set(param.$target, {x:0,y:0});

          },
        });

    },

    afterImg: function(opt){

      var def = {
              target: null,
              $wrap: $('body'),
              dur: 1,
              delay: 0,
              num: 3,
              lag: 0.05,
              scale: 1,
              opacity: 1,
              ease: Power3.easeIn,
            };
      var param = $.extend(def,opt);
      var tl = new TimelineMax();
      var self = this;

      tl
        .add(function(){

          if (self.first) {
            self.first = false;

            // 画像複製
            for (var i = 0; i < param.num; i++) {
              var dom = $(param.target).clone();
              param.$wrap.append(dom);
            };
            
            // 画像スタイルset
            TweenMax.set($(param.target), {'transform-origin':'50% 50%','position':'absolute',scale:1.3});

          }

          // motion
          $(param.target).each(function(index, el) {
              
              TweenMax.to($(this), param.dur, {
                scale: param.scale,
                opacity: param.opacity,
                delay: param.lag * index,
                ease: param.ease,
              });

          });

        })

    },

    scaleSlow: function(opt){

      var def = {
              target: null,
              $wrap: $('body'),
              dur: 1,
              dur02: 7,
              dur03: 1.3,
              delay: 0,
              scale: 1,scaleTarget: 1.3,
              opacity: 0,opacityTarget: 1,
              ease: Power3.easeIn,
            };
      var param = $.extend(def,opt);
      var tl = new TimelineMax();
      var self = this;

      tl
        .to($(param.target), 0.01, {
          scale: param.scale,
          opacity: param.opacity,
          onComplete: function() {
            TweenMax.to($(param.target), param.dur02, {
              scale: param.scaleTarget,
              ease: Power0.easeNone,
            });
            TweenMax.to($(param.target), param.dur03, {
              opacity: param.opacityTarget,
              ease: param.ease,
            });
          }
        })

    },

    scaleElastic: function(opt){

      var def = {
              target: null,
              dur: 1,
              scaleX: 2,scaleY: 0,scaleTarget: 1,
              opacity: 0,
              ease: Elastic.easeOut.config(1, 0.3)
            };
      var param = $.extend(def,opt);
      var tl = new TimelineMax();
      var self = this;

      tl
        .fromTo(param.target, param.dur, {
          scaleX: param.scaleX,
          scaleY: param.scaleY,
        },
        {
          scale: param.scaleTarget,
          ease: Elastic.easeOut.config(1, 0.3),
        });

    },

    // ゴム
    gum: function(opt){

      var def = {
              target: null,
              dur: 1,
              scaleX: 2,scaleY: 0,scaleTarget: 1,
              opacity: 0,
              ease: Elastic.easeOut.config(1, 0.3)
            };
      var param = $.extend(def,opt);
      var tl = new TimelineMax({repeat:-1,repeatDelay: 1});
      var self = this;

      tl
        .to(param.target,0.3, {
          scaleY:1.4,
          scaleX : 0.7,
          ease: Power2.easeOut
        })
       .to(param.target,0.25, {
          scaleY:0.7,
          scaleX : 1.3,
          ease: Power2.easeOut
        })
       .to(param.target,0.2, {
          scaleY:1.3,
          scaleX : 0.8,
          ease: Power2.easeOut
        })
       .to(param.target,0.2, {
          scaleY:0.8,
          scaleX : 1.2,
          ease: Power2.easeOut
        })
       .to(param.target,0.2, {
          scaleY:1.1,
          scaleX : 0.9,
          ease: Power2.easeOut
        })
       .to(param.target,0.13, {
          scaleY:0.9,
          scaleX : 1.1,
          ease: Power2.easeOut
        })
       .to(param.target,0.13, {
          scaleY: 1,
          scaleX : 1,
          ease: Power2.easeOut
        })


    },

    // ゴム
    dooon: function(opt){

      var def = {
              target: null,
              wrap: null,
              dur: 1,
              scaleX: 2,scaleY: 0,scaleTarget: 1,
              opacity: 0,
              ease: Elastic.easeOut.config(1, 0.3)
            };
      var param = $.extend(def,opt);
      var tl = new TimelineMax();
      var self = this;

      // logo ちょっとscale,opacityで出て、そのあと揺れて、小さくなる
      tl
        .fromTo(param.target, 3, {
          scale: 1.5,
          opacity: 0,
        },{
          scale: 1.45,
          opacity: 0.4,
          ease: Power3.easeIn,
        })

      tl
        .to({}, 0.7, {
          ease: Power4.easeIn,
          onUpdate: function(){

            // ゆれ
            var x = (Math.random()*2-1) * 5;
            var y = (Math.random()*2-1) * 5;

            console.log(param.wrap);

            TweenMax.set(param.wrap, {x:x,y:y});

          },
          onComplete: function(){

            TweenMax.set(param.wrap, {x:0,y:0});

          }
        })
        .to(param.target, 0.4, {
          scale: 1,
          opacity: 1,
          ease: Power4.easeOut,
        },'-=0.75')


    },

  }

  // 公開api
  gb.DomMotion = DomMotion;

})();