import PostDatamapper from '../datamappers/index.datamapper.js';

export default {
    async showAll(req, res) {
        const posts = await PostDatamapper.PostDatamapper.findAll();
        res.json(posts);
    },

    async showOne(req, res) {
        const { id } = req.params;
        const post = await PostDatamapper.PostDatamapper.findByPk(id);

        res.json(post);
    },

    async showPostsByUser(req, res) {
        const { id } = req.params;
        const posts = await PostDatamapper.PostDatamapper.findByUserId(id);

        res.json(posts);
    },

    async deletePost(req, res) {
        const { id } = req.params;
        await PostDatamapper.PostDatamapper.delete(id);

        res.json({ message: 'Post deleted' });
    },

    async createPost(req, res) {
        const post = req.body;
        const newPost = await PostDatamapper.PostDatamapper.create(post);

        res.json(newPost);
    },

    async updatePost(req, res) {
        const post = req.body;
        const updatedPost = await PostDatamapper.PostDatamapper.update(post);

        res.json(updatedPost);
    }
};
