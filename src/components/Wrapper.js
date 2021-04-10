import React from "react";
import directory from "../directory.json";


// TODO use callbacks to have react wait to display the state until after the switch finishes

// TODO if there are multiple ghosts display ONLY what attributes can be used to pare down the number of ghosts in the list 


class Wrapper extends React.Component {
    // options for the ghost will be confirmed unknown or excluded clicking will cycle through the states
    state = {
        sortedList: directory,
        Freezing: 'unknown',
        EMF5: 'unknown',
        Orbs: 'unknown',
        SpiritBox: 'unknown',
        GhostWriting: 'unknown',
        Fingerprints: 'unknown',
    };

    // this function takes in the button value and assigns it to ghost attributes
    //based on that value it changes the state from unknown to confirmed to excluded and back to unknown in that order
    buttonPress = async event => {
        let ghostAttribute = event.target.value;
        // console.log(ghostAttribute);
        //gives an error identifier expected but that is a bogus error message
        
        switch (this.state.[ghostAttribute]) {
            case 'unknown':
                // console.log('unknown to confirmed');
                await this.setState({
                    [ghostAttribute]: 'confirmed'
                });
                break;
            case 'confirmed':
                // console.log('confirmed to excluded');
                await this.setState({
                    [ghostAttribute]: 'excluded'
                });
                break;
            case 'excluded':
                // console.log('excluded to unknown');
                await this.setState({
                    [ghostAttribute]: 'unknown'
                });
                break;
            default:
                console.log('ERROR default reached');
        }
        this.renderList();
    };
    renderList = () => {
        // console.log('render list function reached');
        // console.log(this.state);
        let freeze = this.state.Freezing;
        let EMF5 = this.state.EMF5;
        let Orbs = this.state.Orbs;
        let SpiritBox = this.state.SpiritBox;
        let GhostWriting = this.state.GhostWriting;
        let Fingerprints = this.state.Fingerprints;
        function ghostFilter(dir) {
            console.log("inside ghost filter function");
            return (dir.Freezing === freeze || 'unknown' === freeze) &&
                (dir.EMF5 === EMF5 || 'unknown' === EMF5) &&
                (dir.Orbs === Orbs || 'unknown' === Orbs) &&
                (dir.SpiritBox === SpiritBox || 'unknown' === SpiritBox) &&
                (dir.GhostWriting === GhostWriting || 'unknown' === GhostWriting) &&
                (dir.Fingerprints === Fingerprints || 'unknown' === Fingerprints);
        }

        this.setState({ sortedList: directory.filter(ghostFilter) })

        
        console.log('this.state');
        console.log(this.state);

    };

    render() {
        return (
            <div>
                <div className="card-body">

                    {/* button div */}
                    <div>
                        <button value="Freezing" onClick={this.buttonPress}>
                            Freezing
                        </button>{" "}
                        Freezing: {this.state.Freezing}
                    </div>
                    <div>
                        <button value="EMF5" onClick={this.buttonPress}>
                            EMF5
                        </button>{" "}
                        EMF5: {this.state.EMF5}
                    </div>
                    <div>
                        <button value="Orbs" onClick={this.buttonPress}>
                            Orbs
                        </button>{" "}
                        Orbs: {this.state.Orbs}
                    </div>
                    <div>
                        <button value="SpiritBox" onClick={this.buttonPress}>
                            SpiritBox
                        </button>{" "}
                        SpiritBox: {this.state.SpiritBox}
                    </div>
                    <div>
                        <button value="GhostWriting" onClick={this.buttonPress}>
                            Ghost Writing
                        </button>{" "}
                        GhostWriting: {this.state.GhostWriting}
                    </div>
                    <div>
                        <button value="Fingerprints" onClick={this.buttonPress}>
                            Fingerprints
                        </button>{" "}
                        Fingerprints: {this.state.Fingerprints}
                    </div>
                    <div>
                        <button onClick={this.buttonPress}>
                            update list
                        </button>{" "}
                    </div>

                    {/* button div */}




                    {/* list div */}
                    <ul className="list-group">
                        {this.state.sortedList.map(result => (
                            <li className="list-group-item" key={result.id}>
                                
                                <p>{result.Name} </p>
                                <h3>Strengths</h3>
                                <p>{result.Strengths}</p>
                                <h3>Weaknesses</h3>
                                <p>{result.Weaknesses}</p>
                                <h3>Power</h3>
                                <p>{result.Power}</p>
                                <h3>Notes</h3>
                                <p>{result.Notes}</p>
                            </li>
                        ))}
                    </ul>
                    {/* list div */}
                </div>
            </div>
        );
    }
}
export default Wrapper;