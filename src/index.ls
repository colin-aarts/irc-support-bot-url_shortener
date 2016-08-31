
#	irc-support-bot-url_shortener
#	-----------------------------
#	URL shortener plug-in for irc-support-bot
#	This is an official plug-in
#
#	Provides one bot command: 'short'
#	Depends on the 'goo.gl' module

'use strict'


util   = require 'util'
js     = require 'js-extensions'
googl  = require 'goo.gl'


module.exports = ->

	this.register_special_command do
		name: 'short'
		description: 'Turn a (long) URL into a short one using « goo.gl »'
		admin_only: false
		fn: (event, input_data, output_data) ~>

			api-key = this.bot-options.plugin-options['irc-support-bot-url_shortener'].api-key

			unless api-key
				console.error 'No API key specified for « irc-support-bot-url_shortener »'
				return

			err, result <~ googl input_data.args, api-key

			if err
				console.log err
				message = "Oops, something went wrong trying to shorten « #{js.str_truncate input_data.args, 20, 10, '…'} »"
			else
				message = "Short URL for « #{js.str_truncate input_data.args, 20, 10, '…'} » is « #{result.id} »"

			@send output_data.method, output_data.recipient, message
