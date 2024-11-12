// storages/usersStorage.js
// This class lets us simulate interacting with a database.
class UsersStorage {
  constructor() {
    this.storage = {
      0: { id: 0, firstName: "some", lastName: "user", email: "someuser@a.com", age: 24, bio: "bio" },
      1: { id: 1, firstName: "asdf", lastName: "fdsa", email: "asdf@a.com", age: 24, bio: "bi" },
    };
    this.id = 2;
  }

  addUser({ firstName, lastName, email, age, bio }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName, email, age, bio };
    this.id++;
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id) {
    return this.storage[id];
  }

  getUser(name, email) {
    const foundUsers = Object.values(this.storage).filter((user) => {
      return name
        ? `${user.firstName} ${user.lastName}`.includes(name)
        : true && email
        ? user.email.includes(email)
        : true;
    });

    return foundUsers.length > 0 ? foundUsers[0] : null;
  }

  updateUser(id, { firstName, lastName, email, age, bio }) {
    this.storage[id] = { id, firstName, lastName, email, age, bio };
  }

  deleteUser(id) {
    delete this.storage[id];
  }
}
// Rather than exporting the class, we can export an instance of the class by instantiating it.
// This ensures only one instance of this class can exist, also known as the "singleton" pattern.
export default new UsersStorage();
