import Head from 'next/head'
import Layout from '../components/layout'
import { home } from '../data/sliders'

export default function Home() {

  return (
    <Layout page="home" carouselData={home}>
      <div >
        <Head>
          <title>Electro 3 - Inicio</title>
        </Head>

        <main>
        </main>

      </div>
    </Layout>  
  )
}
