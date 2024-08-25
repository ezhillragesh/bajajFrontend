import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';  

const App = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = [
        { value: 'numbers', label: 'Numbers' },
        { value: 'alphabets', label: 'Alphabets' },
        { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
    ];

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput);
            const response = await axios.post('https://bajajbackend-z8n9.onrender.com/bfhl', parsedInput);
            setResponseData(response.data);
        } catch (error) {
            alert('Invalid JSON input or error in API call');
        }
    };

    const filteredResponse = () => {
        if (!responseData) return null;
        let filteredData = {};

        selectedOptions.forEach(option => {
            if (responseData[option.value]) {
                filteredData[option.value] = responseData[option.value];
            }
        });

        return filteredData;
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>JSON Input and Multi-Select Dropdown</h1>
            <textarea
                rows="4"
                cols="50"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter your JSON here'
            />
            <br /><br />
            <button onClick={handleSubmit}>Submit</button>

            {responseData && (
                <>
                    <br /><br />
                    <Select
                        isMulti
                        options={options}
                        onChange={setSelectedOptions}
                        value={selectedOptions}
                    />
                    <br />
                    <div>
                        <h3>Filtered Response:</h3>
                        {Object.keys(filteredResponse() || {}).map(key => (
                            <div key={key}>
                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}: </strong>
                                {filteredResponse()[key].join(', ')}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
