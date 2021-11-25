import ArrayUtil from "./src/array_util";
import Util, { assert } from "./src/common_util";
import event_bus from "./src/event_bus";
import NumberUtil from "./src/number_util";
import Cookie from "./src/resolve/cookie";
import Location from "./src/resolve/location";
import StringUtil from "./src/string_util";
import TypeUtil from "./src/type_util";
export default {
    ArrayUtil,
    Util,
    NumberUtil,
    StringUtil,
    TypeUtil,
    EventBus: event_bus,
    Location,
    Cookie,
    assert
}