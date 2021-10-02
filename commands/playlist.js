const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('playlist')
		.setDescription('Queues a playlist to be played')
		.addStringOption(option => option.setName('url').setDescription('Enter the url of either a youtube or spotify playlist').setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply();
		const client = interaction.client;
		const input = interaction.options.getString('url');
		const guildQueue = client.player.getQueue(interaction.guild.id);

		const queue = client.player.createQueue(interaction.guild.id);
		await queue.join(interaction.member.voice.channel);
		console.log(input);
		try {
			await queue.playlist(input);
		}
		catch {
			await interaction.editReply({ content: 'Failed to play: ' + input + ' :\'(', ephemeral: false });
			return;
		}
		await interaction.editReply('Added playlist to queue!');
	},
};
