import { Grid, Text, VStack } from '@chakra-ui/react';
import { FormControl, FormLabel, Stack, styled } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { BiAddToQueue } from 'react-icons/bi';
import { useHistory, useLocation } from 'react-router-dom';
import Input, { inputClasses } from '@mui/base/Input';
import { Popper } from '@mui/base';
import Select, { selectClasses } from '@mui/base/Select';
import Option, { optionClasses } from '@mui/base/Option';

//Input

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledInputElement = styled('input')(
  ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 4px 30px ${
      theme.palette.mode === 'dark' ? grey[900] : grey[200]
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === 'dark' ? blue[500] : blue[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return <Input slots={{ input: StyledInputElement }} {...props} ref={ref} />;
});

//Desc

const StyledTextareaElement = styled('textarea', {
  shouldForwardProp: (prop) =>
    !['ownerState', 'minRows', 'maxRows'].includes(prop.toString()),
})(
  ({ theme }) => `
    width: 320px;
    height: 120px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === 'dark' ? grey[900] : grey[50]
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === 'dark' ? blue[500] : blue[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

const CustomInputDesc = React.forwardRef(function CustomInput(props, ref) {
  return (
    <Input
      slots={{ input: StyledInputElement, textarea: StyledTextareaElement }}
      {...props}
      ref={ref}
    />
  );
});

// Password

const StyledInputRoot = styled('div')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  border-radius: 12px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === 'dark' ? grey[900] : grey[50]
  };
  display: flex;
  align-items: center;
  justify-content: center;


  &.${inputClasses.focused} {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === 'dark' ? blue[500] : blue[200]
    };
  }

  &:hover {
    border-color: ${blue[400]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const StyledInputElementPas = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  flex-grow: 1;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 12px 12px;
  outline: 0;
`
);

const IconButton = styled(Button)(
  ({ theme }) => `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: inherit;
  cursor: pointer;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[700]};
  `
);

const InputAdornment = styled('div')`
  margin: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const CustomInputPas = React.forwardRef(function CustomInput(props, ref) {
  const { slots, ...other } = props;
  return (
    <Input
      slots={{
        root: StyledInputRoot,
        input: StyledInputElementPas,
        ...slots,
      }}
      {...other}
      ref={ref}
    />
  );
});

CustomInput.propTypes = {
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    root: PropTypes.elementType,
    textarea: PropTypes.elementType,
  }),
};

// Select drop down

const StyledButton = styled('button')(
  ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    min-height: calc(1.5em + 22px);
    min-width: 320px;
    padding: 12px;
    border-radius: 12px;
    text-align: left;
    line-height: 1.5;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }
  
    &.${selectClasses.focusVisible} {
      border-color: ${blue[400]};
      outline: 3px solid ${
        theme.palette.mode === 'dark' ? blue[500] : blue[200]
      };
    }
  
    &.${selectClasses.expanded} {
      &::after {
        content: '▴';
      }
    }
  
    &::after {
      content: '▾';
      float: right;
    }
    `
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 320px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    box-shadow: 0px 4px 30px ${
      theme.palette.mode === 'dark' ? grey[900] : grey[200]
    };
    `
);

const StyledOption = styled(Option)(
  ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: default;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &.${optionClasses.selected} {
      background-color: ${
        theme.palette.mode === 'dark' ? blue[900] : blue[100]
      };
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    }
  
    &.${optionClasses.highlighted} {
      background-color: ${
        theme.palette.mode === 'dark' ? grey[800] : grey[100]
      };
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
  
    &.${optionClasses.highlighted}.${optionClasses.selected} {
      background-color: ${
        theme.palette.mode === 'dark' ? blue[900] : blue[100]
      };
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    }
  
    &.${optionClasses.disabled} {
      color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }
  
    &:hover:not(.${optionClasses.disabled}) {
      background-color: ${
        theme.palette.mode === 'dark' ? grey[800] : grey[100]
      };
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
    `
);

