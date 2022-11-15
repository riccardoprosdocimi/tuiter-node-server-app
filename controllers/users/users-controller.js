import people from "./users.js";

let users = people;
const UsersController = (app) => {
    app.get('/api/users', findUsers);
    app.get('/api/users/:uid', findUserById);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
};
const findUsers = (req, res) => {
    const type = req.query.type;
    if (typeof type !== "undefined") {
        const usersOfType = users
            .filter(u => u.type === type)
        if (usersOfType.length === 0) {
            res.sendStatus(404)
        } else {
            res.json(usersOfType)
        }
    } else {
        res.json(users);
    }
};
const findUserById = (req, res) => {
    const userId = req.params.uid;
    const user = users
        .find(
            u => u._id === userId
        );
    res.json(user);
};
const createUser = (req, res) => {
    const newUser = req.body;
    newUser._id = (new Date()).getTime() + '';
    users.push(newUser);
    res.json(newUser);
};
const deleteUser = (req, res) => {
    const userID = req.params['uid'];
    users = users
        .filter(
            usr => usr._id !== userID
        );
    res.sendStatus(200);
};
const updateUser = (req, res) => {
    const userID = req.params['uid'];
    const updates = req.body;
    users = users
        .map(
            usr => usr._id === userID ? {...usr, ...updates} : usr
        );
    res.sendStatus(200);
};
export default UsersController;