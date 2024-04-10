export default class UserAgents {
    static get Google() {
        return [
            "Googlebot",
            "Google-InspectionTool",
            "GoogleOther"
        ];
    }

    static get Bing() {
        return [
            "bingbot/2.0",
        ];
    }

    static get DuckDuckGo() {
        return [
            "DuckDuckGo/5",
            "DuckDuckGo/6",
            "DuckDuckGo/7",
        ];
    }
    
    static get Facebook() {
        return [
            "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
            "facebookexternalhit/1.1",
            "facebookcatalog/1.0"
        ];
    }

    static get Twitter() {
        return [
            "Twitterbot/1.0",
        ];
    }

    static get Discord() {
        return [
            "Discordbot/2.0",
        ];
    }
    
    static get OtherUserAgents() {
        return UserAgents.Twitter.concat(UserAgents.Bing.concat(Discord));
    }

    static get BotUserAgents() {
        return UserAgents.Google.concat(UserAgents.Facebook.concat(UserAgents.DuckDuckGo.concat(OtherUserAgents)));
    }

    static IsBot(userAgent) {
        var userAgents = UserAgents.BotUserAgents;

        return userAgents.map((x) => userAgent.toLowerCase().includes(x.toLowerCase())).includes(true);

        // for (var i = 0; i < userAgents.length; i++) {
        //     if (userAgent.includes(userAgents[i])) {
        //         return false;
        //     }
        // }

        // return true;
    }
}