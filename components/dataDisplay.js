import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import utils from '../styles/utils.module.css'
import styles from './dataDisplay.module.css'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import Link from 'next/link'

export default function DataDisplay({data}) {
  return(
    <div className={styles.container}>
      {data.map((row, i) =>
        <Grid
          container
          spacing={4}
          direction={`row${Boolean(i%2) ?'':`-reverse`}`}
          alignItems="center"
          key={row.image}
          style={row.style || {}}
        >
          <Grid item xs={12} md={6} style={{textAlign: Boolean(i%2) ? 'right':'left'}}>
            <img
              className={`${utils.borderRadiusLarge} ${styles.image}`}
              style={{
                width: '100%', ...row.imageStyle || {}}}
              src={`/images/${row.image}`} 
              alt={row.image}
            />
          </Grid>
    
          <Grid item xs={12} md={6} style={{textAlign: Boolean(i%2) ? 'left':'right'}}>

            {row.title && (
              <Typography key={i} variant="h4">
                {row.title}<br/>
              </Typography>
            )}

            {row.paragraphs.map((p, i) =>
              <Typography key={i} variant="body2" component="p">
                {p}<br/><br/>
              </Typography>
            )}

            {row.link && (
              <Link href={`/${row.link}`}>
                <a className={styles.link} alt={row.title}>
                  <Button size="small" variant="contained" disableElevation>
                    <AddIcon></AddIcon>
                    <span>Mas info</span>
                  </Button>
                </a>
              </Link>
            )}
          </Grid>
        </Grid>
      )}
    </div>
  )
}