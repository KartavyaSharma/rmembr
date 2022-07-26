global.console = {
    log: jest.fn(),
    debug: console.debug,
    trace: console.trace
}

jest.setTimeout(100000);