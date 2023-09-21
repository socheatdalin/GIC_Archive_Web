import {
    Center,
    Flex,
    Grid,
    IconButton,
    VStack,
    useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import SELECT_OPTIONS from 'react-select';
import Table from '@mui/joy/Table';
import React, { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import {
    HiOutlinePencilAlt,
    HiOutlineTrash,
    FiSearch,
    HiSearch,
} from 'react-icons/hi';
import { MdRemoveRedEye } from 'react-icons/md';
import { visuallyHidden } from '@mui/utils';
import { useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ModalEdit from '@mui/joy/Modal';
import ModalView from '@mui/joy/Modal';
import ModalDelete from '@mui/joy/Modal';

import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalClose,
    Option,
    Select,
    Sheet,
    Typography,
} from '@mui/joy';
// import InfiniteScrollTable from '../../../../components/Tables/InfiniteScrollTable';

function labelDisplayedRows({ from, to, count }) {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'student_id',
        numeric: false,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'gender',
        numeric: true,
        disablePadding: false,
        label: 'Gender',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'Generation',
        numeric: true,
        disablePadding: false,
        label: 'Generation',
    },

    {
        id: 'action',
        numeric: true,
        disablePadding: false,
        label: 'Action',
    },
];

const generations = [
    { value: '22nd', label: '22nd' },
    { value: '23rd', label: '23rd' },
    { value: '24th', label: '24th' },
    { value: '25th', label: '25th' },
    { value: '26th', label: '26th' },
];

const gender = [
    { value: 'F', label: 'Female' },
    { value: 'M', label: 'Male' },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <thead style={{ backgroundColor: 'tomato' }}>
            <tr>
                {headCells.map((headCell) => {
                    const active = orderBy === headCell.id;
                    return (
                        <th
                            style={{
                                textAlign: 'center',
                                backgroundColor: '#23395d',
                                color: 'white',
                                width: '100%',
                            }}
                            key={headCell.id}
                            aria-sort={
                                active
                                    ? { asc: 'ascending', desc: 'descending' }[order]
                                    : undefined
                            }
                        >
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <Link
                                underline="none"
                                color="neutral"
                                textColor={active ? 'primary.plainColor' : undefined}
                                component="button"
                                onClick={createSortHandler(headCell.id)}
                                fontWeight="lg"
                                startDecorator={
                                    headCell.numeric ? (
                                        <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                                    ) : null
                                }
                                endDecorator={
                                    !headCell.numeric ? (
                                        <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                                    ) : null
                                }
                                sx={{
                                    '& svg': {
                                        transition: '0.2s',
                                        transform:
                                            active && order === 'desc'
                                                ? 'rotate(0deg)'
                                                : 'rotate(180deg)',
                                    },
                                    '&:hover': { '& svg': { opacity: 1 } },
                                }}
                            >
                                {headCell.label}
                                {active ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc'
                                            ? 'sorted descending'
                                            : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </Link>
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

var countSearch = 0;

export default function List() {
    var [student, setStudent] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openView, setOpenView] = React.useState(false);
    const [inputFirstname, setInputFirstName] = React.useState('');
    const [inputLastname, setInputLastName] = React.useState('');
    const [inputName, setInputName] = React.useState('');
    const [inputGender, setInputGender] = React.useState('');
    const [inputEmail, setInputEmail] = React.useState('');
    const [inputPassword, setInputPassword] = React.useState('');
    const [inputGeneration, setInputGeneration] = React.useState('');
    const [inputID, setInputID] = React.useState('');
    const [oldID, set_oldID] = React.useState('');
    const [First_Name, setFirstName] = React.useState('');
    const [Last_Name, setLastName] = React.useState('');
    const [Name, setName] = React.useState('');
    const [Gender, setGender] = React.useState('');
    const [RoleId, setRoleId] = React.useState('');
    const [Email, setEmail] = React.useState('');
    const [Generation1, setGeneration1] = React.useState('');
    const [ID, setID] = React.useState('');
    const [Password, setPassword] = React.useState('old');
    const [Photo, setPhoto] = React.useState('');
    const [inputPhoto, setInputPhoto] = React.useState('');

    const [openDelete, setOpenDelete] = React.useState(false);
    const [deleteID, setDeleteID] = React.useState('');
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };
    const rows = student;

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [, setFilter] = useState({ searchText: '' });
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
    const onDeleteModalOpen = async (teacher_id) => {
        setDeleteID(teacher_id);
        setOpenDelete(true);
    };
    const handleDelete = async () => {
        axios
            .post('http://localhost:3001/student/delete/' + deleteID)
            .then((result) => {
                window.location.replace('/home/student/list');
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        students();
    }, []);


    const handleSelectGender = async (event) => {
        setInputGender(event);
    };

    const handleSelectGeneration = (e) => {
        setInputGeneration(e);
        // handleSort(inputGeneration, e.value);
    };

    const handleInputPhoto = async (e) => {
        setInputPhoto(e.target.files[0]);
    };

    const handleInputName = async (e) => {
        setInputName(e.target.value);
    };
    const handleInputFirstName = async (e) => {
        setInputFirstName(e.target.value);
    };
    const handleInputLastName = async (e) => {
        setInputLastName(e.target.value);
    };
    const handleInputID = async (e) => {
        setInputID(e.target.value);
    };

    const handleInputEmail = async (e) => {
        setInputEmail(e.target.value);
    };

    const handleInputPassword = async (e) => {
        setInputPassword(e.target.value);
    };
    const handleFirstName = async (e) => {
        setFirstName(e.target.value);
    };
    const handleLastName = async (e) => {
        setLastName(e.target.value);
    };
    const handleName = async (e) => {
        setName(e.target.value);
    };

    const handleGender = async (event) => {
        setGender(event.value);
    };

    const handleID = async (e) => {
        setID(e.target.value);
    };

    const handleEmail = async (e) => {
        setEmail(e.target.value);
    };
    const handleRoleId = async (e) => {
        setRoleId(e.target.value);
    };

    const handlePassword = async (e) => {
        setPassword(e.target.value);
    };

    const handleGeneration = (e) => {
        setGeneration1(e.value);
    };
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('username', inputName);
        formData.append('email', inputEmail);
        formData.append('first_name', inputFirstname);
        formData.append('last_name', inputLastname);
        formData.append('password', inputPassword);
        formData.append('gender', inputGender.value);
        formData.append('generation', inputGeneration.value);
        formData.append('image', inputPhoto);
        console.log(formData.get('image'));
        axios
            .post('http://localhost:3001/signup/student/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((result) => {
                console.log(result);
                window.location.replace('/home/student/list');
            })
            .catch((error) => console.log(error));
    };

    const handleView = async (student_id) => {
        await axios
            .get('http://localhost:3001/student/' + student_id)
            .then((result) => {
                // setAddress(result.data[0].address)
                setEmail(result.data[0].email);
                setName(result.data[0].username);
                setID(result.data[0].student_id);
                setGender(result.data[0].gender);
                setInputFirstName(result.data[0].first_name);
                setInputLastName(result.data[0].last_name);
                setInputPhoto(result.data[0].filepath);
                setInputGeneration(result.data[0].generation);
            })
            .catch((error) => console.log(error));
        setOpenView(true);
    };

    const handleEdit = async (student_id) => {
        await axios
            .get('http://localhost:3001/displayOne/student/' + student_id)
            .then((result) => {
                setEmail(result.data[0].email);
                setName(result.data[0].name);
                setRoleId(result.data[0].role_id);
                set_oldID(result.data[0].id);
                setGender(result.data[0].gender);
                setGeneration1(result.data[0].generation);
                setPhoto(result.data[0].photo);
            })
            .catch((error) => console.log(error));
        setOpenEdit(true);
    };
    const handleSearch = (e) => {
        axios.post(
            'http://localhost:3001/student/all/generation', { generation: inputGeneration.value },
        )
            .then((result) => {
                setStudent(result.data);
            })
            .catch((error) => console.log(error));
    };
    const handleSubmitEdit = async () => {
        await axios
            .post('http://localhost:3001/student/update/', {
                first_name: First_Name,
                last_name: Last_Name,
                username: Name,
                email: Email,
                student_id: oldID,
                role_id: RoleId,
                password: Password,
                generations: Generation1,
                photo: Photo,
            })
            .then((result) => {
                console.log(Photo);
                setOpenEdit(false);
                window.location.replace('/home/student/list');
            })
            .catch((error) => console.log(error));
    };

    const students = async () => {
        axios
            .get('http://localhost:3001/student/all')
            .then((result) => {
                setStudent(result.data);
                // console.log(result.data.results)
            })
            .catch((error) => console.log(error));
    };


    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };
    // const handleSort = (Generation, group) => {
    //     axios
    //         .post('http://localhost:3000/admin/sort/student', {
    //             Generation: Generation,
    //             // grooup: grooup,
    //         })
    //         .then((result) => {
    //             setStudent(result.data.results);
    //         })
    //         .catch((error) => console.log(error));
    // };
    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event, newValue) => {
        setRowsPerPage(parseInt(newValue.toString(), 10));
        setPage(0);
    };

    const getLabelDisplayedRowsTo = () => {
        if (rows.length === -1) {
            return (page + 1) * rowsPerPage;
        }
        return rowsPerPage === -1
            ? rows.length
            : Math.min(rows.length, (page + 1) * rowsPerPage);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;
    const [searchOpen, setSearchOpen] = useState(false);
    return (
        <Flex flexDir="column" bg="white" borderRadius="10px" h="full">
            {/* Popup */}
            <Box>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    onClose={() => setOpen(false)}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Sheet
                        variant="outlined"
                        sx={{
                            width: 750,
                            height: 440,
                            borderRadius: 'md',
                            p: 3,
                            boxShadow: 'lg',
                        }}
                    >
                        <ModalClose
                            variant="outlined"
                            sx={{
                                top: 'calc(-1/4 * var(--IconButton-size))',
                                right: 'calc(-1/4 * var(--IconButton-size))',
                                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                borderRadius: '50%',
                                bgcolor: 'background.body',
                            }}
                        />
                        <Flex mb="10px" justifyContent="space-between" alignItems="center">
                            <Typography level="h4">Create Student</Typography>
                            <Button
                                onClick={handleSubmit}
                                sx={{ mr: '10px', backgroundColor: '#23395d', color: 'white' }}
                                variant="solid"
                            >
                                Create
                            </Button>
                        </Flex>
                        <Grid templateColumns="repeat(3,1fr)  " gap="2">
                            <VStack spacing="3">
                                <FormControl sx={{ width: '300px' }}>
                                    <FormLabel required>First-Name</FormLabel>
                                    <Input
                                        placeholder="Please enter firstname"
                                        variant="outlined"
                                        color="neutral"
                                        value={inputFirstname}
                                        onChange={handleInputFirstName}
                                    />
                                    <FormLabel required>Last-Name</FormLabel>
                                    <Input
                                        placeholder="Please enter lastname"
                                        variant="outlined"
                                        color="neutral"
                                        value={inputLastname}
                                        onChange={handleInputLastName}
                                    />
                                    <FormLabel required>Username</FormLabel>
                                    <Input
                                        placeholder="Please enter name"
                                        variant="outlined"
                                        color="neutral"
                                        value={inputName}
                                        onChange={handleInputName}
                                    />
                                    <FormLabel required>Gender</FormLabel>
                                    <SELECT_OPTIONS
                                        variant="outlined"
                                        color="neutral"
                                        placeholder="Select gender"
                                        onChange={handleSelectGender}
                                        defaultValue={[gender[6], gender[6]]}
                                        options={gender}
                                    />
                                    <FormLabel required>Email</FormLabel>
                                    <Input
                                        placeholder="Please enter email"
                                        variant="outlined"
                                        color="neutral"
                                        value={inputEmail}
                                        onChange={handleInputEmail}
                                    />
                                </FormControl>
                            </VStack>
                            <VStack spacing="3" ml="40px">
                                <FormControl sx={{ width: '300px' }}>

                                    <FormLabel required>Password</FormLabel>
                                    <Input
                                        startDecorator={<KeyRoundedIcon />}
                                        placeholder="Password"
                                        type="password"
                                        endDecorator={
                                            <IconButton color="neutral">
                                                <VisibilityRoundedIcon />
                                            </IconButton>
                                        }
                                        onChange={handleInputPassword}
                                    />

                                    <FormLabel required>Genertion</FormLabel>
                                    <SELECT_OPTIONS
                                        onChange={handleSelectGeneration}
                                        placeholder="Select Generation"
                                        defaultValue={[generations[6], generations[6]]}
                                        options={generations}
                                    ></SELECT_OPTIONS>
                                    <Grid sx={{ mt: 10 }}>
                                        <input
                                            style={{
                                                marginTop: '20px',
                                                marginBottom: '20px',
                                                marginLeft: '3px',
                                            }}
                                            type="file"
                                            name="image"
                                            onChange={handleInputPhoto}
                                        />
                                    </Grid>
                                </FormControl>
                            </VStack>
                        </Grid>
                    </Sheet>
                </Modal>
            </Box>

            <Box>
                <ModalEdit
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={openEdit}
                    onClose={() => setOpenEdit(false)}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Sheet
                        variant="outlined"
                        sx={{
                            width: 750,
                            height: 500,
                            borderRadius: 'md',
                            p: 3,
                            boxShadow: 'lg',
                        }}
                    >
                        <ModalClose
                            variant="outlined"
                            sx={{
                                top: 'calc(-1/4 * var(--IconButton-size))',
                                right: 'calc(-1/4 * var(--IconButton-size))',
                                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                borderRadius: '50%',
                                color: 'white',
                                bgcolor: '#23395d',
                            }}
                        />
                        <Flex mb="10px" justifyContent="space-between" alignItems="center">
                            <Typography level="h4">Update Student</Typography>
                            <Button
                                onClick={handleSubmitEdit}
                                sx={{ mr: '10px', background: '#23395d' }}
                                variant="solid"
                            >
                                Update
                            </Button>
                        </Flex>
                        <Grid templateColumns="repeat(3,1fr)  " gap="2">
                            <VStack spacing="3">
                                <FormControl sx={{ width: '300px' }}>
                                    <FormLabel required>First-Name</FormLabel>
                                    <Input
                                        placeholder="Please enter first-name"
                                        variant="outlined"
                                        color="neutral"
                                        defaultValue={First_Name}
                                        onChange={handleFirstName}
                                    />
                                    <FormLabel required>Last-Name</FormLabel>
                                    <Input
                                        placeholder="Please enter last-name"
                                        variant="outlined"
                                        color="neutral"
                                        defaultValue={Last_Name}
                                        onChange={handleLastName}
                                    />
                                    <FormLabel required>Name</FormLabel>
                                    <Input
                                        placeholder="Please enter name"
                                        variant="outlined"
                                        color="neutral"
                                        defaultValue={Name}
                                        onChange={handleName}
                                    />
                                    <FormLabel required>ID</FormLabel>
                                    <Input
                                        placeholder="Please enter id"
                                        variant="outlined"
                                        color="neutral"
                                        defaultValue={ID}
                                        onChange={handleID}
                                    />
                                    <FormLabel required>Gender</FormLabel>
                                    <SELECT_OPTIONS
                                        variant="outlined"
                                        color="neutral"
                                        placeholder="Select gender"
                                        onChange={handleGender}
                                        defaultValue={[{ label: Gender, value: Gender }]}
                                        options={gender}
                                    />
                                    <FormLabel required>Email</FormLabel>
                                    <Input
                                        placeholder="Please enter email"
                                        variant="outlined"
                                        color="neutral"
                                        defaultValue={Email}
                                        onChange={handleEmail}
                                    />
                                </FormControl>
                            </VStack>
                            <VStack spacing="3" ml="40px">
                                <FormControl sx={{ width: '300px' }}>
                                    <FormLabel required>Role_id</FormLabel>
                                    <Input
                                        placeholder="Please enter your role_id"
                                        variant="outlined"
                                        color="neutral"
                                        defaultValue={RoleId}
                                        onChange={handleRoleId}
                                    />
                                    <FormLabel required>Password</FormLabel>
                                    <Input
                                        startDecorator={<KeyRoundedIcon />}
                                        placeholder="Password"
                                        type="password"
                                        endDecorator={
                                            <IconButton color="neutral">
                                                <VisibilityRoundedIcon />
                                            </IconButton>
                                        }
                                        onChange={handlePassword}
                                    />
                                    <FormLabel required>Generation</FormLabel>
                                    <SELECT_OPTIONS
                                        onChange={handleGeneration}
                                        placeholder="Select Generation"
                                        defaultValue={[generations[10], generations[10]]}
                                        options={generations}
                                    ></SELECT_OPTIONS>
                                    <Grid sx={{ mt: 10 }}>
                                        <input
                                            style={{
                                                marginTop: '20px',
                                                marginBottom: '20px',
                                                marginLeft: '3px',
                                            }}
                                            type="file"

                                        />
                                    </Grid>
                                </FormControl>
                            </VStack>
                        </Grid>
                    </Sheet>
                </ModalEdit>
            </Box>

            <Box>
                <ModalView
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={openView}
                    onClose={() => setOpenView(false)}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Sheet
                        variant="outlined"
                        sx={{
                            width: 600,
                            height: 350,
                            margiTop: -30,
                            borderRadius: 'md',
                            p: 3,
                            boxShadow: 'lg',
                            bgcolor: 'white',
                        }}
                    >
                        <ModalClose
                            variant="outlined"
                            sx={{
                                top: 'calc(-1/4 * var(--IconButton-size))',
                                right: 'calc(-1/4 * var(--IconButton-size))',
                                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                borderRadius: '50%',
                                bgcolor: '#23395d',
                                color: 'white',
                            }}
                        />
                        <Flex mb="10px" justifyContent="space-between" alignItems="center">
                            <Typography level="h4">View Student</Typography>
                        </Flex>
                        <Grid templateColumns="repeat(2,1fr)  " gap="1">
                            <VStack spacing="1">
                                <span style={{ marginLeft: '50px', marginTop: '20px', width: 200, height: 200, border: '1px  solid #23395d', borderRadius: '3px', }}>
                                    <img style={{ width: '100%', height: '100%' }} src={`http://localhost:3001/static/${inputPhoto}`} />
                                </span>
                            </VStack>
                            <VStack>
                                <div style={{ paddingLeft: '40px', paddingTop: '40px', width: 320, height: 240, borderRadius: '3px' }}>
                                    <div style={{ marginTop: '10px' }}>
                                        <span><b>Name : </b></span>
                                        <span style={{ marginLeft: '33px', color: '#517388' }}>{Name}</span>
                                    </div>
                                    <div style={{ marginTop: '10px' }}>
                                        <span><b>ID  : </b></span>
                                        <span style={{ marginLeft: '68px', color: '#517388' }}>{ID}</span>
                                    </div>
                                    <div style={{ marginTop: '10px' }}>
                                        <span><b>Gender : </b></span>
                                        <span style={{ marginLeft: '33px', color: '#517388' }}>{Gender}</span>
                                    </div>
                                    <div style={{ marginTop: '10px' }}>
                                        <span><b>Email  : </b></span>
                                        <span style={{ marginLeft: '48px', color: '#517388' }}>{Email}</span>
                                    </div>
                                </div>
                            </VStack>
                        </Grid>
                    </Sheet>
                </ModalView>
            </Box>

            <ModalDelete
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        width: 350,
                        height: 170,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                        marginTop: '-100',
                    }}
                >
                    <Flex
                        style={{
                            marginTop: '20px',
                            justifyContent: 'space-between',
                            textAlign: 'center',
                            margin: 'auto',
                            alignItems: 'center',
                        }}
                    >
                        <p> Are you sure you want to delete this student?</p>
                    </Flex>
                    <div
                        style={{
                            justifyConten: 'space-between',
                            textAlign: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            sx={{
                                mr: '10px',
                                mt: '20px',
                                backgroundColor: '#CD3700',
                                color: 'white',
                            }}
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                        <Button
                            sx={{
                                mr: '10px',
                                mt: '20px',
                                backgroundColor: '#23395d',
                                color: 'white',
                            }}
                            onClick={handleCloseDelete}
                            variant="solid"
                        >
                            Cancel
                        </Button>
                    </div>
                </Sheet>
            </ModalDelete>

            <Grid
                as="form"
                templateColumns="auto max-content"
                p="3"
                mb="3"
                boxShadow="sm"
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const formProps = Object.fromEntries(formData);
                    setFilter((prev) => ({
                        ...prev,
                        searchText: formProps.searchText,
                    }));
                }}
            >
                <Box
                    borderRadius="8px"
                    mt="10px"
                    h="60px"
                    display="flex"
                    flexDir="row"
                    justifyContent="space-between"
                >
                    <Flex
                        width="100%"
                        ml="10px"
                        variant="standard"
                        templateColumns="15vw max-content"
                        gap="4"
                    >
                        <FormControl sx={{ width: '200px', left: '910px', position: "absolute", transition: 'width 3s' }}>
                            <SELECT_OPTIONS
                                onChange={handleSelectGeneration}
                                placeholder="Select Year"
                                defaultValue={[generations[20], generations[20]]}
                                options={generations}
                            ></SELECT_OPTIONS>
                        </FormControl>
                        <Button
                            onClick={() =>
                                handleSearch()
                            }
                            style={{ backgroundColor: '#23395d' }}
                            sx={{ position: 'absolute', right: '105px' }}
                            variant="solid"
                        >
                            <BiSearchAlt2 style={{ width: '20px', height: '20px' }} />
                        </Button>
                    </Flex>
                    <Grid h="42px" mr="10px">
                        <Button
                            sx={{ width: '75px', backgroundColor: '#23395d' }}
                            variant="solid"
                            onClick={() => setOpen(true)}
                        >
                            Add
                        </Button>
                    </Grid>
                </Box>
            </Grid>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    marginTop: '20px',
                    marginRight: '40px',
                    marginBottom: '20px',
                }}
            >
                <Sheet
                    sx={{
                        mt: '10px',
                        ml: 1,
                        width: '99%',
                        height: '100%',
                        borderRadius: 'sm',
                    }}
                >
                    <Table aria-labelledby="tableTitle" hoverRow>
                        <EnhancedTableHead
                            // numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <tbody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    const isItemSelected = isSelected(row.name);
                                    return (
                                        <tr
                                            onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            spacing={2}
                                            style={{
                                                textAlign: 'center',
                                            }}
                                            key={row.name}
                                        >
                                            <td>{row.student_id}</td>
                                            <td>{row.username}</td>
                                            <td>{row.gender}</td>
                                            <td>{row.email}</td>
                                            <td>{row.generation}</td>
                                            {/* <td>{row.grooup}</td> */}

                                            <td>
                                                <Center spacing={2} gap="6">
                                                    <IconButton
                                                        onClick={() => handleView(row.student_id)}
                                                        variant="ghost"
                                                        color="#78909c"
                                                        cursor="pointer"
                                                        bg="none"
                                                        size="sm"
                                                        border="none"
                                                        icon={
                                                            <MdRemoveRedEye color="#4682B4" size="1.3rem" />
                                                        }
                                                    />

                                                    <IconButton
                                                        variant="ghost"
                                                        cursor="pointer"
                                                        color="#78909c"
                                                        border="none"
                                                        bg="none"
                                                        size="sm"
                                                        icon={
                                                            <HiOutlinePencilAlt
                                                                color="#03A89E"
                                                                size="1.3rem"
                                                            />
                                                        }
                                                        onClick={() => {
                                                            handleEdit(row.id);
                                                        }}
                                                    />
                                                    <IconButton
                                                        onClick={() => {
                                                            onDeleteModalOpen(row.student_id);
                                                        }}
                                                        size="sm"
                                                        variant="ghost"
                                                        cursor="pointer"
                                                        border="none"
                                                        bg="none"
                                                        color="#78909c"
                                                        icon={
                                                            <HiOutlineTrash color="#CD3700" size="1.3rem" />
                                                        }
                                                    />
                                                </Center>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={7}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        <FormControl orientation="horizontal" size="sm">
                                            <FormLabel>Rows per page:</FormLabel>
                                            <Select
                                                onChange={handleChangeRowsPerPage}
                                                value={rowsPerPage}
                                            >
                                                <Option value={5}>5</Option>
                                                <Option value={10}>10</Option>
                                                <Option value={25}>25</Option>
                                            </Select>
                                        </FormControl>
                                        <Typography
                                            textAlign="center"
                                            fontSize="12px"
                                            sx={{ minWidth: 80 }}
                                        >
                                            {labelDisplayedRows({
                                                from: rows.length === 0 ? 0 : page * rowsPerPage + 1,
                                                to: getLabelDisplayedRowsTo(),
                                                count: rows.length === -1 ? -1 : rows.length,
                                            })}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <IconButton
                                                size="sm"
                                                color="neutral"
                                                variant="outlined"
                                                disabled={page === 0}
                                                onClick={() => handleChangePage(page - 1)}
                                                sx={{ bgcolor: 'background.surface' }}
                                            >
                                                <KeyboardArrowLeftIcon />
                                            </IconButton>
                                            <IconButton
                                                size="sm"
                                                color="neutral"
                                                variant="outlined"
                                                disabled={
                                                    rows.length !== -1
                                                        ? page >= Math.ceil(rows.length / rowsPerPage) - 1
                                                        : false
                                                }
                                                onClick={() => handleChangePage(page + 1)}
                                                sx={{ bgcolor: 'background.surface' }}
                                            >
                                                <KeyboardArrowRightIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </td>
                            </tr>
                        </tfoot>
                    </Table>
                </Sheet>
            </Box>
        </Flex >
    );
}
