import { useState, useEffect } from 'react'

const useFetch = (endpoint) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()

    const getData = async () => {
      try {
        const response = await fetch(endpoint, { signal: abortController.signal })
        if (!response.ok) {
          throw Error('Could not fetch the data for that resource')
        }
        const data = await response.json()
        setData(data)
        setIsLoading(false)
        setError(null)
      } catch(err) {
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
          setError(err.message)
          setIsLoading(false)
        }
      }
    }

    getData()

    // don't run useEffect all the way if we move away from the component using this useFetch before it has completed
    return () => abortController.abort()
  }, [endpoint])

  return { data, isLoading, error }
}

export default useFetch