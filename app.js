const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

// Middlewares
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.engine('ejs', ejsMate);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));

const url = "mongodb://127.0.0.1:27017/majorproject1";

async function connect() {
    await mongoose.connect(url);
}

connect()
    .then(() => {
        console.log("connected to the database");
    })
    .catch((err) => {
        console.dir(err);
    });
app.get("/", (req, res) => {
    res.redirect("/listings");
});
// Index Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { listings: allListings });
});

// NEW ROUTe
app.get("/listings/new", (req, res) => {
    res.render("listings/new");
});

// Show Route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id.trim());

    if (!listing) {
        console.log("Still null for ID:", id);
        return res.send("Listing not found in database.");
    }
    res.render("listings/show", { listing });
});

// Create Route
app.post("/listings", async (req, res) => {
    try{
         const newListing = new Listing(req.body.listing);
   if(typeof req.body.listing.image === "string") {
            newListing.image = { url: req.body.listing.image };
        }
  
    await newListing.save();
    res.redirect("/listings");
  } catch (err) {
    console.error("Error creating listing:", err);
    res.status(500).send("An error occurred while creating the listing.");
  }
});

// Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id.trim());
    res.render("listings/edit", { listing });
});

// Update Route (PUT)
app.put("/listings/:id", async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id.trim(), { ...req.body.listing }, { runValidators: true });
    res.redirect(`/listings/${id}`);
});

// Delete Route
app.delete("/listings/:id", async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id.trim());
    res.redirect("/listings");
});

app.listen(8080, () => {
    console.log("server is running at port:8080");
});