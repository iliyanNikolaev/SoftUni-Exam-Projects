const Stone = require('../models/Stone');

async function createStone(stoneData) {
    await Stone.create(stoneData);
}

async function getAllStones() {
    const stones = await Stone.find({}).lean();
    return stones;
}

async function getStoneById(id) {
    const stone = await Stone.findById(id).populate('owner').populate('likedList').lean();
    return stone;
}

async function getLast3Stones() {
    const stones = await Stone.find().sort({ createdAt: -1 }).limit(3).lean();
    return stones;
}

async function deleteStoneById(id) {
    await Stone.findByIdAndDelete(id);
}

async function editStoneById(id, stoneData) {
    await Stone.findByIdAndUpdate(id, stoneData);
}

async function likeStoneById(stoneId, userId) {
    await Stone.updateOne({
        _id: stoneId
    },
    {
        $push: { likedList: userId }
    });
}

async function searchStonesByName(name) {
    const stones = await Stone.find({ name: { $regex: new RegExp(name, 'i') } }).lean();
    return stones;
}

module.exports = {
    createStone,
    getAllStones,
    getStoneById,
    getLast3Stones,
    deleteStoneById,
    editStoneById,
    likeStoneById,
    searchStonesByName
}