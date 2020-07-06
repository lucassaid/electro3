import Head from 'next/head'
import Layout from '../components/layout'
import DataDisplay from '../components/dataDisplay'
import { services } from '../data/pages'
import { services as carouselData } from '../data/sliders'

export default function Compaction() {
  return (
    <Layout page="baterias" carouselData={carouselData}>
      <div >
        <Head>
          <title>Electro 3 - Servicios</title>
        </Head>

        <main>
          <DataDisplay data={services.rows}></DataDisplay>
        </main>

      </div>
    </Layout>
  )
}
