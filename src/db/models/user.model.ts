import { Optional } from 'sequelize/types'
import { UserAttributes, NonSensibilityInfoUser } from '../../types'
import { Model, AllowNull, Column, PrimaryKey, Table, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Rol from './rol.model'
import bcrypt from 'bcrypt'

interface UserCreation extends Optional<UserAttributes, 'createdAt'| 'updatedAt'>{}

@Table({
  tableName: 'Users'
})
export default class User extends Model<UserAttributes, UserCreation> {
  @PrimaryKey
  @AllowNull(false)
  @Column
  idUser!: number

  @AllowNull(false)
  @Column
  name!: string

  @AllowNull(false)
  @Column
  email!: string

  @AllowNull(false)
  @Column
  address!: string

  @AllowNull(false)
  @Column
  password!: string

  @AllowNull(false)
  @Column
  phone!: string

  @ForeignKey(() => Rol)
  @Column
  idRol!: number

  @BelongsTo(() => Rol, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })
  rol!: Rol

  async checkPassword (data: string | Buffer): Promise<Boolean> {
    const compare = await bcrypt.compare(data, this.password)
    return compare
  }

  getNonSensibilityInfo (): any {
    const nonSensibilityInfoUser: NonSensibilityInfoUser = {
      name: this.name,
      email: this.email,
      address: this.address,
      phone: this.phone,
      idRol: this.idRol
    }
    return nonSensibilityInfoUser
  }
}
