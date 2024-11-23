import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please enter product name"],
        maxLength: [200, "Product name cannot exceed 200 characters"],
    },
    price: {
        type: Number,
        require: [true, "Please enter product price"],
        maxLength: [5, "Product price cannot exceed 5 characters"],
        default: 0.0,
    },
    description: {
        type: String,
        require: [true, "Please enter product description"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                require: true,
            },
            url: {
                type: String,
                require: true,
            }
        },
    ],
    category: {
        type: String,
        require: [true, "Please select category for this product"],
        enum: {
            values: [
                "Electronics",
                "Cameras",
                "Laptop",
                "Accessories",
                "Headphones",
                "Food",
                "Books",
                "Sports",
                "Outdoor",
                "Home",
            ],
            message: "Please select correct category for product",
        },
    },
    seller: {
        type: String,
        require: [true, "Please enter product seller"],
    },
    stock: {
        type: Number,
        require: [true, "Please enter product stock"],
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                require: true,
            },
            rating: {
                type: Number,
                require: true,
            },
            comment: {
                type: String,
                require: true,
            },
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
},
    {
        timestamps: true,
});

export default mongoose.model("Product", productSchema);