const express = require('express');
const app = express();
const { MongoClient } = require("mongodb");
const PORT = process.env.PORT || 8000;

app.use(express.json());

const withDB = async (operations, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017');
        const db = client.db("mernblog");

        await operations(db);

        client.close();
    } catch (error) {
        res.status(500).json({ message: "Error connecting to the database", error });
    }
};

// GET article info
app.get('/api/articles/:name', async (req, res) => {
    const articleName = req.params.name;

    withDB(async (db) => {
        const articleInfo = await db.collection('articles').findOne({ name: articleName });

        if (!articleInfo) {
            res.status(404).json({ message: "Article not found" });
        } else {
            res.status(200).json(articleInfo);
        }
    }, res);
});

// POST to add comment (not yet implemented)
// POST to add comment
app.post('/api/articles/:name/add-comments', (req, res) => {
    const { username, text } = req.body;
    const articleName = req.params.name;

    withDB(async (db) => {
        const article = await db.collection('articles').findOne({ name: articleName });

        if (!article) {
            res.status(404).json({ message: "Article not found" });
            return;
        }

        await db.collection('articles').updateOne(
            { name: articleName },
            {
                $push: {
                    comments: { username, text }
                }
            }
        );

        const updatedArticle = await db.collection('articles').findOne({ name: articleName });
        res.status(200).json(updatedArticle);
    }, res);
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
