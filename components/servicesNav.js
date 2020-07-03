import services from '../data/services'
import Grid from '@material-ui/core/Grid'
import styles from './servicesNav.module.css'
import Link from 'next/link'
import Typography from '@material-ui/core/Typography'

export default function ServicesNav({page}) {
  return(
    <Grid container className={styles.container}>
      {services.map(service =>
        <Grid active={(page == service.link).toString()} className={styles.item} key={service.image} item xs={3}>
          <Link href={service.link}>
            <a alt={service.title} className={styles.link}>
              <img className={styles.img} src={`/images/${service.image}`} alt={service.image}/>
              {page == service.link && (
                <Typography variant="body2">
                  {service.title}
                </Typography>
              )}
            </a>
          </Link>
        </Grid>
      )}
    </Grid>
  )
}