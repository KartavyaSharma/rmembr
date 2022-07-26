global.console = {
    log: jest.fn(),
    // log: console.log,
    debug: console.debug,
    trace: console.trace
}

jest.setTimeout(100000);