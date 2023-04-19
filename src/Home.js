import BlogList from './BlogList'
import useFetch from './useFetch'

const Home = () => {
  const { data: blogs, isLoading, error } = useFetch('http://localhost:8004/blogs')

  return (
    <div className='home'>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title="All Blogs!"/>}
    </div>
  )
}

export default Home
