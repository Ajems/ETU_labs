class Post {
    constructor(id, ownerId, ownerName, content, dateCreated) {
        console.log(dateCreated)
        this.id = id
        this.ownerId = ownerId;
        this.ownerName = ownerName;
        this.content = content;
        this.dateCreated = dateCreated ? new Date(dateCreated) : new Date();
    }

    getFormattedDate() {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};
        return this.dateCreated.toLocaleDateString(undefined, options);
    }
}

module.exports = Post;