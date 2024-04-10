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
    
    static get SearchUserAgents() {
        return UserAgents.Google.concat(UserAgents.Bing.concat(UserAgents.DuckDuckGo));
    }

    static get SocialUserAgents() {
        return UserAgents.Facebook.concat(UserAgents.Twitter.concat(UserAgents.Discord));
    }

    static get BotUserAgents() {
        return UserAgents.SearchUserAgents.concat(UserAgents.SocialUserAgents);
    }

    static IsBot(userAgent) {
        return UserAgents.BotUserAgents.map((x) => userAgent.toLowerCase().includes(x.toLowerCase())).includes(true);
    }
}