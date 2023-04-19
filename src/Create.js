import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Create = () => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogBody, setBlogBody] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('mario')
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const blog = { title: blogTitle, body: blogBody, author: blogAuthor }
    setIsLoading(true)
    
    await fetch('http://localhost:8004/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog)
    })

    setIsLoading(false)
    
    history.push('/')
  }

  return (
    <div className='create'>
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title: </label>
        <input 
          type='text'
          required
          value={blogTitle}
          onChange={(event) => setBlogTitle(event.target.value)}
        />
        <label>Blog body: </label>
        <textarea 
          required
          value={blogBody}
          onChange={(event) => setBlogBody(event.target.value)}
        ></textarea>
        <label>Blog author: </label>
        <select
          value={blogAuthor}
          onChange={(event) => setBlogAuthor(event.target.value)}
        >
          <option value='mario'>mario</option>
          <option value='yoshi'>yoshi</option>
        </select>
        {!isLoading && <button>Add Blog</button>}
        {isLoading && <button disabled>Adding Blog...</button>}
      </form>
    </div>
  );
}
 
export default Create;