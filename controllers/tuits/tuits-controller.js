import posts from "./tuits.js";

let tuits = posts;
const TuitsController = (app) => {
    app.get('/api/tuits', findTuits);
    app.post('/api/tuits', createTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
    app.put('/api/tuits/:tid', updateTuit);
};
const findTuits = (req, res) => {
    res.json(tuits);
};
const createTuit = (req, res) => {
    const newTuit = req.body;
    newTuit._id = (new Date()).getTime() + '';
    newTuit.username = "NASA";
    newTuit.handle = "@nasa";
    newTuit.time = 'Just now';
    newTuit.image = "nasa.png"
    newTuit.likes = 0;
    newTuit.liked = false;
    newTuit.dislikes = 0;
    newTuit.disliked = false;
    newTuit.replies = 0;
    newTuit.retuits = 0;
    tuits.push(newTuit);
    res.json(newTuit);
};
const deleteTuit = (req, res) => {
    const tuitID = req.params.tid;
    tuits = tuits
        .filter(
            tuit => tuit._id !== tuitID
        );
    res.sendStatus(200);
};
const updateTuit = (req, res) => {
    const tuitID = req.params.tid;
    const updates = req.body;
    tuits = tuits
        .map(
            tuit => tuit._id === tuitID ? {...tuit, ...updates} : tuit
        );
    res.sendStatus(200);
};
export default TuitsController;