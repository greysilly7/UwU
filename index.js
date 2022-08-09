const { Plugin } = require("powercord/entities");
const { get } = require("powercord/http");

const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g;

module.exports = class ScamDetector4000 extends Plugin {
	startPlugin() {
		// Initializing Here
		powercord.api.command.registerCommand({
			command: 'check',
			description: 'Checks if provided text contains a scam',
			usage: '{c} <text>',
			executor: (args) => ({
				send: true,
				result: (() => {
					const urlRegexResults = urlRegex.exec(args.join(' '))
					if (urlRegexResults) {
						const removeEndingSlash = matchedREgexThing[0].split("/")[2];
						if (removeEndingSlash === undefined) return "Please provide a valid URL";
						const splited = removeEndingSlash.split(".");
						const domain =
							splited[splited.length - 2] + "." + splited[splited.length - 1];

						const isScam = get(`https://phish.sinking.yachts/v2/check/${domain}`);
						return `${domain} is ${isScam ? "" : "not "}a scam.`;
					}

					return 'Something went wrong! please open an issue and provide logs';
				})()
			})

		})
	}
	pluginWillUnload() {
		// Unloading Here
		powercord.api.commands.unregisterCommand('check');
	}
}