const ReadingListController =   {
    getAllReadingList: (req, res) => {
        res.json({message: 'Get all reading list'});
    },
    addReadingList: (req, res) => {
        res.json({message: 'Add reading list'});
    },
    getSingleReadingList: (req, res) => {
        res.json({message: 'Get single reading list'});
    },
    deleteReadingList: (req, res) => {
        res.json({message: 'Delete reading list'});
    }
}

module.exports = ReadingListController;