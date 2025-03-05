import mongoose from "mongoose";
import { IBentoPhotos } from "../schemas/mongooseSchemas/BentoPhotos";

export const bentoPhotos : IBentoPhotos[] = [
    {
        src: "/images/photos/bento/foto-cuadrado.jpeg",
        aspectRatio: "Square",
        alt: "iphone-16-back-face",
        categoryId: new mongoose.Types.ObjectId("65df5f6b8f1c4b0f4c8e9a11")
    },
    {
        src: "/images/photos/bento/foto-paisaje.jpeg",
        aspectRatio: "Wide",
        alt: "iphone-15-pro-back-face",
        categoryId: new mongoose.Types.ObjectId("65df5f6b8f1c4b0f4c8e9a12")
    },
    {
        src: "/images/photos/bento/foto-pies-vertical.jpeg",
        aspectRatio: "Tall",
        alt: "s22-ultra-back-face",
        categoryId: new mongoose.Types.ObjectId("65df5f6b8f1c4b0f4c8e9a13")
    },
    {
        src: "/images/photos/bento/gabriel-con-vaca.jpeg",
        aspectRatio: "Tall",
        alt: "instax-camera",
        categoryId: new mongoose.Types.ObjectId("65df5f6b8f1c4b0f4c8e9a14")
    },
    {
        src: "/images/photos/bento/gabriel-con-vaca.jpeg",
        aspectRatio: "Tall",
        alt: "instax-camera",
        categoryId: new mongoose.Types.ObjectId("65df5f6b8f1c4b0f4c8e9a15")
    },
    {
        src: "/images/photos/bento/foto-pies-vertical.jpeg",
        aspectRatio: "Tall",
        alt: "s22-ultra-back-face",
        categoryId: new mongoose.Types.ObjectId("65df5f6b8f1c4b0f4c8e9a16")
    },
    {
        src: "/images/photos/bento/foto-paisaje.jpeg",
        aspectRatio: "Wide",
        alt: "iphone-15-pro-back-face",
        categoryId: new mongoose.Types.ObjectId("65df5f6b8f1c4b0f4c8e9a17")
    },
    {
        src: "/images/photos/bento/foto-pies-vertical.jpeg",
        aspectRatio: "Tall",
        alt: "s22-ultra-back-face",
        categoryId: new mongoose.Types.ObjectId("65df5f6b8f1c4b0f4c8e9a18")
    },
    {
        src: "/images/photos/bento/foto-pies-vertical.jpeg",
        aspectRatio: "Tall",
        alt: "s22-ultra-back-face",
        categoryId: new mongoose.Types.ObjectId("65df5f6b8f1c4b0f4c8e9a19")
    }
];
