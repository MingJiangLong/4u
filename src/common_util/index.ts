export function assert(condition: boolean, message: string) {
    if (!condition) throw message;
}
const Util = {
    assert
}
export default Util