import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'

const PageNotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='text-5xl mb-8'>Page Not Found</h1>
        <Button className='bg-yellow-400 hover:bg-yellow-500 text-black font-bold'  asChild>
            <Link to="/">Go to Home</Link>
        </Button>
    </div>
  )
}

export default PageNotFound