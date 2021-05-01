(_ => {

  const express = require('express')
  const app = express()
  const cors = require('cors')
  const { exec } = require('child_process')
  const apiPort = process.env.APIPORT || 3389

  app.use(cors())
  app.use(express.json())
  
  execute = (cmd, callback) => exec(cmd, (_, stdout) => callback(stdout))

  const api = (req, res) => {
    const {topic, offset} = req.body
    res.setHeader('Content-Type', 'application/json')
    const cmd = `kafkacat -C -b 127.0.0.1 -t ${topic} -o ${offset} -c 1 -e -q`
    execute(cmd, data => res.end(data))
  }

  app.post('/api/v1/kafka', api)

  app.listen(apiPort, _ => console.log('Listening at port', apiPort))

})()
