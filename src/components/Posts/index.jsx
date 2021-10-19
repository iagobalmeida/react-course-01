import './styles.css';
import { PostCard } from '../PostCard';

export const Posts = ({posts}) => ((
    <div className="post-list">
      {posts.map(post => (
        <PostCard key={post.id} title={post.title} body={post.title} cover={post.cover}/>
      ))}
    </div>
));