const { SlashCommandBuilder } = require('@discordjs/builders');
const { hyperlink } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('np')
		.setDescription('Get the currently playing song'),
	async execute(interaction) {
		const guildQueue = interaction.client.player.getQueue(interaction.guild.id);
		const song = guildQueue.nowPlaying;
		const progressBar = guildQueue.createProgressBar(interaction);
		if (song) {
			const embed = new MessageEmbed()
				.setColor('#34EB46')
				.setDescription(`Now playing: ${hyperlink(song.name, song.url)}
				\`${progressBar}\``);
			await interaction.reply({ embeds: [embed] });
		}
		else {
			await interaction.reply('Not playing anything right now');
		}
	},
};
