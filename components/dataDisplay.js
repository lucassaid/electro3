import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import utils from '../styles/utils.module.css'
import styles from './dataDisplay.module.css'

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
        >
          <Grid  item xs={12} md={6}>
            <img
              className={`${utils.borderRadiusLarge} ${styles.image}`}
              style={{width: '100%'}}
              src={`/images/${row.image}`} 
              alt={row.image}
            />
          </Grid>
    
          <Grid item xs={12} md={6}>
            {row.paragraphs.map((p, i) =>
              <Typography key={i} variant="body2" component="p">
                {p}<br/><br/>
              </Typography>
            )}
          </Grid>
        </Grid>
      )}
    </div>
  )
}