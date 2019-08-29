import { ID } from '../../app/core/definitions/id';
import { Model } from '../../app/core/definitions/model';
import { User } from '../../app/core/entities/user';

export class UserModel implements Model {
  $loki!: ID;
  firstname!: string;
  lastname!: string;
  email!: string;
  username!: string;
  password!: string;
  createdAt!: Date;
  balance = 0;

  constructor(userEntity?: Partial<User>) {
    this.fromEntity(userEntity);
  }

  toEntity(): User {
    return {
      id: this.$loki,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      username: this.username,
      balance: this.balance,
      password: this.password,
    };
  }

  private fromEntity(userEntity?: Partial<User>): void {
    if (!userEntity) return;

    if (userEntity.id) {
      this.$loki = userEntity.id;
    }

    if (userEntity.firstname) {
      this.firstname = userEntity.firstname;
    }

    if (userEntity.email) {
      this.email = userEntity.email;
    }

    if (userEntity.lastname) {
      this.lastname = userEntity.lastname;
    }

    if (userEntity.password) {
      this.password = userEntity.password;
    }

    if (userEntity.username) {
      this.username = userEntity.username;
    }

    if (userEntity.balance) {
      this.balance = userEntity.balance;
    }
  }
}
