// ------------------------------------------------------------
//
//  Toggle 
//
// ------------------------------------------------------------

(function(){

  function Toggle($target) {

    this.flag = false;

    this.$target = $target;
    this.onFunc = null;
    this.offFunc = null;
    this.onOpt = null;
    this.offOpt = null;

    this.setEvents();

  }

  Toggle.prototype = {

    on: function(){

      this.flag = true;
      this.onFunc(this.onOpt);

    },

    off: function(){

      this.flag = false;
      this.offFunc(this.offOpt);

    },

    addOnFunc: function(func,opt){

      this.onFunc = func;
      this.onOpt = opt;

    },

    addOffFunc: function(func,opt){

      this.offFunc = func;
      this.offOpt = opt;

    },

    onClick: function(){

      if (!this.flag) {

        this.on();

      } else {

        this.off();

      }

    },


    setEvents: function(){

      this.$target.on('click', this.onClick.bind(this));

    },


  }

  gb.Toggle = Toggle;

})();