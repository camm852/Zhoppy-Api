export interface RolAttributes {
  idRol: number
  nameRol: string
}

export interface CityAttributes {
  idCity: number
  nameCity: string
}
export interface UserAttributes {
  idUser: number
  name: string
  email: string
  address: string
  password: string
  phone: string
  idRol: number
  createdAt?: Date
  updatedAt?: Date
}

export type NonSensibilityInfoUser = Pick<UserAttributes, 'name' | 'email' | 'address' | 'phone' | 'idRol'>
export type UserLogin = Pick<UserAttributes, 'name' | 'email' | 'address' | 'phone' | 'idRol' > & {token: string}

export interface ProviderAttributes {
  idProvider: number
  name: string
  address: string
  phone: string
  idCity: number
}

export interface PurchaseAttributes {
  idPurchase: number
  datePurchase: Date
  total: number
}

export interface ImageAttributes {
  idImage: number
  url: string
  public_id: string
}

export interface ShoeAttributes {
  idShoe: number
  name: string
  price: number | string
  stock: number | string
  description: string
  idImage: number
  idProvider: number
}

export interface ShoesPurchasesAttributes {
  idShoe: number
  idPurchase: number
}

export interface JWT {
  id: number
  iat: number
  exp: number
}

declare module 'express-session' {
  interface SessionData {
    user: UserAttributes
  }
}
