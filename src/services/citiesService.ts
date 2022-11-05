import City from '../db/models/city.model'
import { CityAttributes } from '../types'

export const newCity = async (name: string): Promise<CityAttributes | null> => {
  const city: CityAttributes = {
    idCity: Math.floor(Math.random() * 1000),
    nameCity: name
  }

  try {
    await City.create(city)
    return city
  } catch (e) {
    return null
  }
}

// export const deleteCity = async (req: Request, res: Response): Promise<Response> => {
//   const { id } = req.params

//   try {
//     await City.destroy({ where: { idCity: id } })
//     return res.status(200).json({ msg: 'City was deleted' })
//   } catch (error) {
//     return res.status(400).json({ msg: 'There was an error' })
//   }
// }

// export const updateCity = async (req: Request, res: Response): Promise<Response> => {
//   const { id } = req.params
//   const { name } = req.body
//   try {
//     const cityStored = await City.findByPk(id)
//     if (cityStored !== null) {
//       cityStored.nameCity = name
//       await cityStored.save()
//     }
//     return res.status(200).json({ msg: 'City was updated' })
//   } catch (error) {
//     return res.status(400).json({ msg: 'There was an error' })
//   }
// }

// export const getAllCities = async (_req: Request, res: Response): Promise<Response> => {
//   try {
//     const cities: CityAttributes[] = await City.findAll()
//     return res.status(200).json(cities)
//   } catch (e) {
//     return res.status(400).json({ msg: 'There was an error' })
//   }
// }
