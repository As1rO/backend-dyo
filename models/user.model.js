import admin from 'firebase-admin';

const db = admin.database();

class User {
  constructor({ id, name, email }) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static async getById(id) {
    const snapshot = await db.ref(`users/${id}`).once('value');
    const userData = snapshot.val();
    return userData ? new User({ id, ...userData }) : null;
  }

  async save() {
    await db.ref(`users/${this.id}`).set({
      name: this.name,
      email: this.email,
    });
  }

  async delete() {
    await db.ref(`users/${this.id}`).remove();
  }
}

export default User;
