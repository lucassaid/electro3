import Link from 'next/link'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import IconButton from '@material-ui/core/IconButton';
import styles from './topBar.module.css';
import menuItems from '../data/menu-items'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden';

const ElevationScroll = ({children}) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 80
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    className: trigger ? styles.barNotOnTop : styles.bar,
    style: {transition: 'all 200ms ease'}
  });
}


export default function TopBar({page, onOpenDrawer}) {
  return(
    <ElevationScroll>
      <AppBar position="fixed" className={styles.appBar}>
        <Toolbar>
          <Container className={styles.container}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item xs={3}>
                <Link href="/">
                  <a className={styles.logo}>
                    <img className={styles.logoImg} src="/images/logo-electro-3-san-juan.svg" alt=""/>
                  </a>
                </Link>
              </Grid>
              <Hidden smDown>
                <Grid item xs={9} className={styles.links}>
                    {menuItems.map(item => 
                      <Link key={item.id} href={item.link}>
                        <a 
                          className={styles.link}
                          active={(page == item.link.substring(1)).toString()}
                          alt={item.alt}
                        >
                          {item.name}
                        </a>
                      </Link>
                    )}
                </Grid>
              </Hidden>
              <Hidden mdUp>
                <IconButton 
                  edge="start"
                  color="inherit" aria-label="menu"
                  onClick={onOpenDrawer}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  )
}