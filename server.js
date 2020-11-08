const express = require('express')
const path = require('path')
const { spawn } = require('child_process')

const app = express();
app.use('/scripts', express.static(path.join(__dirname, 'scripts')))
app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.use('/hand_detection', express.static(path.join(__dirname, 'hand_detection')))

app.use('', express.static(path.join(__dirname)))

app.get('/', (req, res)=>{
	res.sendFile(path.join(__dirname,'index.html'))
})

app.get('/handDataStream', (req, res)=>{
	const childPy = spawn('python3', ['hand_detection/handDataStreamer.py'])
  res.end()
})

app.get('/handDataRead', (req, res)=>{
	const childPy = spawn('python3', ['hand_detection/handDataReader.py'])

	childPy.stdout.on('data', (data)=>{
		handData = data.toString()
		res.json(handData)
	})

	childPy.stderr.on('data', (data)=>{
		console.error('stderr: ',data.toString())
	})

	childPy.on('close', (code) => {
		console.log('child process exited with code: ', code.toString()) 
	})
})

app.listen(8000)
