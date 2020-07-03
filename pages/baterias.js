import Head from 'next/head'
import Layout from '../components/layout'
import DataDisplay from '../components/dataDisplay'
import { bateries } from '../data/pages'
import { bateries as carouselData } from '../data/sliders'

export default function Compaction() {

  return (
    <Layout page="baterias" carouselData={carouselData} isService>
      <div >
        <Head>
          <title>Electro 3 - Baterías</title>
        </Head>

        <main>
          <DataDisplay data={bateries.rows}></DataDisplay>
        </main>

      </div>
    </Layout>
  )
}
