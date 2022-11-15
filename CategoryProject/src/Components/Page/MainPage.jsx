import React, { Component } from "react";
import { GetCategoryData, GetDropDownData } from "../../Services/getServices.jsx";
import SimpleReactValidator from "simple-react-validator";
import "../../Assets/css/mainpage.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDownData: [],
            categoryValue: "",
            show: "none",

            author: "",
            background: "",
            category: "",
            quoteString: "",
            tags: []
        }
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }

    BindData = async () => {
        try {
            const data = await GetDropDownData();
            this.setState({
                dropDownData: data
            });
        } catch (err) {
            alert(err);
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    componentDidMount = async () => {
        this.BindData();
    }

    btnSave_Click = async () => {
        if (this.validator.allValid()) {
            try {
                const category = this.state.categoryValue;
                const data = await GetCategoryData(category);
                console.log(data.quoteString);
                this.setState({
                    author: data.author,
                    category: data.category,
                    quoteString: data.quoteString,
                    background: data.background,
                    show: "block",
                });
                var tagList = [];
                for (var i = 0; i < data.tags.length; i++) {
                    tagList.push(data.tags[i].name);
                }
                console.log('tagList');
                console.log(tagList);
                this.setState({ tags: tagList });
                console.log(this.state.tags);
            } catch (err) {
                alert(err);
            }

        } else {
            this.validator.showMessages();
        }
    }
    render() {
        return (
            <React.Fragment>

                <div className="main-page">


                    <div className="dropdown-data">
                        <h2 className="title">Select Category</h2>
                        <div >

                            <div className="control-label col-md-4">
                                {/* <label>Customer No</label> */}
                                <select
                                    value={this.state.categoryValue}
                                    name="categoryValue"
                                    id="categoryValue"
                                    className="form-control"
                                    onChange={(e) => this.handleChange(e)}
                                >
                                    <option value="">--- Please Select Category---</option>
                                    {this.state.dropDownData.map((result, key) => (
                                        <option key={key} value={result.name}>
                                            {result.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <br />
                            <div className="col-md-6"></div>

                            <div className="col-sm-4">
                                {this.validator.message(
                                    "categoryValue",
                                    this.state.categoryValue,
                                    "required",
                                    {
                                        className: "text-danger",
                                    }
                                )}
                            </div>
                            <div>
                                <button
                                    id="btnSave"
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={this.btnSave_Click}
                                >
                                    Get Data
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div style={{ display: this.state.show }}>
                            <div className="category-data">
                                <h1 className="value-heading"><u>Title</u> : <u>{this.state.category}</u></h1>
                                <br />
                                <div className="data-part">
                                    <h4>Quote : </h4><p>{this.state.quoteString}</p>
                                    <h4>Author :</h4><p>{this.state.author}</p>
                                    <h4>
                                        Tags :</h4>
                                    <p>
                                        <ol>
                                            {this.state.tags.map(item => {
                                                return <li>{item}</li>;
                                            })}
                                        </ol>
                                    </p>
                                </div>
                                <div className="image-part">
                                    <h4>Image :</h4>
                                    <br />
                                    <img
                                        className="category-image-size"
                                        src={this.state.background}
                                        alt="backGroundImage"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </React.Fragment>
        )
    }
}