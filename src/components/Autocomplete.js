// import React, { useState, useEffect } from 'react';
// import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';



// const Autocomplete = ({ apiKey, currentAddress, onSelect }) => {
//   const [query, setQuery] = useState(currentAddress);
//   const [predictions, setPredictions] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     setQuery(currentAddress);
//   }, [currentAddress]);

//   useEffect(() => {
//     if (query && query !== currentAddress) {
//       setError(''); 
//       fetchPredictions();
//     } else {
//       setPredictions([]);
//     }
//   }, [query]);

//   const fetchPredictions = async (text) => {
//     try {
//       const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${text}`;
//       // console.log('Fetching predictions for URL:', autocompleteUrl);

//       const response = await fetch(autocompleteUrl);
//       const data = await response.json();
//       // console.log('Predictions response data:', data);

//       if (data.predictions) {
//         setPredictions(data.predictions);
//       } else {
//         setPredictions([]);
//       }
//     } catch (error) {
//       console.error('Error fetching predictions:', error);
//     }
//   };

//   const handleSelectPrediction = (prediction) => {
//     setQuery(prediction.description); // Update input value with selected prediction
//     onSelect(prediction); // Pass the prediction to the parent component
//     setPredictions([]); // Clear predictions list
//   };
//   const handleInputChange = (text) => {
//     setQuery(text);
//     onSelect({ description: text }); 
//     if (text.trim() === '') {
//       setError('Please enter your address');
//       setPredictions([]);

//     } else {
//       setError('');
//     }
    
//     if (text.trim().length > 3) {
//       fetchPredictions(text);
//     }
//   };
  

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={[styles.input, error ? styles.inputError : null]}
//         placeholder="Enter Location"
//         value={query}
//         placeholderTextColor="#888"
//         onChangeText={handleInputChange}
//       />
//       {error ? <Text style={styles.errorText}>{error}</Text> : null}
//       {predictions.length > 0 && (
//         <FlatList
//           style={styles.predictionsContainer}
//           data={predictions}
//           keyExtractor={(item) => item.place_id}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.predictionItem}
//               onPress={() => handleSelectPrediction(item)}
//             >
//               <Text>{item.description}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop:30,
//     marginHorizontal:25
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#888',
//     borderRadius: 5,
//     paddingHorizontal: 15,
//     backgroundColor: '#fff', 
//     color: '#000', 
//   },
//   predictionsContainer: {
//     backgroundColor:'grey',
//     color:'#fff'
//   },
//   row:{
//   },
//   predictionItem: {
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     color:'#fff'
//   },
//   inputError: {
//     borderColor: 'red',
//   },
//   errorText: {
//     color: 'red',
    
//   },
// });

// export default Autocomplete;

// export const Autoupdate = ({ apiKey, currentAddress, onSelect }) => {
//   const [query, setQuery] = useState(currentAddress);
//   const [predictions, setPredictions] = useState([]);
//   const [error, setError] = useState(null); // State to hold error information

//   useEffect(() => {
//     if (query?.length > 2 && query !== currentAddress) {
//       fetchPredictions();
//     } else {
//       setPredictions([]);
//     }
//     if(query ===''){
//       setPredictions([]);
//       setQuery('');
//       // setError('Please enter address');

//     }
//   }, [query, currentAddress]);

//   const fetchPredictions = () => {
//     const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${query}`;

//     fetch(autocompleteUrl)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch predictions');
//         }
//         return response.json();
//       })
//       .then(data => {
//         if (data.predictions && data.predictions.length > 0) {
//           setPredictions(data.predictions);
//           setError(null); 
//         } else {
//           setPredictions([]);
//           setError('No predictions found');
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching predictions:', error);
//         setError('Failed to fetch predictions');
//       });
//   };

//   const handleSelectPrediction = prediction => {
//     setQuery(prediction.description); // Update input value with selected prediction
//     onSelect(prediction.description);
//     setPredictions([]);
//     setError('');

