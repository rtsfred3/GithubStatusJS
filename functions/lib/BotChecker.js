import UserAgents from './UserAgents.js';

class BotChecker {
    constructor(_context) {
        this.context = _context;
        this.asOrg = this.context.request.cf.asOrganization;
        this.userAgent = this.context.request.headers.get('User-Agent');

        this.botUserAgents = UserAgents.Google;
        UserAgents.Bing.forEach((x) => this.botUserAgents.push(x));
        UserAgents.DuckDuckGo.forEach((x) => this.botUserAgents.push(x));
        UserAgents.Facebook.forEach((x) => this.botUserAgents.push(x));
        UserAgents.Twitter.forEach((x) => this.botUserAgents.push(x));
        UserAgents.Discord.forEach((x) => this.botUserAgents.push(x));
    
        this.botAsOrgs = [
            "Googlebot",
            "Facebook",
            "Twitter"
        ];
    }

    get IsFacebookBot() {
        const userAgentMap = this.botUserAgents.filter((x) => x.toLowerCase().includes('facebook')).map((x) => this.userAgent.includes(x));
        const botAsOrgMap = this.botAsOrgs.filter((x) => x.toLowerCase().includes('facebook')).map((x) => this.asOrg.includes(x));

        return userAgentMap.includes(true) || botAsOrgMap.includes(true);
    }

    get IsBot() {
        const userAgentMap = this.botUserAgents.filter((x) => this.userAgent.includes(x));
        const botAsOrgMap = this.botAsOrgs.filter((x) => this.asOrg.includes(x));

        return userAgentMap.length > 0 || botAsOrgMap.length > 0;
    }
}

export { BotChecker };