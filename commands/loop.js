const { SlashCommandBuilder } = require('@discordjs/builders');
const { RepeatMode } = require('discord-music-player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('Toggles looping of the current song'),
	async execute(interaction) {
		const client = interaction.client;
		const guildQueue = client.player.getQueue(interaction.guild.id);
		if (guildQueue.repeatMode === 1) {
			guildQueue.setRepeatMode(RepeatMode.DISABLED);
			await interaction.reply('Disabled looping');
		}
		else {
			guildQueue.setRepeatMode(RepeatMode.SONG);
			await interaction.reply('Now looping current song');
		}
	},
};
