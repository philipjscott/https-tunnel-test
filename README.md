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
