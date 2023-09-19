import { Box, Flex, Image } from '@chakra-ui/react';
import { Card, Typography } from '@mui/joy';
import { BiNotepad, BiReceipt, BiUser } from 'react-icons/bi';
import { PieChart, Pie, Cell, Legend, Bar, BarChart } from 'recharts';
import { XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line} from 'recharts';
import image from '../../../../components/asssets';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import axios from 'axios';
import { useEffect } from 'react';

const student = [
  {
    name: 'Generation 13',
    female: 4000,
    male: 2400,
    amt: 2400,
  },
  {
    name: 'Generation 14',
    female: 3000,
    male: 1398,
    amt: 2210,
  },
  {
    name: 'Generation 15',
    female: 2000,
    male: 9800,
    amt: 2290,
  },
  {
    name: 'Generation 16',
    female: 2780,
    male: 3908,
    amt: 2000,
  },
  {
    name: 'Generation 17',
    female: 1890,
    male: 4800,
    amt: 2181,
  },
  {
    name: 'Generation 18',
    female: 2390,
    male: 3800,
    amt: 2500,
  },
  {
    name: 'Generation 19',
    female: 3490,
    male: 4300,
    amt: 2100,
  },
];

const COLORS = ['#0088FE', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const value = [
  {
    name: 'A',
    c1: 3000,
    c2: 2400,
    c2: 1400,
  },
  {
    name: 'B',
    c1: 2000,
    c2: 1000,
    c3: 2210,
  },
  {
    name: 'C',
    c1: 1400,
    c2: 10100,
    c3: 1290,
  },
  {
    name: 'D',
    c1: 3120,
    c2: 4400,
    c3: 1000,
  }
];

export default function List() {

  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState(0);
  const [teacher, setTeacher] = useState(0);
  const [course, setCourse] = useState(0);
  const [girl, setGirl] = useState(0);
  const [boy, setBoy] = useState(0);

  // const handleDisplay = async () => {
  //   const response = axios.get("http://localhost:3000/admin/get/data", { withCredentials: true })
    
  // }
  const data = [
    { name: 'Male', value: boy },
    { name: 'Female', value: girl },
  ];

  useEffect( () => {
    axios.get("http://localhost:3000/admin/get/data", { withCredentials: true })
    .then((result)=>{
      setGirl(result.data.result[0])
      setBoy(result.data.result[1])
      setStudent(result.data.result[2])
      setTeacher(result.data.result[3])
      setCourse(result.data.result[4])
    })
  }, [])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Flex flexDir="column" borderRadius="10px" bg="white" h="full">
      <span style={{margin:'20px', fontSize:'20px'}}>Admin Dashboard</span>
      <Box mt="10px" display="flex" mb="20px" flex="1" overflow="auto">
        {/* total of teacher */}
        <Card
          variant="outlined"
          orientation="horizontal"
          sx={{
            ml: 2,
            mr: 5,
            height: 120,
            width: 310,
            bgcolor: 'tomato',

            gap: 2,
            '&:hover': {
              boxShadow: 'md',
              borderColor: 'neutral.outlinedHoverBorder',
            },
          }}
        >
          <div>
            <Typography
              sx={{ color: 'white', textTransform: 'uppercase' }}
              level="h2"
              fontSize="sm"
              id="card-description"
              mb={0.5}
            >
              Teachers
            </Typography>
            <Typography
              fontSize="40px"
              aria-describedby="card-description"
              mb={1}
            >
              <Box
                display="flex"
                alignItems="center"
                overlay
                underline="none"
                href="#interactive-card"
                sx={{ color: 'white', textTransform: 'uppercase' }}
              >
                <BiUser sx={{ width: '90px' }} />
                <Typography ml="15px">{teacher}</Typography>
              </Box>
            </Typography>
          </div>
        </Card>

        {/* total of student */}
        <Card
          variant="outlined"
          orientation="horizontal"
          sx={{
            mr: 5,
            height: 120,
            width: 310,
            bgcolor: '#005bc5',

            gap: 2,
            '&:hover': {
              boxShadow: 'md',
              borderColor: 'neutral.outlinedHoverBorder',
            },
          }}
        >
          <div>
            <Typography
              sx={{ color: 'white', textTransform: 'uppercase' }}
              level="h2"
              fontSize="sm"
              id="card-description"
              mb={0.5}
            >
              Students
            </Typography>
            <Typography
              fontSize="40px"
              aria-describedby="card-description"
              mb={1}
            >
              <Box
                display="flex"
                alignItems="center"
                overlay
                underline="none"
                href="#interactive-card"
                sx={{ color: 'white', textTransform: 'uppercase' }}
              >
                <BiUser sx={{ width: '90px' }} />
                <Typography ml="15px">{student}</Typography>
              </Box>
            </Typography>
          </div>
        </Card>

        {/* total assignment */}
        <Card
          variant="outlined"
          orientation="horizontal"
          sx={{
            mr: 5,
            height: 120,
            width: 310,
            bgcolor: '#355c7d',

            gap: 2,
            '&:hover': {
              boxShadow: 'md',
              borderColor: 'neutral.outlinedHoverBorder',
            },
          }}
        >
          <div>
            <Typography
              sx={{ color: 'white', textTransform: 'uppercase' }}
              level="h2"
              fontSize="sm"
              id="card-description"
              mb={0.5}
            >
              Courses
            </Typography>
            <Typography
              fontSize="40px"
              aria-describedby="card-description"
              mb={1}
            >
              <Box
                display="flex"
                alignItems="center"
                overlay
                underline="none"
                href="#interactive-card"
                sx={{ color: 'white', textTransform: 'uppercase' }}
              >
                <BiReceipt sx={{ width: '90px' }} />
                <Typography ml="15px">{course}</Typography>
              </Box>
            </Typography>
          </div>
        </Card>

        {/* total session */}
        <Card
          variant="outlined"
          orientation="horizontal"
          sx={{
            mr: 5,
            height: 120,
            width: 310,
            bgcolor: '#fd0a54',

            gap: 2,
            '&:hover': {
              boxShadow: 'md',
              borderColor: 'neutral.outlinedHoverBorder',
            },
          }}
        >
          <div>
            <Typography
              sx={{ color: 'white', textTransform: 'uppercase' }}
              level="h2"
              fontSize="sm"
              id="card-description"
              mb={0.5}
            >
              Sessions
            </Typography>
            <Typography
              fontSize="40px"
              aria-describedby="card-description"
              mb={1}
            >
              <Box
                display="flex"
                alignItems="center"
                overlay
                underline="none"
                href="#interactive-card"
                sx={{ color: 'white', textTransform: 'uppercase' }}
              >
                <BiNotepad sx={{ width: '90px' }} />
                <Typography ml="15px">44</Typography>
              </Box>
            </Typography>
          </div>
        </Card>
      </Box>
      {/* <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar />
        </LocalizationProvider>
      </Box> */}
      <Box ml="10px" mt="30px" flex="1" overflow="auto" display="flex">
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
        </Box>
        <Box style={{padding:'10px',width:'500px',backgroundColor:'#f1f1f1', boxShadow: '1px 1px 50% black', height:'300px',borderRadius:'20px'}}>
          <Typography ml="10px" level="h4">
            Student Gender Diversity
          </Typography>
          <Box display="flex">
            <PieChart width={300} height={300}>
              <Pie
                data={data}
                cx={100}
                cy={100}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
            <Box>
              <Box display="flex">
                <Card
                  variant="outlined"
                  orientation="horizontal"
                  sx={{
                    mt: 5,
                    height: 3,
                    width: 3,
                    ml:-7,
                    bgcolor: '#0088FE',

                    gap: 2,
                    '&:hover': {
                      boxShadow: 'md',
                      borderColor: 'neutral.outlinedHoverBorder',
                    },
                  }}
                ></Card>
                <Typography level="h5" sx={{ ml: '10px', mt: '40px' }}>
                  Male
                </Typography>
                <Typography level="h5" sx={{ ml: '40px', mt: '40px' }}>
                  {boy}
                </Typography>
              </Box>
              <Box display="flex">
                <Card
                  variant="outlined"
                  orientation="horizontal"
                  sx={{
                    mt: 5,
                    height: 3,
                    width: 3,
                    ml:-7,
                    bgcolor: '#FF8042',

                    gap: 2,
                    '&:hover': {
                      boxShadow: 'md',
                      borderColor: 'neutral.outlinedHoverBorder',
                    },
                  }}
                ></Card>
                <Typography level="h5" sx={{ ml: '10px', mt: '40px' }}>
                  Female
                </Typography>
                <Typography level="h5" sx={{ ml: '20px', mt: '40px' }}>
                  {girl}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          <div>
              <LineChart
                  width={500} height={300}
                  data={value}
                  margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                  }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="c1" stroke="red" activeDot={{ r: 12 }} />
                  <Line type="monotone" dataKey="c2" stroke="green" />
              </LineChart>
          </div>
        </Box>
        {/* <Box ml="80px">
          <Typography ml="10px" level="h3">
            Total Students By Generation
          </Typography>
          <Box mt="20px">
            <BarChart
              width={1000}
              height={300}
              data={student}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="male" fill="#8884d8" />
              <Bar dataKey="female" fill="#82ca9d" />
            </BarChart>
          </Box>
        </Box> */}
      </Box>
    </Flex>
  );
}
