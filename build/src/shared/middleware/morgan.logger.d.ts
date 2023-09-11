/// <reference types="node" />
declare function morganLogger(): (req: import("http").IncomingMessage, res: import("http").ServerResponse<import("http").IncomingMessage>, callback: (err?: Error | undefined) => void) => void;
export default morganLogger;
