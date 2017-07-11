import '../stylesheets/Container.scss'

import React from "react"

import axios from "axios"


export default class Container extends React.Component {


    constructor(props){
        super(props);

//$grade, $config, $lti_grade_url, $sourcedid, $lti_consumer_key
        let defaultState = {
            "resource_link_id":"",
            "context_id":"",
            "grade":0,
            "lis_outcome_service_url":"",
            "lti_consumer_key":"",
            "lti_consumer_secret":"",
            "user_ids":"",
            "user_ids_array":[],
            "sourcedid_prefix":""
        }
        props.appState ? this.state = props.appState : this.state = defaultState

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    componentWillMount(){
        console.log("Layout component will mount")
        
    }
    componentDidMount(){
        console.log("Layout component did mount");
        
        // axios.get('../public/api/api.php', {
        //     params: {
        //         action: "hello",
        //         data:{
        //             name:"World"
        //         }
        //     }
        // })
        // .then(response => {
        //     this.setState({
        //         api_message:response.data
        //     })
        // })
        // .catch(error => {
        //     console.log(error.response)
        // });

    }
    componentWillUnmount(){
        console.log("Layout component will unmount")
    }

    handleInputChange(event){

        this.setState({
            [event.target.name]:event.target.value
        })

        if(event.target.name == "user_ids"){

            let value = event.target.value.replace(/(^[,\s]+)|([,\s]+$)/g, '')
                        .split(",").map((item)=>item.trim())
                        .filter((item)=>{return item != ""});

            this.setState({
                "user_ids_array":[...value]
            })

        }

    }

    handleSubmit(event){


        var self = this;
        const postData = new FormData();
        postData.append('action', "send_grades");
        postData.append('data', JSON.stringify({
            "grade":this.state.grade,
            "sourcedid_prefix":this.state.sourcedid_prefix,
            "grade_url":this.state.lis_outcome_service_url,
            "lti_key":this.state.lti_consumer_key,
            "user_ids":this.state.user_ids_array,
            "lti_secret":this.state.lti_consumer_secret
        }));

        
        axios.post('../public/api/api.php', postData)
        .then(function(response){
            
        }).catch(function(error){

        });


    }


    render(){

        console.log(this.state.user_ids_array)

        return (
        <div className="container-component clearfix">

            <h1>Grades Send</h1>

            <div className="form-horizontal">
                <div className="form-group">
                    <label className="col-sm-2 control-label">sourcedid_prefix</label>
                    <div className="col-sm-8">
                        <input className="default-input sourcedid_prefix-input form-control"
                                name="sourcedid_prefix"
                                value={this.state.sourcedid_prefix}
                                placeholder="sourcedid prefix"
                                onChange={this.handleInputChange}
                            />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">grade</label>
                    <div className="col-sm-8">
                        <input className="default-input grade-input form-control"
                                type="number"
                                name="grade"
                                value={this.state.grade}
                                placeholder="Grade (0 - 1)"
                                onChange={this.handleInputChange}
                            />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">lis_outcome_service_url</label>
                    <div className="col-sm-8">
                        <input className="default-input lis_outcome_service_url-input form-control"
                                name="lis_outcome_service_url"
                                value={this.state.lis_outcome_service_url}
                                placeholder="Lis Outcome Service URL"
                                onChange={this.handleInputChange}
                            />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">lti_consumer_key</label>
                    <div className="col-sm-8">
                        <input className="default-input lti_consumer_key-input form-control"
                                name="lti_consumer_key"
                                value={this.state.lti_consumer_key}
                                placeholder="LTI Consumer Key"
                                onChange={this.handleInputChange}
                            />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">lti_consumer_secret</label>
                    <div className="col-sm-8">
                        <input className="default-input lti_consumer_secret-input form-control"
                                name="lti_consumer_secret"
                                value={this.state.lti_consumer_secret}
                                placeholder="LTI Consumer Secret"
                                onChange={this.handleInputChange}
                            />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">User IDs</label>
                    <div className="col-sm-8">
                        <textarea className="default-input user_ids-input form-control"
                                name="user_ids"
                                value={this.state.user_ids}
                                placeholder="User IDs (Comma seperated)"
                                onChange={this.handleInputChange}
                            />
                    </div>
                    IDs entered - {this.state.user_ids_array.length}
                </div>
                
                

            </div>

            <button className="btn btn-md btn-danger"
                onClick={this.handleSubmit}
            >Send Grades</button>

            
        </div>);
    }
}
