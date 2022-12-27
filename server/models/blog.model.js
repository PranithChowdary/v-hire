import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
    content: String,
    resource_url: String
})
const Experience = mongoose.model('Experience', ExperienceSchema)
const BlogSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.ObjectId, ref: 'User'},
    title: {
        type: String,
        trim: true,
        required: 'Title of Blog required'
    },
    company: {
        type: String,
        required: 'Company Name'
    },
    role: {
        type: String,
        Required: 'Specify Role'
    },
    Attended: {
        type: Date,
        default: Date.now
    },
    verified: {
        type: Boolean,
        default: false
    },
    Experience: [ExperienceSchema]

})

export default mongoose.model('Blog', BlogSchema)