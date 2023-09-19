
import React, { useState, useEffect } from 'react';
import {
    Button,
    FormControl,
  } from '@mui/joy';
import {
  Center,
  Flex,
  Grid,
  IconButton,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { Page, Text, View, Document, StyleSheet, Image, Line } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import axios from "axios";
import SELECT_OPTIONS from 'react-select';
import { BiSearchAlt2 } from 'react-icons/bi';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#A4E4E4',
    width: '100%',
    height: 1000,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 10,
    marginLeft: 20
  },
  table: { 
    display: "table", 
    width: "auto", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 
  }, 
  tableRow: { 
    margin: "auto", 
    flexDirection: "row",
    position: 'relative'
  }, 
  tableCol: { 
    width: 169, 
    height: 20,
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0
  }, 
  tableCell: { 
    margin: "auto", 
    marginTop: 5, 
    fontSize: 10
  },
  tableSpan: {
    width: 169, 
    height: 80,
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
  },
  tableSpanRow: {
    margin: "auto", 
    flexDirection: "row",
    position: "absolute",
    top: -60,
    left: -422.5
  },
  marginBottom1: {
    marginTop: 20
  },
  marginBottom2: {
    marginTop: 40
  },
  line: {
    borderTopWidth: 20,
    borderTopColor: "lightsteelblue"
  },
  courseType: {
    marginRight:5
  },
  courseTitle: { 
    backgroundColor: "yellow",
    textDecoration: "underline"
  },
  courseRoom: {
    backgroundColor: "silver",
  },
  header: {
    fontSize: 13,
    marginTop:5,
  },
  title: {
    margin: 'auto',
    marginTop: -50,
    marginBottom: 40,
    textAlign: 'Center',
    fontWeight: 'bold'
  },
  subTitle: {
    margin: 'auto',
    marginTop: -30,
    marginBottom: 10,
    textAlign: 'Center'
  }
});

const Years = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' }
]

const semesters = [
  { value: '1', label: '1st semester' },
  { value: '2', label: '2nd semester' },
]

const groups = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' }
]

