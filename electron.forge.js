module.exports = {
	packagerConfig: {
		icon: './assets/icon.png',
		executableName: 'codeprez',
		fileAssociations: [
			{
				ext: 'codeprez',
				name: 'CodePrez',
				perMachine: true,
			}
		],
		makers: [
			{
				name: '@electron-forge/maker-flatpak',
				config: {
					options: {
						categories: ['Video'],
						mimeType: ['video/h264']
					}
				}
			}
		]
	}
};