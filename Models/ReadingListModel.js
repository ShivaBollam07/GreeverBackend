const readingListSchema = new mongoose.Schema({
    reading_list_title: {
        type: String,
        required: true
    },
    reading_list_description: {
        type: String,
        required: true
    },
    reading_list_skills: {
        type: [String]
    },
    reading_list_image: {
        type: String
    },
    reading_list_banner: {
        type: String
    }
}, { timestamps: true });

const ReadingList = mongoose.model('ReadingList', readingListSchema);

module.exports = ReadingList;