const express = require('express')

async function sleep(ms) {
  return new Promise((f) => {
    setTimeout(f, ms)
  })
}

async function runLoadTest(url) {
  const totalRequests = 100
  const promises = []
  for (let i = 0; i < totalRequests; i++) {
    promises.push(fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({i})
    }))
    await sleep(100)
  }
  const results = await Promise.allSettled(promises)
  const errors1 = results.filter(x => x.status === 'rejected').map(x => x.reason)
  const errors2 = results.filter(x => x.status === 'fulfilled' && x.value.status !== 200).map(x => x.value.statusText)
  return errors1.concat(errors2)
}

function main() {
  const tunnelUrl = process.argv[2]
  if (!tunnelUrl) {
    console.error('Error: No tunnel URL provided. Please pass the URL as a command-line argument.')
    process.exit(1)
  }

  const app = express()
  const port = 8084
  const receivedIndices = new Set()

  app.use(express.json())
  app.post('/', (req, res) => {
    const { i } = req.body
    if (typeof i === 'number') {
      receivedIndices.add(i)
      res.sendStatus(200)
    } else {
      res.sendStatus(400)
    }
  })

  const server = app.listen(port, async () => {
    console.log(`Server listening on port ${port}`)
    const errors = await runLoadTest(tunnelUrl)
    if (errors.length > 0) {
       console.log(`Errors (${errors.length}):\n${errors.join('\n')}\n`)
    }
    if (receivedIndices.size === 100) {
      console.log('Test passed: All 100 requests were received.')
    } else {
      console.log(`Test failed: Only ${receivedIndices.size} requests were received.`)
    }
    process.exit(0) // server.close doesn't seem to work? :(
  })
}

main()
