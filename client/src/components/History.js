import React,{ Component } from 'react';
import JSONToHTMLTable from './JSONToHTMLTable';
import { Form, Input, TextArea, Button } from 'semantic-ui-react'
import axios from 'axios'

export default class Search extends Component {
    constructor(props){
        super(props);
        this.state={
        	details:{},
        	active_tab:'query',
        	active_response:1
        }
    }

    componentDidMount(){
    	axios.get('/specific/'+this.props.match.params.id)
    		.then(res => {
    			this.setState({details:res.data,active_tab:'query',active_response:1});
    		})
    }

    activate_request = (e) => {
        this.setState({ active_tab: e.target.name });
    }

    web = () => {
        const part=this.state.details.response_body.toString();
        const wind = window.open("", "popupWindow", "width=600,height=600,scrollbars=yes");
        wind.document.write(part);       
    }

    render(){
    	return(
    		<div className="ui grid" style={{'TextAlign':'center'}}>
                <div className="two wide column"></div>
                <div className="ten wide column">
                	<div className='two fields top'>
                        <div className='ui input'>
                            <input
                            type="email" 
                            variant="filled"
                            placeholder='Query Parameter'
                            value={this.state.details.method}      
                            />
                        </div>
                        <span className='invisible'>H H</span>
                        <div className='ui input'>
                            <input
                            type="url" 
                            variant="filled"
                            placeholder='Query Parameter'
                            value={this.state.details.url}       
                            />
                        </div>
                    </div>
                    <hr />
                    {this.state.details.method=='GET' &&
                    	<div>
		                    {this.state.active_tab=='query' &&
		                        <div>
		                            <div className="topnav">
		                                <a className="active" name='query' onClick={this.activate_request}>Query</a>
		                                <a name='headers' onClick={this.activate_request}>Headers</a>
		                                <div className="topnav-right">
		                                    <a name='header' onClick={this.activate_request}>Headers</a>
		                                    <a name='cookies' onClick={this.activate_request}>Cookies</a>
		                                    <a name='text' onClick={this.activate_request}>Body</a>
		                                </div>
		                            </div>
		                            <br />
		                            <h3><u>Query Parameters</u> :</h3>
		                            {this.state.details.query && this.state.details.query.length>0 &&
			                            <table className="ui celled striped table">
			                                <thead>
			                                    <tr><th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>S.N.</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Query</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Value</th>
			                                    </tr>
			                                </thead>
			                                <tbody>
			                                    { this.state.details.query.map((inputField, index) => (
			                                    <tr key={index}>
			                                        <td><b>{index+1}.</b></td> 
			                                        <td><b>{inputField.key}</b></td>
			                                        <td><b>{inputField.value}</b></td>
			                                    </tr>
			                                    )) }
			                                </tbody>
			                            </table>
			                        }
			                        {this.state.details.query && this.state.details.query.length==0 &&
			                            <h4>No query parameters</h4>
			                        }
		                        </div>
		                    }
		                    {this.state.active_tab=='headers' &&
		                        <div>
		                            <div className="topnav">
		                                <a name='query' onClick={this.activate_request}>Query</a>
		                                <a className="active" name='headers' onClick={this.activate_request}>Headers</a>
		                                <div className="topnav-right">
		                                    <a name='header' onClick={this.activate_request}>Headers</a>
		                                    <a name='cookies' onClick={this.activate_request}>Cookies</a>
		                                    <a name='text' onClick={this.activate_request}>Body</a>
		                                </div>
		                            </div>
		                            <br />
		                            <h3><u>Request Headers</u> :</h3>
		                            {this.state.details.request_headers && this.state.details.request_headers.length>0 &&
			                            <table className="ui celled striped table">
			                                <thead>
			                                    <tr><th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>S.N.</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Header</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Value</th>
			                                    </tr>
			                                </thead>
			                                <tbody>
			                                    { this.state.details.request_headers.map((inputField, index) => (
			                                    <tr key={index}>
			                                        <td><b>{index+1}.</b></td> 
			                                        <td><b>{inputField.key}<a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/'+inputField.key.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-12px",color:"rgba(32,33,31,0.4)",top:"-1.8px"}}></i></a></b></td>
			                                        <td><b>{inputField.value}</b></td>
			                                    </tr>
			                                    )) }
			                                </tbody>
			                            </table>
			                        }
			                        {this.state.details.request_headers && this.state.details.request_headers.length==0 &&
			                            <h4>No headers</h4>
			                        }
		                        </div>
		                    }
		                    {this.state.active_tab=='header' &&
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
		                            <b style={{color:"#007bff"}}>Status-code:{this.state.details.status}  <a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/'+this.state.details.status.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-3.6px",color:"rgba(32,33,31,0.4)"}}></i></a> <span className='topnav-right'>Response time:{this.state.details.time} ms</span></b>
		                            <h3><u>Response Headers</u> :</h3>
		                            {this.state.details.response_headers && this.state.details.response_headers.length>0 &&
			                            <table className="ui celled striped table">
			                                <thead>
			                                    <tr><th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>S.N.</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Header</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Value</th>
			                                    </tr>
			                                </thead>
			                                <tbody>
			                                    { this.state.details.response_headers.map((inputField, index) => (
			                                    <tr key={index}>
			                                        <td><b>{index+1}.</b></td> 
			                                        <td><b>{inputField.key}<a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/'+inputField.key.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-12px",color:"rgba(32,33,31,0.4)",top:"-1.8px"}}></i></a></b></td>
			                                        <td><b>{inputField.value}</b></td>
			                                    </tr>
			                                    )) }
			                                </tbody>
			                            </table>
			                        }
			                        {this.state.details.response_headers && this.state.details.response_headers.length==0 &&
			                            <h4>No headers</h4>
			                        }
		                        </div>
		                    }
		                    {this.state.active_tab=='cookies' &&
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
		                            <b style={{color:"#007bff"}}>Status-code:{this.state.details.status}  <a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/'+this.state.details.status.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-3.6px",color:"rgba(32,33,31,0.4)"}}></i></a> <span className='topnav-right'>Response time:{this.state.details.time} ms</span></b>
		                            <hr />
		                            <h3><u>Cookies</u> :</h3>
		                            {this.state.details.cookies && this.state.details.cookies.length>0 &&
			                            <table className="ui celled striped table">
			                                <thead>
			                                    <tr><th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>S.N.</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Header</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Value</th>
			                                    </tr>
			                                </thead>
			                                <tbody>
			                                    { this.state.details.cookies.map((inputField, index) => (
			                                    <tr key={index}>
			                                        <td><b>{index+1}.</b></td> 
			                                        <td><b>{inputField.key}</b></td>
			                                        <td><b>{inputField.value}</b></td>
			                                    </tr>
			                                    )) }
			                                </tbody>
			                            </table>
			                        }
			                        {this.state.details.cookies && this.state.details.cookies.length==0 &&
			                            <h4>No set cookies</h4>
			                        }
		                        </div>
		                    }
		                    {this.state.active_tab=='text' &&
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
		                            <b style={{color:"#007bff"}}>Status-code:{this.state.details.status}  <a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/'+this.state.details.status.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-3.6px",color:"rgba(32,33,31,0.4)"}}></i></a> <span className='topnav-right'>Response time:{this.state.details.time} ms</span></b>
		                            <hr />
		                            <h3><u>Response Body</u> :</h3>

		                            {this.state.details.response_body && typeof(this.state.details.response_body)==='object' && this.state.details.response_body !== null &&
		                                <div>
		                                    <h3>Your formatted JSON response:</h3>
		                                    <br />
		                                    <JSONToHTMLTable data={this.state.details.response_body} />
		                                </div>
		                            }
		                            {this.state.details.response_body && typeof(this.state.details.response_body)!='object' && this.state.details.response_body !== null &&
		                                <div>
		                                    <div className="card">
		                                        <div className="card-body p-4">
		                                            <a onClick={this.web} className='topnav-right'><h6>Preview</h6></a>
		                                            <h3 className="card-title">Raw Server response body:</h3>
		                                            <br />
		                                            <p className="card-text"><b>{this.state.details.response_body}</b></p>
		                                        </div>
		                                    </div>
		                                </div>
		                            }
		                        </div>
		                    }
		                </div>
	                }
	                {this.state.details.method=='POST' &&
                    	<div>
		                    {this.state.active_tab=='query' &&
		                        <div>
		                            <div className="topnav">
		                                <a className="active" name='query' onClick={this.activate_request}>Query</a>
		                                <a name='headers' onClick={this.activate_request}>Headers</a>
		                                <a name='body' onClick={this.activate_request}>Body</a>
		                                <div className="topnav-right">
		                                    <a name='header' onClick={this.activate_request}>Headers</a>
		                                    <a name='cookies' onClick={this.activate_request}>Cookies</a>
		                                    <a name='text' onClick={this.activate_request}>Body</a>
		                                </div>
		                            </div>
		                            <br />
		                            <h3><u>Query Parameters</u> :</h3>
		                            {this.state.details.query && this.state.details.query.length>0 &&
			                            <table className="ui celled striped table">
			                                <thead>
			                                    <tr><th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>S.N.</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Query</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Value</th>
			                                    </tr>
			                                </thead>
			                                <tbody>
			                                    { this.state.details.query.map((inputField, index) => (
			                                    <tr key={index}>
			                                        <td><b>{index+1}.</b></td> 
			                                        <td><b>{inputField.key}</b></td>
			                                        <td><b>{inputField.value}</b></td>
			                                    </tr>
			                                    )) }
			                                </tbody>
			                            </table>
			                        }
			                        {this.state.details.query && this.state.details.query.length==0 &&
			                            <h4>No query parameters</h4>
			                        }
		                        </div>
		                    }
		                    {this.state.active_tab=='headers' &&
		                        <div>
		                            <div className="topnav">
		                                <a name='query' onClick={this.activate_request}>Query</a>
		                                <a className="active" name='headers' onClick={this.activate_request}>Headers</a>
		                                <a name='body' onClick={this.activate_request}>Body</a>
		                                <div className="topnav-right">
		                                    <a name='header' onClick={this.activate_request}>Headers</a>
		                                    <a name='cookies' onClick={this.activate_request}>Cookies</a>
		                                    <a name='text' onClick={this.activate_request}>Body</a>
		                                </div>
		                            </div>
		                            <br />
		                            <h3><u>Request Headers</u> :</h3>
		                            {this.state.details.request_headers && this.state.details.request_headers.length>0 &&
			                            <table className="ui celled striped table">
			                                <thead>
			                                    <tr><th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>S.N.</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Header</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Value</th>
			                                    </tr>
			                                </thead>
			                                <tbody>
			                                    { this.state.details.request_headers.map((inputField, index) => (
			                                    <tr key={index}>
			                                        <td><b>{index+1}.</b></td> 
			                                        <td><b>{inputField.key}<a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/'+inputField.key.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-12px",color:"rgba(32,33,31,0.4)",top:"-1.8px"}}></i></a></b></td>
			                                        <td><b>{inputField.value}</b></td>
			                                    </tr>
			                                    )) }
			                                </tbody>
			                            </table>
			                        }
			                        {this.state.details.request_headers && this.state.details.request_headers.length==0 &&
			                            <h4>No headers</h4>
			                        }
		                        </div>
		                    }
		                    {this.state.active_tab=='body' &&
		                        <div>
		                            <div className="topnav">
		                                <a name='query' onClick={this.activate_request}>Query</a>
		                                <a name='headers' onClick={this.activate_request}>Headers</a>
		                                <a className="active" name='body' onClick={this.activate_request}>Body</a>
		                                <div className="topnav-right">
		                                    <a name='header' onClick={this.activate_request}>Headers</a>
		                                    <a name='cookies' onClick={this.activate_request}>Cookies</a>
		                                    <a name='text' onClick={this.activate_request}>Body</a>
		                                </div>
		                            </div>
		                            <br />
		                            <h3><u>Request Body</u> :</h3>
		                            {this.state.details.request_body && this.state.details.request_body.length>0 &&
			                            <table className="ui celled striped table">
			                                <thead>
			                                    <tr><th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>S.N.</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Query</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Value</th>
			                                    </tr>
			                                </thead>
			                                <tbody>
			                                    { this.state.details.request_body.map((inputField, index) => (
			                                    <tr key={index}>
			                                        <td><b>{index+1}.</b></td> 
			                                        <td><b>{inputField.key}</b></td>
			                                        <td><b>{inputField.value}</b></td>
			                                    </tr>
			                                    )) }
			                                </tbody>
			                            </table>
			                        }
			                        {this.state.details.request_body && this.state.details.request_body.length==0 &&
			                            <h4>No Request Body</h4>
			                        }
		                        </div>
		                    }
		                    {this.state.active_tab=='header' &&
		                        <div>
		                            <div className="topnav">
		                                <a name='query' onClick={this.activate_request}>Query</a>
		                                <a name='headers' onClick={this.activate_request}>Headers</a>
		                                <a name='body' onClick={this.activate_request}>Body</a>
		                                <div className="topnav-right">
		                                    <a className="active" name='header' onClick={this.activate_request}>Headers</a>
		                                    <a name='cookies' onClick={this.activate_request}>Cookies</a>
		                                    <a name='text' onClick={this.activate_request}>Body</a>
		                                </div>
		                            </div>
		                            <br />
		                            <b style={{color:"#007bff"}}>Status-code:{this.state.details.status}  <a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/'+this.state.details.status.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-3.6px",color:"rgba(32,33,31,0.4)"}}></i></a> <span className='topnav-right'>Response time:{this.state.details.time} ms</span></b>
		                            <h3><u>Response Headers</u> :</h3>
		                            {this.state.details.response_headers && this.state.details.response_headers.length>0 &&
			                            <table className="ui celled striped table">
			                                <thead>
			                                    <tr><th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>S.N.</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Header</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Value</th>
			                                    </tr>
			                                </thead>
			                                <tbody>
			                                    { this.state.details.response_headers.map((inputField, index) => (
			                                    <tr key={index}>
			                                        <td><b>{index+1}.</b></td> 
			                                        <td><b>{inputField.key}<a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/'+inputField.key.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-12px",color:"rgba(32,33,31,0.4)",top:"-1.8px"}}></i></a></b></td>
			                                        <td><b>{inputField.value}</b></td>
			                                    </tr>
			                                    )) }
			                                </tbody>
			                            </table>
			                        }
			                        {this.state.details.response_headers && this.state.details.response_headers.length==0 &&
			                            <h4>No headers</h4>
			                        }
		                        </div>
		                    }
		                    {this.state.active_tab=='cookies' &&
		                        <div>
		                            <div className="topnav">
		                                <a name='query' onClick={this.activate_request}>Query</a>
		                                <a name='headers' onClick={this.activate_request}>Headers</a>
		                                <a name='body' onClick={this.activate_request}>Body</a>
		                                <div className="topnav-right">
		                                    <a name='header' onClick={this.activate_request}>Headers</a>
		                                    <a className="active" name='cookies' onClick={this.activate_request}>Cookies</a>
		                                    <a name='text' onClick={this.activate_request}>Body</a>
		                                </div>
		                            </div>
		                            <br />
		                            <b style={{color:"#007bff"}}>Status-code:{this.state.details.status}  <a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/'+this.state.details.status.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-3.6px",color:"rgba(32,33,31,0.4)"}}></i></a> <span className='topnav-right'>Response time:{this.state.details.time} ms</span></b>
		                            <hr />
		                            <h3><u>Cookies</u> :</h3>
		                            {this.state.details.cookies && this.state.details.cookies.length>0 &&
			                            <table className="ui celled striped table">
			                                <thead>
			                                    <tr><th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>S.N.</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Header</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Value</th>
			                                    </tr>
			                                </thead>
			                                <tbody>
			                                    { this.state.details.cookies.map((inputField, index) => (
			                                    <tr key={index}>
			                                        <td><b>{index+1}.</b></td> 
			                                        <td><b>{inputField.key}</b></td>
			                                        <td><b>{inputField.value}</b></td>
			                                    </tr>
			                                    )) }
			                                </tbody>
			                            </table>
			                        }
			                        {this.state.details.cookies && this.state.details.cookies.length==0 &&
			                            <h4>No set cookies</h4>
			                        }
		                        </div>
		                    }
		                    {this.state.active_tab=='text' &&
		                        <div>
		                            <div className="topnav">
		                                <a name='query' onClick={this.activate_request}>Query</a>
		                                <a name='headers' onClick={this.activate_request}>Headers</a>
		                                <a name='body' onClick={this.activate_request}>Body</a>
		                                <div className="topnav-right">
		                                    <a name='header' onClick={this.activate_request}>Headers</a>
		                                    <a name='cookies' onClick={this.activate_request}>Cookies</a>
		                                    <a className="active" name='text' onClick={this.activate_request}>Body</a>
		                                </div>
		                            </div>
		                            <br />
		                            <b style={{color:"#007bff"}}>Status-code:{this.state.details.status}  <a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/'+this.state.details.status.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-3.6px",color:"rgba(32,33,31,0.4)"}}></i></a> <span className='topnav-right'>Response time:{this.state.details.time} ms</span></b>
		                            <hr />
		                            <h3><u>Response Body</u> :</h3>

		                            {this.state.details.response_body && typeof(this.state.details.response_body)==='object' && this.state.details.response_body !== null &&
		                                <div>
		                                    <h3>Your formatted JSON response:</h3>
		                                    <br />
		                                    <JSONToHTMLTable data={this.state.details.response_body} />
		                                </div>
		                            }
		                            {this.state.details.response_body && typeof(this.state.details.response_body)!='object' && this.state.details.response_body !== null &&
		                                <div>
		                                    <div className="card">
		                                        <div className="card-body p-4">
		                                            <a onClick={this.web} className='topnav-right'><h6>Preview</h6></a>
		                                            <h3 className="card-title">Raw Server response body:</h3>
		                                            <br />
		                                            <p className="card-text"><b>{this.state.details.response_body}</b></p>
		                                        </div>
		                                    </div>
		                                </div>
		                            }
		                        </div>
		                    }
		                </div>
	                }
	                {this.state.details.method=='HEAD' &&
                    	<div>
		                    {this.state.active_tab=='query' &&
		                        <div>
		                            <div className="topnav">
		                                <a className="active" name='query' onClick={this.activate_request}>Query</a>
		                                <a name='headers' onClick={this.activate_request}>Headers</a>
		                                <div className="topnav-right">
		                                    <a name='header' onClick={this.activate_request}>Headers</a>
		                                    <a name='cookies' onClick={this.activate_request}>Cookies</a>
		                                    <a name='text' onClick={this.activate_request}>Body</a>
		                                </div>
		                            </div>
		                            <br />
		                            <h3><u>Query Parameters</u> :</h3>
		                            {this.state.details.query && this.state.details.query.length>0 &&
			                            <table className="ui celled striped table">
			                                <thead>
			                                    <tr><th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>S.N.</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Query</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Value</th>
			                                    </tr>
			                                </thead>
			                                <tbody>
			                                    { this.state.details.query.map((inputField, index) => (
			                                    <tr key={index}>
			                                        <td><b>{index+1}.</b></td> 
			                                        <td><b>{inputField.key}</b></td>
			                                        <td><b>{inputField.value}</b></td>
			                                    </tr>
			                                    )) }
			                                </tbody>
			                            </table>
			                        }
			                        {this.state.details.query && this.state.details.query.length==0 &&
			                            <h4>No query parameters</h4>
			                        }
		                        </div>
		                    }
		                    {this.state.active_tab=='headers' &&
		                        <div>
		                            <div className="topnav">
		                                <a name='query' onClick={this.activate_request}>Query</a>
		                                <a className="active" name='headers' onClick={this.activate_request}>Headers</a>
		                                <div className="topnav-right">
		                                    <a name='header' onClick={this.activate_request}>Headers</a>
		                                    <a name='cookies' onClick={this.activate_request}>Cookies</a>
		                                    <a name='text' onClick={this.activate_request}>Body</a>
		                                </div>
		                            </div>
		                            <br />
		                            <h3><u>Request Headers</u> :</h3>
		                            {this.state.details.request_headers && this.state.details.request_headers.length>0 &&
			                            <table className="ui celled striped table">
			                                <thead>
			                                    <tr><th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>S.N.</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Header</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Value</th>
			                                    </tr>
			                                </thead>
			                                <tbody>
			                                    { this.state.details.request_headers.map((inputField, index) => (
			                                    <tr key={index}>
			                                        <td><b>{index+1}.</b></td> 
			                                        <td><b>{inputField.key}<a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/'+inputField.key.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-12px",color:"rgba(32,33,31,0.4)",top:"-1.8px"}}></i></a></b></td>
			                                        <td><b>{inputField.value}</b></td>
			                                    </tr>
			                                    )) }
			                                </tbody>
			                            </table>
			                        }
			                        {this.state.details.request_headers && this.state.details.request_headers.length==0 &&
			                            <h4>No headers</h4>
			                        }
		                        </div>
		                    }
		                    {this.state.active_tab=='header' &&
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
		                            <b style={{color:"#007bff"}}>Status-code:{this.state.details.status}  <a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/'+this.state.details.status.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-3.6px",color:"rgba(32,33,31,0.4)"}}></i></a> <span className='topnav-right'>Response time:{this.state.details.time} ms</span></b>
		                            <h3><u>Response Headers</u> :</h3>
		                            {this.state.details.response_headers && this.state.details.response_headers.length>0 &&
			                            <table className="ui celled striped table">
			                                <thead>
			                                    <tr><th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>S.N.</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Header</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Value</th>
			                                    </tr>
			                                </thead>
			                                <tbody>
			                                    { this.state.details.response_headers.map((inputField, index) => (
			                                    <tr key={index}>
			                                        <td><b>{index+1}.</b></td> 
			                                        <td><b>{inputField.key}<a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/'+inputField.key.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-12px",color:"rgba(32,33,31,0.4)",top:"-1.8px"}}></i></a></b></td>
			                                        <td><b>{inputField.value}</b></td>
			                                    </tr>
			                                    )) }
			                                </tbody>
			                            </table>
			                        }
			                        {this.state.details.response_headers && this.state.details.response_headers.length==0 &&
			                            <h4>No headers</h4>
			                        }
		                        </div>
		                    }
		                    {this.state.active_tab=='cookies' &&
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
		                            <b style={{color:"#007bff"}}>Status-code:{this.state.details.status}  <a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/'+this.state.details.status.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-3.6px",color:"rgba(32,33,31,0.4)"}}></i></a> <span className='topnav-right'>Response time:{this.state.details.time} ms</span></b>
		                            <hr />
		                            <h3><u>Cookies</u> :</h3>
		                            {this.state.details.cookies && this.state.details.cookies.length>0 &&
			                            <table className="ui celled striped table">
			                                <thead>
			                                    <tr><th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>S.N.</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Header</th>
			                                    <th style={{backgroundColor:"rgba(23,24,22,0.85)",color:"white"}}>Value</th>
			                                    </tr>
			                                </thead>
			                                <tbody>
			                                    { this.state.details.cookies.map((inputField, index) => (
			                                    <tr key={index}>
			                                        <td><b>{index+1}.</b></td> 
			                                        <td><b>{inputField.key}</b></td>
			                                        <td><b>{inputField.value}</b></td>
			                                    </tr>
			                                    )) }
			                                </tbody>
			                            </table>
			                        }
			                        {this.state.details.cookies && this.state.details.cookies.length==0 &&
			                            <h4>No set cookies</h4>
			                        }
		                        </div>
		                    }
		                    {this.state.active_tab=='text' &&
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
		                            <b style={{color:"#007bff"}}>Status-code:{this.state.details.status}  <a href={'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/'+this.state.details.status.toString()} target="_blank"><i className="fa fa-lg fa-info-circle" aria-hidden="true" style={{position:"relative",right:"-3.6px",color:"rgba(32,33,31,0.4)"}}></i></a> <span className='topnav-right'>Response time:{this.state.details.time} ms</span></b>
		                            <hr />
		                            <h3><u>Response Body</u> :</h3>
		                            <br />
		                            <h4>No Response Body</h4>
		                        </div>
		                    }
		                </div>
	                }
                </div>
                <div className="two wide column"></div>
            </div>
    	)
    }
}