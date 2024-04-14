export default class HeaderTypes {
    static get ContentType() { return 'Content-Type'; }
    static get CacheControl() { return 'Cache-Control'; }
    static get LastModified() { return 'Last-Modified'; }
    static get CloudflareCDNCacheControl() { return 'Cloudflare-CDN-Cache-Control'; }
    static get Age() { return 'Age'; }
    static get XAge() { return 'X-Age'; }
    static get CfCacheStatus() { return 'Cf-Cache-Status'; }
    static get XCacheStatus() { return 'X-Cache-Status'; }
    static get XBot() { return 'X-Bot'; }
    static get XKvStatusLastModified() { return 'X-KV-Status-Last-Modified'; }
}