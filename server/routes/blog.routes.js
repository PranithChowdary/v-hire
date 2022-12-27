import express from 'express'
import blogCtrl from '../controllers/blog.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

// Get all blog posts
router.route('/api/blogs/all')
   .get(authCtrl.requireSignin, authCtrl.hasAuthorization,blogCtrl.getBlogPosts);

// Get a specific blog post
router.route('/api/blogs/by/:author')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization,blogCtrl.getBlogPost);

// Create a new blog post
router.route('/api/blogs/new')
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization,blogCtrl.create);

// Update an existing blog post
router.route('/api/blog/update')
    .patch(authCtrl.requireSignin, authCtrl.hasAuthorization,blogCtrl.updateBlogPost);

// Delete a blog post
router.route('/api/blogs/delete')
     .delete(authCtrl.requireSignin, authCtrl.hasAuthorization,blogCtrl.deleteBlogPost);

router.route('/api/blogs/verified')
      .get(authCtrl.requireSignin, authCtrl.hasAuthorization,blogCtrl.listVerified)

router.param('author',blogCtrl.blogByAuthor)

export default router