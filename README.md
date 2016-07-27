Debug why your P2P connection isn't working.

[![Build Status](https://travis-ci.org/paulkernfeld/y-u-no-p2p.svg)](https://travis-ci.org/paulkernfeld/y-u-no-p2p) [![npm](https://img.shields.io/npm/dt/y-u-no-p2p.svg)](https://www.npmjs.com/package/y-u-no-p2p)

All diagnostic tests are inside `lib/diagnostics`. Some tests have separate components designed to be run on different machines.

In the `bin` directory, there are scripts to run servers (so someone else can run the tests against them).

To see more detail, try setting the env var `DEBUG` to the literal `*`.
