# https-tunnel-test

Created this to test localtunnel. It seems localtunnel occasionally returns `Bad Gateway` :(

```bash
➜  https-tunnel-test git:(master) ✗ node index.js https://ready-gifts-stick.loca.lt         
Server listening on port 8084
Errors (12):
Bad Gateway
Bad Gateway
Bad Gateway
Bad Gateway
Bad Gateway
Bad Gateway
Bad Gateway
Bad Gateway
Bad Gateway
Bad Gateway
Bad Gateway
Bad Gateway

Test failed: Only 88 requests were received.
➜  https-tunnel-test git:(master) ✗ node index.js https://bd3b-184-147-199-37.ngrok-free.app
Server listening on port 8084
Test passed: All 100 requests were received.
```

### What HTTP tunnel should I use?

Cloudflare Tunnels are great, but you need to install `cloudflared`. Ngrok is OK, but you still need to install a binary. Ngrok's Go client library will also *hang* if you provide the wrong authentication token, or if you've reached the session agent limit (set to one for free users).

I haven't tried serveo.net or localhost.run, maybe one day I will write a wrapper library (e.g. https://www.npmjs.com/package/serveonet).

Localtunnel is free and doesn't require users to install a binary. It also has a nice client library on NPM. Unfortunately, https://localtunnel.me tends to return `Bad Gateway` errors. It appears the server code has been abandoned... It's good enough for simple examples I suppose, but it's unacceptable for local development.

You could theoretically self-host Localtunnel, but I'd be concerned of bad actors finding the URL and using it for abuse. You wouldn't want any incidents occurring on a URL like localtunnel.yourcompany.com — that would be a PR problem!

TL;DR use `cloudflared` for serious local development, and use `localtunnel` for simple proof-of-concepts where you don't want to force your customers to install something.
