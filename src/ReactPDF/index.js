import React, { useState, useEffect } from 'react';
import { Document, Font, Page, Text, View, Image, StyleSheet, PDFViewer } from '@react-pdf/renderer';

import './ReactPDF.css';
import axios from 'axios';

export const ReactPDF = () => {
    return (
        <PDFViewer className='pdfViewer'>
            <MyDocument />
        </PDFViewer>
    )
}

Font.register({
    family: 'Lulo',
    src: `lulo.ttf`,
});

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: '25px'
    },
    nav: {
        flexDirection: 'row',
        fontFamily: 'Lulo',
        color: 'red'
    },
    img: {
        width: 250,
        height: 100
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'center',
        fontSize: 30,
    },
    content: {
        fontSize: 12
    }
});

// Create Document Component
const MyDocument = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios({
                method: 'GET',
                url: '/logo.png',
                responseType: 'arraybuffer',
                headers: {
                    'Accept': 'image/png'
                }
            });

            const buffer = Buffer.from(response.data, 'binary').toString('base64');
            console.log('data-uri', `data:${response.headers['content-type'].toLowerCase()};base64,${buffer}`);
            setData(`data:${response.headers['content-type'].toLowerCase()};base64,${buffer}`);
        };

        fetchData();
    }, []);

    return (
        <Document>
            <Page size='A4' style={styles.page}>
                <View style={styles.nav}>
                    {/* This doesn't work for some reason */}
                    {/* {
                        data && <Image src={{ data, format: 'png' }} style={styles.img} allowDangerousPaths />
                    } */}
                    <Text>LOGO</Text>
                </View>
                <View style={styles.title}>
                    <Text>Title Goes Here</Text>
                </View>
                <View style={styles.content}>
                    <Text>{`
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultricies sem est, maximus dignissim nisl egestas id. Phasellus maximus, mi in convallis dapibus, urna ipsum vestibulum massa, sit amet dictum dolor orci et odio. Vivamus varius lorem sed nunc mollis, nec condimentum quam dapibus. Sed sollicitudin sem sed justo bibendum dictum. Donec non porttitor purus, nec vulputate nibh. Curabitur non ante risus. Nullam condimentum augue quis dui molestie, in maximus nunc suscipit. Donec eu tellus vel magna ornare tristique nec at massa. Etiam sit amet nunc tempor, varius ex nec, pulvinar neque. Nullam lobortis sem ullamcorper porta pretium. Quisque lectus leo, tincidunt ac nibh a, lobortis vulputate enim.

Curabitur tempus, mi et tincidunt consectetur, tellus magna auctor enim, sit amet gravida sem ipsum sed urna. Nulla sollicitudin, nunc ut molestie facilisis, magna lacus efficitur dui, a ornare risus nibh auctor sapien. Donec ut magna ut velit dapibus tincidunt a eu mi. Quisque congue enim ut erat hendrerit sagittis. Donec quis imperdiet tortor. Integer dapibus facilisis lorem, nec facilisis sapien aliquam eget. Integer feugiat consequat elit id pellentesque.

Quisque elementum viverra arcu. Fusce non odio quis purus bibendum luctus commodo ut quam. Curabitur sollicitudin molestie neque, at ultrices ante blandit elementum. Phasellus eget leo et dui posuere pretium vel sed magna. Aliquam condimentum efficitur lacus non auctor. Mauris tristique urna at purus pharetra, ut venenatis sapien blandit. Cras eget odio augue.

Nam pellentesque mauris id dolor vulputate consectetur. Ut finibus sapien non suscipit pellentesque. Vivamus sit amet dignissim leo, sit amet ullamcorper quam. Integer id massa eu leo pretium cursus in quis orci. Nulla at sollicitudin orci. Quisque sapien tellus, fermentum at tristique a, varius sit amet quam. Vivamus eu dignissim metus. Donec interdum sapien nisl, convallis sollicitudin diam rhoncus ac. Curabitur arcu nunc, rutrum eu purus imperdiet, consequat auctor massa.

Aliquam a elementum lorem. Phasellus porta varius lectus vel cursus. Sed elementum pellentesque vestibulum. Maecenas eget ultricies sem, eget fringilla augue. Donec sed neque semper, vestibulum magna ut, ultrices risus. Phasellus laoreet viverra orci. Curabitur blandit elit vel fermentum consequat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                    `}</Text>
                </View>
            </Page>
        </Document>
    )
};