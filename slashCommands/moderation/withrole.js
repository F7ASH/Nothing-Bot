const { MessageEmbed } = require("discord.js");
const errorEmbed = require("../../utils/embeds/errorEmbed");

module.exports = {
    name: "withrole",
    requiredPermission: "MANAGE_ROLES",
    description: "get members with give role",
    options: [
        {
            name: "role",
            type: "ROLE",
            description: "users?",
            required: true,
        },
    ],
    run: (interaction, args) => {
        const { role } = args.get("role");
        const roleInfo = interaction.guild.roles.cache.get(role.id);
        const members = roleInfo.members.map((m) => m.user.tag);
        const membersLength = members.length;
        if (membersLength > 25) {
            return errorEmbed(
                interaction,
                "This Role has more than 25 members, please enter a role with less than 25 Members."
            );
        }
        const withRoleEmbed = new MessageEmbed()
            .setTitle(`${membersLength} Members with Role: *${roleInfo.name}*`)
            .setColor(roleInfo.hexColor)
            .setDescription(members.join("\n"));
        interaction.reply({ embeds: [withRoleEmbed] });
    },
};
