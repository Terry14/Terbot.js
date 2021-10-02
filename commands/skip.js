const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skip the current song'),
	async execute(interaction) {
		const guildQueue = interaction.client.player.getQueue(interaction.guild.id);
		const skipped = guildQueue.skip();
		if (skipped) {
			await interaction.reply('Skipped ' + skipped.name);
		}
		else {
			await interaction.reply('Nothing to skip');
		}
	},
};
