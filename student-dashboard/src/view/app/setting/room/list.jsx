// import { useEffect } from 'react';
// import axios from "axios";
// import React, { useState } from 'react';
// import { Page, Text, View, Document, StyleSheet, Image, Line } from '@react-pdf/renderer';
// import { PDFViewer } from '@react-pdf/renderer';
// const styles = StyleSheet.create({
//     page: {
//       flexDirection: 'row',
//       backgroundColor: '#A4E4E4',
//       width: '100%',
//       height: 1000,
//     },
//     section: {
//       margin: 10,
//       padding: 10,
//       flexGrow: 1
//     },
//     image: {
//       width: 70,
//       height: 70,
//       marginBottom: 10,
//       marginLeft: 20
//     },
//     table: { 
//       display: "table", 
//       width: "auto", 
//       borderStyle: "solid", 
//       borderWidth: 1, 
//       borderRightWidth: 0, 
//       borderBottomWidth: 0 
//     }, 
//     tableRow: { 
//       margin: "auto", 
//       flexDirection: "row",
//       position: 'relative'
//     }, 
//     tableCol: { 
//       width: 132, 
//       height: 30,
//       borderStyle: "solid", 
//       borderWidth: 1, 
//       borderLeftWidth: 0, 
//       borderTopWidth: 0
//     }, 
//     tableCell: { 
//       margin: "auto", 
//       marginTop: 5, 
//       fontSize: 10
//     },
//     tableSpan: {
//       width: 132, 
//       height: 80,
//       borderStyle: "solid", 
//       borderWidth: 1, 
//       borderLeftWidth: 0, 
//       borderTopWidth: 0,
//     },
//     tableSpanRow: {
//       margin: "auto", 
//       flexDirection: "row",
//       position: "absolute",
//       top: -60,
//       left: -422.5
//     },
//     marginBottom1: {
//       marginTop: 20
//     },
//     marginBottom2: {
//       marginTop: 40
//     },
//     line: {
//       borderTopWidth: 20,
//       borderTopColor: "lightsteelblue"
//     },
//     courseType: {
//       marginRight:5
//     },
//     courseTitle: { 
//       backgroundColor: "yellow",
//       textDecoration: "underline"
//     },
//     courseRoom: {
//       backgroundColor: "silver",
//     },
//     header: {
//       fontSize: 13,
//       marginTop:5,
//     },
//     title: {
//       margin: 'auto',
//       marginTop: -50,
//       marginBottom: 40,
//       textAlign: 'Center',
//       fontWeight: 'bold'
//     },
//     subTitle: {
//       margin: 'auto',
//       marginTop: -30,
//       marginBottom: 10,
//       textAlign: 'Center'
//     }
//   });
// let data0 = []
// let data1 = []
// var data2 = []
// var test = 'test'
// export default function List() { 
//     const [data3, setData3] = useState([])
//     const day = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Semedi']
//     const time = ['Room','7h00-7h55', '8h00-8h55', '9h10-10h05','10h10-11h05','13h00-13h55','14h00-14h55','15h10-16h05','16h10-17h05']
//     const time2 = ['7:00','9:00','11:00','13:00','15:00','17:00']
//     let room = []
//     let rows = []
//     const [rooms, setRooms] = useState([])
//     const [row,setRow] = useState([])
//     handleData()
//     async function handleData () {
//         console.log('ddd1331')
//         const response = await axios.post("http://localhost:3000/admin/get/roomTable", { withCredentials: true })
//         console.log(response.data.results[0])
                    
