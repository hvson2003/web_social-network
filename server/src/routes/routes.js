import authRoutes from './AuthRoute.js';
import userRoutes from './UserRoute.js';
import postRoutes from './PostRoute.js';
import commentRoutes from './CommentRoute.js';
import likeRoutes from './LikeRoute.js';
import relationshipRoutes from './RelationshipRoute.js';

export default (app) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/post', postRoutes);
  app.use('/api/comment', commentRoutes);
  app.use('/api/like', likeRoutes);
  app.use('/api/relationship', relationshipRoutes);
};