//   };
//   const handleSubmit = () => {
//     // if (query==='') {
//     //   setError('Please enter a location');
//     //   return;
//     // }
//     // Here you can perform any action when the user submits the query
//     // For example, you might want to fetch predictions again or perform some other action
//     fetchPredictions();
//   };
//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter location *"
//         value={query}
//         placeholderTextColor="#888"
//         onChangeText={setQuery}
//         onSubmitEditing={handleSubmit} // Handle submission on enter press

//       />
//       {error && <Text style={styles.errorText}>{error}</Text>}
//       {predictions.length === 0 && !error && (
//         <Text style={styles.noResultsText}>No results found</Text>
//       )}
//       <FlatList
//         style={styles.predictionsContainer}
//         data={predictions}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.predictionItem}
//             onPress={() => handleSelectPrediction(item)}
//           >
//             <Text>{item.description}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };



// // export const Autoupdate = ({ apiKey, currentAddress, onSelect,value }) => {
// //   const [query, setQuery] = useState(currentAddress);
// //   const [predictions, setPredictions] = useState([]);
// //   // console.log(value);/

// //   useEffect(() => {
// //     if (query?.length > 2 && query != currentAddress) {
// //       fetchPredictions();
// //     } else {
// //       setPredictions([]);
// //     }
// //   }, [query]);

// //   const fetchPredictions = () => {
// //     const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${query}`;

// //     fetch(autocompleteUrl)
// //       .then(response => response.json())
// //       .then(data => {
// //         if (data.predictions) {
// //           setPredictions(data.predictions);
// //         } else {
// //           setPredictions([]);
// //         }
// //       })
// //       .catch(error => console.error('Error fetching predictions:', error));
// //   };

// //   const handleSelectPrediction = prediction => {
// //     setQuery(prediction.description); // Update input value with selected prediction
// //     // setPredictions([]); // Clear predictions list
// //     onSelect(prediction.description);
// //     setPredictions([]);
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Enter location * "
// //         value={query}
// //         placeholderTextColor="#888"
// //         onChangeText={setQuery}
// //       />
// //       <FlatList
// //         style={styles.predictionsContainer}
// //         data={predictions}
// //         keyExtractor={item => item.id}
// //         renderItem={({ item }) => (
// //           <TouchableOpacity
// //             style={styles.predictionItem}
// //             onPress={() => handleSelectPrediction(item)}
// //           >
// //             <Text>{item.description}</Text>
// //           </TouchableOpacity>
// //         )}
// //       />
// //     </View>
// //   );
// // };









// // import React, { useState, useEffect } from 'react';
// // import { View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native';

// // export const Auto = ({ apiKey, currentAddress, onSelect }) => {
// //   const [query, setQuery] = useState(currentAddress);
// //   const [predictions, setPredictions] = useState([]);

// //   useEffect(() => {
// //     if (query?.length > 2 && query !== currentAddress) {
// //       fetchPredictions();
// //     } else {
// //       setPredictions([]);
// //     }
// //   }, [query]);

// //   const fetchPredictions = () => {
// //     const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${query}`;

// //     fetch(autocompleteUrl)
// //       .then(response => response.json())
// //       .then(data => {
// //         if (data.predictions) {
// //           setPredictions(data.predictions);
// //         } else {
// //           setPredictions([]);
// //         }
// //       })
// //       .catch(error => console.error('Error fetching predictions:', error));
// //   };

