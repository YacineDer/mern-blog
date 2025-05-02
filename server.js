const express = require('express');
const app = express();
const { MongoClient } = require("mongodb");
const PORT = process.env.PORT || 8000;

app.use(express.json());

// GET article info
app.get('/api/articles/:name', async (req, res) => {
    const articleName = req.params.name;

    try {
        const client = await MongoClient.connect('mongodb://localhost:27017');
        const db = client.db("mernblog");
        const articleInfo = await db.collection('articles').findOne({ name: articleName });

        if (!articleInfo) {
            res.status(404).json({ message: "Article not found" });
        } else {
            res.status(200).json(articleInfo);
        }

        client.close();
    } catch (error) {
        res.status(500).json({ message: "Error connecting to the database", error });
    }
});

// POST to add comment (mocked for now, remove articlesInfo logic later)
app.post('/api/articles/:name/add-comments', (req, res) => {
    res.status(501).json({ message: "Commenting not implemented yet" });
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