export default function Schedule() {
  const [year,setYear] = React.useState('');
  const [semester,setSemester] = React.useState('');
  const [fromYear,setFromYear] = React.useState([]);
  const [toYear,setToYear] = React.useState([]);
  const [type11,setType11] = React.useState('');
  const [type12,setType12] = React.useState('');
  const [type13,setType13] = React.useState('');
  const [type14,setType14] = React.useState('');
  const [type21,setType21] = React.useState('');
  const [type22,setType22] = React.useState('');
  const [type23,setType23] = React.useState('');
  const [type24,setType24] = React.useState('');
  const [type31,setType31] = React.useState('');
  const [type32,setType32] = React.useState('');
  const [type33,setType33] = React.useState('');
  const [type34,setType34] = React.useState('');
  const [type41,setType41] = React.useState('');
  const [type42,setType42] = React.useState('');
  const [type43,setType43] = React.useState('');
  const [type44,setType44] = React.useState('');
  const [type51,setType51] = React.useState('');
  const [type52,setType52] = React.useState('');
  const [type53,setType53] = React.useState('');
  const [type54,setType54] = React.useState('');
  const [type61,setType61] = React.useState('');
  const [type62,setType62] = React.useState('');
  const [type63,setType63] = React.useState('');
  const [type64,setType64] = React.useState('');
  const [course11,setCourse11] = React.useState('');
  const [course12,setCourse12] = React.useState('');
  const [course13,setCourse13] = React.useState('');
  const [course14,setCourse14] = React.useState('');
  const [course21,setCourse21] = React.useState('');
  const [course22,setCourse22] = React.useState('');
  const [course23,setCourse23] = React.useState('');
  const [course24,setCourse24] = React.useState('');
  const [course31,setCourse31] = React.useState('');
  const [course32,setCourse32] = React.useState('');
  const [course33,setCourse33] = React.useState('');
  const [course34,setCourse34] = React.useState('');
  const [course41,setCourse41] = React.useState('');
  const [course42,setCourse42] = React.useState('');
  const [course43,setCourse43] = React.useState('');
  const [course44,setCourse44] = React.useState('');
  const [course51,setCourse51] = React.useState('');
  const [course52,setCourse52] = React.useState('');
  const [course53,setCourse53] = React.useState('');
  const [course54,setCourse54] = React.useState('');
  const [course61,setCourse61] = React.useState('');
  const [course62,setCourse62] = React.useState('');
  const [course63,setCourse63] = React.useState('');
  const [course64,setCourse64] = React.useState('');
  const [teacher11,setTeacher11] = React.useState('');
  const [teacher12,setTeacher12] = React.useState('');
  const [teacher13,setTeacher13] = React.useState('');
  const [teacher14,setTeacher14] = React.useState('');
  const [teacher21,setTeacher21] = React.useState('');
  const [teacher22,setTeacher22] = React.useState('');
  const [teacher23,setTeacher23] = React.useState('');
  const [teacher24,setTeacher24] = React.useState('');
  const [teacher31,setTeacher31] = React.useState('');
  const [teacher32,setTeacher32] = React.useState('');
  const [teacher33,setTeacher33] = React.useState('');
  const [teacher34,setTeacher34] = React.useState('');
  const [teacher41,setTeacher41] = React.useState('');
  const [teacher42,setTeacher42] = React.useState('');
  const [teacher43,setTeacher43] = React.useState('');
  const [teacher44,setTeacher44] = React.useState('');
  const [teacher51,setTeacher51] = React.useState('');
  const [teacher52,setTeacher52] = React.useState('');
  const [teacher53,setTeacher53] = React.useState('');
  const [teacher54,setTeacher54] = React.useState('');
  const [teacher61,setTeacher61] = React.useState('');
  const [teacher62,setTeacher62] = React.useState('');
  const [teacher63,setTeacher63] = React.useState('');
  const [teacher64,setTeacher64] = React.useState('');
  const [room11,setRoom11] = React.useState('');
  const [room12,setRoom12] = React.useState('');
  const [room13,setRoom13] = React.useState('');
  const [room14,setRoom14] = React.useState('');
  const [room21,setRoom21] = React.useState('');
  const [room22,setRoom22] = React.useState('');
  const [room23,setRoom23] = React.useState('');
  const [room24,setRoom24] = React.useState('');
  const [room31,setRoom31] = React.useState('');
  const [room32,setRoom32] = React.useState('');
  const [room33,setRoom33] = React.useState('');
  const [room34,setRoom34] = React.useState('');
  const [room41,setRoom41] = React.useState('');
  const [room42,setRoom42] = React.useState('');
  const [room43,setRoom43] = React.useState('');
  const [room44,setRoom44] = React.useState('');
  const [room51,setRoom51] = React.useState('');
  const [room52,setRoom52] = React.useState('');
  const [room53,setRoom53] = React.useState('');
  const [room54,setRoom54] = React.useState('');
  const [room61,setRoom61] = React.useState('');
  const [room62,setRoom62] = React.useState('');
  const [room63,setRoom63] = React.useState('');
  const [room64,setRoom64] = React.useState('');
  const [group,setGroup] = React.useState('');
  const [inputFromYear, setFromYear1] = useState ('');
  const [inputToYear, setToYear1] = useState ('');

  useEffect(() => {
    axios.get("http://localhost:3000/year/schedule",{ withCredentials: true })
    .then((result) => {
      let fromYears = []
      let toYears = []
      // console.log(result.data.result[0])
        for(var i=0 ; i<result.data.result.length ; i++){
          fromYears.push({label :result.data.result[i].FromYear, value:result.data.result[i].FromYear })
          toYears.push({label :result.data.result[i].ToYear, value:result.data.result[i].ToYear })
          setToYear(toYears)
          setFromYear(fromYears)
        }
      })
  }, [])

  const handleSelectYear = (e) => {
    setYear(e.value)
  }
  
  const handleSelectSemester = (e) => {
    setSemester(e.value)
  }

  const handleSelectGroup = (e) => {
    setGroup(e.value)
  }

  const handleFromYear = (e) => {
    setFromYear1(e.value)
  }

  const handleToYear = (e) => {
    setToYear1(e.value)
  }

  // const clearSchedule = async () => {
  //   for (var i=0 ; i<6 ; i++){
  //     for (var j=0 ; j<4 ; j++){
  //       let type = 'setType'+i+j
  //       let course = 'setCourse'+i+j
  //       let teacher = 'setTeacher'+i+j
  //       let room = 'setRoom'+i+j
  //       type('');
  //       course('');
  //       teacher('');
  //       room('')
  //     }
  //   }
  // }

  function handlePDF() {
    return(
      <PDFViewer style={{
                        width: '100%',
                        height: '720px',
                    }}>
                <Document>
                    <Page size="TABLOID" orientation="landscape">
                        <View style={styles.section}>
                        <View style={styles.header}>
                          <Image source="https://upload.wikimedia.org/wikipedia/en/f/f7/Institute_of_Technology_of_Cambodia_logo.png" style={styles.image}/>
                          <Text style={styles.title}>EMPLOI DU TEMPS {inputFromYear}-{inputToYear}</Text>
                          <Text style={styles.subTitle}>I{year} Semester {semester} Group {group}</Text>

                        </View>
                        <View style={styles.table}> 
                          <View style={styles.tableRow}> 
                            <View style={[styles.tableCol, {backgroundColor:'lightsteelblue'}]}> 
                              <Text style={styles.tableCell}>Horairres</Text> 
                            </View> 
                            <View style={[styles.tableCol, {backgroundColor:'rgb(255,160,122)'}]}> 
                              <Text style={styles.tableCell}>Lundi</Text> 
                            </View> 
                            <View style={[styles.tableCol, {backgroundColor:'rgb(255,160,122)'}]}> 
                              <Text style={styles.tableCell}>Mardi</Text> 
                            </View> 
                            <View style={[styles.tableCol, {backgroundColor:'rgb(255,160,122)'}]}> 
                              <Text style={styles.tableCell}>Mercredi</Text> 
                            </View> 
                            <View style={[styles.tableCol, {backgroundColor:'rgb(255,160,122)'}]}> 
                              <Text style={styles.tableCell}>Jeudi</Text> 
                            </View> 
                            <View style={[styles.tableCol, {backgroundColor:'rgb(255,160,122)'}]}> 
                              <Text style={styles.tableCell}>Vendredi</Text> 
                            </View> 
                            <View style={[styles.tableCol, {backgroundColor:'rgb(255,160,122)'}]}> 
                              <Text style={styles.tableCell}>Samedi</Text> 
                            </View> 
                          </View>
                          <View style={styles.tableRow}> 
                            <View style={styles.tableSpan}> 
                              <Text style={[styles.tableCell,{ marginTop:30, fontSize:13}]}>7h00-7h55</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}> {type11} </Text> 
                            </View> 
                            <View style={styles.tableCol}>
                              <Text style={[styles.tableCell , styles.courseType]}>{type21}</Text> 
                            </View>
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type31}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type41}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type51}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type61}</Text> 
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                            <View style={styles.tableSpanRow}>
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course11}</Text> 
                                </View> 
                                <View style={styles.tableCol}>
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course21}</Text> 
                                </View>
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course31}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course41}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course51}</Text> 
                                </View>
                                <View style={styles.tableCol}>
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course61}</Text> 
                                </View>
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                              <View style={[styles.tableSpanRow, styles.marginBottom1]}>
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher11}</Text> 
                                </View> 
                                <View style={styles.tableCol}>
                                  <Text style={styles.tableCell}>{teacher21}</Text> 
                                </View>
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher31}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher41}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher51}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher61}</Text> 
                                </View>
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                          <View style={[styles.tableSpanRow, styles.marginBottom2]}>
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room11}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}>
                                <Text style={[styles.tableCell , styles.courseType]}>{room21}</Text> 
                              </View>
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room31}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room41}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room51}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room61}</Text> 
                              </View> 
                            </View>
                          </View> 
                          <View style={styles.tableRow}> 
                            <View style={styles.tableSpan}> 
                              <Text style={[styles.tableCell,{ marginTop:30, fontSize:13}]}>8h-8h55</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}> {type11} </Text> 
                            </View> 
                            <View style={styles.tableCol}>
                              <Text style={[styles.tableCell , styles.courseType]}>{type21}</Text> 
                            </View>
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type31}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type41}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type51}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type61}</Text> 
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                            <View style={styles.tableSpanRow}>
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course11}</Text> 
                                </View> 
                                <View style={styles.tableCol}>
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course21}</Text> 
                                </View>
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course31}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course41}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course51}</Text> 
                                </View>
                                <View style={styles.tableCol}>
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course61}</Text> 
                                </View>
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                              <View style={[styles.tableSpanRow, styles.marginBottom1]}>
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher11}</Text> 
                                </View> 
                                <View style={styles.tableCol}>
                                  <Text style={styles.tableCell}>{teacher21}</Text> 
                                </View>
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher31}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher41}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher51}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher61}</Text> 
                                </View>
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                          <View style={[styles.tableSpanRow, styles.marginBottom2]}>
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room11}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}>
                                <Text style={[styles.tableCell , styles.courseType]}>{room21}</Text> 
                              </View>
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room31}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room41}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room51}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room61}</Text> 
                              </View> 
                            </View>
                          </View>
                          <View style={styles.tableRow}> 
                            <View style={styles.tableSpan}> 
                              <Text style={[styles.tableCell,{ marginTop:30, fontSize:13}]}>9h10-10h05</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}> {type12} </Text> 
                            </View> 
                            <View style={styles.tableCol}>
                              <Text style={[styles.tableCell , styles.courseType]}>{type22}</Text> 
                            </View>
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type32}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type42}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type52}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type62}</Text> 
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                            <View style={styles.tableSpanRow}>
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course12}</Text> 
                                </View> 
                                <View style={styles.tableCol}>
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course22}</Text> 
                                </View>
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course32}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course42}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course52}</Text> 
                                </View>
                                <View style={styles.tableCol}>
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course62}</Text> 
                                </View>
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                              <View style={[styles.tableSpanRow, styles.marginBottom1]}>
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher12}</Text> 
                                </View> 
                                <View style={styles.tableCol}>
                                  <Text style={styles.tableCell}>{teacher22}</Text> 
                                </View>
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher32}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher42}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher52}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher62}</Text> 
                                </View>
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                          <View style={[styles.tableSpanRow, styles.marginBottom2]}>
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room12}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}>
                                <Text style={[styles.tableCell , styles.courseType]}>{room22}</Text> 
                              </View>
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room32}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room42}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room52}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room62}</Text> 
                              </View> 
                            </View>
                          </View>
                          <View style={styles.tableRow}> 
                            <View style={styles.tableSpan}> 
                              <Text style={[styles.tableCell,{ marginTop:30, fontSize:13}]}>10h10-11h05</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}> {type12} </Text> 
                            </View> 
                            <View style={styles.tableCol}>
                              <Text style={[styles.tableCell , styles.courseType]}>{type22}</Text> 
                            </View>
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type32}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type42}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type52}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type62}</Text> 
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                            <View style={styles.tableSpanRow}>
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course12}</Text> 
                                </View> 
                                <View style={styles.tableCol}>
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course22}</Text> 
                                </View>
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course32}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course42}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course52}</Text> 
                                </View>
                                <View style={styles.tableCol}>
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course62}</Text> 
                                </View>
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                              <View style={[styles.tableSpanRow, styles.marginBottom1]}>
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher12}</Text> 
                                </View> 
                                <View style={styles.tableCol}>
                                  <Text style={styles.tableCell}>{teacher22}</Text> 
                                </View>
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher32}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher42}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher52}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher62}</Text> 
                                </View>
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                          <View style={[styles.tableSpanRow, styles.marginBottom2]}>
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room12}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}>
                                <Text style={[styles.tableCell , styles.courseType]}>{room22}</Text> 
                              </View>
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room32}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room42}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room52}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room62}</Text> 
                              </View> 
                            </View>
                          </View>
                          <View style={[styles.tableRow, styles.line]}> 
                            <View style={styles.tableSpan}> 
                              <Text style={[styles.tableCell,{ marginTop:30, fontSize:13}]}>13h00-13h55</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}> {type13} </Text> 
                            </View> 
                            <View style={styles.tableCol}>
                              <Text style={[styles.tableCell , styles.courseType]}>{type23}</Text> 
                            </View>
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type33}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type43}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type53}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type63}</Text> 
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                            <View style={styles.tableSpanRow}>
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course13}</Text> 
                                </View> 
                                <View style={styles.tableCol}>
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course23}</Text> 
                                </View>
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course33}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course43}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course53}</Text> 
                                </View>
                                <View style={styles.tableCol}>
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course63}</Text> 
                                </View>
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                              <View style={[styles.tableSpanRow, styles.marginBottom1]}>
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher13}</Text> 
                                </View> 
                                <View style={styles.tableCol}>
                                  <Text style={styles.tableCell}>{teacher23}</Text> 
                                </View>
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher33}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher43}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher53}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher63}</Text> 
                                </View>
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                          <View style={[styles.tableSpanRow, styles.marginBottom2]}>
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room13}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}>
                                <Text style={[styles.tableCell , styles.courseType]}>{room23}</Text> 
                              </View>
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room33}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room43}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room53}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room63}</Text> 
                              </View> 
                            </View>
                          </View>
                          <View style={[styles.tableRow]}> 
                            <View style={styles.tableSpan}> 
                              <Text style={[styles.tableCell,{ marginTop:30, fontSize:13}]}>14h00-14h55</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}> {type13} </Text> 
                            </View> 
                            <View style={styles.tableCol}>
                              <Text style={[styles.tableCell , styles.courseType]}>{type23}</Text> 
                            </View>
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type33}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type43}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type53}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type63}</Text> 
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                            <View style={styles.tableSpanRow}>
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course13}</Text> 
                                </View> 
                                <View style={styles.tableCol}>
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course23}</Text> 
                                </View>
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course33}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course43}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course53}</Text> 
                                </View>
                                <View style={styles.tableCol}>
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course63}</Text> 
                                </View>
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                              <View style={[styles.tableSpanRow, styles.marginBottom1]}>
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher13}</Text> 
                                </View> 
                                <View style={styles.tableCol}>
                                  <Text style={styles.tableCell}>{teacher23}</Text> 
                                </View>
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher33}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher43}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher53}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher63}</Text> 
                                </View>
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                          <View style={[styles.tableSpanRow, styles.marginBottom2]}>
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room13}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}>
                                <Text style={[styles.tableCell , styles.courseType]}>{room23}</Text> 
                              </View>
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room33}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room43}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room53}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room63}</Text> 
                              </View> 
                            </View>
                          </View>
                          <View style={styles.tableRow}> 
                            <View style={styles.tableSpan}> 
                              <Text style={[styles.tableCell,{ marginTop:30, fontSize:13}]}>15h10-16h05</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}> {type14} </Text> 
                            </View> 
                            <View style={styles.tableCol}>
                              <Text style={[styles.tableCell , styles.courseType]}>{type24}</Text> 
                            </View>
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type34}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type44}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type54}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type64}</Text> 
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                            <View style={styles.tableSpanRow}>
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course14}</Text> 
                                </View> 
                                <View style={styles.tableCol}>
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course24}</Text> 
                                </View>
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course34}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course44}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course54}</Text> 
                                </View>
                                <View style={styles.tableCol}>
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course64}</Text> 
                                </View>
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                              <View style={[styles.tableSpanRow, styles.marginBottom1]}>
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher14}</Text> 
                                </View> 
                                <View style={styles.tableCol}>
                                  <Text style={styles.tableCell}>{teacher24}</Text> 
                                </View>
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher34}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher44}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher54}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher64}</Text> 
                                </View>
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                          <View style={[styles.tableSpanRow, styles.marginBottom2]}>
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room14}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}>
                                <Text style={[styles.tableCell , styles.courseType]}>{room24}</Text> 
                              </View>
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room34}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room44}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room54}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room64}</Text> 
                              </View> 
                          </View>
                          </View> 
                          <View style={styles.tableRow}> 
                            <View style={styles.tableSpan}> 
                              <Text style={[styles.tableCell,{ marginTop:30, fontSize:13}]}>16h10-17h05</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type14} </Text> 
                            </View> 
                            <View style={styles.tableCol}>
                              <Text style={[styles.tableCell , styles.courseType]}>{type24}</Text> 
                            </View>
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type34}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type44}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type54}</Text> 
                            </View> 
                            <View style={styles.tableCol}> 
                              <Text style={[styles.tableCell , styles.courseType]}>{type64}</Text> 
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                            <View style={styles.tableSpanRow}>
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course14}</Text> 
                                </View> 
                                <View style={styles.tableCol}>
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course24}</Text> 
                                </View>
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course34}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course44}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course54}</Text> 
                                </View>
                                <View style={styles.tableCol}>
                                  <Text style={[styles.tableCell, styles.courseTitle]}>{course64}</Text> 
                                </View>
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                              <View style={[styles.tableSpanRow, styles.marginBottom1]}>
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher14}</Text> 
                                </View> 
                                <View style={styles.tableCol}>
                                  <Text style={styles.tableCell}>{teacher24}</Text> 
                                </View>
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher34}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher44}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher54}</Text> 
                                </View> 
                                <View style={styles.tableCol}> 
                                  <Text style={styles.tableCell}>{teacher64}</Text> 
                                </View>
                            </View> 
                          </View> 
                          <View style={styles.tableRow}> 
                          <View style={[styles.tableSpanRow, styles.marginBottom2]}>
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room14}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}>
                                <Text style={[styles.tableCell , styles.courseType]}>{room24}</Text> 
                              </View>
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room34}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room44}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room54}</Text> 
                              </View> 
                              <View style={[styles.tableCol, styles.courseRoom]}> 
                                <Text style={[styles.tableCell , styles.courseType]}>{room64}</Text> 
                              </View> 
                          </View>
                          </View>
                        </View>
                      </View>
                    </Page>
                </Document>
            </PDFViewer>
    )
  }
  const handleSubmit = async () => {
   
    // if(year===''||semester===''||fromYear===''||toYear===''){
    //   alert("Please all the boxes!!!")
    // }else{
    setType11('');
    setType12('');
    setType13('');
    setType14('');
    setType21('');
    setType22('');
    setType23('');
    setType24('');
    setType31('');
    setType32('');
    setType33('');
    setType34('');
    setType41('');
    setType42('');
    setType43('');
    setType44('');
    setType51('');
    setType52('');
    setType53('');
    setType54('');
    setType61('');
    setType62('');
    setType63('');
    setType64('');
    setCourse11('');
    setCourse12('');
    setCourse13('');
    setCourse14('');
    setCourse21('');
    setCourse22('');
    setCourse23('');
    setCourse24('');
    setCourse31('');
    setCourse32('');
    setCourse33('');
    setCourse34('');
    setCourse41('');
    setCourse42('');
    setCourse43('');
    setCourse44('');
    setCourse51('');
    setCourse52('');
    setCourse53('');
    setCourse54('');
    setCourse61('');
    setCourse62('');
    setCourse63('');
    setCourse64('');
    setTeacher11('');
    setTeacher12('')
    setTeacher13('')
    setTeacher14('')
    setTeacher21('')
    setTeacher22('')
    setTeacher23('')
    setTeacher24('')
    setTeacher31('')
    setTeacher32('')
    setTeacher33('')
    setTeacher34('')
    setTeacher41('')
    setTeacher42('')
    setTeacher43('')
    setTeacher44('')
    setTeacher51('')
    setTeacher52('')
    setTeacher53('')
    setTeacher54('')
    setTeacher61('')
    setTeacher62('')
    setTeacher63('')
    setTeacher64('')
    setRoom11('')
    setRoom12('')
    setRoom13('')
    setRoom14('')
    setRoom21('')
    setRoom22('')
    setRoom23('')
    setRoom24('')
    setRoom31('')
    setRoom32('')
    setRoom33('')
    setRoom34('')
    setRoom41('')
    setRoom42('')
    setRoom43('')
    setRoom44('')
    setRoom51('')
    setRoom52('')
    setRoom53('')
    setRoom54('')
    setRoom61('')
    setRoom62('')
    setRoom63('')
    setRoom64('')
    await axios.post("http://localhost:3000/getSchedule",
    {year: year,from: inputFromYear,to: inputToYear,
    semester:semester,group: group},
    { withCredentials: true })
    .then((result) => {
        console.log(result.data.results)
        for(var j=0 ; j<result.data.results.length; j++){
            if(result.data.results[j].date==='Lundi' && result.data.results[j].startTime==='7:00'){
              setType11(result.data.results[j].type);
              setCourse11(result.data.results[j].course_name);
              setTeacher11(result.data.results[j].name);
              setRoom11(result.data.results[j].room)
            }else if(result.data.results[j].date==='Lundi' && result.data.results[j].startTime==='9:00'){
              setType12(result.data.results[j].type)
              setCourse12(result.data.results[j].course_name);
              setTeacher12(result.data.results[j].name);
              setRoom12(result.data.results[j].room)
            }else if(result.data.results[j].date==='Lundi' && result.data.results[j].startTime==='13:00'){
              setType13(result.data.results[j].type)
              setCourse13(result.data.results[j].course_name);
              setTeacher13(result.data.results[j].name);
              setRoom13(result.data.results[j].room)
            }else if(result.data.results[j].date==='Lundi' && result.data.results[j].startTime==='15:00'){
              setType14(result.data.results[j].type)
              setCourse14(result.data.results[j].course_name);
              setTeacher14(result.data.results[j].name);
              setRoom14(result.data.results[j].room)
            }else if(result.data.results[j].date==='Mardi' && result.data.results[j].startTime==='7:00'){
              setType21(result.data.results[j].type);
              setCourse21(result.data.results[j].course_name);
              setTeacher21(result.data.results[j].name);
              setRoom21(result.data.results[j].room);
            }else if(result.data.results[j].date==='Mardi' && result.data.results[j].startTime==='9:00'){
              setType22(result.data.results[j].type);
              setCourse22(result.data.results[j].course_name);
              setTeacher22(result.data.results[j].name);
              setRoom22(result.data.results[j].room);
            }else if(result.data.results[j].date==='Mardi' && result.data.results[j].startTime==='13:00'){
              setType23(result.data.results[j].type);
              setCourse23(result.data.results[j].course_name);
              setTeacher23(result.data.results[j].name);
              setRoom23(result.data.results[j].room);
            }else if(result.data.results[j].date==='Mardi' && result.data.results[j].startTime==='15:00'){
              setType24(result.data.results[j].type);
              setCourse24(result.data.results[j].course_name);
              setTeacher24(result.data.results[j].name);
              setRoom24(result.data.results[j].room);
            }else if(result.data.results[j].date==='Mercredi' && result.data.results[j].startTime==='7:00'){
              setType31(result.data.results[j].type);
              setCourse31(result.data.results[j].course_name);
              setTeacher31(result.data.results[j].name);
              setRoom31(result.data.results[j].room);
            }else if(result.data.results[j].date==='Mercredi' && result.data.results[j].startTime==='9:00'){
              setType32(result.data.results[j].type);
              setCourse32(result.data.results[j].course_name);
              setTeacher32(result.data.results[j].name);
              setRoom32(result.data.results[j].room);
            }else if(result.data.results[j].date==='Mercredi' && result.data.results[j].startTime==='13:00'){
              setType33(result.data.results[j].type);
              setCourse33(result.data.results[j].course_name);
              setTeacher33(result.data.results[j].name);
              setRoom33(result.data.results[j].room);
            }else if(result.data.results[j].date==='Mercredi' && result.data.results[j].startTime==='15:00'){
              setType34(result.data.results[j].type);
              setCourse34(result.data.results[j].course_name);
              setTeacher34(result.data.results[j].name);
              setRoom34(result.data.results[j].room);
            }else if(result.data.results[j].date==='Jeudi' && result.data.results[j].startTime==='7:00'){
              setType41(result.data.results[j].type);
              setCourse41(result.data.results[j].course_name);
              setTeacher41(result.data.results[j].name);
              setRoom41(result.data.results[j].room);
            }else if(result.data.results[j].date==='Jeudi' && result.data.results[j].startTime==='9:00'){
              setType42(result.data.results[j].type);
              setCourse42(result.data.results[j].course_name);
              setTeacher42(result.data.results[j].name);
              setRoom42(result.data.results[j].room);
            }else if(result.data.results[j].date==='Jeudi' && result.data.results[j].startTime==='13:00'){
              setType43(result.data.results[j].type);
              setCourse43(result.data.results[j].course_name);
              setTeacher43(result.data.results[j].name);
              setRoom43(result.data.results[j].room);
            }else if(result.data.results[j].date==='Jeudi' && result.data.results[j].startTime==='15:00'){
              setType44(result.data.results[j].type);
              setCourse44(result.data.results[j].course_name);
              setTeacher44(result.data.results[j].name);
              setRoom44(result.data.results[j].room);
            }else if(result.data.results[j].date==='Semedi' && result.data.results[j].startTime==='7:00'){
              setType61(result.data.results[j].type);
              setCourse61(result.data.results[j].course_name);
              setTeacher61(result.data.results[j].name);
              setRoom61(result.data.results[j].room);
            }else if(result.data.results[j].date==='Semedi' && result.data.results[j].startTime==='9:00'){
              setType62(result.data.results[j].type);
              setCourse62(result.data.results[j].course_name);
              setTeacher62(result.data.results[j].name);
              setRoom62(result.data.results[j].room);
            }else if(result.data.results[j].date==='Semedi' && result.data.results[j].startTime==='13:00'){
              setType63(result.data.results[j].type);
              setCourse63(result.data.results[j].course_name);
              setTeacher63(result.data.results[j].name);
              setRoom63(result.data.results[j].room);
            }else if(result.data.results[j].date==='Semedi' && result.data.results[j].startTime==='15:00'){
              setType64(result.data.results[j].type);
              setCourse64(result.data.results[j].course_name);
              setTeacher64(result.data.results[j].name);
              setRoom64(result.data.results[j].room);
            }else if(result.data.results[j].date==='Vendredi' && result.data.results[j].startTime==='7:00'){
              setType51(result.data.results[j].type);
              setCourse51(result.data.results[j].course_name);
              setTeacher51(result.data.results[j].name);
              setRoom51(result.data.results[j].room);
            }else if(result.data.results[j].date==='Vendredi' && result.data.results[j].startTime==='9:00'){
              setType52(result.data.results[j].type);
              setCourse52(result.data.results[j].course_name);
              setTeacher52(result.data.results[j].name);
              setRoom52(result.data.results[j].room);
            }else if(result.data.results[j].date==='Vendredi' && result.data.results[j].startTime==='13:00'){
              setType53(result.data.results[j].type);
              setCourse53(result.data.results[j].course_name);
              setTeacher53(result.data.results[j].name);
              setRoom53(result.data.results[j].room);
            }else if(result.data.results[j].date==='Vendredi' && result.data.results[j].startTime==='15:00'){
              setType54(result.data.results[j].type);
              setCourse54(result.data.results[j].course_name);
              setTeacher54(result.data.results[j].name);
              setRoom54(result.data.results[j].room);
            }
         }
      })
    .catch(error => console.log(error));
    }
  
  return(
        <div>
            <Grid templateColumns="repeat(6,1fr)" gap="2" style={{marginRight:"100px"}}>
              <VStack>
                <FormControl sx={{ width: '250px'}}>
                    <SELECT_OPTIONS
                      onChange={handleFromYear}
                      placeholder="From Year"
                      defaultValue={[fromYear[20], fromYear[20]]}
                      options={fromYear}
                    >
                    </SELECT_OPTIONS>
                </FormControl>
              </VStack>
              <VStack>
                <FormControl sx={{ width: '250px'}}>
                    <SELECT_OPTIONS
                      onChange={handleToYear}
                      placeholder="To Year"
                      defaultValue={[toYear[20], toYear[20]]}
                      options={toYear}
                    >
                    </SELECT_OPTIONS>
                </FormControl>
              </VStack>
              <VStack>
              <FormControl sx={{ width: '250px'}}>
                    <SELECT_OPTIONS
                      onChange={handleSelectYear}
                      placeholder="Select Year"
                      defaultValue={[Years[20], Years[20]]}
                      options={Years}
                    >
                    </SELECT_OPTIONS>
              </FormControl>
              </VStack>
              <VStack>
              <FormControl sx={{ width: '250px' }}>
                    <SELECT_OPTIONS
                      onChange={handleSelectSemester}
                      placeholder="Select Semester"
                      defaultValue={[semesters[20], semesters[20]]}
                      options={semesters}
                    >
                    </SELECT_OPTIONS>
              </FormControl>
              </VStack>
              <VStack>
                <FormControl sx={{ width: '150px' }}>
                      <SELECT_OPTIONS
                        onChange={handleSelectGroup}
                        placeholder="Group"
                        defaultValue={[groups[20], groups[20]]}
                        options={groups}
                      >
                      </SELECT_OPTIONS>
                </FormControl>
              </VStack>
              <VStack>
                <Button
                  sx={{ marginLeft: '5px' }}
                  onClick={handleSubmit}
                  variant="solid"
                  style={{position:"absolute", right:'15px',backgroundColor: '#23395d', color:'white'}}
                  // onClick={() => history.push(`${parentUrl}/add`)}
                >
                  <BiSearchAlt2 style={{ width: '20px', height: '20px' }} />
                </Button>
              </VStack>
            </Grid>
            {handlePDF()};
        </div>
    )
}