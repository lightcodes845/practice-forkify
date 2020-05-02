export default class Likes {
  constructor() {
    this.likes = [];
    // this.readStorage();
  }

  addLike(id, title, author, img) {
    const like = { id, title, author, img };
    this.likes.push(like);

    // Persite data in localStorage
    this.persistData();

    return like;
  }

  deleteLike(id) {
    this.likes.splice(
      this.likes.findIndex((el) => el.id === id),
      1
    );

    // Persite data in localStorage
    this.persistData();
  }

  isLiked(id) {
    return this.likes.findIndex((el) => el.id === id) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }

  persistData() {
    localStorage.setItem("likes", JSON.stringify(this.likes));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem("likes"));

    // Restore likes from localStorage
    if (storage) this.likes = storage;
  }
}
