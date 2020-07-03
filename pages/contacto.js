import Head from 'next/head'
import Layout from '../components/layout'
import ContactForm from '../components/contactForm'
import { contact as carouselData } from '../data/sliders'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'

const addresses = [
  {
    name: 'Casa Central',
    address: '9 de Julio 1022 (este) - Esquina Estados Unidos',
    location: 'C.P. 5400 - Ciudad de San Juan - San Juan - Argentina',
    tel: '0264 - 420 0987  /  421 0589'
  },
  {
    name: 'Electro3 Autopartes Eléctricas y Baterías',
    address: '9 de Julio 1022 (este) - Esquina Estados Unidos',
    location: 'C.P. 5400 - Ciudad de San Juan - San Juan - Argentina',
    tel: '0264 - 420 0987  /  421 0589'
  },
  {
    name: 'Sucursal Centro',
    address: 'Av. Rawson 	215 (sur)',
    location: 'C.P. 5400 - Ciudad de San Juan - San Juan - Argentina',
    tel: '0264 - 420 4355'
  }
]              

export default function Tech() {

  return (
    <Layout page="contacto" carouselData={carouselData}>
      <div >
        <Head>
          <title>Electro 3 - Contacto</title>
        </Head>

        <main>

          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <ContactForm></ContactForm>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                <strong>Email: </strong>consultas@electro3.com.ar
              </Typography>
              <br/>
              <Divider></Divider>
              <br/>
              {addresses.map(address => 
                <div key={address.name}>
                  <Typography variant="subtitle2">
                    <strong>{address.name}</strong>
                  </Typography>
    
                  <Typography variant="body2">
                    {address.address}<br/>
                    {address.location}<br/>
                    Teléfono: {address.tel}
                  </Typography>
                  <br/>
                </div>
              )}
              
            </Grid>
          </Grid>
        </main>

      </div>
    </Layout>
  )
}
