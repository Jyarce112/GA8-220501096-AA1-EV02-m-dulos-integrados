import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/blog.css';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/blog-posts')
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar los posts');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="blog-status">Cargando posts...</p>;
  if (error) return <p className="blog-status error">{error}</p>;

  return (
    <section className="blog-container">
      <h1 className="blog-title">Blog</h1>

      <div className="blog-list">
        {posts.map(post => (
          <article key={post.id} className="blog-card">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>{post.date}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Blog;