import Head from 'next/head'
import Layout from '../components/layout'
import DataDisplay from '../components/dataDisplay'
import { autoparts } from '../data/pages'
import { autoparts as carouselData } from '../data/sliders'

export default function Autopartes() {

  return (
    <Layout page="autopartes" carouselData={carouselData} isService>
      <div >
        <Head>
          <title>Electro 3 - Autopartes eléctricas</title>
        </Head>

        <main>
          <DataDisplay data={autoparts.rows}></DataDisplay>
        </main>

      </div>
    </Layout>
  )
}