import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedBookId: '',
        scannedStudentId:'',
        buttonState: 'normal'
      }
    }

    getCameraPermissions = async (id) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: id,
        scanned: false
      });
    }

    
    handleBarCodeScanned = async({type, data})=>{
        const {buttonState} = this.state
  
        if(buttonState==="clicked"){
          this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal'
          });
        }
        else if(buttonState==="normal"){
          this.setState({
            scanned: true,
            scannedData: '',
            buttonState: 'normal'
          });
        }
        
      }
  
      render() {
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
  
        if (buttonState !== "normal" && hasCameraPermissions){
          return(
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          );
        }
        <View>

        <TouchableOpacity>
          onPress={this.getCameraPermissions}
          styles={styles.scanButton}
          title = "Bar code scannner"
          <Text style = {styles.buttonText}> Scan QR Code</Text>
        </TouchableOpacity>
             </View>
    }
    } 

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        },
        displayText:{
          fontSize: 15,
          textDecorationLine: 'underline'
        },
        scanButton:{
          backgroundColor: '#2196F3',
          padding: 10,
          margin: 10
        },
        buttonText:{
          fontSize: 15,
          textAlign: 'center',
        },
        scanButton:{
          backgroundColor: '#66BB6A',
          width: 50,
          borderWidth: 1.5,
          borderLeftWidth: 0
        }
      });