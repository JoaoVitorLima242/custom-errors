import NotificationContext from "./notificationContext.js"

export default class HeroEntity extends NotificationContext {
  constructor({ age, name }) {
    super()
    this.age = age
    this.name = name
  }

  isValid() {
    if (this.age < 20) {
      this.addNotification('age must be higher than 20!')
    }

    if (this.name?.length < 4) {
      this.addNotification('name length must be higher than 4!')
    }

    return !this.hasNotifications()

  }
}

