## jquery-wait [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

### Description
It's a small jQuery plugin that with one call 
 * add/remove class(es)
    * *it can also delay adding classes so wait only appears if your app is slow.*
 * disable/enable your control
 * let you know if a current element is 'waiting'
 * call functions before/after waiting

### Usage

#### Simple
1. A button
```html 
<button id="control">click me!</button>
```
2. The call to .wait
```javascript
//by default adds the class 'wait', adds the attribute 'disabled'
$('#control').wait('on');
$('#control').data('waiting'); //true
````
3. The button modified
```html
<button id="control" class="wait" disabled="disabled">click me!</button>
```
4. Turning off the wait
```javascript
//removes added class(es), removes 'disabled'
$('#control').wait('off');
$('#control').data('waiting'); //undefined
```

#### Configuration
You can configure your .wait calls either before hand, or only when you want to use .wait
The following call assigns the configuration to all matched elements.
```javascript
//defaults are in the comments *after* the property declaration
$('someselector').wait({
  disable:false, //will not disable the control - default is true
  delay:500, //immediately disables the control, but waits 500ms for everything else - default is 0
  hideContents:true, //removes the html from the element while waiting. - default is false
  waitText:true, //replaces the html in the element while waiting. - default is false
  addClass:'wait spinner', //these classes will be added to the element while waiting. - default is 'wait'
  runOn:function($this) { /*do something*/}, //called immediately after delay runs out. Passed $(element). If it returns a function, that function is called after all other operations. - default is not present 
  runOff:function($this) { /*do something*/} //called immediately on 'off'. Passed $(element). If it returns a function,  that function is called after all other operations.  - default is not present
});
```
You can add the property _.set:'on'_, to the above configuration, and the wait will activate immediately

#### With delay
An example of triggering wait with a small delay
```javascript
//immediately disables the control, but waits 500ms for adding classes, disabling, etc.
$('someselector').wait({
  set:'on',
  delay:500 //miliseconds
});

//if this this is called 400ms later. Control is enabled, non of the 'on' operations are run
$('someselector').wait('off');
```

[npm-url]: https://npmjs.org/package/jquery-wait
[downloads-image]: http://img.shields.io/npm/dm/jquery-wait.svg
[npm-image]: http://img.shields.io/npm/v/jquery-wait.svg





