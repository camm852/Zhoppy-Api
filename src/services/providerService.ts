import City from '../db/models/city.model'
import Provider from '../db/models/provider.model'
import { newCity } from './citiesService'
import { Request, Response } from 'express'
import { ProviderAttributes, CityAttributes } from '../types'

export const newProvider = async (req: Request, res: Response): Promise<Response> => {
  const provider = {
    idProvider: Math.floor(Math.random() * 1000),
    address: req.body.address,
    name: req.body.name,
    phone: req.body.phone,
    idCity: 0
  }

  try {
    const city: CityAttributes | null = await City.findOne({
      where: {
        nameCity: req.body.city
      }
    })
    if (city !== null) {
      provider.idCity = city.idCity
    } else {
      const createdCity: CityAttributes | null = await newCity(req.body.city)
      if (createdCity !== null)provider.idCity = createdCity?.idCity
    }

    await Provider.create(provider)
    return res.status(201).json({ msg: 'Provider was created' })
  } catch (error) {
    console.log(error)
    return res.status(404).json({ msg: 'There was a error' })
  }
}

export const getProviders = async (_req: Request, res: Response): Promise <Response> => {
  try {
    const providers: ProviderAttributes[] = await Provider.findAll({
      include: [{
        model: City,
        attributes: ['nameCity']
      }]
    })
    if (providers.length > 0) return res.status(200).json(providers)
    else throw new Error('Data not found')
  } catch (error: any) {
    return res.status(404).json({ msg: error.message })
  }
}

export const deleteProvider = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params

  try {
    await Provider.destroy({ where: { idProvider: id } })
    return res.status(200).json({ msg: 'Provider was deleted' })
  } catch (error: any) {
    return res.status(404).json({ msg: 'There was an error' })
  }
}

export const updateProvider = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const { name, address, phone } = req.body

  try {
    const providerStored: Provider | null = await Provider.findByPk(id)
    if (providerStored === null) throw new Error('Provider not found')
    providerStored.name = name
    providerStored.address = address
    providerStored.phone = phone
    const city: CityAttributes | null = await City.findOne({
      where: {
        nameCity: req.body.city
      }
    })
    if (city !== null) {
      providerStored.idCity = city.idCity
    } else {
      const createdCity: CityAttributes | null = await newCity(req.body.city)
      if (createdCity !== null)providerStored.idCity = createdCity?.idCity
    }
    await providerStored.save()
    return res.status(200).json({ msg: 'Provider was updated' })
  } catch (error: any) {
    return res.status(404).json({ msg: error.message })
  }
}
