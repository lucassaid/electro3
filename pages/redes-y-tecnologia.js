import Head from 'next/head'
import Layout from '../components/layout'
import DataDisplay from '../components/dataDisplay'
import { tech } from '../data/pages'
import { tech as carouselData } from '../data/sliders'

export default function Tech() {

  return (
    <Layout page="redes-y-tecnologia" carouselData={carouselData} isService>
      <div >
        <Head>
          <title>Electro 3 - Redes y tecnología</title>
        </Head>

        <main>
          <DataDisplay data={tech.rows}></DataDisplay>
        </main>

      </div>
    </Layout>
  )
}
