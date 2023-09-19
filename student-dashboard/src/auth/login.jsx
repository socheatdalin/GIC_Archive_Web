import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import axios from 'axios';
// import { IconButton,} from '@chakra-ui/react';
// import { visuallyHidden } from '@mui/utils';
// import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
// import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
// import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}

export default function App() {
  // const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');

  // React.useEffect(() => {
  //   if (localStorage.getItem('user-info')) {
  //     history.push('/')
  //   }
  // })
  const admin = { email: 'admin@123', password: 'admin' };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:3001/login';
   await axios
      .post(url, { email: admin.email, password: admin.password })
      .then((response) => {
        console.log(response.data);
        console.log('login');
        if (response.status === 200) {
          window.location.replace('/home');
        } else {
          alert(response.data.message);
          window.location.replace('/');
        }
      });
  };

  return (
    <>
      <div
        style={{
          backgroundColor: '#23395d',
          height: '690px',
          borderRadius: '13px',
        }}
      >
        <CssVarsProvider>
          <main>
            <ModeToggle />
            <Sheet
              sx={{
                width: 300,
                mx: 'auto', // margin left & right
                my: 4, // margin top & bottom
                py: 3, // padding top & bottom
                px: 2, // padding left & right
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRadius: 'sm',
                boxShadow: 'md',
              }}
              variant="outlined"
            >
              <div>
                <Typography level="h4" component="h1">
                  <b>Welcome!</b>
                </Typography>
                <Typography level="body2">Sign in to continue.</Typography>
              </div>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  // html input attribute
                  name="email"
                  // id="email"
                  type="email"
                  value={admin.email}
                  placeholder="Email"
                  // onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={admin.password}
                />
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  sx={{ mt: 5, ml: 9, mr: 9, bgcolor: '#23395d' }}
                >
                  Log in
                </Button>
              </FormControl>
            </Sheet>
          </main>
        </CssVarsProvider>
      </div>
    </>
  );
}
