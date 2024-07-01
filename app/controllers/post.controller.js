import PostDatamapper from '../datamappers/index.datamapper.js';

export default {
  async showAll(req, res) {
    try {
      const posts = await PostDatamapper.PostDatamapper.findAll();
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Servor Error' });
    }
  },

  async showOne(req, res) {
    const { id } = req.params;

    try {
      const post = await PostDatamapper.PostDatamapper.findByPk(id);

      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Servor Error' });
    }
  },

  async showPostsByUser(req, res) {
    const { id } = req.params;

    try {
      const posts = await PostDatamapper.PostDatamapper.findByUserId(id);

      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Servor Error' });
    }
  },

  async deletePost(req, res) {
    const { id } = req.params;

    try {
      await PostDatamapper.PostDatamapper.delete(id);

      res.json({ message: 'Post deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Servor Error' });
    }
  },

  async createPost(req, res) {
    const post = req.body;

    try {
      const newPost = await PostDatamapper.PostDatamapper.create(post);
      res.json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Servor Error' });
    }
  },

  async updatePost(req, res) {
    const { id } = req.params;
    try {
      const postToUpdate = await PostDatamapper.PostDatamapper.findByPk(id);

      if (!postToUpdate) {
        res.status(404).json({ message: 'Post not found' });
        return;
      }

      const post = req.body;
      post['updated_at'] = new Date().toISOString();
      const updatedPost = await PostDatamapper.PostDatamapper.update(post, id);

      res.json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Servor Error' });
    }
  },
};
