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
	},
	rebuildConfig: {},
	makers: [
		{
			name: '@electron-forge/maker-squirrel',
			config: {},
		},
		{
			name: '@electron-forge/maker-zip',
			platforms: ['darwin'],
		},
		{
			name: '@electron-forge/maker-flatpak',
			config: {},
		},
		{
			name: '@electron-forge/maker-rpm',
			config: {},
		},
	],
};