const StyledPopper = styled(Popper)`
  z-index: 1;
`;

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const slots = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return <Select {...props} ref={ref} slots={slots} />;
});

export default function AddEdit() {
  const history = useHistory();
  const { pathname } = useLocation();
  const parentUrl = `/${pathname.split('/')[1]}`;

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        background: 'white',
        height: 'full',
        borderRadius: '10px',
        marginBottom: '50px',
      }}
    >
      <Grid
        as="form"
        m="10px"
        templateColumns="auto max-content"
        p="3"
        boxShadow="sm"
      >
        <Grid templateColumns="max-content" gap="2" alignContent="center">
          <Text ml="2" fontSize="lg" color="#0b2e59" fontWeight="bold">
            Create Teacher
          </Text>
        </Grid>
        <Grid>
          <Stack mt="10px" direction="row" spacing="8">
            <Button
              sx={{ height: '42px', mr: '6px' }}
              startIcon={<BiAddToQueue fontSize="1.5rem" />}
              variant="contained"
              onClick={() => {
                history.push(`${parentUrl}/list`);
              }}
            >
              Add
            </Button>
            <Button
              sx={{ height: '42px' }}
              startIcon={<BiAddToQueue fontSize="1.5rem" />}
              variant="contained"
              color="error"
              onClick={() => {
                history.push(`${parentUrl}/list`);
              }}
            >
              Back
            </Button>
          </Stack>
        </Grid>
        <Grid py="2" templateColumns="repeat(3,1fr)" gap="4" px="3">
          <VStack spacing="25" mb="10px" alignItems="start">
            <FormControl required>
              <FormLabel
                sx={{
                  fontSize: '12px',
                  ml: '2px',
                  mb: '4px',
                  color: '#54787d',
                }}
              >
                First Name
              </FormLabel>
              <CustomInput
                aria-label="Demo input"
                placeholder="Please enter first name"
              />
            </FormControl>
            <FormControl required>
              <FormLabel
                sx={{
                  fontSize: '12px',
                  ml: '2px',
                  mb: '4px',
                  color: '#54787d',
                }}
              >
                Last Name
              </FormLabel>
              <CustomInput
                aria-label="Demo input"
                placeholder="Please enter last name"
              />
            </FormControl>
            <FormControl required>
              <FormLabel
                sx={{
                  fontSize: '12px',
                  ml: '2px',
                  mb: '4px',
                  color: '#54787d',
                }}
              >
                ID
              </FormLabel>
              <CustomInput
                aria-label="Demo input"
                placeholder="Please enter ID"
              />
            </FormControl>
            <FormControl required>
              <FormLabel
                sx={{
                  fontSize: '12px',
                  ml: '2px',
                  mb: '4px',
                  color: '#54787d',
                }}
              >
                Email
              </FormLabel>
              <CustomInput
                aria-label="Demo input"
                placeholder="Please enter email"
              />
            </FormControl>{' '}
          </VStack>
          <VStack spacing="25" mb="10px" alignItems="start">
            <FormControl required>
              <FormLabel
                sx={{
                  fontSize: '12px',
                  ml: '2px',
                  mb: '4px',
                  color: '#54787d',
                }}
              >
                Address
              </FormLabel>
              <CustomInput
                aria-label="Demo input"
                placeholder="Please enter address"
              />
            </FormControl>
            <FormControl required>
              <FormLabel
                sx={{
                  fontSize: '12px',
                  ml: '2px',
                  mb: '4px',
                  color: '#54787d',
                }}
              >
                Phone Number
              </FormLabel>
              <CustomInput
                aria-label="Demo input"
                placeholder="Please enter phone number"
              />
            </FormControl>
            <FormControl required>
              <FormLabel
                sx={{
                  fontSize: '12px',
                  ml: '2px',
                  mb: '4px',
                  color: '#54787d',
                  width: '320px',
                }}
              >
                Password
              </FormLabel>
              <CustomInputPas
                placeholder="Please enter password"
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </VStack>
        </Grid>
      </Grid>
    </Box>
  );
}
