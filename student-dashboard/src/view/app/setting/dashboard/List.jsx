import { Box, Flex, Image } from '@chakra-ui/react';
import { Card, Typography } from '@mui/joy';
import { BiReceipt, BiUser } from 'react-icons/bi';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { PiProjectorScreenChartLight } from 'react-icons/pi';
import { Pie, Cell, Legend, Bar, BarChart } from 'recharts';
import { PieChart } from '@mui/x-charts/PieChart';
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


    const [course, setCourse] = useState(0);
    const [girl, setGirl] = useState(0);
    const [boy, setBoy] = useState(0);
    const [teacherCount, setTeacher] = useState();

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

    useEffect(() => {
        CountTeacher();
        CountCourse();
        CountFemale();
        CountMale();
    }, [])


    return (
        <Flex flexDir="column" borderRadius="10px" bg="white" h="full">
            <span style={{ margin: '20px', fontSize: '20px', fontWeight: 'bold' }}>Student Dashboard</span>
            <Box mt="10px" display="flex" mb="20px" flex="1" overflow="auto">

                <Card
                    variant="outlined"
                    orientation="horizontal"
                    sx={{
                        ml: 2,
                        mr: 5,
                        height: 120,
                        width: 310,
                        bgcolor: '#1c6dd3',

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
                {/* total of Project */}
                <Card
                    variant="outlined"
                    orientation="horizontal"
                    sx={{
                        ml: 2,
                        mr: 5,
                        height: 120,
                        width: 310,
                        bgcolor: '#42ddfa',

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
                            Projects
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
                                <PiProjectorScreenChartLight sx={{ width: '90px' }} />
                                <Typography ml="15px">1</Typography>
                            </Box>
                        </Typography>
                    </div>
                </Card>

                {/* total of Thesis */}
                <Card
                    variant="outlined"
                    orientation="horizontal"
                    sx={{
                        mr: 5,
                        height: 120,
                        width: 310,
                        bgcolor: '#1cd378',

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
                                <HiOutlineClipboardDocumentList sx={{ width: '90px' }} />
                                <Typography ml="15px">2</Typography>
                                {/* <Typography ml="15px">{studentCount}</Typography> */}
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
                        bgcolor: '#fa42bb',

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


            </Box>

            <Box ml="10px" mt="30px" flex="1" overflow="auto" display="flex">
                <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar />
                    </LocalizationProvider>
                </Box>

                <Box style={{ padding: '10px', marginLeft: "350px", width: '500px', backgroundColor: '#f1f1f1', boxShadow: '1px 1px 50% black', height: '300px', borderRadius: '20px' }}>
                    <Typography ml="10px" level="h4">
                        Study Diversity
                    </Typography>
                    <Box display="flex">
                        {/* <PieChart width={300} height={300}>
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
                        </PieChart> */}
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 10, label: 'series A' },
                                        { id: 1, value: 15, label: 'series B' },
                                        { id: 2, value: 20, label: 'series C' },
                                    ],
                                },
                            ]}
                            width={400}
                            height={200}
                        />
                        <Box>
                            {/* <Box display="flex">
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
                            </Box> */}
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Flex>
    );
}
