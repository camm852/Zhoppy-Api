import { Optional } from 'sequelize/types'
import { RolAttributes } from '../../types'
import { Model, AllowNull, Column, PrimaryKey, Table, HasMany } from 'sequelize-typescript'
import User from './user.model'

interface RolCreation extends Optional<RolAttributes, 'idRol'>{}

@Table({
  tableName: 'Rols',
  timestamps: false
})
export default class Rol extends Model<RolAttributes, RolCreation> {
  @PrimaryKey
  @AllowNull(false)
  @Column
  idRol!: number

  @AllowNull(false)
  @Column
  nameRol!: string

  @HasMany(() => User)
  user!: User[]
}
