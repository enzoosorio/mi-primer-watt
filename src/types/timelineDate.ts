import { IAlbum } from "../schemas/mongooseSchemas/Timeline";


export interface DatesForTimelineWithString extends IAlbum {
    dateString?: string;
}

export type MediaContent = {
    mediaId: string;
    src: string;
    alt: string;
    type: string;
  }
  
export type ContentToShow = {
    contentId: string;
    albumId: string;
    title: string;
    description: string;
    mediaId: string;
    media: MediaContent[];
  }