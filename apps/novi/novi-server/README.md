# Novi Server

> A Peer to Peer Identity System, powered by Bitcoin.

# Introduction

- **Novi Server** is an implementation of the Verikey identity scheme, which takes the form of a node.js web server.
- **[Novi Desktop](https://github.com/RoyMurphy/Veribit/apps/novi/novi-desktop)**, a cross platform desktop app implementation (Mac, Windows, Linux) is powered by **novi-server**. The desktop app wraps the novi-server in an app format.


# How Novi Server works

Novi Server is an implementation of the Verikey scheme that takes the form of a node.js module that runs as a web server at port `21000`.

The web server receives POST requests at its `/sign` endpoint and signs the request message with its embedded wallet and returns the HTTP response.

As of v0.1.0, the response format looks like this:

```
{
  "address": <The Signer Bitcoin Address>,
  "sig": <The Signature>,
  "message": <The message that was requested and signed>,
  "ts": <The unix timestamp at which the signature was made>
}
```

# Using the node module

Install the module in your project:

```
npm install --save novi-server
```

And then start the server:

```
const novi = require('novi-server')
novid({
  db: <The Key Path for Novi>
})
```

It will start a `/sign` endpoint at port `21000`.

If you make a POST request with a "message" attribute, it will sign the message and return the response.

```
<html>
<script>
fetch("http://localhost:21000/sign", {
  method: 'post',
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    message: "Sign this message!"
  })
}).then((res) => {
  return res.json()
}).then((res) => {
  console.log("Response", res)
})
</script>
</html>
```

# Running as standalone

If you want to run Novi Server as a standalone app instead of a node module, you should first checkout the Novi app, which wraps the `Novi Server` module in a cross platform app format that supports Mac, Windows, and Linux.

But if you must directly run `novi-server` without running it as an app format, you can also do that. Just do:

```
npm install -g novi-server
```

to install globally, and then run

```
novi
```
