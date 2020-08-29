const express = require('express')

const app = express()

const port = 3000

app.get('/', (req, res) => res.json({ Hello : 'Worlds!' }));

app.get('/readFile', async (req, res) => {
    const fileContent = await fs.readFile('helloworld.txt', 'utf8');
    res.json({ fileContent });
});

app.listen(
    port,
    () => console.log(`app listening at http://localhost:${port}`)
);
