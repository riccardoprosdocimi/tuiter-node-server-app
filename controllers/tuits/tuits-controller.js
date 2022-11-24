import * as tuitsDao from "../../tuits/tuits-dao.js";

const TuitsController = (app) => {
    app.get('/api/tuits', findTuits);
    app.post('/api/tuits', createTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
    app.put('/api/tuits/:tid', updateTuit);
};
const findTuits = async (req, res) => {
    const tuits = await tuitsDao.findTuits();
    res.json(tuits);
};
const createTuit = async (req, res) => {
    const newTuit = req.body;
    newTuit.topic = "Space"
    newTuit.username = "NASA";
    newTuit.handle = "@nasa";
    newTuit.time = 'Just now';
    newTuit.image = "nasa.png"
    newTuit.title = "A new tuit from NASA"
    newTuit.likes = 0;
    newTuit.liked = false;
    newTuit.dislikes = 0;
    newTuit.disliked = false;
    newTuit.replies = 0;
    newTuit.retuits = 0;
    const insertedTuit = await tuitsDao.createTuit(newTuit);
    res.json(insertedTuit);
};
const deleteTuit = async (req, res) => {
    const tuitIdToDelete = req.params.tid;
    const status = await tuitsDao.deleteTuit(tuitIdToDelete);
    res.json(status);
};
const updateTuit = async (req, res) => {
    const tuitIdToUpdate = req.params.tid;
    const updates = req.body;
    const status = await tuitsDao.updateTuit(tuitIdToUpdate, updates);
    res.json(status);
};
export default TuitsController;