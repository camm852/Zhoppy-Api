import { Optional } from 'sequelize/types'
import { CityAttributes } from '../../types'
import { Model, AllowNull, Column, PrimaryKey, Table, HasMany, Unique } from 'sequelize-typescript'
import Provider from './provider.model'

interface CityCreation extends Optional<CityAttributes, 'idCity'>{}

@Table({
  tableName: 'cities',
  timestamps: false
})
export default class City extends Model<CityAttributes, CityCreation> {
  @PrimaryKey
  @AllowNull(false)
  @Unique
  @Column
  idCity!: number

  @AllowNull(false)
  @Column
  nameCity!: string

  @HasMany(() => Provider)
  providers!: Provider[]
}
