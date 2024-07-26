// import React, {useState, useEffect, useMemo} from 'react';
// import {
//   StyleSheet,
//   SafeAreaView,
//   Alert,
//   Modal,
//   Pressable,
//   Text,
//   View,
// } from 'react-native';
// import {
//   recognize,
//   ScanRegion,
//   DLRLineResult,
// } from 'vision-camera-dynamsoft-label-recognizer';
// import * as DLR from 'vision-camera-dynamsoft-label-recognizer';
// import {
//   Camera,
//   useCameraDevice,
//   useFrameProcessor,
// } from 'react-native-vision-camera';
// import {runOnJS} from 'react-native-reanimated';
// import Svg, {Image, Circle} from 'react-native-svg';
// import {MRZResultTable} from '../components/MRZResultTable';

// const scanRegion: ScanRegion = {
//   left: 5,
//   top: 40,
//   width: 90,
//   height: 10,
// };

// export default function ScannerScreen({route}) {
//   const [imageData, setImageData] = useState(undefined);
//   const [isActive, setIsActive] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [hasPermission, setHasPermission] = useState(false);
//   const [frameWidth, setFrameWidth] = useState(1280);
//   const [frameHeight, setFrameHeight] = useState(720);
//   const [recognitionResults, setRecognitionResults] = useState([]);
//   const device = useCameraDevice('back');

//   useEffect(() => {
//     (async () => {
//       const status = await Camera.requestCameraPermission();
//       setHasPermission(status === 'granted');
//       const result = await DLR.initLicense('YOUR_LICENSE_KEY_HERE');
//       if (!result) {
//         Alert.alert('Error', 'License invalid');
//       }
//       try {
//         await DLR.useCustomModel({
//           customModelFolder: 'MRZ',
//           customModelFileNames: ['MRZ'],
//         });
//         await DLR.updateTemplate('YOUR_TEMPLATE_JSON_HERE');
//       } catch (error) {
//         console.log(error);
//         Alert.alert('Error', 'Failed to load model.');
//       }
//     })();
//     return () => {
//       setIsActive(false);
//     };
//   }, []);

//   const format = useMemo(() => {
//     const desiredWidth = 1280;
//     const desiredHeight = 720;
//     if (device) {
//       return device.formats.find(
//         format =>
//           format.videoWidth === desiredWidth &&
//           format.videoHeight === desiredHeight,
//       );
//     }
//     return undefined;
//   }, [device?.formats]);

//   const getLineResults = () => {
//     return recognitionResults.map(lineResult => lineResult);
//   };

//   const renderImage = () => {
//     if (imageData) {
//       return (
//         <Svg
//           style={styles.srcImage}
//           viewBox={`0 0 ${frameWidth} ${frameHeight}`}>
//           <Image href={{uri: imageData}} />
//           {charactersSVG('char', 0, 0)}
//         </Svg>
//       );
//     }
//     return null;
//   };

//   const charactersSVG = (prefix, offsetX, offsetY) => {
//     return recognitionResults.flatMap((lineResult, idx) =>
//       lineResult.characterResults.map((characterResult, charIdx) => (
//         <Circle
//           key={`${prefix}-${idx}-${charIdx}`}
//           cx={characterResult.location.points[0].x + offsetX}
//           cy={characterResult.location.points[0].y + offsetY}
//           r={5}
//           stroke="red"
//           strokeWidth="2.5"
//         />
//       )),
//     );
//   };

//   const frameProcessor = useFrameProcessor(frame => {
//     'worklet';
//     const results = recognize(frame, {
//       templateName: 'default',
//       region: scanRegion,
//     });
//     if (results.length > 0) {
//       runOnJS(setRecognitionResults)(results);
//       const imageData = `data:image/jpeg;base64,${frame.toBase64()}`;
//       runOnJS(setImageData)(imageData);
//     }
//   }, []);

//   if (device == null || !hasPermission || !format) {
//     return <View />;
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <Camera
//         style={styles.camera}
//         device={device}
//         format={format}
//         isActive={isActive}
//         frameProcessor={frameProcessor}
//         frameProcessorFps={3}
//       />
//       <View style={styles.textView}>
//         <MRZResultTable items={getLineResults()} />
//       </View>
//       <Modal
//         statusBarTranslucent
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}>
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             {renderImage()}
//             <Pressable
//               style={[styles.button, styles.buttonClose]}
//               onPress={() => setModalVisible(!modalVisible)}>
//               <Text style={styles.textStyle}>Close</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black',
//   },
//   camera: {
//     flex: 1,
//   },
//   textView: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'transparent',
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   buttonOpen: {
//     backgroundColor: '#F194FF',
//   },
//   buttonClose: {
//     backgroundColor: '#2196F3',
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   srcImage: {
//     width: '100%',
//     height: '100%',
//   },
// });
