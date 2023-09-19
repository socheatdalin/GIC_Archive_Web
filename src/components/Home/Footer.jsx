import { makeStyles } from '@material-ui/core';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Facebook, Twitter, Instagram } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#f8f9fa',
    width: '100%',
    position: 'static',
    paddingTop: 20,
    // bottom: 0,
  },
});

export default function Footer() {
    const classes = useStyles();
  return (
    <>
     <BottomNavigation className={classes.root} >
        <h3>Connect with us: </h3>
      <BottomNavigationAction className='pt-4' label="Facebook" icon={<Facebook />} />
      <BottomNavigationAction label="Twitter" icon={<Twitter />} />
      <BottomNavigationAction label="Instagram" icon={<Instagram />} />
   
          <p className=' me-md-2 pt-1'>Subscibe now for more information </p>
          <button class="btn btn-outline-primary fw-bolder" >SUBSCRIBE</button>
      
    
    </BottomNavigation>
      <div className="flex text-center py-3  bg-light">
      <div className="foot">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </div>
    </div>
    </>
   
    
  );

}
