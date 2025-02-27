"use server"

import ContentCollection, { IContentAlbum } from "@/src/schemas/mongooseSchemas/ContentAlbum"
import MediaCollection from "@/src/schemas/mongooseSchemas/MediaContent";
import { IMedia } from "@/src/types/schemas/Media";
import connectDB from "@/src/utils/db"

export interface IContentAlbumWithId extends IContentAlbum {
    _id: string;
    mediaArr: IMediaWithId[];
}

export interface IMediaWithId extends IMedia {
    _id: string;
}

export const getContentsByAlbum = async (albumId : string) => {

  if(!albumId){
      return null
  }

  await connectDB()

  const contentArray : IContentAlbumWithId[] = JSON.parse(JSON.stringify(await ContentCollection.find({ album: albumId })))

  if(!contentArray || contentArray.length === 0){
      return null
  }

  const associatedMedia : IMediaWithId[] = JSON.parse(JSON.stringify(await MediaCollection.find({ _id: { $in: contentArray.map(content => content.media) } })))

  const contentWithMedia : IContentAlbumWithId[] = contentArray.map((content, index) => {
    return {
      ...content,
      mediaArr: associatedMedia.filter(media => media._id === content.media.toString())
    }
  })

  return contentWithMedia
}