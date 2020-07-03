import Map from './map'
import styles from './footer.module.css'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import services from '../data/services'
import Link from 'next/link'
import InstagramIcon from '@material-ui/icons/Instagram'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

export default function() {
  return(
    <footer className={styles.footer}>
      <Container>
        <Grid spacing={4} container className={styles.container}>
          <Grid item xs={12} md={6} lg={3}>
            <Typography variant="h6" className={styles.subtitle}>Servicios</Typography>
            {services.map(service => 
              <div key={service.image}>
                <Link href={service.link}>
                  <a className={styles.link} alt={service.title}>{service.title} &rarr;</a>
                </Link>
              </div>  
            )}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Typography variant="h6" className={styles.subtitle}>Contacto</Typography>
            <Typography variant="body2">
              Av. Guillermo Rawson 215 Sur
              <br/>
              San Juan, Argentina
              <br/><br/>
              <strong>Ventas: </strong>
              <a
                href="tel:02644210589" 
                className={styles.link}
                alt="electro 3 teléfono"
              >
               (0264) 421-0589
              </a>
              <br/>
              <strong>Email: </strong>
              <a
                href="mailto:consultas@electro3.com.ar" 
                className={styles.link}
                alt="electro 3 email"
              >
                consultas@electro3.com.ar
              </a>
              <br/>
              <br/>
              <a href="https://wa.me/5492645407221" className={styles.socialLink} target="_blank">
                <InstagramIcon></InstagramIcon>
              </a>
              <a href="https://www.instagram.com/electro3.sj/" className={styles.socialLink} target="_blank">
                <WhatsAppIcon></WhatsAppIcon>
              </a>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Typography variant="h6" className={styles.subtitle}>Acerca de Electro 3</Typography>
            <Typography variant="body2">
              Somos una empresa sanjuanina orientada al cuidado del medio ambiente y desarrollo sustentable a través de procesos de reciclaje de chatarra ferrosa.
              <br/>
              En Electro 3 hacemos que la tecnología y las personas trabajen juntas⚡️
            </Typography>
          </Grid>
        </Grid>

      </Container>
      <div className={styles.footerBottom}>
        <Typography variant="body2">
          © Copyright <strong>Electro 3</strong>. Todos los derechos reservados.
        </Typography>
      </div>
    </footer>
  )
}