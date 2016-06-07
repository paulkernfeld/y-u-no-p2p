Debug why your P2P connection isn't working.

All diagnostic tests are inside `lib/diagnostics`. Some tests have separate components designed to be run on different machines.

In the `bin` directory, there are scripts to run servers (so someone else can run the tests against them).

To see more detail, try setting the env var `DEBUG` to the literal `*`.