// //   const handleSelectPrediction = prediction => {
// //     setQuery(prediction.description); // Update input value with selected prediction
// //     setPredictions([]); // Clear predictions list
// //     onSelect(prediction.description);
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Enter location"
// //         value={query}
// //         placeholderTextColor="#888"
// //         onChangeText={text => setQuery(text)}
// //       />
// //       <FlatList
// //         style={styles.predictionsContainer}
// //         data={predictions}
// //         keyExtractor={item => item.place_id} // Assuming predictions have unique place_id
// //         renderItem={({ item }) => (
// //           <TouchableOpacity
// //             style={styles.predictionItem}
// //             onPress={() => handleSelectPrediction(item)}
// //           >
// //             <Text>{item.description}</Text>
// //           </TouchableOpacity>
// //         )}
// //       />
// //     </View>
// //   );
// // };


// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// //   input: {
// //     height: 50,
// //     borderWidth: 1,
// //     borderColor: '#888',
// //     borderRadius: 5,
// //     paddingHorizontal: 15,
// //     marginBottom: 10,
// //     backgroundColor: '#fff', // Set background color to white
// //     color: '#000', // Set text color to grey
// //   },
// //   predictionsContainer: {
// //     marginTop: 5,
// //     backgroundColor:'grey',
// //     color:'#fff'
// //   },
// //   row:{
// //   },
// //   predictionItem: {
// //     paddingVertical: 10,
// //     paddingHorizontal: 10,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#ccc',
// //     color:'#fff'
// //   },
// // });



// export const Auto = ({ apiKey, currentAddress, onSelect }) => {
//   const [query, setQuery] = useState('');
//   const [predictions, setPredictions] = useState([]);
  
//   useEffect(() => {
//     setQuery(currentAddress);
//   }, [currentAddress]);


//   useEffect(() => {
//     if (query?.length > 2 && query != currentAddress) {
//       fetchPredictions();
//     } else {
//       setPredictions([]);
//     }
//   }, [query]);
  

//   const fetchPredictions = () => {
//     const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${query}`;

//     fetch(autocompleteUrl)
//       .then(response => response.json())
//       .then(data => {
//         if (data.predictions) {
//           setPredictions(data.predictions);
//         } else {
//           setPredictions([]);
//         }
//       })
//       .catch(error => console.error('Error fetching predictions:', error));
//   };

//   const handleSelectPrediction = prediction => {
//     setQuery(prediction.description); // Update input value with selected prediction
//     setPredictions([]); // Clear predictions list
//     onSelect(prediction.description);
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter location * "
//         value={query}
//         placeholderTextColor="#888"
//         onChangeText={setQuery}
//       />
//       <FlatList
//         style={styles.predictionsContainer}
//         data={predictions}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.predictionItem}
//             onPress={() => handleSelectPrediction(item)}
//           >
//             <Text>{item.description}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };


// // export const Auto = ({ apiKey, currentAddress, onSelect }) => {
// //   const [query, setQuery] = useState(currentAddress);
// //   const [predictions, setPredictions] = useState([]);
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     setQuery(currentAddress);
// //   }, [currentAddress]);

// //   useEffect(() => {
// //     if (query && query !== currentAddress) {
// //       setError(''); 
// //       fetchPredictions();
// //     } else {
// //       setPredictions([]);
// //     }
// //   }, [query]);

// //   // const fetchPredictions = async (text) => {
// //   //   try {
// //   //     const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${query}`;
// //   //     console.log('Fetching predictions for URL:', autocompleteUrl);

// //   //     const response = await fetch(autocompleteUrl);
// //   //     const data = await response.json();
// //   //     console.log('Predictions response data:', data);

// //   //     if (data.predictions) {
// //   //       setPredictions(data.predictions);
// //   //     } else {
// //   //       setPredictions([]);
// //   //     }
// //   //   } catch (error) {
// //   //     console.error('Error fetching predictions:', error);
// //   //   }
// //   // };

// //   const fetchPredictions = async (text) => {
// //     try {
// //       const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${text}`;
// //       console.log('Fetching predictions for URL:', autocompleteUrl);
  
// //       const response = await fetch(autocompleteUrl);
// //       const data = await response.json();
// //       console.log('Predictions response data:', data);

  
// //       if (data.predictions) {
// //         setPredictions(data.predictions);
// //       } else {
// //         setPredictions([]);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching predictions:', error);
// //       setError('Error fetching predictions');
// //     }
// //   };

