import cloudinary from 'cloudinary'
import Image from '../db/models/image.model'
import { ImageAttributes } from '../types'

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

export const uploadImage = async (image: any): Promise<ImageAttributes | null> => {
  try {
    const upload = await cloudinary.v2.uploader.upload(image.path)
    const newImage: ImageAttributes = {
      idImage: Math.floor(Math.random() * 1000),
      url: upload.url,
      public_id: upload.public_id
    }
    await Image.create(newImage)
    return newImage
  } catch (error) {
    console.log(error)
    return null
  }
}

export const updateImage = async (idImage: number, image: any): Promise<ImageAttributes | null> => {
  try {
    const imageStored: Image | null = await Image.findByPk(idImage) // encuentra la imagen en la bd
    const imageDeleted = await deleteImageOnCloud(imageStored?.public_id) // elimina la imagen de la nube
    if (imageDeleted === false) throw new Error('The image could be not updated')
    const upload = await cloudinary.v2.uploader.upload(image.path)
    if (imageStored === null) throw new Error()
    imageStored.url = upload.url
    imageStored.public_id = upload.public_id
    await imageStored.save()
    return imageStored
  } catch (error: any) {
    console.log(error)
    return null
  }
}

export const deleteImageOnCloud = async (publicId: string | undefined): Promise<Boolean> => {
  try {
    if (publicId === undefined) throw new Error()
    await cloudinary.v2.uploader.destroy(publicId)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const deleteImageOnDb = async (id: any): Promise<Boolean> => {
  try {
    const imageStored: Image | null = await Image.findByPk(id)
    if (imageStored === null) throw new Error()
    await deleteImageOnCloud(imageStored.public_id)
    await Image.destroy({ where: { idImage: id } })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
