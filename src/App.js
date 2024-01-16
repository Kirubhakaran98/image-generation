import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import './App.css'; // Import your CSS file

function App() {
    const [name, setName] = useState('');
    const [imageSrc, setImageSrc] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://flask-service-dot-kk-demo-411412.df.r.appspot.com/generate-image', { names: [name] });
            setImageSrc(`data:image/jpeg;base64,${response.data.image}`);
        } catch (error) {
            console.error('Error generating image:', error);
        }
    };

    return (
        <Container className="p-3">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={8}>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter Name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </Col>
                    <Col>
                        <Button variant="primary" type="submit">Generate Image</Button>
                    </Col>
                </Row>
            </Form>
            {imageSrc && (
                <div className="image-container">
                    <img src={imageSrc} alt="Generated" />
                </div>
            )}
        </Container>
    );
}

export default App;
