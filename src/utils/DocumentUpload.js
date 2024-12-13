import { useState,useCallback } from 'react';
import { View, Button, Alert,SafeAreaView,StatusBar,Text } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, API_VERSION } from '../helpers/enum';




const UploadDocument = () => {
  const [fileResponse, setFileResponse] = useState(null);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // Allow all file types
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);
 
  const uploadDocument = async () => {
    if (!fileResponse) {
      Alert.alert('No document selected');
      return;
    }
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log(accessToken);
 

    const formData = new FormData();
    formData.append('ContractProofDocument', {
      uri: fileResponse.uri,
      name: fileResponse.name,
      type: fileResponse.type,
    });

    
      await fetch(`${API_BASE_URL}api/meter/upload?api-version=${API_VERSION}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: "Bearer " + accessToken,
          // 'X-Content-Type-Options': 'nosniff',
          // 'Content-Security-Policy': "default-src 'self'; script-src 'self'",



  //         'accept: text/plain' \
  // -H 'Authorization: Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXRhbC5wYXRpbDQ3QGdtYWlsLmNvbSIsImNvbXBhbnkiOiIxIiwiZXhwIjoxNzA5MTEwNzQyLCJpc3MiOiJodHRwOi8vT250ZWMuY29tLyIsImF1ZCI6Imh0dHA6Ly9PbnRlYy5jb20vIn0.CQ4JkP0OflmTB9ufaIn1p8obzBFw3hhZrMWp50URQRg' \
  // -H 'Content-Type: multipart/form-data' \
  // -F 'ContractProofDocument=@Drop.pdf;type=application/pdf'


        },
      }).then(response=>response.json())
      .then(data=>console.log(data))
      .catch(error=>console.error('Error: ',error));

    //   if (response.ok) {
    //     Alert.alert('Document uploaded successfully');
    //   } else {
    //     Alert.alert('Failed to upload document');
    //   }
    // } catch (error) {
    //   console.error('Error uploading document:', error);
    //   // Alert.alert('Error uploading document. Please try again later.');
    //   Alert.alert(`Error uploading document: ${error.message}`)
    // }
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      {/* {fileResponse && (
        <Text numberOfLines={1} ellipsizeMode="middle">
          Selected Document: {fileResponse.name}
        </Text>
      )} */}
      {/* {fileResponse.map((file, index) => (
    <Text
        key={index.toString()}
        style={{}}
        numberOfLines={1}
        ellipsizeMode={'middle'}>
        {file?.uri}
    </Text>
))} */}
      
      <Button title="Select Document" onPress={handleDocumentSelection} />
      <Button title="Upload Document" onPress={uploadDocument} />
    </SafeAreaView>
  );
};

export default UploadDocument;

