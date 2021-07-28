/*global chrome*/

/**
 * Author: Martin Kululanga
 * Github: https://github.com/m2kdevelopments
 */

//react
import React from "react";
import { useEffect, useState } from 'react';
import { Alert, Button, Col, FormControl, Row } from 'react-bootstrap';
import { HexColorPicker } from "react-colorful";


export default function App() {

    const displaySize = 80;
    const defaultCursor = `https://img.icons8.com/office/${displaySize}/000000/cursor--v1.png`
    const [cursor, setCursor] = useState("");
    const [color, setColor] = useState("#1F1F1F");
    const [size, setSize] = useState(24);
 
    useEffect(() => {
         
        //background script in public folder made this storage
        chrome.storage.sync.get('cursor', (data) => {
            if(data.cursor !== ""){
                setCursor(data.cursor)
                document.body.style.cursor = `url('${data.cursor}'), auto`;
            }else{
                setCursor(defaultCursor)
            }
            
        });  
        
        return () => null
    }, [defaultCursor]);


    const onDefault = () => {
        chrome.storage.sync.set({cursor:''}, () => {
            document.body.style.cursor = ""
            setCursor(defaultCursor)
        });
    }

    const onColorCursor = () => {
        const newCursor = `https://img.icons8.com/ios-glyphs/${size}/${color.replace("#", "")}/cursor--v1.png`;
        chrome.storage.sync.set({cursor:newCursor}, () => {
            document.body.style.cursor = `url('${newCursor}'), auto`;
            setCursor(newCursor)
        });
    }

    function ColorPicker({color, onChange}) {
    
    return <div className="centralise">
                <HexColorPicker color={color} onChange={(color)=>onChange(color)} />
                <FormControl required type="url" width="100" placeholder="Hex Color Code" value={color} onChange={e => onChange(e.target.value)} /> 
            </div>
    }
    

    return <div className="centralise" style={{padding:20, marginTop:20}}>

                <Alert variant="light" className="round dropShadow">
                    <h4><strong>My ColorCursor</strong></h4>
                    <h6>Choose your color cursor</h6>
                    
                    <br/><br/>
                    <h6>Cursor Size</h6>
                    <hr/>
                    <FormControl style={{width:300}} type="range" min={12} max={32} value={size} onChange={(e)=>setSize(parseInt(e.target.value))} className="slider centralise"/>
                    <br/>
                    <Row xs={2}>
                        <Col>
                            <h6>Preview</h6>
                            <hr/>
                            <img src={`https://img.icons8.com/ios-glyphs/${size}/${color.replace("#", "")}/cursor--v1.png`} alt="cursor"/>
                            <Button variant="primary" className="round hover dropShadow" onClick={onColorCursor}>
                                <strong>Use</strong>
                            </Button>
                        </Col>
                        <Col>
                            <ColorPicker color={color} onChange={setColor}/>
                        </Col>
                    </Row>
                    <br/><br/>

                    <Button variant="primary" className="round hover dropShadow" size="lg" onClick={onDefault}>
                        <img src="https://img.icons8.com/ios-filled/24/ffffff/cursor.png" alt="default_cursor" />
                        <strong>Use Normal</strong>
                    </Button>

                </Alert>


            </div>
}

