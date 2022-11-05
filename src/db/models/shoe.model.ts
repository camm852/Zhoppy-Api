import { Optional } from 'sequelize/types'
import { ShoeAttributes } from '../../types'
import { Model, AllowNull, Column, PrimaryKey, Table, Unique, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Image from './image.model'
import Provider from './provider.model'

interface ShoeCreation extends Optional<ShoeAttributes, 'idShoe'>{}

@Table({
  tableName: 'Shoes',
  timestamps: false
})
export default class Shoe extends Model<ShoeAttributes, ShoeCreation> {
  @PrimaryKey
  @AllowNull(false)
  @Unique
  @Column
  idShoe!: number

  @AllowNull(false)
  @Column
  name!: string

  @AllowNull(false)
  @Column
  price!: string

  @AllowNull(false)
  @Column
  stock!: string

  @AllowNull(false)
  @Column
  description!: string

  @ForeignKey(() => Image)
  @Column
  idImage!: number

  @BelongsTo(() => Image, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })
  image!: Image

  @ForeignKey(() => Provider)
  @Column
  idProvider!: number

  @BelongsTo(() => Provider, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })
  provider!: Provider
}
