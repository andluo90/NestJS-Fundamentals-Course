interface Coffees {
    foo: string;
}
export { Coffees };
declare const _default: (() => Coffees) & import("@nestjs/config").ConfigFactoryKeyHost<Coffees>;
export default _default;