// //   const handleSelectPrediction = (prediction) => {
// //     setQuery(prediction.description); // Update input value with selected prediction
// //     onSelect(prediction); // Pass the prediction to the parent component
// //     setPredictions([]); // Clear predictions list
// //   };
// //   const handleInputChange = (text) => {
// //     setQuery(text);
// //     onSelect({ description: text }); 
// //     if (text.trim() === '') {
// //       setError('Location cannot be empty');
// //       setPredictions([]);

// //     } else {
// //       setError('');
// //     }
    
// //     if (text.trim().length > 3) {
// //       fetchPredictions(text);
// //     }
// //   };
  

// //   return (
// //     <View style={styles.container}>
// //       <TextInput
// //         style={[styles.input, error ? styles.inputError : null]}
// //         placeholder="Enter Location"
// //         value={query}
// //         placeholderTextColor="#888"
// //         onChangeText={handleInputChange}
// //       />
// //       {error ? <Text style={styles.errorText}>{error}</Text> : null}
// //       {predictions.length > 0 && (
// //         <FlatList
// //           style={styles.predictionsContainer}
// //           data={predictions}
// //           keyExtractor={(item) => item.place_id}
// //           renderItem={({ item }) => (
// //             <TouchableOpacity
// //               style={styles.predictionItem}
// //               onPress={() => handleSelectPrediction(item)}
// //             >
// //               <Text>{item.description}</Text>
// //             </TouchableOpacity>
// //           )}
// //         />
// //       )}
// //     </View>
// //   );
// // };

