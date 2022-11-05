import { Optional } from 'sequelize/types'
import { ImageAttributes } from '../../types'
import { Model, AllowNull, Column, PrimaryKey, Table, Unique, HasMany } from 'sequelize-typescript'
import Shoe from './shoe.model'

interface ImageCreation extends Optional<ImageAttributes, 'idImage'>{}

@Table({
  tableName: 'images',
  timestamps: false
})
export default class Image extends Model<ImageAttributes, ImageCreation> {
  @PrimaryKey
  @AllowNull(false)
  @Unique
  @Column
  idImage!: number

  @AllowNull(false)
  @Column
  url!: string

  @AllowNull(false)
  @Column
  public_id!: string

  @HasMany(() => Shoe)
  shoe!: Shoe[]
}