//         // setData3(data2)
//     } 
//     const [year,setYear] = React.useState('');
//     const [semester,setSemester] = React.useState('');
//     const [fromYear,setFromYear] = React.useState([]);
//     const [toYear,setToYear] = React.useState([]);
//     const [type11,setType11] = React.useState('');
//     const [type12,setType12] = React.useState('');
//     const [type13,setType13] = React.useState('');
//     const [type14,setType14] = React.useState('');
//     const [type21,setType21] = React.useState('');
//     const [type22,setType22] = React.useState('');
//     const [type23,setType23] = React.useState('');
//     const [type24,setType24] = React.useState('');
//     const [type31,setType31] = React.useState('');
//     const [type32,setType32] = React.useState('');
//     const [type33,setType33] = React.useState('');
//     const [type34,setType34] = React.useState('');
//     const [type41,setType41] = React.useState('');
//     const [type42,setType42] = React.useState('');
//     const [type43,setType43] = React.useState('');
//     const [type44,setType44] = React.useState('');
//     const [type51,setType51] = React.useState('');
//     const [type52,setType52] = React.useState('');
//     const [type53,setType53] = React.useState('');
//     const [type54,setType54] = React.useState('');
//     const [type61,setType61] = React.useState('');
//     const [type62,setType62] = React.useState('');
//     const [type63,setType63] = React.useState('');
//     const [type64,setType64] = React.useState('');
//     const [course11,setCourse11] = React.useState('');
//     const [course12,setCourse12] = React.useState('');
//     const [course13,setCourse13] = React.useState('');
//     const [course14,setCourse14] = React.useState('');
//     const [course21,setCourse21] = React.useState('');
//     const [course22,setCourse22] = React.useState('');
//     const [course23,setCourse23] = React.useState('');
//     const [course24,setCourse24] = React.useState('');
//     const [course31,setCourse31] = React.useState('');
//     const [course32,setCourse32] = React.useState('');
//     const [course33,setCourse33] = React.useState('');
//     const [course34,setCourse34] = React.useState('');
//     const [course41,setCourse41] = React.useState('');
//     const [course42,setCourse42] = React.useState('');
//     const [course43,setCourse43] = React.useState('');
//     const [course44,setCourse44] = React.useState('');
//     const [course51,setCourse51] = React.useState('');
//     const [course52,setCourse52] = React.useState('');
//     const [course53,setCourse53] = React.useState('');
//     const [course54,setCourse54] = React.useState('');
//     const [course61,setCourse61] = React.useState('');
//     const [course62,setCourse62] = React.useState('');
//     const [course63,setCourse63] = React.useState('');
//     const [course64,setCourse64] = React.useState('');
//     const [teacher11,setTeacher11] = React.useState('');
//     const [teacher12,setTeacher12] = React.useState('');
//     const [teacher13,setTeacher13] = React.useState('');
//     const [teacher14,setTeacher14] = React.useState('');
//     const [teacher21,setTeacher21] = React.useState('');
//     const [teacher22,setTeacher22] = React.useState('');
//     const [teacher23,setTeacher23] = React.useState('');
//     const [teacher24,setTeacher24] = React.useState('');
//     const [teacher31,setTeacher31] = React.useState('');
//     const [teacher32,setTeacher32] = React.useState('');
//     const [teacher33,setTeacher33] = React.useState('');
//     const [teacher34,setTeacher34] = React.useState('');
//     const [teacher41,setTeacher41] = React.useState('');
//     const [teacher42,setTeacher42] = React.useState('');
//     const [teacher43,setTeacher43] = React.useState('');
//     const [teacher44,setTeacher44] = React.useState('');
//     const [teacher51,setTeacher51] = React.useState('');
//     const [teacher52,setTeacher52] = React.useState('');
//     const [teacher53,setTeacher53] = React.useState('');
//     const [teacher54,setTeacher54] = React.useState('');
//     const [teacher61,setTeacher61] = React.useState('');
//     const [teacher62,setTeacher62] = React.useState('');
//     const [teacher63,setTeacher63] = React.useState('');
//     const [teacher64,setTeacher64] = React.useState('');
//     const [room11,setRoom11] = React.useState('');
//     const [room12,setRoom12] = React.useState('');
//     const [room13,setRoom13] = React.useState('');
//     const [room14,setRoom14] = React.useState('');
//     const [room21,setRoom21] = React.useState('');
//     const [room22,setRoom22] = React.useState('');
//     const [room23,setRoom23] = React.useState('');
//     const [room24,setRoom24] = React.useState('');
//     const [room31,setRoom31] = React.useState('');
//     const [room32,setRoom32] = React.useState('');
//     const [room33,setRoom33] = React.useState('');
//     const [room34,setRoom34] = React.useState('');
//     const [room41,setRoom41] = React.useState('');
//     const [room42,setRoom42] = React.useState('');
//     const [room43,setRoom43] = React.useState('');
//     const [room44,setRoom44] = React.useState('');
//     const [room51,setRoom51] = React.useState('');
//     const [room52,setRoom52] = React.useState('');
//     const [room53,setRoom53] = React.useState('');
//     const [room54,setRoom54] = React.useState('');
//     const [room61,setRoom61] = React.useState('');
//     const [room62,setRoom62] = React.useState('');
//     const [room63,setRoom63] = React.useState('');
//     const [room64,setRoom64] = React.useState('');
//     const [group,setGroup] = React.useState('');
//     const [inputFromYear, setFromYear1] = useState ('');
//     const [inputToYear, setToYear1] = useState ('');
//     useEffect( () => {
//         axios.get("http://localhost:3000/admin/get/room", { withCredentials: true })
//         .then((result)=>{
//             for (var i=0 ; i<result.data.results.length; i++){
//                 room.push(result.data.results[i].room)
//                 rows.push(result.data.results[i].room)
//             }
//             setRow(room)
//         })
//       }, []) 
//       return(
//         <PDFViewer style={{
//                           width: '100%',
//                           height: '720px',
//                       }}>
//                   <Document>
//                       <Page size="TABLOID" orientation="landscape">
//                           <View style={styles.section}>
//                           <View style={styles.header}>
//                             <Image source="https://upload.wikimedia.org/wikipedia/en/f/f7/Institute_of_Technology_of_Cambodia_logo.png" style={styles.image}/>
//                             <Text style={styles.title}>EMPLOI DU TEMPS {inputFromYear}-{inputToYear}</Text>
//                             <Text style={styles.subTitle}>I{year} Semester {semester} Group {group}</Text>
  
//                           </View>
//                             <View style={styles.table}>
//                                 <View style={styles.tableRow}> 
//                                     {(
//                                         time.map((time) => (
//                                               <View style={[styles.tableCol, {backgroundColor:'lightsteelblue'}]}> 
//                                                   <Text style={styles.tableCell}>{time}</Text> 
//                                               </View>  
//                                         ))
//                                     )}
//                                 </View>
//                               {(  
//                                 row.map((room) => (
//                                   <View style={styles.tableRow}> 
                                    
//                                               <View style={[styles.tableCol, {backgroundColor:'lightsteelblue'}]}> 
//                                                   <Text style={styles.tableCell}>{room}</Text> 
//                                               </View> 
//                                         {(
//                                             time.map((time) => (
//                                                   <View style={[styles.tableCol, {backgroundColor:'lightsteelblue'}]}> 
//                                                       <Text style={styles.tableCell}>{time}</Text> 
//                                                   </View>  
//                                             ))
//                                         )} 
                                            
//                                   </View>
//                                 ))
//                               )}
//                             </View>
//                         </View>
//                       </Page>
//                   </Document>
//               </PDFViewer>
//       )
// }