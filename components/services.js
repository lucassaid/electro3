import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import services from '../data/services'
import AddIcon from '@material-ui/icons/Add';
import styles from './services.module.css';
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  card: {
    boxShadow: '0 0 20px 0 rgba(0,0,0,0.1)',
    minWidth: '200px',
    textAlign: 'center',
    height: '100%'
  },
  title: {
    marginBottom: '15px',
    flexGrow: 1
  },
  cardActions: {
    justifyContent: 'center'
  }
}))

export default function Services() {

  const classes = useStyles()

  return(
    <Grid id="services" container spacing={4}>
      {services.map(service => 
        <Grid key={service.image} item xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardContent>
              <img className={styles.img} src={`/images/${service.image}`} alt={service.image}/>
              <Typography className={classes.title} variant="h5" component="h2">
                {service.title}
              </Typography>
              <Typography variant="body2" component="p">
                {service.desc}
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Link href={`/${service.link}`}>
                <a className={styles.link} alt={service.title}>
                  <Button size="small" variant="contained" disableElevation>
                    <AddIcon></AddIcon>
                    <span>Mas info</span>
                  </Button>
                </a>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      )}
    </Grid>
  )
}