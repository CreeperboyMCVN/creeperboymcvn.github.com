let discordData = null;
$(document).ready(function () {
    $.get("https://discord.com/api/guilds/753544628069728318/widget.json", null,
        function (data, textStatus, jqXHR) {
            discordData = data;
            //console.log(data);
            if (data.members.length > 0) {
                $(".avatar").attr("src", data.members[0].avatar_url);
            } else {
                $(".avatar").attr("src", "./assets/image/avatar.png");
            }
        }
    );
});