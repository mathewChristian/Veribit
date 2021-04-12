# Novi Desktop

Novi desktop is a cross platform (Mac, Windows, Linux) desktop app that wraps [novi-server](https://github.com/RoyMurphy/Veribit/apps/novi/novi-server), a web server that runs in the background and signs any incoming request to sign a message using its internal private keys.

It is powered by [Electron](https://www.electronjs.org/), but does not use the browser UI at all. The Electron form factor is only used to package the [novi-server](https://github.com/RoyMurphy/Veribit/apps/novi/novi-server) so the local server can be installed and run with one click.

Novi Desktop is entirely a background application without a user interface, so it doesn't take up much resource (CPU or resource) as other Electron apps do.

# Build

To build this repository, first install `electron-builder`.

```
npm install -g electron-builder
```

Then run:

```
npm run build
```
