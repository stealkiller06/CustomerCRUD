import type { NextPage } from 'next'
import CustomerCrud from '@feature/customer';

const Home: NextPage = () => {
  return (
    <div>
      <CustomerCrud />
    </div>
  )
}

export default Home

