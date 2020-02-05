import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

export const FileSaver = () => {
    const [blobData, setBlobData] = useState(null);
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios({
                method: 'GET',
                url: '/sample.pdf',
                responseType: 'arraybuffer',
                headers: {
                    'Accept': 'application/pdf'
                }
            });

            setBlobData(
                new Blob([response.data],
                { type: "application/pdf;charset=utf-8" })
            );
        };

        fetchData();
    }, []);


    const downloadFile = () => {
        saveAs(blobData, fileName || 'downloaded-example.pdf', {})
    }
    
    return (
        <>
            <p style={{ fontFamily: 'sans-serif' }}>Enter name of file and click download to initiate axios request and download</p>
            <form onSubmit={downloadFile}>
                <input
                    type='text'
                    onChange={(e) => setFileName(e.target.value)}
                    value={fileName}
                    placeholder='Enter filename'
                />
                <button type='submit'>Download file</button>
            </form>
        </>
    )
}