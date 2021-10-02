const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('disconnect')
		.setDescription('Removes bot from voice channel'),
	async execute(interaction) {
		const voiceChannel = interaction.member.voice.channel;
		if (!voiceChannel) {
			await interaction.reply('There are others on the voice channel. Join it first before telling me to leave...');
		}
		else {
			voiceChannel.leave();
			await interaction.reply('Goodbye');
		}
	},
};
