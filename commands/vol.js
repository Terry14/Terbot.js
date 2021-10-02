const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vol')
		.setDescription('Sets the volume between 0% and 150%')
		.addIntegerOption(option => option.setName('volume').setDescription('Volume in percent')),
	async execute(interaction) {
		const guildQueue = interaction.client.player.getQueue(interaction.guild.id);
		if (guildQueue) {
			const vol = interaction.options.getInteger('volume');
			guildQueue.setVolume(vol);
			await interaction.reply(`Set volume to ${vol}%`);
		}
		else {
			await interaction.reply('Not connected yet. Play a song with /play before using this command');
		}
	},
};
