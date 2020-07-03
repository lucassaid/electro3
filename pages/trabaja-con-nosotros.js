import Head from 'next/head'
import Layout from '../components/layout'
import ContactForm from '../components/contactForm'
import { workWithUs as carouselData } from '../data/sliders'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function Tech() {

  return (
    <Layout page="trabaja-con-nosotros" carouselData={carouselData}>
      <div >
        <Head>
          <title>Electro 3 - Trabajá con nosotros</title>
        </Head>

        <main>

          <Grid
            container
            spacing={6}
            alignItems="center"
          >
            <Grid item xs={12} md={6}>
              <Typography variant="h5">
                Envianos tus datos y nos pondremos en contacto con vos.
              </Typography>
              <ContactForm submitCV></ContactForm>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">
                Estamos en constante crecimiento y expansión de nuestras áreas de trabajo, es por esto que permanentemente incorporamos personal y socios de trabajo.
                <br/><br/>
                Si querés unirte a nuestro equipo de trabajo solo tenés que enviarnos tus datos y tu CV en formato PDF o WORD y nos pondremos en contacto a la brevedad.
              </Typography>
            </Grid>
          </Grid>
        </main>

      </div>
    </Layout>
  )
}
