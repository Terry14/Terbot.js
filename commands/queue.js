const { SlashCommandBuilder } = require('@discordjs/builders');
const { hyperlink } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Show the current music queue'),
	async execute(interaction) {
		const guildQueue = interaction.client.player.getQueue(interaction.guild.id);
		if (!guildQueue) {
			await interaction.reply('There is no music queue doofus');
			return;
		}
		const queue = guildQueue.songs;
		if (queue) {
			let response = ' ';
			if (queue.length > 10) response = 'Only showing first 10 songs in queue\n';
			for (let i = 0; i < queue.length && i < 10; i++) {
				response = response + `${i + 1}. ${hyperlink(queue[i].name, queue[i].url)}\n`;
			}
			const embed = new MessageEmbed()
				.setColor('#34EB46')
				.setDescription(response);
			await interaction.reply({ embeds: [embed] });
		}
		else {
			await interaction.reply('There is no music queue doofus');
		}
	},
};
