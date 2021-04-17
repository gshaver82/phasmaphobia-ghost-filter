import React from "react";
import directory from "../directory.json";


// TODO use callbacks to have react wait to display the state until after the switch finishes

// TODO if there are multiple ghosts display ONLY what attributes can be used to pare down the number of ghosts in the list 
let classNameConfirmed = 'btn btn-success btn-lg';
let classNameUnknown = 'btn btn-secondary btn-lg';
let classNameExcluded = 'btn btn-danger btn-lg';
//this is for the button map function that doesnt work
// let clues = [
//     {
//         "id": 1,
//         "Name": "Freezing",
//     },
//     {
//         "id": 2,
//         "Name": "EMF5",
//     },
//     {
//         "id": 3,
//         "Name": "Orbs",
//     },
//     {
//         "id": 4,
//         "Name": "SpiritBox",
//     },
//     {
//         "id": 5,
//         "Name": "GhostWriting",
//     },
//     {
//         "id": 6,
//         "Name": "Fingerprints",
//     },
// ]
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
        FreezingIsAClue: 'Check this!',
        EMF5IsAClue: 'Check this!',
        OrbsIsAClue: 'Check this!',
        SpiritBoxIsAClue: 'Check this!',
        GhostWritingIsAClue: 'Check this!',
        FingerprintsIsAClue: 'Check this!'
    };
    // this function takes in the button value and assigns it to ghost attributes
    //based on that value it changes the state from unknown to confirmed to excluded and back to unknown in that order
    buttonPress = async event => {
        let ghostAttribute = event.target.value;
        // console.log('event.currentTarget ' + event.target);
        //gives an error identifier expected but that is a bogus error message
        switch (this.state.[ghostAttribute]) {
            case 'unknown':
                await this.setState({
                    [ghostAttribute]: 'confirmed'
                });
                event.target.className = classNameConfirmed;
                break;
            case 'confirmed':
                await this.setState({
                    [ghostAttribute]: 'excluded'
                });
                event.target.className = classNameExcluded;
                break;
            case 'excluded':
                await this.setState({
                    [ghostAttribute]: 'unknown'
                });
                event.target.className = classNameUnknown;
                break;
            default:
                console.log('ERROR default reached');
        }
        await this.renderList();
    };

    renderList = async () => {
        let freeze = this.state.Freezing;
        let EMF5 = this.state.EMF5;
        let Orbs = this.state.Orbs;
        let SpiritBox = this.state.SpiritBox;
        let GhostWriting = this.state.GhostWriting;
        let Fingerprints = this.state.Fingerprints;
        function ghostFilter(dir) {
            //if you look at the console log, this runs TWELVE times, and i dont know why
            console.log("inside ghost filter function");
            return (dir.Freezing === freeze || 'unknown' === freeze) &&
                (dir.EMF5 === EMF5 || 'unknown' === EMF5) &&
                (dir.Orbs === Orbs || 'unknown' === Orbs) &&
                (dir.SpiritBox === SpiritBox || 'unknown' === SpiritBox) &&
                (dir.GhostWriting === GhostWriting || 'unknown' === GhostWriting) &&
                (dir.Fingerprints === Fingerprints || 'unknown' === Fingerprints);
        }
        let FilteredGhostList = directory.filter(ghostFilter);
        await this.setState({ sortedList: FilteredGhostList });

        await this.setState({ FreezingIsAClue: 'irrelevant' });
        if (this.state.Freezing === 'unknown' && FilteredGhostList.length > 0) {
            let firstResult = FilteredGhostList[0].Freezing;
            for (let i = 0; i < FilteredGhostList.length; i++) {
                if (firstResult !== FilteredGhostList[i].Freezing) {
                    await this.setState({ FreezingIsAClue: 'Check this!' });
                }
            }
        }

        await this.setState({ EMF5IsAClue: 'irrelevant' });
        if (this.state.EMF5 === 'unknown' && FilteredGhostList.length > 0) {
            let firstResult = FilteredGhostList[0].EMF5;
            for (let i = 0; i < FilteredGhostList.length; i++) {
                if (firstResult !== FilteredGhostList[i].EMF5) {
                    await this.setState({ EMF5IsAClue: 'Check this!' });
                }
            }
        }

        await this.setState({ OrbsIsAClue: 'irrelevant' });
        if (this.state.Orbs === 'unknown' && FilteredGhostList.length > 0) {
            let firstResult = FilteredGhostList[0].Orbs;
            for (let i = 0; i < FilteredGhostList.length; i++) {
                if (firstResult !== FilteredGhostList[i].Orbs) {
                    await this.setState({ OrbsIsAClue: 'Check this!' });
                }
            }
        }

        await this.setState({ SpiritBoxIsAClue: 'irrelevant' });
        if (this.state.SpiritBox === 'unknown' && FilteredGhostList.length > 0) {
            let firstResult = FilteredGhostList[0].SpiritBox;
            for (let i = 0; i < FilteredGhostList.length; i++) {
                if (firstResult !== FilteredGhostList[i].SpiritBox) {
                    await this.setState({ SpiritBoxIsAClue: 'Check this!' });
                }
            }
        }

        await this.setState({ GhostWritingIsAClue: 'irrelevant' });
        if (this.state.GhostWriting === 'unknown' && FilteredGhostList.length > 0) {
            let firstResult = FilteredGhostList[0].GhostWriting;
            for (let i = 0; i < FilteredGhostList.length; i++) {
                if (firstResult !== FilteredGhostList[i].GhostWriting) {
                    await this.setState({ GhostWritingIsAClue: 'Check this!' });
                }
            }
        }

        await this.setState({ FingerprintsIsAClue: 'irrelevant' });
        if (this.state.Fingerprints === 'unknown' && FilteredGhostList.length > 0) {
            let firstResult = FilteredGhostList[0].Fingerprints;
            for (let i = 0; i < FilteredGhostList.length; i++) {
                if (firstResult !== FilteredGhostList[i].Fingerprints) {
                    await this.setState({ FingerprintsIsAClue: 'Check this!' });
                }
            }
        }
    };
    detailsbuttonPress = event => {
        if (event.target.nextSibling.className === 'collapse') {
            event.target.nextSibling.className = '';
        } else if (event.target.nextSibling.className === '') {
            event.target.nextSibling.className = 'collapse';
        }
    };
    render() {
        return (
            <div>
                <div className="card-body">
                    {/* this isnt working, occasionally a button will click and update. also the confirmed unknown etc state is borked
                <div  className="buttongroup">
                    {clues.map(result => (
                        <button value={result.Name} type="button" className={classNameUnknown} key={result.id} onClick={this.buttonPress}>

                            <h2>{result.Name} </h2>
                            {this.state.{result.Name}}
                        </button>
                    ))}
                </div> */}
                    {/* button div */}
                    
                    {/* if you assign html tags to the clues, the on click will not work properly. if you do current target, itll work, but then only change the word color */}
            
                    <div>
                        <button value="Freezing" type="button" className={classNameUnknown} onClick={this.buttonPress}>
                            Freezing
                            <br></br>
                            {this.state.Freezing}
                        </button>
                        <button value="EMF5" type="button" className={classNameUnknown} onClick={this.buttonPress}>
                            EMF5
                            <br></br>
                            {this.state.EMF5}
                        </button>
                        <button value="Orbs" type="button" className={classNameUnknown} onClick={this.buttonPress}>
                            Orbs
                            <br></br>
                            {this.state.Orbs}
                        </button>
                        <button value="SpiritBox" type="button" className={classNameUnknown} onClick={this.buttonPress}>
                            SpiritBox
                            <br></br>
                            {this.state.SpiritBox}
                        </button>
                        <button value="GhostWriting" type="button" className={classNameUnknown} onClick={this.buttonPress}>
                            GhostWriting
                            <br></br>
                            {this.state.GhostWriting}
                        </button>
                        <button value="Fingerprints" type="button" className={classNameUnknown} onClick={this.buttonPress}>
                            Fingerprints
                            <br></br>
                            {this.state.Fingerprints}
                        </button>
                    </div>

                    {/* button div */}
                    {/* clue button div */}
                    <div>
                        <button value="Freezing" type="button" className={classNameUnknown} disabled>
                            <h4><strong>Freezing</strong></h4>
                            {this.state.FreezingIsAClue}
                        </button>
                        <button value="EMF5" type="button" className={classNameUnknown} disabled>
                            <h4><strong>EMF5</strong></h4>
                            {this.state.EMF5IsAClue}
                        </button>
                        <button value="Orbs" type="button" className={classNameUnknown} disabled>
                            <h4><strong>Orbs</strong></h4>
                            {this.state.OrbsIsAClue}
                        </button>
                        <button value="SpiritBox" type="button" className={classNameUnknown} disabled>
                            <h4><strong>SpiritBox</strong></h4>
                            {this.state.SpiritBoxIsAClue}
                        </button>
                        <button value="GhostWriting" type="button" className={classNameUnknown} disabled>
                            <h4><strong>GhostWriting</strong></h4>
                            {this.state.GhostWritingIsAClue}
                        </button>
                        <button value="Fingerprints" type="button" className={classNameUnknown} disabled>
                            <h4><strong>Fingerprints</strong></h4>
                            {this.state.FingerprintsIsAClue}
                        </button>
                    </div>

                    {/* button div */}
                    {/* list div */}
                    <ul className="list-group">
                        {this.state.sortedList.map(result => (
                            <li className="list-group-item" key={result.id}>

                                <h2>{result.Name} </h2>
                                <button value={result.Name} type="button" className="btn btn-primary" onClick={this.detailsbuttonPress}>
                                    Details
                                </button>
                                <div className='collapse' id={result.Name}>
                                    <div className="card card-body">
                                        <p><strong>Strengths --- </strong>{result.Strengths}</p>
                                        <p><strong>Weaknesses --- </strong>{result.Weaknesses}</p>
                                        <p><strong>Power --- </strong>{result.Power}</p>
                                        <p><strong>Notes --- </strong>{result.Notes}</p>
                                    </div>
                                </div>
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