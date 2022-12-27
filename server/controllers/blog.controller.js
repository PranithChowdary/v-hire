import extend from 'lodash/extend'
import errorHandler from '../helpers/dbErrorHandler'
import formidable from 'formidable'
import Blog from '../models/blog.model'


// Create a new blog post
const create = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if(err) {
      return res.status(400).json({
        error: "Post isn't created"
      })
    }
    let blog = new Blog(fields)
    blog.author = req.profile
    try {
      let result = await blog.save()
      res.json(result)
    }
    catch (err){
      return res.status(400).json({
        error : errorHandler.getErrorMessage(err)
      })
    }
  })
}


// Get all blog posts
const getBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.json(posts);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a specific blog post
const getBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).send({ error: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a List of verified blogs
const listVerified = (req, res) => {
  Blog.find({verified: true}, (err, blogs) => {
    if(err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(blogs)
  }).populate('author','_id name')
}

// Update a blog post
const updateBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) {
      return res.status(404).send({ error: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete a blog post
const deleteBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).send({ error: 'Post not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).send(err);
  }
};

const blogByAuthor = async (req, res, next, id) => {
  try {
    let blog = await Blog.findById(id).populate('author', '_id name')
    if (!blog)
    return res.status('400').json({
      error: "Blog not found"
    })
    req.blog = blog
    next()
  } catch (err) {
    return res.status('400').json({
      error: "could not retrieve course"
    })
  }
};


export default {
  create,
  getBlogPost,
  getBlogPosts,
  updateBlogPost,
  deleteBlogPost,
  listVerified,
  blogByAuthor
}