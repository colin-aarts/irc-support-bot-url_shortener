// Generated by LiveScript 1.5.0
(function(){
  'use strict';
  var util, js, googl;
  util = require('util');
  js = require('js-extensions');
  googl = require('goo.gl');
  module.exports = function(){
    var this$ = this;
    return this.register_special_command({
      name: 'short',
      description: 'Turn a (long) URL into a short one using « goo.gl »',
      admin_only: false,
      fn: function(event, input_data, output_data){
        var apiKey;
        apiKey = this$.botOptions.pluginOptions['irc-support-bot-url_shortener'].apiKey;
        if (!apiKey) {
          console.error('No API key specified for « irc-support-bot-url_shortener »');
          return;
        }
        return googl(input_data.args, apiKey, function(err, result){
          var message;
          if (err) {
            console.log(err);
            message = "Oops, something went wrong trying to shorten « " + js.str_truncate(input_data.args, 20, 10, '…') + " »";
          } else {
            message = "Short URL for « " + js.str_truncate(input_data.args, 20, 10, '…') + " » is « " + result.id + " »";
          }
          return this$.send(output_data.method, output_data.recipient, message);
        });
      }
    });
  };
}).call(this);
