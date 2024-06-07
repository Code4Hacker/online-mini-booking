import React, { useEffect, useState } from 'react'
import { Tanzania, TopList } from '../raws'
import {  Placeholder,  Tabs } from 'rsuite';
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseURL } from '../requests/baseURL';
import { useNavigate } from 'react-router';





const Dashboard2 = () => {
    const [end, setEnd] = useState("Dar es Salaam");
    const [location, setLocation] = useState("Dodoma");
    const [bookings, setBookings] = useState([]);
    const [bookings2, setBookings2] = useState([]);
    const [seats, setSeats] = useState(1);
    const navigator = useNavigate();

    const [dater, setDater] = useState(new Date());
    if((window.localStorage.token ===  undefined)){
        navigator('/');
    }

    const handleBooking = async () => {
        let item = window.localStorage.booked;
        if (item !== "") {
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Authorization": `Bearer ${window.localStorage.token}`,
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({
                "pickupd_date": dater,
                "seats": seats,
                "safariUuid": item,
                "Latitude": ''

            });

            let reqOptions = {
                url: `${baseURL}api/v1/bookings/create-update`,
                method: "POST",
                headers: headersList,
                data: bodyContent,
            }
            try {

                let response = await axios.request(reqOptions);
                if (response.data.code === 9000) {
                    toast.success(response.data.message);
                    setVisib(!false);
                    getBooking();
                    getMyBooking()
                }else{
                    toast.error("ERROR!")
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            toast.error("All field required!")
        }
    }
    const [visib, setVisib] = useState(!false);
    const getBooking = async () => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Authorization": `Bearer ${window.localStorage.token}`,
            "Content-Type": "application/json"
        }
        try {
            let reqOptions = {
                url: `${baseURL}api/v1/safari/get/${location.toLocaleLowerCase()}/${end.toLocaleLowerCase()}`,
                method: "GET",
                headers: headersList
            }
            let response = await axios.request(reqOptions);
            if (response.data.empty === false) {
                toast.success("Booking Approved!");
                setBookings(response.data.content);
            } else {
                console.log(response.data.message);
                toast.success("Booking is Empty!");
                setBookings([]);

            }
            console.log(response.data.empty);
        } catch (err) {
            console.log(err);
        }
    }
    const getMyBooking = async () => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Authorization": `Bearer ${window.localStorage.token}`,
            "Content-Type": "application/json"
        }
        try {
            let reqOptions = {
                url: `${baseURL}api/v1/bookings/get-my-bookings`,
                method: "GET",
                headers: headersList
            }
            let response = await axios.request(reqOptions);
            if (response.data.empty === false) {
                toast.success("Booking Approved!");
                setBookings2(response.data.content);
                
            } else {
                console.log(response.data.message);
                toast.success("Booking is Empty!");
                setBookings2([]);

            }
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    const getCancelRoute = async () => {
        let item = window.localStorage.booked;
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Authorization": `Bearer ${window.localStorage.token}`,
            "Content-Type": "application/json"
        }
        try {
            let reqOptions = {
                url: `${baseURL}api/v1/bookings/update-booking`,
                method: "PUT",
                headers: headersList,
                data: JSON.stringify({
                    "status": "CANCELLED",
                    "bookingUuid": item,
                    "message": "CANCELLED"
                })
            }
            let response = await axios.request(reqOptions);
            if (response.data.code === 9000) {
                toast.success(response.data.message);
                getBooking();
                getMyBooking()
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getBooking();
        // eslint-disable-next-line
        getMyBooking()
        // eslint-disable-next-line
    }, [])
    return (
        <div className='dashbd'>
            <div className="auth_body" style={{
                position: "fixed",
                background: 'var(--shadow_color)',
                zIndex: '8',
                display: `${visib ? 'none' : 'block'}`
            }}>
                <div className="auth_tag">
                    <input type="text" placeholder='Seat Number' value={seats} onChange={(e) => setSeats(e.target.value)} className='mb-2' />
                    <div className="message"></div>
                    <input type="date" placeholder='Date' value={dater} onChange={(e) => setDater(e.target.value)} className='mb-2' />
                    <div className="message"></div>
                    <button onClick={handleBooking} className='btn_token'>Book Now</button>
                </div>
            </div>
            <div className="navbar_topbar">
                <div className="grid_">
                    <div className="col grid_">
                        <div className="logo"><span>Smart</span><span>Tour</span></div>
                        <div className="lists">
                            <ul>
                                {
                                    TopList.toplists !== undefined && TopList.toplists.length > 0 ?
                                        TopList.toplists.map((item, key) => <li key={key}>{item}</li>) :
                                        'Loading ...'

                                } </ul>
                        </div>
                    </div>
                    <div className="col">
                        {
                            TopList.button !== undefined && TopList.button.length > 0 ?
                                TopList.button.map((item, key) => <button className='' key={key}><i>{item.icon}</i><span>{item.text}</span></button>) :
                                'Loading ...'
                        }
                    </div>
                </div>
            </div>
            <div className="checkpoint">
                <div className="input_field">
                    <div className="absolute">
                        <span>From Where ?</span>
                    </div>
                    <div className="selections">
                        <select name="" id="" className='' value={location} onChange={(e) => setLocation(e.target.value)}>

                            {
                                Tanzania !== undefined && Tanzania.length > 0 ? Tanzania.map((data, key) => <option value={data} key={key}>{data}</option>) : <option value={'null'}>{'Please Wait ...'}</option>
                            }
                        </select>
                    </div>
                </div>
                {/* <div className="input_field">
                    <div className="absolute">
                        <span>Dispature Date</span>
                    </div>
                    <DatePicker format="MM/dd/yyyy" value={start} onChange={(e) => setStart(e)} />
                </div> */}

                {/* <Whisper trigger={'click'} followCursor speaker={(props, ref) => {
                    const { className, left, top, onClose } = props;
                    return <Overlay style={{ left, top }} onClose={onClose} className={className} ref={ref} />;
                }}> */}
                <div className="input_field">
                    <div className="absolute">
                        <span>to Where?</span>
                    </div>
                    <div className="selections">
                        <select name="" id="" className='' value={end} onChange={(e) => setEnd(e.target.value)}>
                            {
                                Tanzania !== undefined && Tanzania.length > 0 ? Tanzania.map((data, key) => <option value={data} key={key}>{data}</option>) : <option value={'null'}>{'Please Wait ...'}</option>
                            }
                        </select>
                    </div>
                </div>
                {/* </Whisper> */}
                {/* <div className="input_field">
                    <div className="absolute">
                        <span>Price</span>
                    </div>
                    <div className="selections">
                        <select name="" id="" className='' value={price} onChange={(e) => setPrice(e.target.value)}>
                            {
                                Price.price != undefined && Price.price.length > 0 ? Price.price.map((data, key) => <option value={data.value} key={key}>{data.class}</option>) : <option value={'null'}>{'Please Wait ...'}</option>
                            }
                        </select>
                    </div>
                </div> */}
                <button onClick={getBooking}>Book Safari</button>
                <button onClick={() => {navigator('/');window.localStorage.clear()}} style={{
                    marginRight:'10px',
                    background:'none',
                    color:'var(--dodge)',
                    border:"1px solid var(--dodge)"
                }}>Log Out</button>
            </div>
            <div className="main_grid">
                <div className="">
                    <iframe title='oo' src={`https://www.google.com/maps/embed/v1/directions?origin=${location}&destination=${end}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`} frameBorder="0" ></iframe>
                    {/* <h5 className=' pl-3 pr-3 pt-2'>Sort By</h5>
                    <SelectPicker
                        data={data}
                        searchable={false}
                        style={{ width: 224 }}
                        placeholder="Recommended"
                    />

                    <Accordion>
                        <Accordion.Panel header={'Property Types'} defaultExpanded>
                            <Checkbox value="">Hotels  (1)</Checkbox>
                        </Accordion.Panel>
                        <Accordion.Panel header={'Set Your Budget'} defaultExpanded>
                            <div className="">
                                <span>${start} - ${end}</span>
                            </div>
                            <RangeSlider value={[start, end]} onChange={value => {
                                setStart(value[0]); setEnd(value[1]);
                            }} />
                        </Accordion.Panel>
                        <Accordion.Panel header={'Property Name'} defaultExpanded>
                            <InputGroup style={styles}>
                                <Input placeholder='e.g "Hillton"' />
                                <InputGroup.Button>
                                    <SearchIcon />
                                </InputGroup.Button>
                            </InputGroup>
                        </Accordion.Panel>
                        <Accordion.Panel header={'Amenities'} defaultExpanded>
                            <Checkbox value=""><Wifi style={{
                                fontSize: '16px',
                            }} /> <span style={{
                                position: 'relative',
                            }}>Free Internet Access  (1)</span></Checkbox>
                            <Checkbox value=""><Wifi style={{
                                fontSize: '16px',
                            }} /> <span style={{
                                position: 'relative',
                            }}>Free Breakfast  (1)</span></Checkbox>
                        </Accordion.Panel>

                    </Accordion> */}
                </div>
                <div className="mt-5 p-2 pl-24 pr-24">
                    <Tabs defaultActiveKey='1'>
                        <Tabs.Tab eventKey='1' title="All Routes">
                            <div className="flexdata1">

                                {
                                    bookings?.length > 0 ? bookings.map((item, i) => <div key={i}>
                                        <div className="flexdata">
                                            <div className="grid_" style={{
                                                display: "grid",
                                                gridTemplateColumns: 'auto auto'
                                            }}>
                                                <div className="">
                                                    <span>From: </span><span>{item.startPoint}</span>
                                                </div>
                                                <div className="" style={{
                                                    textAlign: 'end'
                                                }}><span>To: </span><span>{item.destination}</span></div>
                                            </div>
                                            <div className="grid_" style={{
                                                display: "grid",
                                                gridTemplateColumns: 'auto auto'
                                            }}>
                                                <div className="">
                                                    <span>Time: </span><span>{item.departure}</span>
                                                </div>
                                                <div className="" style={{
                                                    textAlign: 'end'
                                                }}>
                                                    <span>Price: </span><span>{item.price}</span>
                                                </div>
                                            </div>

                                            <button onClick={() => {
                                                window.localStorage.setItem("booked", item.uuid);
                                                setVisib(!true)
                                            }}>BUY A TICKET</button>
                                        </div>
                                    </div>) : <div><Placeholder.Paragraph graph="circle" active className='mt-5 mb-5' />
                                        <Placeholder.Paragraph graph="circle" active className='mt-5 mb-5' />
                                        <Placeholder.Paragraph graph="circle" active className='mt-5 mb-5' />
                                        <Placeholder.Paragraph graph="circle" active className='mt-5 mb-5' /></div>
                                }
                            </div>
                        </Tabs.Tab>
                        <hr />
                        <Tabs.Tab eventKey='2' title="You're Booking">
                            <div className="flexdata1">

                                {
                                    bookings2?.length > 0 ? bookings2.map((item, i) => <div key={i}>
                                        <div className="flexdata">
                                            <div className="grid_" style={{
                                                display: "grid",
                                                gridTemplateColumns: 'auto auto'
                                            }}>
                                                <div className="">
                                                    <span>From: </span><span>{item.safariUuid.startPoint}</span>
                                                </div>
                                                <div className="" style={{
                                                    textAlign: 'end'
                                                }}><span>Destination: </span><span>{item.safariUuid.destination}</span></div>
                                            </div>
                                            <div className="grid_" style={{
                                                display: "grid",
                                                gridTemplateColumns: 'auto auto'
                                            }}>
                                                <div className="">
                                                    <span>Departure Time: </span><span>{item.safariUuid.departure}</span>
                                                </div>
                                                <div className="" style={{
                                                    textAlign: 'end'
                                                }}>
                                                    <span>NUMBER SEATS: </span><span>{item.seats}</span>
                                                </div>
                                            </div>
                                            <div className="grid_" style={{
                                                display: "grid",
                                                gridTemplateColumns: 'auto auto'
                                            }}>
                                                <div className="">
                                                    <span>STATUS: </span><span style={{
                                                        color: 'var(--green)'
                                                    }}>{item.status}</span>
                                                </div>
                                                <div className="" style={{
                                                    textAlign: 'end'
                                                }}>
                                                    <span>TOTAL BILL: </span><span>{Number(item.totalBill).toLocaleString()} Tsh</span>
                                                </div>
                                            </div>
                                            <button onClick={() => {
                                                window.localStorage.setItem("booked", item.uuid);
                                                getCancelRoute();
                                            }} style={{ background: "red" }}>CANCEL ROUTE</button>
                                        </div>
                                    </div>) : <div><Placeholder.Paragraph graph="circle" active className='mt-5 mb-5' />
                                        <Placeholder.Paragraph graph="circle" active className='mt-5 mb-5' />
                                        <Placeholder.Paragraph graph="circle" active className='mt-5 mb-5' />
                                        <Placeholder.Paragraph graph="circle" active className='mt-5 mb-5' /></div>
                                }
                            </div>
                        </Tabs.Tab>
                    </Tabs>

                </div>
            </div>
        </div>
    )
}

export default Dashboard2
