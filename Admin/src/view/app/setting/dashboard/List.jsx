import { Box, Flex, Image } from '@chakra-ui/react';
import { Card, Typography } from '@mui/joy';
import { BiNotepad, BiReceipt, BiUser } from 'react-icons/bi';
import { PieChart, Pie, Cell, Legend, Bar, BarChart } from 'recharts';
import { XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import axios from 'axios';
import { useEffect } from 'react';



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


export default function List() {


    const [studentCount, setStudent] = useState(0);
    const [teacherCount, setTeacher] = useState();
    const [course, setCourse] = useState(0);
    const [thesis, setThesis] = useState(0);
    const [project, setproject] = useState(0);
    const [girl, setGirl] = useState(0);
    const [boy, setBoy] = useState(0);


    const data = [
        { name: 'Male', value: boy },
        { name: 'Female', value: girl },
    ];
    const CountTeacher = async () => {
        try {
            await axios.get('http://localhost:3001/getTeacherCount')
                .then((result) => {
                    setTeacher(result.data[0].teacherCount);
                })
                .catch(error => console.log(error));
        }
        catch (error) {
            console.error('Error fetching student count:', error);
        }
    }
    const CountStudent = async () => {
        try {
            await axios.get('http://localhost:3001/getStudentCount')
                .then((result) => {
                    setStudent(result.data[0].studentCount);
                })
                .catch(error => console.log(error));
        }
        catch (error) {
            console.error('Error fetching student count:', error);
        }
    }
    const CountCourse = async () => {
        try {
            await axios.get('http://localhost:3001/getCourseCount')
                .then((result) => {
                    setCourse(result.data[0].courseCount);
                })
                .catch(error => console.log(error));
        }
        catch (error) {
            console.error('Error fetching student count:', error);
        }
    }
    const CountThesis = async () => {
        try {
            await axios.get('http://localhost:3001/getThesisCount')
                .then((result) => {
                    setThesis(result.data[0].ThesisCount);
                })
                .catch(error => console.log(error));
        }
        catch (error) {
            console.error('Error fetching student count:', error);
        }
    }
    const CountFemale = async () => {
        try {
            await axios.get('http://localhost:3001/getFemaleCount')
                .then((result) => {
                    setGirl(result.data[0].girl);
                })
                .catch(error => console.log(error));
        }
        catch (error) {
            console.error('Error fetching Femalecount:', error);
        }
    }
    const CountMale = async () => {
        try {
            await axios.get('http://localhost:3001/getMaleCount')
                .then((result) => {
                    setBoy(result.data[0].boy);
                })
                .catch(error => console.log(error));
        }
        catch (error) {
            console.error('Error fetching Male count:', error);
        }
    }
    const CountProject = async () => {
        try {
            await axios.get('http://localhost:3001/getProjectCount')
                .then((result) => {
                    setproject(result.data[0].ProjectCount);
                })
                .catch(error => console.log(error));
        }
        catch (error) {
            console.error('Error fetching Male count:', error);
        }
    }

    useEffect(() => {
        CountTeacher();
        CountStudent();
        CountCourse();
        CountFemale();
        CountMale();
        CountThesis();
        CountProject();
    }, [])


    return (
        <Flex flexDir="column" borderRadius="10px" bg="white" h="full">
            <span style={{ margin: '20px', fontSize: '20px' }}>Admin Dashboard</span>
            <Box mt="10px" display="flex" mb="20px" flex="1" overflow="auto" justifyContent="space-around">
                {/* total of teacher */}
                <Card
                    variant="outlined"
                    orientation="horizontal"
                    sx={{
                        ml: 2,
                        mr: 5,
                        height: 120,
                        width: 310,
                        bgcolor: '#321fdb',

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
                                <Typography ml="15px">{teacherCount}</Typography>
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
                        bgcolor: '#3399ff',

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
                <Card
                    variant="outlined"
                    orientation="horizontal"
                    sx={{
                        mr: 5,
                        height: 120,
                        width: 310,
                        bgcolor: '#f9b116',

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
                            Thesis
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
                                <Typography ml="15px">{thesis}</Typography>
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
                        bgcolor: '#e55352',

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
                                <Typography ml="15px">{studentCount}</Typography>
                            </Box>
                        </Typography>
                    </div>
                </Card>

            </Box>
            <Box ml="10px" mt="30px" flex="5" overflow="auto" display="flex" justifyContent="space-evenly">
                <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar />
                    </LocalizationProvider>
                </Box>
                <Box style={{ padding: '10px', width: '500px', backgroundColor: '#f1f1f1', boxShadow: '1px 1px 50% black', height: '300px', borderRadius: '20px' }}>
                    <Typography ml="50px" level="h4">
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
                                        ml: -7,
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
                                        ml: -7,
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
            </Box>
        </Flex>
    );
}
