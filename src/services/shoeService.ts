import Image from '../db/models/image.model'
import Provider from '../db/models/provider.model'
import Shoe from '../db/models/shoe.model'
import fs from 'fs-extra'
import { Request, Response } from 'express'
import { ImageAttributes, ShoeAttributes } from '../types'
import { updateImage, uploadImage, deleteImageOnDb } from './imageService'

export const newShoe = async (req: Request, res: Response): Promise<Response> => {
  const { name, price, stock, description, provider: idProvider } = req.body
  const newShoe: ShoeAttributes = {
    idShoe: Math.floor(Math.random() * 1000),
    name,
    price: +price,
    stock: +stock,
    description,
    idProvider,
    idImage: 0
  }
  const image: ImageAttributes | null = await uploadImage(req.file)
  if (image === null) throw new Error('An error has ocurried')
  newShoe.idImage = image.idImage
  try {
    await Shoe.create(newShoe)
    if (req.file?.path !== undefined) await fs.unlink(req.file.path)
    return res.status(201).json({ msg: 'Shoe was created' })
  } catch (error) {
    return res.status(404).json({ mag: 'An error has ocurried' })
  }
}

export const getShoes = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const shoes: ShoeAttributes[] = await Shoe.findAll({
      include: [
        {
          model: Image,
          attributes: ['url']
        }, {
          model: Provider,
          attributes: ['name']
        }
      ]
    })
    if (shoes.length > 0) return res.status(200).json(shoes)
    throw new Error()
  } catch (error: any) {
    console.log(error)
    return res.status(404).json({ msg: 'An error has ocurried' })
  }
}

export const deleteShoe = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params

  try {
    const shoeStored: Shoe | null = await Shoe.findByPk(id)
    if (shoeStored === null) throw new Error()
    const imageDeleted = await deleteImageOnDb(shoeStored?.idImage)
    if (imageDeleted === null) throw new Error()
    await Shoe.destroy({ where: { idShoe: id } })
    return res.status(200).json({ msg: 'Shoe was deleted' })
  } catch (error: any) {
    return res.status(404).json({ msg: 'There was an error' })
  }
}

export const updateShoe = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const { name, price, stock, description, provider: idProvider } = req.body

  try {
    const shoeStored: Shoe | null = await Shoe.findByPk(id)
    if (shoeStored === null) throw new Error('Shoe not found')
    if (req.file !== undefined) {
      const image: ImageAttributes | null = await updateImage(shoeStored.idImage, req.file)
      if (image === null) throw new Error('An error has ocurried')
    }
    if (req.file?.path !== undefined) await fs.unlink(req.file.path)
    shoeStored.name = name
    shoeStored.stock = stock
    shoeStored.price = price
    shoeStored.description = description
    shoeStored.idProvider = idProvider
    await shoeStored.save()
    return res.status(200).json({ msg: 'Shoe was udpdated' })
  } catch (error: any) {
    console.log(error)
    return res.status(404).json({ msg: error.message })
  }
}

export const getShoesHome = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const shoesStored: Shoe[] | null = await Shoe.findAll({
      limit: 10,
      include: [{
        model: Image,
        attributes: ['url']
      }
      ]
    })

    if (shoesStored === undefined) throw new Error()
    return res.status(200).json(shoesStored)
  } catch (error) {
    return res.status(404).json({ msg: 'There was error' })
  }
}
