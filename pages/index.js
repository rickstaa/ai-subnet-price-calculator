// pages/index.js
import { useState, useEffect } from 'react';
import ModelForm from '../components/ModelForm';
import Web3 from 'web3';

export default function Home() {
    const [payment, setPayment] = useState(0);
    const [paymentInEth, setPaymentInEth] = useState(0);
    const [paymentInUsd, setPaymentInUsd] = useState(0);
    const [height, setHeight] = useState(1024);
    const [width, setWidth] = useState(1024);
    const [frames, setFrames] = useState(25);
    const [price, setPrice] = useState(3390842);
    const [modelType, setModelType] = useState('text-to-image');
    const [etherToUsdRate, setEtherToUsdRate] = useState(3632);

    const web3 = new Web3();

    const calculatePayment = () => {
        let outputPixels = height * width;
        if (modelType === 'image-to-video') {
            outputPixels *= frames;
        }
        const paymentInWei = Math.round(outputPixels * price);
        setPayment(paymentInWei);

        const paymentInEther = web3.utils.fromWei(paymentInWei.toString(), 'ether');
        setPaymentInEth(paymentInEther);

        const paymentInUsd = paymentInEther * etherToUsdRate;
        setPaymentInUsd(paymentInUsd);
    };

    useEffect(() => {
        calculatePayment();
    }, [height, width, frames, price, modelType, etherToUsdRate]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1 style={{ fontSize: '50px', marginBottom: "10px" }}>AI subnet Job Price Calculator</h1>
            <ModelForm onCalculate={calculatePayment} height={height} setHeight={setHeight} width={width} setWidth={setWidth} frames={frames} setFrames={setFrames} price={price} setPrice={setPrice} modelType={modelType} setModelType={setModelType} etherToUsdRate={etherToUsdRate} setEtherToUsdRate={setEtherToUsdRate} />
            <hr style={{ width: '80%', marginTop: '20px', marginBottom: '20px' }} />
            <p style={{ paddingTop: '20px', fontSize: '30px' }}>Payment: {payment} Wei</p>
            <p style={{ paddingTop: '20px', fontSize: '30px' }}>Payment: {paymentInEth} Ether</p>
            <p style={{ paddingTop: '20px', fontSize: '30px' }}>Payment: {paymentInUsd} USD</p>
        </div>
    );
}
