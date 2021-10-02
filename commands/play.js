const { SlashCommandBuilder } = require('@discordjs/builders');
const { hyperlink } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Queues a song to be played')
		.addStringOption(option => option.setName('song').setDescription('Enter the music url or search terms for youtube').setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply();
		const client = interaction.client;
		const input = interaction.options.getString('song');
		let queue;
		if (!client.player.hasQueue(interaction.guild.id)) {
			queue = client.player.createQueue(interaction.guild.id);
		}
		else {
			queue = client.player.getQueue(interaction.guild.id);
		}
		console.log(input);
		if (!queue.isPlaying) await queue.join(interaction.member.voice.channel);
		try {
			const song = await queue.play(input);
			const embed = new MessageEmbed()
				.setColor('#34EB46')
				.setDescription(`Added ${hyperlink(song.name, song.url)} to the queue`);
			await interaction.editReply({ embeds: [embed] });
		}
		catch {
			await interaction.editReply({ content: 'Failed to play: ' + input + ' :\'(', ephemeral: false });
			return;
		}

	},
};
