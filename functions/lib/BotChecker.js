class BotChecker {
    constructor(_context) {
        this.context = _context;
        this.asOrg = this.context.request.cf.asOrganization;
        this.userAgent = this.context.request.headers.get('User-Agent');

        this.botUserAgents = [ 
            "facebookexternalhit/1.1",
            "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
            "Googlebot/2.1",
            "Googlebot/2.1 (+http://www.google.com/bot.html)",
            "Google-InspectionTool/1.0",
            "Discordbot/2.0; +https://discordapp.com"
        ];
    
        this.botAsOrgs = [
            "Googlebot",
            "Facebook"
        ];
    }

    get IsFacebookBot() {
        const userAgentMap = this.botUserAgents.filter((x) => x.toLowerCase().includes('facebook')).map((x) => this.userAgent.includes(x));
        const botAsOrgMap = this.botAsOrgs.filter((x) => x.toLowerCase().includes('facebook')).map((x) => this.asOrg.includes(x));

        return userAgentMap.includes(true) || botAsOrgMap.includes(true);
    }

    get IsBot() {
        const userAgentMap = this.botUserAgents.map((x) => this.userAgent.includes(x));
        const botAsOrgMap = this.botAsOrgs.map((x) => this.asOrg.includes(x));

        return userAgentMap.includes(true) || botAsOrgMap.includes(true);
    }
}

export { BotChecker };