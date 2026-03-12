const mongoose = require('mongoose');
const schema = mongoose.Schema;

const listingSchema = new schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://th.bing.com/th/id/OIP.reglHz67yLPaOkBDRMSGcwHaE8?w=249&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
            set: (v) => v === "" ? "https://th.bing.com/th/id/OIP.reglHz67yLPaOkBDRMSGcwHaE8?w=249&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" : v
        }
    },
    price: Number,
    location: String,
    country: String,
});

const listing = mongoose.model("listing", listingSchema);
module.exports = listing;