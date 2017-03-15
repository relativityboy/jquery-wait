/*
 * jQuery wait plug-in 1.0
 *
 * MIT Licensed
 */

(function(window, $) {
  var defaultConfig = {
    disable:true,
    addClass:'wait',
    hideContents:false,
    waitText:false,
    runOn:false,
    runOff:false,
    delay:0
  };
  var fnConfigWait = function($this, args) {
    var config = $.extend({}, defaultConfig,  $this.data('wait'), args);
    delete config.set;
    $this.data('wait', config);
    return config;
  };

  if(!$.fn.wait) {
    $.waitConfig = function (config){
      defaultConfig = $.extend({}, defaultConfig, config);
    };

    $.fn.wait = function (args) {
      var $this = $(this), config, fn, undef, wait = null;
      switch(typeof args) {
        case 'object' :
          config = fnConfigWait($this, args);
          if(typeof args.set === 'string') {
            wait = args.set;
          }
          break;
        case 'string' :
          config = fnConfigWait($this);
          if(args === 'on' || args === 'off') {
            wait = args;
            break;
          }
          break;
        default :
          throw new Error('argument passed to .wait must be either "on","off" or Object');
      }

      if(wait === 'on') {
        if(config.disable) { $this.attr('disabled', 'disabled'); }
        $this.data('waiting', true);
        $this.data('waitTimeout', setTimeout(function() {
          if(config.runOn) { fn = config.runOn($this); }
          if(config.hideContents || config.waitText) { $this.data('waitContents', $this.html()).html(''); }
          if(config.waitText) { $this.text(config.waitText); }
          if(config.addClass) { $this.addClass(config.addClass); }
          if(fn) { fn($this); }

        }, config.delay));
      } else {
        $this.data('waiting', false);
        clearTimeout($this.data('waitTimeout'));
        $this.data('waitTimeout',undef);
        if(config.runOff) { fn = config.runOff($this); }
        if(config.hideContents || config.waitText) { $this.html($this.data('waitContents')); }
        if(config.addClass) { $this.removeClass(config.addClass); }
        if(fn) { fn($this); }
        if(config.disable) { $this.removeAttr('disabled'); }
      }
    };
  }
})(window, jQuery);