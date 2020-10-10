import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Dropdown,Container,Input, Menu } from 'semantic-ui-react'
import { BeatLoader } from 'react-spinners';
import axios from 'axios';
import { css } from 'emotion';
import JSONToHTMLTable from './JSONToHTMLTable';

export default class Search extends Component {
    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.state={
            methods:[],
            method:'',
            url:'',
            show:0,
            active_request: 'query',
            request_query_fields:[{key:'',value:''}],
            request_headers:[{text:'Accept',key:'Accept',value:'Accept'},{text:'User-Agent',key:'User-Agent',value:'User-Agent'},{text:'Accept-Encoding',key:'Accept-Encoding',value:'Accept-Encoding'},{text:'Accept-Language',key:'Accept-Language',value:'Accept-Language'},{text:'Cache-Control',key:'Cache-Control',value:'Cache-Control'},{text:'Date',key:'Date',value:'Date'},{text:'Connection',key:'Connection',value:'Connection'},{text:'Transfer-Encoding',key:'Transfer-Encoding',value:'Transfer-Encoding'},{text:'Cookie',key:'Cookie',value:'Cookie'},{text:'Expect',key:'Expect',value:'Expect'},{text:'From',key:'From',value:'From'},{text:'Accept-Charset',key:'Accept-Charset',value:'Accept-Charset'}],
            request_header_fields:[{key:'',value:''}],
            request_body_fields:[{key:'',value:''}],
            active_response:0,
            response_headers:[],
            response_cookies:[],
            response_body:'',
            response_json:'',
            response_format:'html',
            response_formats:[{text:'html',key:'html',value:'html'},{text:'json',key:'json',value:'json'}],
            loading:false,
            status:'',
            time:'',
            err:'',
            history:[],
        }
        this.handleChange=this.handleChange.bind(this);
    }
    componentDidMount(){
        this.setState({loading:true})
        axios.get('/result')
            .then((res) => {
                this.setState({methods:[{text:'GET',key:'GET',value:'GET'},{text:'POST',key:'POST',value:'POST'},{text:'HEAD',key:'HEAD',value:'HEAD'}],show:0,method:'GET',url:'',active_request: 'query',active_response:0,response_format:'',response_headers:[],response_cookies:[],response_body:'',response_json:'',response_formats:[{text:'html',key:'html',value:'html'},{text:'json',key:'json',value:'json'}],request_headers:[{text:'Accept',key:'Accept',value:'Accept'},{text:'User-Agent',key:'User-Agent',value:'User-Agent'},{text:'Accept-Encoding',key:'Accept-Encoding',value:'Accept-Encoding'},{text:'Accept-Language',key:'Accept-Language',value:'Accept-Language'},{text:'Cache-Control',key:'Cache-Control',value:'Cache-Control'},{text:'Date',key:'Date',value:'Date'},{text:'Connection',key:'Connection',value:'Connection'},{text:'Transfer-Encoding',key:'Transfer-Encoding',value:'Transfer-Encoding'},{text:'Cookie',key:'Cookie',value:'Cookie'},{text:'Expect',key:'Expect',value:'Expect'},{text:'From',key:'From',value:'From'},{text:'Accept-Charset',key:'Accept-Charset',value:'Accept-Charset'}],status:'',time:'',history:res.data.reverse(),loading:false})
            })
    }

    handleChange(e, data){     
        this.setState({ method: data.value,active_request: 'query' });
    }

    change_request_query_key = (index, event) => {
        const values = this.state.request_query_fields;
        values[index].key = event.target.value;
        this.setState({request_query_fields:values});
    }

    change_request_header_key = (index, event,data) => {
        const values = this.state.request_header_fields;
        values[index].key = data.value;
        this.setState({request_header_fields:values});
    }

    change_request_body_key = (index, event) => {
        const values = this.state.request_body_fields;
        values[index].key = event.target.value;
        this.setState({request_body_fields:values});
    }

    change_request_query_value = (index, event) => {
        const values = this.state.request_query_fields;
        values[index].value = event.target.value;
        this.setState({request_query_fields:values});
    }

    change_request_header_value = (index, event) => {
        const values = this.state.request_header_fields;
        values[index].value = event.target.value;
        this.setState({request_header_fields:values});
    }

    change_request_body_value = (index, event) => {
        const values = this.state.request_body_fields;
        values[index].value = event.target.value;
        this.setState({request_body_fields:values});
    }

    add_request_query = () => {
        const values = this.state.request_query_fields;
        values.push({key:'',value:''})
        this.setState({request_query_fields:values});
    }

    add_request_header = () => {
        const values = this.state.request_header_fields;
        values.push({key:'',value:''})
        this.setState({request_header_fields:values});
    }

    add_request_body = () => {
        const values = this.state.request_body_fields;
        values.push({key:'',value:''})
        this.setState({request_body_fields:values});
    }

    remove_request_query = (index) => {
        const values = this.state.request_query_fields;
        values.splice(index, 1);
        this.setState({request_query_fields:values});
    }

    remove_request_header = (index) => {
        const values = this.state.request_header_fields;
        values.splice(index, 1);
        this.setState({request_header_fields:values});
    }

    remove_request_body = (index) => {
        const values = this.state.request_body_fields;
        values.splice(index, 1);
        this.setState({request_body_fields:values});
    }

    click = () => {
        window.location='/';
    }

    activate_request = (e) => {
        this.setState({ active_request: e.target.name });
    }

    //handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    Change = (e) => {
        const target = e.target;
        const value = target.value
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    web = () => {
        const part=this.state.response_body.toString();
        const wind = window.open("", "popupWindow", "width=600,height=600,scrollbars=yes");
        wind.document.write(part);       
    }

    page = () => {
        console.log('')
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.method.length>0 && this.state.url.length>0){
            this.setState({loading:true})
            const info={url:this.state.url,method:this.state.method,request_query_fields:this.state.request_query_fields,request_header_fields:this.state.request_header_fields,request_body_fields:this.state.request_body_fields};
            axios.post('/result',info)
                .then((res) => {
                    this.setState({loading:true});
                    if(res.data.err && res.data.err.length>0){
                        this.setState({err:res.data.err,loading:false})
                    }
                    else{
                        console.log('Form Submitted Successfully')
                        let new_hist=this.state.history;
                        let new_add={}
                        new_add['_id']=res.data.id.toString();
                        new_add.url=this.state.url;
                        new_add.method=this.state.method;
                        new_add.query=this.state.request_query_fields;
                        new_add.request_headers=this.state.request_headers;
                        new_add.request_body=this.state.request_body_fields;
                        new_add.status=res.data.status;
                        new_add.time=res.data.time.toFixed(3);
                        new_add.response_headers=res.data.headers;
                        new_add.cookies=res.data.cookies;
                        if(typeof(this.state.response_json)==='object'){
                            new_add.response_body=res.data.json;
                        }
                        else{
                            new_add.response_body=res.data.body.toString();
                        }
                        new_hist.unshift(new_add);
                        this.myRef.current.scrollTo(0, 0);
                        this.setState({active_response:1,active_request:'header',response_headers:res.data.headers,response_cookies:res.data.cookies,response_body:res.data.body.toString(),response_json:res.data.json,loading:false,status:res.data.status,time:res.data.time.toFixed(3),err:res.data.err,history:new_hist});
                    }
                })
        }
    };

    

    render(){
        
        return(
            <div className="ui grid" style={{'TextAlign':'center'}}>
                <div className="four wide column">
                    <br />
                    <div className="sidenav" ref={this.myRef}>
                        <h4 className='heading'>Recent Requests:</h4>
                        { this.state.history.map((item, index) => (
                            <div key={index}>
                                <a href={'/'+item._id.toString()} target="_blank"><b>{index+1}. {item.method}</b> - {item.url}</a>
                                <hr />
                            </div>
                        )) }
                    </div>
                </div>
                <div className="ten wide column bar">
                    {!this.state.loading &&
                        <h2 className='invisible'>Hide</h2>
                    }
                    <BeatLoader size={30} color='orange' loading={this.state.loading} />
                    {this.state.err && this.state.err.length>0 && !this.state.loading &&
                        <button className="popup btn after" onClick={this.click}>
                            New Request
                            <i className="fa fa-lg fa-plus" aria-hidden="true" style={{color:"white",position:"relative",right:"-3.5px"}}></i>
                            <span className="popuptext err" id="myPopup">An Error occured!</span>
                        </button>
                    }
                    {this.state.err.length==0 &&
                        <button className='btn' onClick={this.click}>
                            New Request
                            <i className="fa fa-lg fa-plus" aria-hidden="true" style={{color:"white",position:"relative",right:"-3.5px"}}></i>
                        </button> 
                    }
                    <form onSubmit={this.handleSubmit} className='form'>
                        <Dropdown selection options={this.state.methods} onChange={this.handleChange} id='method' value={this.state.method} name='method' />
                        <div className="ui input">
                          <input type="url" placeholder='Enter the URL' name='url' value={this.state.url} onChange={this.Change} />
                        </div>
                        <span className='invisible'>H</span>
                        {this.state.method=='GET' && this.state.url.length>0 &&
                            <span>
                                <button className='ui primary button'>Send <i className="fa fa-lg fa-angle-double-right" aria-hidden="true" style={{position:"relative",top:"-1.5px",right:"-3px",color:"#07bff"}}></i></button>
                                <h3 className='invisible'>Hello World</h3>
                                <hr />
                                <br />
                                {this.state.active_request=='query' &&
                                    <div>
                                        <div className="topnav">
                                            <a className="active" name='query' onClick={this.activate_request}>Query</a>
                                            <a name='headers' onClick={this.activate_request}>Headers</a>
                                            {this.state.active_response==1 && 
                                                <div className="topnav-right">
                                                    <a name='header' onClick={this.activate_request}>Headers</a>
                                                    <a name='cookies' onClick={this.activate_request}>Cookies</a>
                                                    <a name='text' onClick={this.activate_request}>Body</a>
                                                </div>
                                            }
                                        </div>
                                        <br />
                                        <h3><u>Query Parameters</u> :</h3>
                                        { this.state.request_query_fields.map((inputField, index) => (
                                        <div key={index} className='two fields'>
                                            <div className='ui input'>
                                                <input
                                                type="text" 
                                                name="key"
                                                label="Query Parameter"
                                                variant="filled"
                                                placeholder='Query Parameter'
                                                value={inputField.key}
                                                onChange={event => this.change_request_query_key(index, event)}
                                                />
                                            </div>
                                            <div className='ui input'>
                                                <input
                                                type="text" 
                                                name="value"
                                                label="Value"
                                                variant="filled"
                                                placeholder='Value'
                                                value={inputField.value}
                                                onChange={event => this.change_request_query_value(index, event)}
                                                />
                                            </div>
                                            <a
                                            href='#'
                                            onClick={() => this.remove_request_query(index)}
                                            >
                                            <i className="fa fa-lg fa-minus" aria-hidden="true" style={{position:"relative",right:"-20px"}}></i>
                                            </a>          
                                        </div>
                                        )) }
                                        <a
                                        href='#'
                                        onClick={() => this.add_request_query()}
                                        style={{position:"relative",top:"-30.5px",right:"-415px"}}
                                        >
                                        <i className="fa fa-lg fa-plus" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                }
                                {this.state.active_request=='headers' &&
                                    <div>
                                        <div className="topnav">
                                            <a name='query' onClick={this.activate_request}>Query</a>
                                            <a className="active" name='headers' onClick={this.activate_request}>Headers</a>
                                            {this.state.active_response==1 && 
                                                <div className="topnav-right">
                                                    <a name='header' onClick={this.activate_request}>Headers</a>
                                                    <a name='cookies' onClick={this.activate_request}>Cookies</a>
                                                    <a name='text' onClick={this.activate_request}>Body</a>
                                                </div>
                                            }
                                        </div>
                                        <br />
                                        <h3><u>HTTP Headers</u> :</h3>
                                        { this.state.request_header_fields.map((inputField, index) => (
                                        <div key={index} className='two fields'>
                                            <div className='ui input'>
                                                <Dropdown placeholder='Header Key' search selection options={this.state.request_headers} onChange={(event,data) => this.change_request_header_key(index, event,data)} id='client' value={inputField.key} className='ml-2' />
                                            </div>
                                            <div className='ui input'>
                                                <input
                                                type="text" 
                                                name="value"
                                                label="Header Value"
                                                variant="filled"
                                                placeholder='Header Value'
                                                value={inputField.value}
                                                onChange={event => this.change_request_header_value(index, event)}
                                                />
                                            </div>
                                            <a
                                            href='#'
                                            onClick={() => this.remove_request_header(index)}
                                            >
                                            <i className="fa fa-lg fa-minus" aria-hidden="true" style={{position:"relative",right:"-20px"}}></i>
                                            </a>
                                            {inputField.key.length>0 && 
                                                <a
                                                target="_blank"
                                                href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/'+inputField.key}
                                                >
                                                <i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-60px",color:"rgba(32,33,31,0.4)",top:"-1.8px"}}></i>
                                                </a>
                                            }          
                                        </div>
                                        )) }
                                        <a
                                        href='#'
                                        onClick={() => this.add_request_header()}
                                        style={{position:"relative",top:"-30.5px",right:"-400px"}}
                                        >
                                        <i class="fa fa-lg fa-plus" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                }
                                {this.state.active_request=='header' &&
                                    <div>
                                        <div className="topnav">
                                            <a name='query' onClick={this.activate_request}>Query</a>
                                            <a name='headers' onClick={this.activate_request}>Headers</a>
                                            <div className="topnav-right">
                                                <a className="active" name='header' onClick={this.activate_request}>Headers</a>
                                                <a name='cookies' onClick={this.activate_request}>Cookies</a>
                                                <a name='text' onClick={this.activate_request}>Body</a>
                                            </div>
                                        </div>
                                        <br />
                                        <b style={{color:"#007bff"}}>Status-code:{this.state.status}  <a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/'+this.state.status.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-3.6px",color:"rgba(32,33,31,0.4)"}}></i></a> <span className='topnav-right'>Response time:{this.state.time} ms</span></b>
                                        <hr />
                                        <h3><u>Response Headers</u> :</h3>
                                        {this.state.response_headers.length>0 &&
                                            <table className="ui celled striped table">
                                                <thead>
                                                <tr><th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>S.N.</th>
                                                <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Header</th>
                                                <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Value</th>
                                                </tr></thead>
                                                <tbody>
                                                    { this.state.response_headers.map((inputField, index) => (
                                                        <tr key={index}>
                                                            <td><b>{index+1}.</b></td>
                                                            <td><b>{inputField.key}</b><a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/'+inputField.key.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-12px",color:"rgba(32,33,31,0.4)",top:"-1.8px"}}></i></a></td>
                                                            <td><b>{inputField.value}</b></td>    
                                                        </tr>    
                                                    )) }
                                                </tbody>
                                            </table>
                                        }
                                        {this.state.response_headers.length==0 &&
                                            <h4>No headers</h4>
                                        }
                                    </div>
                                }
                                {this.state.active_request=='cookies' &&
                                    <div>
                                        <div className="topnav">
                                            <a name='query' onClick={this.activate_request}>Query</a>
                                            <a name='headers' onClick={this.activate_request}>Headers</a>
                                            <div className="topnav-right">
                                                <a name='header' onClick={this.activate_request}>Headers</a>
                                                <a className="active" name='cookies' onClick={this.activate_request}>Cookies</a>
                                                <a name='text' onClick={this.activate_request}>Body</a>
                                            </div>
                                        </div>
                                        <br />
                                        <b style={{color:"#007bff"}}>Status-code:{this.state.status}  <a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/'+this.state.status.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-3.6px",color:"rgba(32,33,31,0.4)"}}></i></a> <span className='topnav-right'>Response time:{this.state.time} ms</span></b>
                                        <hr />
                                        <h3><u>Cookies</u> :</h3>
                                        {this.state.response_cookies.length>0 &&
                                            <table className="ui celled striped table">
                                                <thead>
                                                <tr><th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>S.N.</th>
                                                <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Cookie</th>
                                                <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Value</th>
                                                <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Secure</th>
                                                <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Expires</th>
                                                </tr></thead>
                                                <tbody>
                                                    { this.state.response_cookies.map((inputField, index) => (
                                                    <tr key={index}>
                                                        <td><b>{index+1}.</b></td> 
                                                        <td><b>{inputField.key}</b></td>
                                                        <td><b>{inputField.value}</b></td>
                                                        <td><b>{inputField.secure.toString().slice(0,1).toUpperCase()+inputField.secure.toString().slice(1,)}</b></td>
                                                        <td><b>{inputField.expires}</b></td>       
                                                    </tr>
                                                    )) }
                                                </tbody>
                                            </table>
                                        }
                                        {this.state.response_cookies.length==0 &&
                                            <h4>No cookies</h4>
                                        }
                                    </div>
                                }
                                {this.state.active_request=='text' &&
                                    <div>
                                        <div className="topnav">
                                            <a name='query' onClick={this.activate_request}>Query</a>
                                            <a name='headers' onClick={this.activate_request}>Headers</a>
                                            <div className="topnav-right">
                                                <a name='header' onClick={this.activate_request}>Headers</a>
                                                <a name='cookies' onClick={this.activate_request}>Cookies</a>
                                                <a className="active" name='text' onClick={this.activate_request}>Body</a>
                                            </div>
                                        </div>
                                        <br />
                                        <b style={{color:"#007bff"}}>Status-code:{this.state.status}  <a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/'+this.state.status.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-3.6px",color:"rgba(32,33,31,0.4)"}}></i></a> <span className='topnav-right'>Response time:{this.state.time} ms</span></b>
                                        <hr />
                                        <h3><u>Response Body</u> :</h3>
                                        <br/>
                                        {typeof(this.state.response_json)==='object' && this.state.response_json !== null &&
                                        <div>
                                            <h3>Your formatted JSON response:</h3>
                                            <br />
                                            <JSONToHTMLTable data={this.state.response_json} />
                                        </div>
                                        }
                                        {typeof(this.state.response_json)!='object' && this.state.response_json !== null &&
                                        <div>
                                            <div className="card">
                                                <div className="card-body p-4">
                                                    <a onClick={this.web} className='topnav-right'><h6>Preview</h6></a>
                                                    <h3 className="card-title">Raw Server response body:</h3>
                                                    <br />
                                                    <p className="card-text"><b>{this.state.response_body}</b></p>
                                                </div>
                                            </div>
                                        </div>
                                        }
                                    </div>
                                }
                            </span>
                        }
                        {this.state.method=='POST' && this.state.url.length>0 &&
                            <span>
                                <button className='ui primary button'>Send <i className="fa fa-lg fa-angle-double-right" aria-hidden="true" style={{position:"relative",top:"-1.5px",right:"-3px",color:"#07bff"}}></i></button>
                                <h3 className='invisible'>Hello World</h3>
                                <hr />
                                <br />
                                {this.state.active_request=='query' &&
                                    <div>
                                        <div className="topnav">
                                            <a className="active" name='query' onClick={this.activate_request}>Query</a>
                                            <a name='headers' onClick={this.activate_request}>Headers</a>
                                            <a name='body' onClick={this.activate_request}>Body</a>
                                        </div>
                                        <br />
                                        <h3><u>Query Parameters</u> :</h3>
                                        { this.state.request_query_fields.map((inputField, index) => (
                                        <div key={index} className='two fields'>
                                            <div className='ui input'>
                                                <input
                                                type="text" 
                                                name="key"
                                                label="Param Key"
                                                variant="filled"
                                                placeholder='Param Key'
                                                value={inputField.key}
                                                onChange={event => this.change_request_query_key(index, event)}
                                                />
                                            </div>
                                            <div className='ui input'>
                                                <input
                                                type="text" 
                                                name="value"
                                                label="Param Value"
                                                variant="filled"
                                                placeholder='Param Value'
                                                value={inputField.value}
                                                onChange={event => this.change_request_query_value(index, event)}
                                                />
                                            </div>
                                            <a
                                            href='#'
                                            onClick={() => this.remove_request_query(index)}
                                            >
                                            <i class="fa fa-lg fa-minus" aria-hidden="true" style={{position:"relative",right:"-20px"}}></i>
                                            </a>          
                                        </div>
                                        )) }
                                        <a
                                        href='#'
                                        onClick={() => this.add_request_query()}
                                        style={{position:"relative",top:"-30.5px",right:"-415px"}}
                                        >
                                        <i class="fa fa-lg fa-plus" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                }
                                {this.state.active_request=='headers' &&
                                    <div>
                                        <div className="topnav">
                                            <a name='query' onClick={this.activate_request}>Query</a>
                                            <a className="active" name='headers' onClick={this.activate_request}>Headers</a>
                                            <a name='body' onClick={this.activate_request}>Body</a>
                                        </div>
                                        <br />
                                        <h3><u>HTTP Headers</u> :</h3>
                                        { this.state.request_header_fields.map((inputField, index) => (
                                        <div key={index} className='two fields'>
                                            <div className='ui input'>
                                                <Dropdown placeholder='Header Key' search selection options={this.state.request_headers} onChange={(event,data) => this.change_request_header_key(index, event,data)} id='client' value={inputField.key} className='ml-2' />
                                            </div>
                                            <div className='ui input'>
                                                <input
                                                type="text" 
                                                name="value"
                                                label="Header Value"
                                                variant="filled"
                                                placeholder='Header Value'
                                                value={inputField.value}
                                                onChange={event => this.change_request_header_value(index, event)}
                                                />
                                            </div>
                                            <a
                                            href='#'
                                            onClick={() => this.remove_request_header(index)}
                                            >
                                            <i class="fa fa-lg fa-minus" aria-hidden="true" style={{position:"relative",right:"-20px"}}></i>
                                            </a>
                                            {inputField.key.length>0 && 
                                                <a
                                                target="_blank"
                                                href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/'+inputField.key}
                                                >
                                                <i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-60px",color:"rgba(32,33,31,0.4)",top:"-1.8px"}}></i>
                                                </a>
                                            }          
                                        </div>
                                        )) }
                                        <a
                                        href='#'
                                        onClick={() => this.add_request_header()}
                                        style={{position:"relative",top:"-30.5px",right:"-400px"}}
                                        >
                                        <i class="fa fa-lg fa-plus" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                }
                                {this.state.active_request=='body' &&
                                    <div>
                                        <div className="topnav">
                                            <a name='query' onClick={this.activate_request}>Query</a>
                                            <a name='headers' onClick={this.activate_request}>Headers</a>
                                            <a  className="active" name='body' onClick={this.activate_request}>Body</a>
                                        </div>
                                        <br />
                                        <h3><u>Request Body</u> :</h3>
                                        { this.state.request_body_fields.map((inputField, index) => (
                                        <div key={index} className='two fields'>
                                            <div className='ui input'>
                                                <input
                                                type="text" 
                                                name="key"
                                                label="Key"
                                                variant="filled"
                                                placeholder='Key'
                                                value={inputField.key}
                                                onChange={event => this.change_request_body_key(index, event)}
                                                />
                                            </div>
                                            <div className='ui input'>
                                                <input
                                                type="text" 
                                                name="value"
                                                label="Value"
                                                variant="filled"
                                                placeholder='Value'
                                                value={inputField.value}
                                                onChange={event => this.change_request_body_value(index, event)}
                                                />
                                            </div>
                                            <a
                                            href='#'
                                            onClick={() => this.remove_request_body(index)}
                                            >
                                            <i class="fa fa-lg fa-minus" aria-hidden="true" style={{position:"relative",right:"-20px"}}></i>
                                            </a>
                                            {inputField.key.length>0 && 
                                                <a
                                                target="_blank"
                                                href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/'+inputField.key}
                                                >
                                                <i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-60px",color:"rgba(32,33,31,0.4)",top:"-1.8px"}}></i>
                                                </a>
                                            }          
                                        </div>
                                        )) }
                                        <a
                                        href='#'
                                        onClick={() => this.add_request_body()}
                                        style={{position:"relative",top:"-30.5px",right:"-415px"}}
                                        >
                                        <i class="fa fa-lg fa-plus" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                }
                                {this.state.active_request=='header' &&
                                    <div>
                                        <div className="topnav">
                                            <a name='query' onClick={this.activate_request}>Query</a>
                                            <a name='headers' onClick={this.activate_request}>Headers</a>
                                            <div className="topnav-right">
                                                <a className="active" name='header' onClick={this.activate_request}>Headers</a>
                                                <a name='cookies' onClick={this.activate_request}>Cookies</a>
                                                <a name='text' onClick={this.activate_request}>Body</a>
                                            </div>
                                        </div>
                                        <br />
                                        <b style={{color:"#007bff"}}>Status-code:{this.state.status}  <a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/'+this.state.status.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-3.6px",color:"rgba(32,33,31,0.4)"}}></i></a> <span className='topnav-right'>Response time:{this.state.time} ms</span></b>
                                        <hr />
                                        <h3><u>Response Headers</u> :</h3>
                                        {this.state.response_headers.length>0 &&
                                            <table className="ui celled striped table">
                                                <thead>
                                                <tr><th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>S.N.</th>
                                                <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Header</th>
                                                <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Value</th>
                                                </tr></thead>
                                                <tbody>
                                                    { this.state.response_headers.map((inputField, index) => (
                                                        <tr key={index}>
                                                            <td><b>{index+1}.</b></td>
                                                            <td><b>{inputField.key}</b><a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/'+inputField.key.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-12px",color:"rgba(32,33,31,0.4)",top:"-1.8px"}}></i></a></td>
                                                            <td><b>{inputField.value}</b></td>    
                                                        </tr>    
                                                    )) }
                                                </tbody>
                                            </table>
                                        }
                                        {this.state.request_header_fields.length==0 &&
                                            <h4>No headers</h4>
                                        }
                                    </div>
                                }
                                {this.state.active_request=='cookies' &&
                                    <div>
                                        <div className="topnav">
                                            <a name='query' onClick={this.activate_request}>Query</a>
                                            <a name='headers' onClick={this.activate_request}>Headers</a>
                                            <div className="topnav-right">
                                                <a name='header' onClick={this.activate_request}>Headers</a>
                                                <a className="active" name='cookies' onClick={this.activate_request}>Cookies</a>
                                                <a name='text' onClick={this.activate_request}>Body</a>
                                            </div>
                                        </div>
                                        <br />
                                        <b style={{color:"#007bff"}}>Status-code:{this.state.status}  <a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/'+this.state.status.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-3.6px",color:"rgba(32,33,31,0.4)"}}></i></a> <span className='topnav-right'>Response time:{this.state.time} ms</span></b>
                                        <hr />
                                        <h3><u>Cookies</u> :</h3>
                                        {this.state.response_cookies.length>0 &&
                                            <table className="ui celled striped table">
                                                <thead>
                                                <tr><th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>S.N.</th>
                                                <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Cookie</th>
                                                <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Value</th>
                                                <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Secure</th>
                                                <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Expires</th>
                                                </tr></thead>
                                                <tbody>
                                                    { this.state.response_cookies.map((inputField, index) => (
                                                    <tr key={index}>
                                                        <td><b>{index+1}.</b></td> 
                                                        <td><b>{inputField.key}</b></td>
                                                        <td><b>{inputField.value}</b></td>
                                                        <td><b>{inputField.secure.toString().slice(0,1).toUpperCase()+inputField.secure.toString().slice(1,)}</b></td>
                                                        <td><b>{inputField.expires}</b></td>       
                                                    </tr>
                                                    )) }
                                                </tbody>
                                            </table>
                                        }
                                        {this.state.response_cookies.length==0 &&
                                            <h4>No Cookies</h4>
                                        }
                                    </div>
                                }
                                {this.state.active_request=='text' &&
                                    <div>
                                        <div className="topnav">
                                            <a name='query' onClick={this.activate_request}>Query</a>
                                            <a name='headers' onClick={this.activate_request}>Headers</a>
                                            <div className="topnav-right">
                                                <a name='header' onClick={this.activate_request}>Headers</a>
                                                <a name='cookies' onClick={this.activate_request}>Cookies</a>
                                                <a className="active" name='text' onClick={this.activate_request}>Body</a>
                                            </div>
                                        </div>
                                        <br />
                                        <b style={{color:"#007bff"}}>Status-code:{this.state.status}  <a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/'+this.state.status.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-3.6px",color:"rgba(32,33,31,0.4)"}}></i></a> <span className='topnav-right'>Response time:{this.state.time} ms</span></b>
                                        <hr />
                                        <h3><u>Response Body</u> :</h3>
                                        <br/>
                                        {typeof(this.state.response_json)==='object' && this.state.response_json !== null &&
                                        <div>
                                            <h3>Your formatted JSON response:</h3>
                                            <br />
                                            <JSONToHTMLTable data={this.state.response_json} />
                                        </div>
                                        }
                                        {typeof(this.state.response_json)!='object' && this.state.response_json !== null &&
                                        <div>
                                            <div className="card">
                                                <div className="card-body p-4">
                                                    <a onClick={this.web} className='topnav-right'><h6>Preview</h6></a>
                                                    <h3 className="card-title">Raw Server response body:</h3>
                                                    <br />
                                                    <p className="card-text"><b>{this.state.response_body}</b></p>
                                                </div>
                                            </div>
                                        </div>
                                        }
                                    </div>
                                }
                            </span>
                        }
                        {this.state.method=='HEAD' && this.state.url.length>0 &&
                            <span>
                                <button className='ui primary button'>Send <i class="fa fa-lg fa-angle-double-right" aria-hidden="true" style={{position:"relative",top:"-1.5px",right:"-3px",color:"#07bff"}}></i></button>
                                <h3 className='invisible'>Hello World</h3>
                                <hr />
                                <br />
                                {this.state.active_request=='query' &&
                                    <div>
                                        <div className="topnav">
                                            <a className="active" name='query' onClick={this.activate_request}>Query</a>
                                            <a name='headers' onClick={this.activate_request}>Headers</a>
                                        </div>
                                        <br />
                                        <h3><u>Query Parameters</u> :</h3>
                                        { this.state.request_query_fields.map((inputField, index) => (
                                        <div key={index} className='two fields'>
                                            <div className='ui input'>
                                                <input
                                                type="text" 
                                                name="key"
                                                label="Param Key"
                                                variant="filled"
                                                placeholder='Param Key'
                                                value={inputField.key}
                                                onChange={event => this.change_request_query_key(index, event)}
                                                />
                                            </div>
                                            <div className='ui input'>
                                                <input
                                                type="text" 
                                                name="value"
                                                label="Param Value"
                                                variant="filled"
                                                placeholder='Param Value'
                                                value={inputField.value}
                                                onChange={event => this.change_request_query_value(index, event)}
                                                />
                                            </div>
                                            <a
                                            href='#'
                                            onClick={() => this.remove_request_query(index)}
                                            >
                                            <i class="fa fa-lg fa-minus" aria-hidden="true" style={{position:"relative",right:"-20px"}}></i>
                                            </a>          
                                        </div>
                                        )) }
                                        <a
                                        href='#'
                                        onClick={() => this.add_request_query()}
                                        style={{position:"relative",top:"-30.5px",right:"-415px"}}
                                        >
                                        <i class="fa fa-lg fa-plus" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                }
                                {this.state.active_request=='headers' &&
                                    <div>
                                        <div className="topnav">
                                            <a name='query' onClick={this.activate_request}>Query</a>
                                            <a className="active" name='headers' onClick={this.activate_request}>Headers</a>
                                        </div>
                                        <br />
                                        <h3><u>HTTP Headers</u> :</h3>
                                        { this.state.request_header_fields.map((inputField, index) => (
                                        <div key={index} className='two fields'>
                                            <div className='ui input'>
                                                <Dropdown placeholder='Header Key' search selection options={this.state.request_headers} onChange={(event,data) => this.change_request_header_key(index, event,data)} id='client' value={inputField.key} className='ml-2' />
                                            </div>
                                            <div className='ui input'>
                                                <input
                                                type="text" 
                                                name="value"
                                                label="Header Value"
                                                variant="filled"
                                                placeholder='Header Value'
                                                value={inputField.value}
                                                onChange={event => this.change_request_header_value(index, event)}
                                                />
                                            </div>
                                            <a
                                            href='#'
                                            onClick={() => this.remove_request_header(index)}
                                            >
                                            <i class="fa fa-lg fa-minus" aria-hidden="true" style={{position:"relative",right:"-20px"}}></i>
                                            </a>
                                            {inputField.key.length>0 && 
                                                <a
                                                target="_blank"
                                                href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/'+inputField.key}
                                                >
                                                <i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-60px",color:"rgba(32,33,31,0.4)",top:"-1.8px"}}></i>
                                                </a>
                                            }          
                                        </div>
                                        )) }
                                        <a
                                        href='#'
                                        onClick={() => this.add_request_header()}
                                        style={{position:"relative",top:"-30.5px",right:"-400px"}}
                                        >
                                        <i class="fa fa-lg fa-plus" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                }
                                {this.state.active_request=='header' &&
                                    <div>
                                        <div className="topnav">
                                            <a name='query' onClick={this.activate_request}>Query</a>
                                            <a name='headers' onClick={this.activate_request}>Headers</a>
                                            <div className="topnav-right">
                                                <a className="active" name='header' onClick={this.activate_request}>Headers</a>
                                                <a name='cookies' onClick={this.activate_request}>Cookies</a>
                                                <a name='text' onClick={this.activate_request}>Body</a>
                                            </div>
                                        </div>
                                        <br />
                                        <b style={{color:"#007bff"}}>Status-code:{this.state.status}  <a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/'+this.state.status.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-3.6px",color:"rgba(32,33,31,0.4)"}}></i></a> <span className='topnav-right'>Response time:{this.state.time} ms</span></b>
                                        <hr />
                                        <h3><u>Response Headers</u> :</h3>
                                        {this.state.response_headers.length>0 &&
                                            <table className="ui celled striped table">
                                                <thead>
                                                <tr><th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>S.N.</th>
                                                <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Header</th>
                                                <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Value</th>
                                                </tr></thead>
                                                <tbody>
                                                    { this.state.response_headers.map((inputField, index) => (
                                                        <tr key={index}>
                                                            <td><b>{index+1}.</b></td>
                                                            <td><b>{inputField.key}</b><a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/'+inputField.key.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-12px",color:"rgba(32,33,31,0.4)",top:"-1.8px"}}></i></a></td>
                                                            <td><b>{inputField.value}</b></td>    
                                                        </tr>    
                                                    )) }
                                                </tbody>
                                            </table>
                                        }
                                        {this.state.response_headers.length==0 &&
                                            <h4>No headers</h4>
                                        }
                                    </div>
                                }
                                {this.state.active_request=='cookies' &&
                                    <div>
                                        <div className="topnav">
                                            <a name='query' onClick={this.activate_request}>Query</a>
                                            <a name='headers' onClick={this.activate_request}>Headers</a>
                                            <div className="topnav-right">
                                                <a name='header' onClick={this.activate_request}>Headers</a>
                                                <a className="active" name='cookies' onClick={this.activate_request}>Cookies</a>
                                                <a name='text' onClick={this.activate_request}>Body</a>
                                            </div>
                                        </div>
                                        <br />
                                        <b style={{color:"#007bff"}}>Status-code:{this.state.status}  <a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/'+this.state.status.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-3.6px",color:"rgba(32,33,31,0.4)"}}></i></a> <span className='topnav-right'>Response time:{this.state.time} ms</span></b>
                                        <hr />
                                        <h3><u>Cookies</u> :</h3>
                                        <br />
                                        {this.state.response_cookies.length>0 &&
                                            <table className="ui celled striped table">
                                                <thead>
                                                <tr><th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>S.N.</th>
                                                <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Cookie</th>
                                                <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Value</th>
                                                <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Secure</th>
                                                <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Expires</th>
                                                </tr></thead>
                                                <tbody>
                                                    { this.state.response_cookies.map((inputField, index) => (
                                                    <tr key={index}>
                                                        <td><b>{index+1}.</b></td> 
                                                        <td><b>{inputField.key}</b></td>
                                                        <td><b>{inputField.value}</b></td>
                                                        <td><b>{inputField.secure.toString().slice(0,1).toUpperCase()+inputField.secure.toString().slice(1,)}</b></td>
                                                        <td><b>{inputField.expires}</b></td>       
                                                    </tr>
                                                    )) }
                                                </tbody>
                                            </table>
                                        }
                                        {this.state.response_cookies.length==0 &&
                                            <h4>No Cookies</h4>
                                        }
                                    </div>
                                }
                                {this.state.active_request=='text' &&
                                    <div>
                                        <div className="topnav">
                                            <a name='query' onClick={this.activate_request}>Query</a>
                                            <a name='headers' onClick={this.activate_request}>Headers</a>
                                            <div className="topnav-right">
                                                <a name='header' onClick={this.activate_request}>Headers</a>
                                                <a name='cookies' onClick={this.activate_request}>Cookies</a>
                                                <a className="active" name='text' onClick={this.activate_request}>Body</a>
                                            </div>
                                        </div>
                                        <br />
                                        <h3><u>Response Body</u> :</h3>
                                        <br/>
                                        <h4>No Response Body</h4>
                                    </div>
                                }
                            </span>
                        }
                        <br />
                    </form>
                    <hr />
                </div>
                <div className="two wide column"></div>
            </div>
            
        )
    }
}