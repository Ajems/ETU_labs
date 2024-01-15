const fs = require('fs');
const path = require('path');
const Post = require('../javascript/domain/pojo/post')

class PostsStorage {
    constructor() {
        this.nextId = 1
        this.filePath = path.join(__dirname, 'storage/posts');
    }

    reserveNewId(){
        return this.nextId++
    }

    getPostsJson(ownerId) {
        const filePath = path.join(this.filePath, `posts_is_${ownerId}.json`);
        try {
            return fs.readFileSync(filePath, 'utf8');
        } catch (error) {
            return null;
        }
    }

    getPosts(ownerId) {
        try {
            const postsJson = this.getPostsJson(ownerId);
            const posts = JSON.parse(postsJson);
            return posts.map(postJson => {
                const { id, ownerId, ownerName, content, date } = postJson;
                return new Post(id, ownerId, ownerName, content, date);
            });
        } catch (error) {
            console.error("Ошибка при парсинге JSON:", error);
            return [];
        }
    }

    addPost(ownerId, post) {
        const filePath = path.join(this.filePath, `posts_id_${ownerId}.json`);
        let posts = this.getPosts(ownerId);
        posts.push(post);
        this.saveData(filePath, posts);
    }

    removePost(ownerId, postId) {
        const filePath = path.join(this.filePath, `posts_id_${ownerId}.json`);
        let posts = this.getPosts(ownerId);
        posts = posts.filter(post => post.id !== postId);
        this.saveData(filePath, posts);
    }

    saveData(filePath, data) {
        fs.writeFileSync(filePath, JSON.stringify(data));
    }
}

module.exports = PostsStorage