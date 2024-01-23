declare const _default: (() => {
    secret: string;
    audience: string;
    issuer: string;
    accessTokenTtl: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    secret: string;
    audience: string;
    issuer: string;
    accessTokenTtl: string;
}>;
export default _default;
