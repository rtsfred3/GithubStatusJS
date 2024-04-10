export default class UserAgents {
    static get Google() {
        return [
            "Googlebot",
            "Google-InspectionTool",
            "GoogleOther"
        ];
    }
    
    static get Facebook() {
        return [
            "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
            "facebookexternalhit/1.1",
            "facebookcatalog/1.0"
        ];
    }

    static get BotUserAgents() {
        return UserAgents.Google.concat(UserAgents.Facebook);
    }

    static IsBot(userAgent) {
        var userAgents = UserAgents.BotUserAgents;

        return userAgents.map((x) => userAgent.includes(x)).includes(true);

        // for (var i = 0; i < userAgents.length; i++) {
        //     if (userAgent.includes(userAgents[i])) {
        //         return false;
        //     }
        // }

        // return true;
    }
}