// // export const Auto = ({ apiKey, currentAddress, isUpdate, onSelect }) => {
// //   const [query, setQuery] = useState(isUpdate ? currentAddress : '');
// //   const [predictions, setPredictions] = useState([]);
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     if (isUpdate) {
// //       console.log("Updating query with currentAddress:", currentAddress);
// //       setQuery(currentAddress);
// //     }
// //   }, [isUpdate, currentAddress]);

// //   useEffect(() => {
// //     if (query && query.length > 2 && query !== currentAddress) {
// //       setError('');
// //       fetchPredictions(query);
// //     } else {
// //       setPredictions([]);
// //     }
// //   }, [query]);

// //   const fetchPredictions = async (text) => {
// //     try {
// //       const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${text}`;
// //       console.log('Fetching predictions for URL:', autocompleteUrl);

// //       const response = await fetch(autocompleteUrl);
// //       const data = await response.json();
// //       console.log('Predictions response data:', data);

// //       if (data.predictions) {
// //         // Filter out predictions with "Undefined" in the description
// //         const validPredictions = data.predictions.filter(
// //           prediction => !prediction.description.toLowerCase().includes("undefined")
// //         );
// //         setPredictions(validPredictions);
// //       } else {
// //         setPredictions([]);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching predictions:', error);
// //     }
// //   };

// //   const handleSelectPrediction = (prediction) => {
// //     setQuery(prediction.description); // Update input value with selected prediction
// //     onSelect(prediction); // Pass the prediction to the parent component
// //     setPredictions([]); // Clear predictions list
// //   };

// //   const handleInputChange = (text) => {
// //     setQuery(text);
// //     onSelect({ description: text });
// //     if (text.trim() === '') {
// //       setError('Location cannot be empty');
// //       setPredictions([]);
// //     } else {
// //       setError('');
// //     }

// //     if (text.trim().length > 3) {
// //       fetchPredictions(text);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <TextInput
// //         style={[styles.input, error ? styles.inputError : null]}
// //         placeholder Location"
// //         value={query}
// //         placeholderTextColor="#888"
// //         onChangeText={handleInputChange}
// //       />
// //       {error ? <Text style={styles.errorText}>{error}</Text> : null}
// //       {predictions.length > 0 && (
// //         <FlatList
// //           style={styles.predictionsContainer}
// //           data={predictions}
// //           keyExtractor={(item) => item.place_id}
// //           renderItem={({ item }) => (
// //             <TouchableOpacity
// //               style={styles.predictionItem}
// //               onPress={() => handleSelectPrediction(item)}
// //             >
// //               <Text>{item.description}</Text>
// //             </TouchableOpacity>
// //           )}
// //         />
// //       )}
// //     </View>
// //   );
// // };



import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';



const Autocomplete = ({ apiKey, currentAddress, onSelect }) => {
  const [query, setQuery] = useState(currentAddress);
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setQuery(currentAddress);
  }, [currentAddress]);

  useEffect(() => {
    if (query && query !== currentAddress) {
      setError(''); 
      fetchPredictions();
    } else {
      setPredictions([]);
    }
  }, [query]);

  const fetchPredictions = async (text) => {
    try {
      const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${text}`;
      // console.log('Fetching predictions for URL:', autocompleteUrl);

      const response = await fetch(autocompleteUrl);
      const data = await response.json();
      // console.log('Predictions response data:', data);

      if (data.predictions) {
        setPredictions(data.predictions);
      } else {
        setPredictions([]);
      }
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  };

  const handleSelectPrediction = (prediction) => {
    setQuery(prediction.description); 
    onSelect(prediction); 
    setPredictions([]); 
  };
  const handleInputChange = (text) => {
    setQuery(text);
    onSelect({ description: text }); 
    if (text.trim() === '') {
      setError('Please enter your address');
      setPredictions([]);

    } else {
      setError('');
    }
    
    if (text.trim().length > 3) {
      fetchPredictions(text);
    }
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Enter Location"
        value={query}
        placeholderTextColor="#888"
        onChangeText={handleInputChange}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {predictions.length > 0 && (
        <FlatList
          style={styles.predictionsContainer}
          data={predictions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.predictionItem}
              onPress={() => handleSelectPrediction(item)}
            >
              <Text>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:30,
    marginHorizontal:18
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff', 
    color: '#000', 
  },
  predictionsContainer: {
    backgroundColor:'grey',
    color:'#fff'
  },
  row:{
  },
  predictionItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color:'#fff'
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Autocomplete;


export const Autoupdate = ({ apiKey, currentAddress, onSelect,value }) => {
  const [query, setQuery] = useState(currentAddress);
  const [predictions, setPredictions] = useState([]);
  // console.log(value);

  useEffect(() => {
    if (query?.length > 2 && query != currentAddress) {
      fetchPredictions();
    } else {
      setPredictions([]);
    }
  }, [query]);

  const fetchPredictions = () => {
    const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${query}`;

    fetch(autocompleteUrl)
      .then(response => response.json())
      .then(data => {
        if (data.predictions) {
          setPredictions(data.predictions);
        } else {
          setPredictions([]);
        }
      })
      .catch(error => console.error('Error fetching predictions:', error));
  };

  const handleSelectPrediction = prediction => {
    setQuery(prediction.description); 
    // setPredictions([]); // Clear predictions list
    onSelect(prediction.description);
    setPredictions([]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter location * "
        value={query}
        placeholderTextColor="#888"
        onChangeText={setQuery}
      />
      <FlatList
        style={styles.predictionsContainer}
        data={predictions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.predictionItem}
            onPress={() => handleSelectPrediction(item)}
          >
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};









// import React, { useState, useEffect } from 'react';
// import { View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native';

// export const Auto = ({ apiKey, currentAddress, onSelect }) => {
//   const [query, setQuery] = useState(currentAddress);
//   const [predictions, setPredictions] = useState([]);

//   useEffect(() => {
//     if (query?.length > 2 && query !== currentAddress) {
//       fetchPredictions();
//     } else {
//       setPredictions([]);
//     }
//   }, [query]);

//   const fetchPredictions = () => {
//     const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${query}`;

//     fetch(autocompleteUrl)
//       .then(response => response.json())
//       .then(data => {
//         if (data.predictions) {
//           setPredictions(data.predictions);
//         } else {
//           setPredictions([]);
//         }
//       })
//       .catch(error => console.error('Error fetching predictions:', error));
//   };

//   const handleSelectPrediction = prediction => {
//     setQuery(prediction.description); // Update input value with selected prediction
//     setPredictions([]); // Clear predictions list
//     onSelect(prediction.description);
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter location"
//         value={query}
//         placeholderTextColor="#888"
//         onChangeText={text => setQuery(text)}
//       />
//       <FlatList
//         style={styles.predictionsContainer}
//         data={predictions}
//         keyExtractor={item => item.place_id} // Assuming predictions have unique place_id
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.predictionItem}
//             onPress={() => handleSelectPrediction(item)}
//           >
//             <Text>{item.description}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#888',
//     borderRadius: 5,
//     paddingHorizontal: 15,
//     marginBottom: 10,
//     backgroundColor: '#fff', // Set background color to white
//     color: '#000', // Set text color to grey
//   },
//   predictionsContainer: {
//     marginTop: 5,
//     backgroundColor:'grey',
//     color:'#fff'
//   },
//   row:{
//   },
//   predictionItem: {
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     color:'#fff'
//   },
// });



export const Auto = ({ apiKey, currentAddress, onSelect }) => {
  const [query, setQuery] = useState('');
  const [predictions, setPredictions] = useState([]);
  
  useEffect(() => {
    setQuery(currentAddress);
  }, [currentAddress]);


  useEffect(() => {
    if (query?.length > 2 && query != currentAddress) {
      fetchPredictions();
    } else {
      setPredictions([]);
    }
  }, [query]);
  

  const fetchPredictions = () => {
    const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${query}`;

    fetch(autocompleteUrl)
      .then(response => response.json())
      .then(data => {
        if (data.predictions) {
          setPredictions(data.predictions);
        } else {
          setPredictions([]);
        }
      })
      .catch(error => console.error('Error fetching predictions:', error));
  };

  const handleSelectPrediction = prediction => {
    setQuery(prediction.description); // Update input value with selected prediction
    setPredictions([]); // Clear predictions list
    onSelect(prediction.description);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter location * "
        value={query}
        placeholderTextColor="#888"
        onChangeText={setQuery}
      />
      <FlatList
        style={styles.predictionsContainer}
        data={predictions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.predictionItem}
            onPress={() => handleSelectPrediction(item)}
          >
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};


// export const Auto = ({ apiKey, currentAddress, onSelect }) => {
//   const [query, setQuery] = useState(currentAddress);
//   const [predictions, setPredictions] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     setQuery(currentAddress);
//   }, [currentAddress]);

//   useEffect(() => {
//     if (query && query !== currentAddress) {
//       setError(''); 
//       fetchPredictions();
//     } else {
//       setPredictions([]);
//     }
//   }, [query]);

//   // const fetchPredictions = async (text) => {
//   //   try {
//   //     const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${query}`;
//   //     console.log('Fetching predictions for URL:', autocompleteUrl);

//   //     const response = await fetch(autocompleteUrl);
//   //     const data = await response.json();
//   //     console.log('Predictions response data:', data);

//   //     if (data.predictions) {
//   //       setPredictions(data.predictions);
//   //     } else {
//   //       setPredictions([]);
//   //     }
//   //   } catch (error) {
//   //     console.error('Error fetching predictions:', error);
//   //   }
//   // };

//   const fetchPredictions = async (text) => {
//     try {
//       const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${text}`;
//       console.log('Fetching predictions for URL:', autocompleteUrl);
  
//       const response = await fetch(autocompleteUrl);
//       const data = await response.json();
//       console.log('Predictions response data:', data);

  
//       if (data.predictions) {
//         setPredictions(data.predictions);
//       } else {
//         setPredictions([]);
//       }
//     } catch (error) {
//       console.error('Error fetching predictions:', error);
//       setError('Error fetching predictions');
//     }
//   };

//   const handleSelectPrediction = (prediction) => {
//     setQuery(prediction.description); // Update input value with selected prediction
//     onSelect(prediction); // Pass the prediction to the parent component
//     setPredictions([]); // Clear predictions list
//   };
//   const handleInputChange = (text) => {
//     setQuery(text);
//     onSelect({ description: text }); 
//     if (text.trim() === '') {
//       setError('Location cannot be empty');
//       setPredictions([]);

//     } else {
//       setError('');
//     }
    
//     if (text.trim().length > 3) {
//       fetchPredictions(text);
//     }
//   };
  

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={[styles.input, error ? styles.inputError : null]}
//         placeholder="Enter Location"
//         value={query}
//         placeholderTextColor="#888"
//         onChangeText={handleInputChange}
//       />
//       {error ? <Text style={styles.errorText}>{error}</Text> : null}
//       {predictions.length > 0 && (
//         <FlatList
//           style={styles.predictionsContainer}
//           data={predictions}
//           keyExtractor={(item) => item.place_id}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.predictionItem}
//               onPress={() => handleSelectPrediction(item)}
//             >
//               <Text>{item.description}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// export const Auto = ({ apiKey, currentAddress, isUpdate, onSelect }) => {
//   const [query, setQuery] = useState(isUpdate ? currentAddress : '');
//   const [predictions, setPredictions] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (isUpdate) {
//       console.log("Updating query with currentAddress:", currentAddress);
//       setQuery(currentAddress);
//     }
//   }, [isUpdate, currentAddress]);

//   useEffect(() => {
//     if (query && query.length > 2 && query !== currentAddress) {
//       setError('');
//       fetchPredictions(query);
//     } else {
//       setPredictions([]);
//     }
//   }, [query]);

//   const fetchPredictions = async (text) => {
//     try {
//       const autocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${text}`;
//       console.log('Fetching predictions for URL:', autocompleteUrl);

//       const response = await fetch(autocompleteUrl);
//       const data = await response.json();
//       console.log('Predictions response data:', data);

//       if (data.predictions) {
//         // Filter out predictions with "Undefined" in the description
//         const validPredictions = data.predictions.filter(
//           prediction => !prediction.description.toLowerCase().includes("undefined")
//         );
//         setPredictions(validPredictions);
//       } else {
//         setPredictions([]);
//       }
//     } catch (error) {
//       console.error('Error fetching predictions:', error);
//     }
//   };

//   const handleSelectPrediction = (prediction) => {
//     setQuery(prediction.description); // Update input value with selected prediction
//     onSelect(prediction); // Pass the prediction to the parent component
//     setPredictions([]); // Clear predictions list
//   };

//   const handleInputChange = (text) => {
//     setQuery(text);
//     onSelect({ description: text });
//     if (text.trim() === '') {
//       setError('Location cannot be empty');
//       setPredictions([]);
//     } else {
//       setError('');
//     }

//     if (text.trim().length > 3) {
//       fetchPredictions(text);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={[styles.input, error ? styles.inputError : null]}
//         placeholder Location"
//         value={query}
//         placeholderTextColor="#888"
//         onChangeText={handleInputChange}
//       />
//       {error ? <Text style={styles.errorText}>{error}</Text> : null}
//       {predictions.length > 0 && (
//         <FlatList
//           style={styles.predictionsContainer}
//           data={predictions}
//           keyExtractor={(item) => item.place_id}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.predictionItem}
//               onPress={() => handleSelectPrediction(item)}
//             >
//               <Text>{item.description}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}
//     </View>
//   );
// };



