import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import useFetch from './useFetch'

const BlogDetails = () => {
  const { id } = useParams()
  const { data: blog, isLoading, error } = useFetch(`http://localhost:8004/blogs/${id}`)
  const history = useHistory()

  const handleClick = async () => {
    await fetch(`http://localhost:8004/blogs/${blog.id}`, {
      method: 'DELETE'
    })

    history.push('/')
  }

  return (
    <div className='blog-details'>
      { isLoading && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
        <article>
          <h2>{ blog.title }</h2>
          <p>Written by: { blog.author }</p>
          <div>{ blog.body }</div>
          <button onClick={handleClick}>Delete</button>
        </article>
      )}

    </div>
  );
}
 
export default BlogDetails