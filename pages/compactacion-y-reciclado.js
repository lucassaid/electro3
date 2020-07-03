import Head from 'next/head'
import Layout from '../components/layout'
import DataDisplay from '../components/dataDisplay'
import { compaction } from '../data/pages'
import { compaction as carouselData } from '../data/sliders'

export default function Compaction() {

  return (
    <Layout page="compactacion-y-reciclado" carouselData={carouselData} isService>
      <div >
        <Head>
          <title>Electro 3 - Compactación y reciclado</title>
        </Head>

        <main>
          <DataDisplay data={compaction.rows}></DataDisplay>
        </main>

      </div>
    </Layout>
  )
}
