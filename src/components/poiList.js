import React, { Component } from 'react';
import './poiList.css';

class PoiList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poi: [],
            selectedPoi: undefined,
            selectedPath: '',
            selectedDesc: '',
            selectedVideo: '',
            settings: {
                defaultPointColor: [61, 183, 255],
                selectedPointColor: [37, 27, 255],
                defaultPointTransparancy: 0.4,
                spriteScaleFactor: 0.8,
                spriteAltitude: 15.0
            }
        };
    }

    componentDidMount() {
        fetch('/poi')
            .then(response => {
                if (!response.ok) {
                    console.log(`status ${response.status}`);
                    throw new Error(`status ${response.status}`);
                }
                return response.json();
            })
            .then(json => {
                this.setState({
                    poi: json.poi
                });
            })
            .catch(e => {
                console.log(`POI call failed: ${e}`);
                this.setState({
                    message: `POI call failed: ${e}`
                });
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.poiExtension !== undefined) {
            if (prevState.settings !== this.state.settings) {
                this.props.poiExtension.setSettings(this.state.settings);
            }
            if (prevState.poi !== this.state.poi) {
                this.props.poiExtension.clearAllPOI();
                this.state.poi.forEach(poi => {
                    this.props.poiExtension.createPOI(poi, this.state.selectedPoi === poi);
                });
            }
            if (prevState.selectedPoi !== this.state.selectedPoi) {
                this.props.poiExtension.clearAllPOI();
                this.state.poi.forEach(poi => {
                    this.props.poiExtension.createPOI(poi, this.state.selectedPoi === poi);
                });
            }
        }
    }

    render() {
        let self = this;
        let poiList = [];
        let index = 0;
        this.state.poi.forEach(poi => {
            let colorState = index % 2 === 1 ? "white" : "";
            colorState = this.state.selectedPoi === poi ? "selected" : colorState;
            let classC = "poiEntry " + colorState;
            let poiItem = (
                <div className={classC} key={index} onClick={() => {
                    self.setState({
                        selectedPoi: poi,
                        selectedPath: poi.path,
                        selectedDesc: poi.description,
                        selectedVideo: poi.video,
                    });
                }}>
                    {poi.type}
                </div>
            );
            index++;
            poiList.push(poiItem);
        });

        return (
            <div className="fullscreen">
                <div className="poiTitle">BATIMENT E17</div>
                <div className="poiList">
                    {poiList}
                </div>
                <div className="poiPicDiv">
                    <img className="poiPic" src={this.state.selectedPath} alt="POI Image" />
                </div>
                <div className="poiLoremDiv">
                    <p className="poiPorem" align="center">
                        {this.state.selectedDesc}
                    </p>
                </div>
                <div className="videoContainer">
                    <video id="video" controls src={this.state.selectedVideo}>
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        );
    }
}

export default PoiList;