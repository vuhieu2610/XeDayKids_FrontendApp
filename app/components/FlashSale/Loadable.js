/**
 *
 * Asynchronously loads the component for FlashSale
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
