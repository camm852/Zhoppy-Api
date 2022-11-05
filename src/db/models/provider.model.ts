import { AllowNull, BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { Optional } from 'sequelize/types'
import { ProviderAttributes } from '../../types'
import City from './city.model'
import Shoe from './shoe.model'

interface ProviderCreation extends Optional<ProviderAttributes, 'idProvider'>{}

@Table({
  tableName: 'providers', timestamps: false
})
export default class Provider extends Model<ProviderAttributes, ProviderCreation> {
  @PrimaryKey
  @AllowNull(false)
  @Column
  idProvider!: number

  @AllowNull(false)
  @Column
  name!: string

  @AllowNull(false)
  @Column
  address!: string

  @AllowNull(false)
  @Column
  phone!: string

  @ForeignKey(() => City)
  @Column
  idCity!: number

  @BelongsTo(() => City)
  city!: City

  @HasMany(() => Shoe)
  shoe!: Shoe[]
}
