"use server"
import { BentoPhotosComponent } from './BentoPhotosComponent';
import { BentoPhotosResponse, getBentoPhotos } from '@/src/lib/bento/getBentoPhotos';

export const BentoContainer = async({category} : {category : string | null}) => {
    
  const res : BentoPhotosResponse | {error: string} = await getBentoPhotos([])
  
    if ("error" in res) {
      return <p>{res.error}</p>;
    }
    const {photos, total} = res
  
    return (
      <BentoPhotosComponent photos={photos} totalPhotos={total} category={category} />
    )
}
